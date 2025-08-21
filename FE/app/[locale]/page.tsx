import { dummyPromise } from "@/api/api";
import { ListView } from "@/sections/dashboard/home/views";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agzakahana | Home Page",
  description: "Find Any Medicine you're looking for.",
};

export default async function Home() {
  const test = await dummyPromise();
  console.log(test);
  return <ListView />;
}
