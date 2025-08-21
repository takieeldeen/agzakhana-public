import { Separator } from "@/components/ui/separator";
import { getTranslations } from "next-intl/server";
import SignupForm from "../signup-form";

export default async function SignupView() {
  const t = await getTranslations("");
  return (
    <div className="flex items-center justify-center py-32 flex-col gap-6">
      <div className="flex flex-col items-center">
        <h2 className="font-bold text-4xl">{t("SIGNUP.PAGE_TITLE")}</h2>
        <p className="mb-6">{t("SIGNUP.PAGE_SUBTITLE")}</p>
        <Separator />
      </div>
      <SignupForm />
    </div>
  );
}
