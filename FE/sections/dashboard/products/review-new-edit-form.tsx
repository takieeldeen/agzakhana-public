"use client";
import { useMutateReview } from "@/api/reviews";
import RHFError from "@/components/rhf-error";
import RHFForm from "@/components/rhf-form";
import StarRating from "@/components/star-rating";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

export default function ReviewNewEditForm({
  onClose,
}: {
  onClose: VoidFunction;
}) {
  const t = useTranslations();
  const { createReview } = useMutateReview();
  const { productId }: { productId: string } = useParams();
  const formSchema = z.object({
    rate: z.number().min(1, "Minimum Rate is 1").max(5, "Maximum Rate is 5"),
    comment: z.string().min(1, "Please enter the comment"),
  });
  const defaultValues = {
    rate: 1,
    comment: "",
  };
  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const { watch, setValue, register, reset } = methods;
  const values = watch();

  const onSubmit = useCallback(
    async (data: any) => {
      try {
        await createReview?.mutateAsync?.({
          payload: data,
          productId,
        });
        reset();
        onClose();
      } catch (err) {
        console.log(err);
      }
    },
    [createReview, onClose, productId, reset]
  );
  return (
    <DialogContent>
      <h3 className="text-2xl font-bold">
        {t("PRODUCTS_LISTING_PAGE.RATE_AND_REVIEW")}
      </h3>
      <Separator />
      <RHFForm
        onSubmit={onSubmit}
        methods={methods}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-gray-600">
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
          <p className="font-semibold text-gray-600">
            {t("PRODUCTS_LISTING_PAGE.REVIEW_FIELD")}
          </p>
          <textarea
            className="border-[1px] border-gray-200 h-72 rounded-md p-2"
            {...register("comment")}
          />
        </div>
        <div className="flex flex-row gap-2 ">
          <DialogClose className="w-[calc(50%-0.25rem)] rounded-md cursor-pointer text-lg bg-transparent text-agzakhana-primary border-2 border-agzakhana-primary">
            {t("PRODUCTS_LISTING_PAGE.CANCEL")}
          </DialogClose>
          <Button className="w-[calc(50%-0.25rem)] py-5 text-lg bg-agzakhana-primary border-2 border-agzakhana-primary">
            {t("PRODUCTS_LISTING_PAGE.POST")}
          </Button>
        </div>
      </RHFForm>
    </DialogContent>
  );
}
