"use client";

import { Review } from "@/types/reviews";
import { useParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import StarRating from "./star-rating";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useMutateReview } from "@/api/reviews";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useTranslations } from "next-intl";
import { Separator } from "./ui/separator";
import { useState } from "react";
import { Dialog, DialogTrigger } from "./ui/dialog";
import ReviewNewEditForm from "@/sections/dashboard/products/review-new-edit-form";

export function CustomerReview({ review }: { review: Review }) {
  // State Management //////////////////////////////
  const [showCreationModal, setShowCreationModal] = useState<boolean>(false);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const { locale, productId }: { locale: "ar" | "en"; productId: string } =
    useParams();
  const { deleteReview } = useMutateReview();
  const t = useTranslations();
  return (
    <li className="border-gray-300 border-[1px] rounded-md py-6 px-4 relative">
      {review.editable && (
        <Popover open={showOptions} onOpenChange={setShowOptions}>
          <PopoverTrigger className=" text-black text-xl aspect-square p-2 absolute top-2 rtl:left-2 ltr:right-2 cursor-pointer bg-transparent hover:bg-gray-300 transition-all duration-300 rounded-md">
            <Icon icon="charm:menu-kebab" className="w-4! h-4!" />
          </PopoverTrigger>
          <PopoverContent className="p-0! min-w-fit w-fit text-gray-600">
            <ul>
              <li className="">
                <Dialog
                  open={showCreationModal}
                  onOpenChange={(newVal) => {
                    // if (newVal) setShowOptions(false);

                    setShowCreationModal(newVal);
                  }}
                >
                  <DialogTrigger className="flex flex-row gap-2 items-center cursor-pointer hover:bg-gray-100 px-4 py-4 transition-all duration-300">
                    <Icon
                      // icon="material-symbols:delete-outline"
                      icon="fluent:edit-20-regular"
                      className="w-6! h-6!"
                    />
                    <p className="font-semibold">
                      {t("PRODUCTS_LISTING_PAGE.EDIT_REVIEW")}
                    </p>
                  </DialogTrigger>
                  <ReviewNewEditForm
                    onClose={() => setShowCreationModal(false)}
                    review={review}
                  />
                </Dialog>
              </li>
              <Separator />

              <li
                onClick={() => {
                  deleteReview.mutateAsync({
                    reviewId: review?._id,
                    productId,
                  });
                  setShowOptions(false);
                }}
                className="flex flex-row gap-2 items-center cursor-pointer hover:bg-gray-100 px-4 py-4 transition-all duration-300"
              >
                <Icon
                  icon="material-symbols:delete-outline"
                  className="w-6! h-6!"
                />
                <p className="font-semibold">
                  {t("PRODUCTS_LISTING_PAGE.DELETE_REVIEW")}
                </p>
              </li>
            </ul>
          </PopoverContent>
        </Popover>
      )}
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
