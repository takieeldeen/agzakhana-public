import axios, { endpoints } from "./axios";
import { UserType } from "@/types/users";
import { AxiosResponse } from "axios";

export async function login(payload: any) {
  const URL = endpoints.auth.login;
  const res = (await axios.post(URL, payload)) as AxiosResponse<{
    status: string;
    user: UserType;
  }>;
  return res;
}

export async function loginWithGoogle() {
  const URL = endpoints.auth.loginWithGoogle;
  await axios.get(URL);
}

export async function logout() {
  const URL = endpoints.auth.logout;
  await axios.post(URL);
}

export async function checkAuth() {
  const URL = endpoints.auth.checkAuth;
  const res = await axios.post(URL);
  return res?.data;
}

export async function register(payload: any) {
  const URL = endpoints.auth.register;
  await axios.post(URL, payload);
}

export async function forgetPassword(payload: any) {
  const URL = endpoints.auth.forgetPassword;
  return await axios.post(URL, payload);
}

export async function checkResetToken(payload: any) {
  try {
    if (!payload?.token) return { content: null, status: "fail", error: null };
    const URL = endpoints.auth.checkResetToken;
    const res = await axios.post(URL, payload);
    const { content, status } = res?.data;
    return { content: content as UserType, status, error: null };
  } catch (err) {
    return { content: null, status: "fail", error: err };
  }
}

export async function resetPasword(payload: {
  token: string;
  password: string;
  passwordConfirmation: string;
}) {
  const URL = endpoints.auth.resetPassword;
  return await axios.post(URL, payload);
}
