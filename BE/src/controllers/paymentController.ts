import stripe, { Stripe } from "stripe";
import catchAsync, { ProtectedRequest } from "../utils/catchAsync";
import { PRODUCT_VISIBLE_FIELDS } from "./cartController";
import Cart from "../models/cartModel";

const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY!);

export const createCheckoutSession = catchAsync(
  async (req: ProtectedRequest, res) => {
    const userId = req?.user?._id;
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

    const session = await stripeClient.checkout.sessions.create({
      line_items: formattedProducts,
      mode: "payment",
      success_url: `${process?.env?.CLIENT_URL!}/payment/success`,
      cancel_url: `${process?.env?.CLIENT_URL!}/payment/fail`,
    });
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
    console.log(event.type, "event Type");
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      console.log("💰 Payment successful!", session);
      // TODO: mark order as paid in your DB
    }

    res.json({ received: true });
  } catch (err: any) {
    console.error("❌ Webhook signature verification failed:", err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});
