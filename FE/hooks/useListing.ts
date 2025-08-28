import { ListingContext } from "@/providers/listing-provider";
import { useContext } from "react";

export default function useListing() {
  const data = useContext(ListingContext);
  if (!data || data === null)
    throw Error("Can't use useListing outside Listing Provider");
  return { ...data };
}
