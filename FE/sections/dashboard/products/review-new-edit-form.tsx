"use client";
import StarRating from "@/components/star-rating";
import { Button } from "@/components/ui/button";
import { DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";

export default function ReviewNewEditForm() {
  const t = useTranslations();
  return (
    <DialogContent>
      <h3 className="text-2xl font-bold">
        {t("PRODUCTS_LISTING_PAGE.RATE_AND_REVIEW")}
      </h3>
      <Separator />
      <form action="" className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-gray-600">
            {t("PRODUCTS_LISTING_PAGE.RATING")}
          </p>
          <div className="flex items-center justify-start">
            <StarRating />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-gray-600">
            {t("PRODUCTS_LISTING_PAGE.REVIEW_FIELD")}
          </p>
          <textarea className="border-[1px] border-gray-200 h-72 rounded-md p-2" />
        </div>
        <div className="flex flex-row gap-2 ">
          <Button className="w-[calc(50%-0.25rem)] py-5 text-lg bg-transparent text-agzakhana-primary border-2 border-agzakhana-primary">
            {t("PRODUCTS_LISTING_PAGE.CANCEL")}
          </Button>
          <Button className="w-[calc(50%-0.25rem)] py-5 text-lg bg-agzakhana-primary border-2 border-agzakhana-primary">
            {t("PRODUCTS_LISTING_PAGE.POST")}
          </Button>
        </div>
      </form>
    </DialogContent>
  );
}
