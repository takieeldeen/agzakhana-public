import axios from "axios";

const API_KEY = process?.env?.PAYMOB_API_KEY!;
const USERNAME = process?.env?.PAYMOB_USERNAME!;
const PASSWORD = process?.env?.PAYMOB_PASSWORD!;
const BASE_URL = process?.env?.PAYMOB_URL;
export const getPaymobAccessToken = async () => {
  try {
    const payload = {
      api_key: API_KEY,
      username: USERNAME,
      password: PASSWORD,
    };
    const res = await axios.post(`${BASE_URL}/auth/tokens`, payload);
    const accessToken = res?.data?.token;
    return accessToken;
  } catch (err) {
    console.log(
      "Something went wrong while authenticating project for payment",
      err
    );
  }
};

export const checkout = async (priceCents: number, cart: any[]) => {
  try {
    const accessToken = await getPaymobAccessToken();
    const orderData = {
      auth_token: accessToken,
      delivery_needed: "false",
      amount_cents: priceCents,
      currency: "EGP",
      items: cart,
    };
    const res = await axios.post(`${BASE_URL}/ecommerce/orders`, orderData);
    const orderId = res?.data?.id;
    console.log(orderId);
  } catch (err) {
    console.log("Something went wrong while checking out", err);
  }
};
