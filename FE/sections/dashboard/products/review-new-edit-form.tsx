"use client";
import { useMutateProductReviews } from "@/client-api/reviews";
import RHFError from "@/components/rhf-error";
import RHFForm from "@/components/rhf-form";
import RHFTextarea from "@/components/rhf-textarea";
import StarRating from "@/components/star-rating";
import { LoadingButton } from "@/components/ui/button";
import { DialogClose, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Review } from "@/types/reviews";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

export default function ReviewNewEditForm({
  onClose,
  review,
}: {
  onClose: VoidFunction;
  review?: Review;
}) {
  const t = useTranslations();
  const { createReview, editReview } = useMutateProductReviews();
  const { productId }: { productId: string } = useParams();
  const formSchema = z.object({
    rate: z
      .number()
      .min(
        1,
        t("FORM_VALIDATIONS.MIN_VAL", {
          field: t("PRODUCTS_LISTING_PAGE.RATING"),
          min: 1,
        })
      )
      .max(
        5,
        t("FORM_VALIDATIONS.MAX_VAL", {
          field: t("PRODUCTS_LISTING_PAGE.RATING"),
          max: 5,
        })
      ),
    comment: z.string().min(
      1,
      t("FORM_VALIDATIONS.REQUIRED_FIELD", {
        field: t("PRODUCTS_LISTING_PAGE.REVIEW_FIELD"),
      })
    ),
  });
  const defaultValues = useMemo(
    () => ({
      rate: review?.rate ?? 1,
      comment: review?.comment ?? "",
    }),
    [review?.comment, review?.rate]
  );
  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const {
    watch,
    setValue,
    reset,
    formState: { isSubmitting },
  } = methods;
  const values = watch();

  const onSubmit = useCallback(
    async (data: any) => {
      try {
        if (!review) {
          await createReview?.mutateAsync?.({
            payload: data,
            productId,
          });
        } else {
          await editReview?.mutateAsync?.({
            productId,
            reviewId: review?._id,
            payload: data,
          });
        }
        reset();
        onClose();
      } catch (err) {
        console.log(err);
      }
    },
    [createReview, editReview, onClose, productId, reset, review]
  );
  useEffect(() => {
    return () => {
      reset(defaultValues);
    };
  }, [defaultValues, reset]);
  return (
    <DialogContent className="bg-agzakhana-background-dark">
      <h3 className="text-2xl font-bold dark:text-gray-200">
        {t("PRODUCTS_LISTING_PAGE.RATE_AND_REVIEW")}
      </h3>
      <Separator />
      <RHFForm
        onSubmit={onSubmit}
        methods={methods}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-gray-600 dark:text-gray-300">
            {t("PRODUCTS_LISTING_PAGE.RATING")}
          </p>
          <div className="flex items-start justify-start flex-col">
            <StarRating
              rating={values?.rate}
              onChange={(newVal) =>
                setValue("rate", newVal, { shouldDirty: true })
              }
            />
            <RHFError name="rate" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-gray-600 dark:text-gray-300">
            {t("PRODUCTS_LISTING_PAGE.REVIEW_FIELD")}
          </p>

          <RHFTextarea name="comment" className="rounded-md h-48" />
        </div>
        <div className="flex flex-row gap-2 ">
          <DialogClose
            disabled={isSubmitting}
            className={cn(
              "w-[calc(50%-0.25rem)] rounded-md cursor-pointer text-lg bg-transparent text-agzakhana-primary border-2 border-agzakhana-primary",
              isSubmitting && "cursor-not-allowed"
            )}
          >
            {t("PRODUCTS_LISTING_PAGE.CANCEL")}
          </DialogClose>
          <LoadingButton
            loading={isSubmitting}
            className="w-[calc(50%-0.25rem)] py-5 text-lg bg-agzakhana-primary border-2 border-agzakhana-primary dark:text-gray-100"
          >
            {!!review
              ? t("PRODUCTS_LISTING_PAGE.EDIT_REVIEW")
              : t("PRODUCTS_LISTING_PAGE.POST")}
          </LoadingButton>
        </div>
      </RHFForm>
    </DialogContent>
  );
}
