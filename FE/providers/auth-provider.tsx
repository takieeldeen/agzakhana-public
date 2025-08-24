"use client";
import { useCheckAuth } from "@/api/auth";
import { UserType } from "@/types/users";
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

type Props = {
  children: ReactNode;
};

type AuthState = {
  isAuthenticated: boolean;
  user: UserType | undefined;
};

export const AuthContext = createContext<AuthState | undefined>(undefined);
export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<UserType | undefined>(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const value = useCheckAuth();
  const logOut = useCallback(() => {
    setUser(undefined);
    setIsAuthenticated(false);
  }, []);
  useEffect(() => {
    setUser(value?.user);
    setIsAuthenticated(value?.isAuthenticated);
  }, []);
  return (
    <AuthContext.Provider value={{ user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
