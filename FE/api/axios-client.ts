import Axios from "axios";
const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});
axios.interceptors.response.use(
  (res: any) => res,
  (error: any) => Promise.reject(error)
);

axios.interceptors.request.use(async (req: any) => req);

export default axios;
