"use client";
import { checkAuth } from "@/api/auth";
import { UserType } from "@/types/users";
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

type Props = {
  children: ReactNode;
};

type AuthState = {
  isAuthenticated: boolean;
  user: UserType | undefined;
  login: (user: UserType) => void;
  logout: () => void;
  userLoading: boolean;
};

export const AuthContext = createContext<AuthState | undefined>(undefined);
export function AuthProvider({ children }: Props) {
  const [userLoading, setUserLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserType | undefined>(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const logout = useCallback(() => {
    setUser(undefined);
    setIsAuthenticated(false);
  }, []);
  const login = useCallback((user: UserType) => {
    setUser(user);
    setIsAuthenticated(true);
  }, []);
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        setUserLoading(true);
        const authData = await checkAuth();
        setUser(authData.user);
        setIsAuthenticated(authData.isAuthenticated);
      } catch (err) {
        setUser(undefined);
        setIsAuthenticated(false);
      } finally {
        setUserLoading(false);
      }
    };
    void checkAuthentication();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, userLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
