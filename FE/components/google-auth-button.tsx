import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";
import { useCallback } from "react";

export default function GoogleAuthButton() {
  const t = useTranslations();
  const handleLoginWithGoogle = useCallback(async () => {
    window.location.href =
      "http://localhost:8080/api/v1/auth/login-with-google";
  }, []);
  return (
    <Button
      type="button"
      onClick={handleLoginWithGoogle}
      className="border-2 bg-transparent flex flex-row gap-2 text-text-primary text-base font-semibold py-6 border-gray-300"
    >
      <Icon icon="flat-color-icons:google" className="h-8! w-8!" />
      {t("LOGIN.SIGN_IN_WITH_GOOGLE")}
    </Button>
  );
}
