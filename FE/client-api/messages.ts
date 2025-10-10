import axios, { endpoints } from "./axios";

export async function sendMessage(payload: any) {
  const URL = endpoints.messages.send;
  await axios.post(URL, payload);
}
