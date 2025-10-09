import * as zod from "zod";
import RHFForm from "@/components/rhf-form";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "@/components/ui/drawer";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import RHFTextfield from "@/components/rhf-textfield";
import { UserType } from "@/types/users";
import RHFImagePicker from "@/components/rhf-imagePicker";
import { RHFDatePicker } from "@/components/rhf-datePicker";
import RHFRadioGroup from "@/components/rhf-radiogroup";
import { Button, LoadingButton } from "@/components/ui/button";

type ProfileUpdateFormProps = {
  onOpenChange: (open: boolean) => void;
  open: boolean;
  currentUser: UserType | undefined;
};
export default function ProfileUpdateForm({
  onOpenChange,
  open,
  currentUser,
}: ProfileUpdateFormProps) {
  const t = useTranslations();
  const formSchema = zod.object({
    email: zod.email("Please Enter a valid email"),
    name: zod.string(),
    birthDate: zod.date(),
    phoneNumber: zod.string(),
    address: zod.string(),
    gender: zod.enum(["MALE", "FEMALE"]),
  });
  const defaultValues = {
    email: currentUser?.email ?? "",
    name: currentUser?.name ?? "",
    birthDate: new Date(),
    phoneNumber: currentUser?.phoneNumber ?? "",
    address: "",
    gender: "MALE" as const,
  };

  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const {
    watch,
    formState: { errors, isSubmitting },
  } = methods;
  const values = watch();
  console.log(errors, values);
  const onSubmit = useCallback((data: any) => {
    console.log(data);
  }, []);
  return (
    <Drawer direction="left" onOpenChange={onOpenChange} open={open}>
      <DrawerContent className="dark:bg-card-background-dark">
        <DrawerHeader>
          <h3 className="text-left text-2xl font-bold rtl:text-right dark:text-gray-200">
            Edit Personal Information
          </h3>
        </DrawerHeader>

        <RHFForm onSubmit={onSubmit} methods={methods}>
          <div className="px-4">
            <RHFImagePicker name="imageUrl" label="Profile Image" />
            <RHFTextfield
              name="email"
              label={t("LOGIN.EMAIL")}
              placeholder={t("LOGIN.EMAIL")}
              inputProps={{
                className: "h-12 font-semibold text-base ",
                type: "email",
                disabled: true,
              }}
              labelProps={{
                className: "text-base font-normal md:font-semibold",
              }}
            />
            <RHFTextfield
              name="name"
              label="Name"
              placeholder="Name"
              inputProps={{
                className: "h-12 font-semibold text-base ",
              }}
              labelProps={{
                className: "text-base font-normal md:font-semibold",
              }}
            />
            <RHFDatePicker
              name="birthDate"
              label="Birth Date"
              placeholder="Birth Date"
            />
            <RHFTextfield
              name="phoneNumber"
              label="Phone Number"
              placeholder="Phone Number"
              inputProps={{
                className: "h-12 font-semibold text-base ",
              }}
              labelProps={{
                className: "text-base font-normal md:font-semibold",
              }}
            />
            <RHFTextfield
              name="address"
              label="Address"
              placeholder="Address"
              inputProps={{
                className: "h-12 font-semibold text-base ",
              }}
              labelProps={{
                className: "text-base font-normal md:font-semibold",
              }}
            />
            <RHFRadioGroup
              label="Gender"
              name="gender"
              options={[
                { label: "Male", value: "MALE" },
                { label: "Female", value: "FEMALE" },
              ]}
            />
          </div>
          <DrawerFooter className="">
            <div className="flex flex-row items-center justify-between">
              <Button
                className="w-[49%] h-12 border-agzakhana-primary border-2"
                variant={"outline"}
              >
                Cancel
              </Button>
              <LoadingButton
                type="submit"
                loading={isSubmitting}
                className="w-[49%] h-12 bg-agzakhana-primary text-white"
              >
                Update
              </LoadingButton>
            </div>
          </DrawerFooter>
        </RHFForm>
      </DrawerContent>
    </Drawer>
  );
}
