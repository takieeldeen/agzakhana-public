import { createContext } from "react";

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
};
const ListingContext = createContext<ListingContextType<any> | null>(null);
export default function ListingProvider<T>({
  children,
  content,
  results,
  status,
  error,
}: Props<T>) {
  return (
    <ListingContext.Provider value={{ content, results, status, error }}>
      {children}
    </ListingContext.Provider>
  );
}
