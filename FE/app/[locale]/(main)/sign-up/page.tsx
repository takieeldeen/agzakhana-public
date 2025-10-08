import { SignupView } from "@/sections/auth/views";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return {
    title: locale === "ar" ? "أجزاخانة | إنشاء حساب مجاني" : "Agzakhana | ",
    description:
      locale === "ar"
        ? "أنشئ حسابك المجاني على أجزاخانة."
        : "Create your free account on Agzakhana",
  };
}

export default function SignupPage() {
  return <SignupView />;
}
