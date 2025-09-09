"use client";

import { Review } from "@/types/reviews";
import { useParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import StarRating from "./star-rating";

export function CustomerReview({ review }: { review: Review }) {
  const { locale } = useParams();
  return (
    <li className="border-gray-300 border-[1px] rounded-md py-6 px-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-2">
            <Avatar className="h-14 w-14">
              <AvatarImage src={review?.user?.imageUrl} alt="@shadcn" />
              <AvatarFallback className="bg-gray-300 font-semibold text-xl">
                {review?.user?.name
                  ?.split(" ")
                  ?.slice(0, 2)
                  ?.map((el) => el[0])
                  ?.join(" ") ?? review?.user?.email?.[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-center gap-1">
              <p className="font-bold text-lg leading-none">
                {review?.user?.name ?? review?.user?.email}
              </p>
              <p className="font-semibold leading-none text-gray-500 ">
                {new Date(review?.createdAt)?.toLocaleDateString(
                  locale === "ar" ? "ar-EG" : "en-US",
                  {
                    month: "long",
                    day: "2-digit",
                    year: "numeric",
                  }
                )}
              </p>
            </div>
          </div>
          <StarRating rating={review?.rate} disabled />
        </div>

        <p className="font-semibold text-lg">{review?.comment}</p>
      </div>
    </li>
  );
}
