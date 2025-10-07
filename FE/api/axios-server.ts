"use server";
import Axios from "axios";
import { cookies } from "next/headers";
const axiosServer = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

axiosServer.interceptors.response.use(
  (res: any) => res,
  (error: any) => Promise.reject(error?.response?.data ?? error)
);

axiosServer.interceptors.request.use(async (req: any) => {
  const userCookies = await cookies();
  const locale = userCookies.get("NEXT_LOCALE")?.value;
  const token = userCookies.get("token")?.value;
  req.headers.Cookie = `token=${token}`;
  if (locale) {
    req.headers["Accept-Language"] = locale;
  }
  return req;
});

export default axiosServer;
