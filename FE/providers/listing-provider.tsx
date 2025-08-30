"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { createContext, useCallback, useMemo } from "react";

type Props<T> = {
  children: React.ReactNode;
  content: T[];
  results: number;
  status: string;
  error: any;
};

type ListingContextType<T> = {
  content: T[];
  results: number;
  status: string;
  error: any;
  changeFilter: (key: string, value: string | number) => void;
  pushToFilter: (key: string, value: string | number) => void;
  removeFromFilter: (key: string, value: string | number) => void;
  clearFilter: (key: string) => void;
};
export const ListingContext = createContext<ListingContextType<any> | null>(
  null
);
export default function ListingProvider<T>({
  children,
  content,
  results,
  status,
  error,
}: Props<T>) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const changeFilter = useCallback(
    (key: string, value: string | number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(key, value.toString());
      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );
  const clearFilter = useCallback(
    (key: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(key, "");
      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );
  const pushToFilter = useCallback(
    (key: string, value: string | number) => {
      const params = new URLSearchParams(searchParams.toString());
      const existing = params.get(key);
      let newValue = value.toString();
      if (existing && existing !== "")
        newValue = existing + "," + value.toString();
      params.set(key, newValue.toString());
      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );
  const removeFromFilter = useCallback(
    (key: string, value: string | number) => {
      const params = new URLSearchParams(searchParams.toString());
      const newValue =
        params
          .get(key)
          ?.split(",")
          .filter((val) => val !== value.toString())
          .join(",") ?? "";
      if (newValue === "") return clearFilter(key);
      params.set(key, newValue.toString());
      router.push(`?${params.toString()}`);
    },
    [clearFilter, router, searchParams]
  );
  const memoizedContext = useMemo(
    () => ({
      content,
      results,
      status,
      error,
      changeFilter,
      pushToFilter,
      removeFromFilter,
      clearFilter,
    }),
    [
      changeFilter,
      clearFilter,
      content,
      error,
      pushToFilter,
      removeFromFilter,
      results,
      status,
    ]
  );

  return (
    <ListingContext.Provider value={memoizedContext}>
      {children}
    </ListingContext.Provider>
  );
}
