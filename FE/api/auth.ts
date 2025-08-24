import { useEffect, useMemo, useState } from "react";
import axios, { endpoints } from "./axios";
import { UserType } from "@/types/users";

export async function login(payload: any) {
  const URL = endpoints.auth.login;
  await axios.post(URL, payload);
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

export function useCheckAuth() {
  const [res, setRes] = useState<{
    user?: UserType;
    isAuthenticated: boolean;
  }>({ user: undefined, isAuthenticated: false });

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        const auth = await checkAuth();
        setRes(auth);
      } catch (err) {
        setRes({ user: undefined, isAuthenticated: false });
      }
    };

    fetchAuth();
  }, []);

  const memoizedValue = useMemo(
    () => ({
      user: res.user,
      isAuthenticated: res.isAuthenticated,
    }),
    [res]
  );
  console.log(memoizedValue, res);
  return memoizedValue;
}
