"use client";

import { REVIEWS_MOCK_DATA } from "@/_mock/_reviews";
import { CustomerReview } from "@/components/customer-review";
import StarRating from "@/components/star-rating";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useTranslations } from "next-intl";
import { useState } from "react";
import ReviewNewEditForm from "./review-new-edit-form";
import { Skeleton } from "@/components/ui/skeleton";

export default function ReviewsSection() {
  const [commentsSize, setCommentsSize] = useState<"collapsed" | "expanded">(
    "collapsed"
  );
  console.log("testttttttttttttttttttttttttttttttt");

  const t = useTranslations();
  return (
    <div className="flex flex-row gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center gap-4 mb-4">
          <strong className=" font-bold text-7xl leading-none">
            {REVIEWS_MOCK_DATA?.overAllRating?.toString()?.replace(".", ",")}
          </strong>
          <div className="flex flex-col">
            <span className="font-semibold text-gray-600 text-lg">
              {t("PRODUCTS_LISTING_PAGE.BASED_ON_REVIEWS", {
                count: REVIEWS_MOCK_DATA?.reviewsCount,
              })}
            </span>
            <StarRating rating={REVIEWS_MOCK_DATA?.overAllRating} disabled />
          </div>
        </div>
        <div className="flex flex-col gap-12">
          <div>
            {Object.keys(REVIEWS_MOCK_DATA?.reviewsFrequency)?.map((rating) => (
              <div key={rating} className="flex flex-row items-center gap-4">
                <p className="font-bold text-xl text-center w-6">{rating}</p>
                <Progress
                  className="w-[25rem]"
                  value={(REVIEWS_MOCK_DATA as any)?.reviewsFrequency?.[rating]}
                  progressProps={{ className: "bg-agzakhana-primary" }}
                />
                <p className="font-bold text-[16px]">{`${
                  (REVIEWS_MOCK_DATA as any)?.reviewsFrequency?.[rating]
                }%`}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-2xl font-semibold">
              {t("PRODUCTS_LISTING_PAGE.WRITE_YOUR_REVIEWS")}
            </p>
            <p className="text-base  font-semibold">
              {t("PRODUCTS_LISTING_PAGE.SHARE_YOUR_REVIEW")}
            </p>
            <Dialog>
              <DialogTrigger className="bg-agzakhana-primary hover:bg-agzakhana-primary py-2 px-4 w-fit font-semibold text-lg rounded-md flex items-center justify-center gap-2 text-white cursor-pointer hover:brightness-90 transition-all duration-300">
                <Icon icon="solar:pen-linear" />
                {t("PRODUCTS_LISTING_PAGE.SUBMIT_REVIEWS")}
              </DialogTrigger>
              <ReviewNewEditForm />
            </Dialog>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <h5 className="text-2xl font-bold">
          {t("PRODUCTS_LISTING_PAGE.CUSTOMER_FEEDBACK")}
        </h5>
        {REVIEWS_MOCK_DATA?.comments?.length === 0 && (
          <div className="w-full flex items-center justify-center min-h-96 flex-col gap-3">
            <Icon
              icon="material-symbols-light:comments-disabled-outline"
              width={200}
              height={200}
              className="text-gray-600"
            />
            <p className="text-xl font-semibold text-gray-600">
              {t("PRODUCTS_LISTING_PAGE.NO_REVIEWS")}
            </p>
          </div>
        )}
        {REVIEWS_MOCK_DATA?.comments?.length > 0 && (
          <ul className="flex flex-col gap-6">
            {REVIEWS_MOCK_DATA?.comments?.slice(0, 2)?.map((review) => (
              <CustomerReview key={review?.id} review={review} />
            ))}
            <Accordion
              type="single"
              collapsible
              className="w-full"
              defaultValue="expanded"
              value={commentsSize}
              onValueChange={(newVal) => setCommentsSize(newVal as any)}
            >
              <AccordionItem value="expanded">
                <AccordionContent className="flex flex-col gap-4 text-balance">
                  {REVIEWS_MOCK_DATA?.comments
                    ?.slice(2, REVIEWS_MOCK_DATA?.comments?.length)
                    ?.map((review) => (
                      <CustomerReview key={review?.id} review={review} />
                    ))}
                </AccordionContent>
                {REVIEWS_MOCK_DATA?.comments?.length > 2 && (
                  <AccordionTrigger className="justify-center font-bold text-xl items-center hover:no-underline cursor-pointer">
                    {commentsSize !== "expanded"
                      ? t("PRODUCTS_LISTING_PAGE.SHOW_MORE_COMMENTS")
                      : t("PRODUCTS_LISTING_PAGE.SHOW_LESS_COMMENTS")}
                  </AccordionTrigger>
                )}
              </AccordionItem>
            </Accordion>
          </ul>
        )}
      </div>
    </div>
  );
}

export function ReviewsSectionSkeleton() {
  return (
    <div className="flex flex-row gap-6">
      <div className="flex flex-col gap-2 w-164">
        <div className="flex flex-row items-center gap-4 mb-4 ">
          <Skeleton className="w-24 h-12" />
          <div className="flex flex-col gap-2">
            <Skeleton className="w-40 h-4" />
            <div className="flex flex-row gap-2 justify-between">
              <Skeleton className="w-5 h-5 rounded-sm" />
              <Skeleton className="w-5 h-5 rounded-sm" />
              <Skeleton className="w-5 h-5 rounded-sm" />
              <Skeleton className="w-5 h-5 rounded-sm" />
              <Skeleton className="w-5 h-5 rounded-sm" />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-2">
            {Object.keys(REVIEWS_MOCK_DATA?.reviewsFrequency)?.map((rating) => (
              <div key={rating} className="flex flex-row items-center gap-4">
                <Skeleton className="w-3 h-3 rounded-sm" />
                <Skeleton className="w-full h-3" />
                <Skeleton className="w-6  h-6  aspect-square" />
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <Skeleton className="w-36 h-8" />
            <div className="flex flex-col gap-2">
              <Skeleton className="w-full h-3" />
              <Skeleton className="w-5/6 h-3" />
            </div>
            <Skeleton className="w-40 h-12" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <Skeleton className="w-36 h-6" />
        <ul className="flex flex-col gap-6">
          <li className="border-gray-300 border-[1px] rounded-md py-6 px-4">
            <div className="flex flex-col gap-4">
              <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-2">
                  <Skeleton className="w-16 h-16 rounded-full" />
                  <div className="flex flex-col justify-center gap-1">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-4 w-36" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-4/5" />
                <Skeleton className="h-3 w-4/6" />
              </div>
            </div>
          </li>
          <li className="border-gray-300 border-[1px] rounded-md py-6 px-4">
            <div className="flex flex-col gap-4">
              <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-2">
                  <Skeleton className="w-16 h-16 rounded-full" />
                  <div className="flex flex-col justify-center gap-1">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-4 w-36" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-4/5" />
                <Skeleton className="h-3 w-4/6" />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
