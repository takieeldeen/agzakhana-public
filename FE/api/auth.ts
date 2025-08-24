import { useEffect, useMemo, useState } from "react";
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
