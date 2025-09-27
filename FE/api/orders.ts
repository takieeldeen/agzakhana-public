import { Order } from "@/types/orders";
import axios, { endpoints } from "./axios";

export async function getOrderDetails(orderId: string | undefined) {
  try {
    if (!orderId) return { order: null, status: "fail", error: null };
    const URL = endpoints.orders.details(orderId);
    const res = await axios.get(URL);
    const { content, status } = res?.data;
    return { order: content as Order, status, error: null };
  } catch (err) {
    console.log(err);
    return { order: null, status: "fail", error: err };
  }
}
