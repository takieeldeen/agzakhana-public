import { ListView } from "@/sections/dashboard/cart/views";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agzakhana | My Cart",
  description: "My Cart Page",
};

export default function DealsPage() {
  return <ListView />;
}
