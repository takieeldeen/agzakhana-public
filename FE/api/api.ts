import { AxiosRequestConfig } from "axios";
import axios from "./axios";

export async function dummyPromise() {
  const test = new Promise((res) => {
    setTimeout(() => res({ myData: "s" }), 3000);
  });
  return test;
}

export function getFetcher<T>(url: string | [string, AxiosRequestConfig]) {
  return async () => {
    const URL = Array.isArray(url) ? url?.[0] : url;
    const config = Array.isArray(url) ? url?.[1] : undefined;
    const response = await axios.get(URL, config);
    return response.data as T; // usually we want only `data`
  };
}

export type APIResponse<T> = {
  content: T;
  status: "success" | "fail";
  results: number;
};
