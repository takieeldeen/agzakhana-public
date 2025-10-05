import stripe, { Stripe } from "stripe";
import catchAsync, { ProtectedRequest } from "../utils/catchAsync";
import { PRODUCT_VISIBLE_FIELDS } from "./cartController";
import Cart from "../models/cartModel";
import { OrderType } from "../types/order";
import Order from "../models/orderModel";

const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY!);

export const createCheckoutSession = catchAsync(
  async (req: ProtectedRequest, res) => {
    const userId = req?.user?._id!;
    const cart = await Cart.findOne({ userId }).populate([
      {
        path: "cart.product",
        select: PRODUCT_VISIBLE_FIELDS,
      },
      {
        path: "cart.deal",
        select: PRODUCT_VISIBLE_FIELDS,
      },
    ]);

    const formattedProducts = (cart?.cart ?? [])?.map((product: any) => {
      const itemData = product?.product ?? product?.deal;
      return {
        price_data: {
          currency: "egp",
          product_data: {
            name: itemData?.nameEn,
            images: [itemData?.imageUrl],
          },
          unit_amount: itemData?.price * 100,
        },
        quantity: product?.qty,
      };
    });
    const subtotal = cart?.cart?.reduce(
      (acc, cur: any) =>
        cur?.deal
          ? acc + (cur?.deal?.price ?? 0) * (cur?.qty ?? 0)
          : acc + (cur?.product?.price ?? 0) * (cur?.qty ?? 0),
      0
    );
    const delivery = Math.min(100, 0.1 * (subtotal ?? 0));
    const vat = 0.14 * (subtotal ?? 0);
    const total = (subtotal ?? 0) + delivery + vat;
    let sessionId = "";
    const session = await stripeClient.checkout.sessions.create({
      line_items: formattedProducts,
      mode: "payment",
      success_url: `${process?.env
        ?.CLIENT_URL!}/payment/success?session={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process?.env?.CLIENT_URL!}/payment/fail`,
      shipping_address_collection: {
        allowed_countries: ["EG"], // pick the countries you want to allow
      },
    });
    sessionId = session?.id;
    const items = cart?.cart?.map((cartItem: any) => ({
      productId: cartItem?.product?._id ?? null,
      dealId: cartItem?.deal?._id ?? null,
      nameAr: cartItem?.deal?.nameAr ?? cartItem?.product?.nameAr,
      nameEn: cartItem?.deal?.nameEn ?? cartItem?.product?.nameEn,
      imageUrl: cartItem?.deal?.imageUrl ?? cartItem?.product?.imageUrl,
      qty: cartItem?.deal?.qty ?? cartItem?.product?.qty,
      price: cartItem?.deal?.price ?? cartItem?.product?.price,
    }));
    const newOrder: OrderType = {
      userId,
      currency: "EGP",
      status: "pending",
      stripeSessionId: session?.id,
      total,
      items: items!,
    };
    await Order.create(newOrder);
    res.status(200).json({
      url: session?.url,
    });
  }
);

export const stripeWebhookHandler = catchAsync(async (req, res) => {
  const signature = req.headers?.["stripe-signature"];
  let event: Stripe.Event | undefined;
  try {
    event = stripeClient.webhooks.constructEvent(
      req.body,
      signature!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const shippingAddress = (session as any)?.shipping_details?.address;
      const {
        city,
        country,
        line1,
        line2,
        state,
        postal_code: postalCode,
      } = shippingAddress;
      const shippingDetails = {
        city,
        country,
        line1,
        line2,
        state,
        postalCode,
      };

      const newOrder = await Order.findOneAndUpdate(
        { stripeSessionId: session?.id },
        { $set: { status: "success", shippingDetails } },
        { new: true }
      );

      await Cart.findOneAndUpdate(
        { userId: newOrder?.userId },
        { $set: { cart: [] } },
        { new: true }
      );
      // TODO: mark order as paid in your DB
    }

    res.json({ received: true });
  } catch (err: any) {
    console.error("❌ Webhook signature verification failed:", err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});
