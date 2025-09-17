import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";

export default async function NewsLetterView() {
  const t = await getTranslations();
  return (
    <div className="bg-green-200 bg-blend-overlay bg-[linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.2)),url('../../assets/images/hero-pattern.svg')]  w-full h-128 rounded-4xl p-12 flex items-start flex-col justify-center ">
      <h2 className="text-5xl font-bold text-text-primary mb-2 max-w-128">
        {t("HOME_PAGE.TITLE")}
      </h2>
      <span className="text-3xl font-semibold text-gray-600 mb-4">
        {t("HOME_PAGE.SUB_TITLE")}
      </span>
      <form action="#" className="relative">
        <input
          className="bg-white outline-none  py-3 rounded-[9999] w-96 px-4"
          type="email"
          placeholder={t("HOME_PAGE.EMAIL_PLACEHOLDER")}
        />
        <Button className="absolute h-full rounded-full right-0 bg-agzakhana-primary text-lg rtl:left-0 rtl:right-auto">
          {t("HOME_PAGE.SUBSCRIBE")}
        </Button>
      </form>
    </div>
  );
}
