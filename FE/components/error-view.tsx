import { getTranslations } from "next-intl/server";
import Link from "next/link";

type ErrorViewProps = {
  title?: string;
  subtitle?: string;
  actionLink?: string;
  actionTitle?: string;
};
export default async function ErrorView({
  title,
  subtitle,
  actionLink,
  actionTitle,
}: ErrorViewProps) {
  const t = await getTranslations();
  return (
    <div className="flex items-center justify-center relative flex-col">
      <p className="font-extrabold md:text-[12rem] text-9xl text-agzakhana-primary">
        {t("FORGOT_PASSWORD.OOPS")}
      </p>
      <div className="relative ">
        {/* <Image
          src={LogoMini}
          alt="Agzakhana Logo"
          height={200}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        /> */}
        <div className="md:w-[50rem] w-full min-h-36 backdrop-blur-sm rounded-md bg-black/5 dark:bg-black/15  flex items-center justify-center px-8 py-10 shadow-md flex-col gap-8 ">
          <div className="flex flex-col gap-3 items-center">
            <h3 className="text-2xl font-bold text-center whitespace-nowrap dark:text-gray-200">
              {title ?? t("COMMON.GENERIC_ERROR")}
            </h3>
            {!!subtitle && (
              <p className="text-lg font-semibold text-center text-gray-600 dark:text-gray-400">
                {t("FORGOT_PASSWORD.TOKEN_ERROR_SUBTITLE")}
              </p>
            )}
          </div>
          {!!actionLink && (
            <Link
              href={actionLink}
              className="bg-agzakhana-primary rounded-sm px-4 py-2 text-white text-base md:text-lg font-semibold hover:brightness-90 transition-all w-full md:w-fit text-center"
            >
              {actionTitle ?? "--"}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
