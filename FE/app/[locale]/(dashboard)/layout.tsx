import { Geist, Geist_Mono } from "next/font/google";
import "./globals-dashboard.css";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { AuthProvider } from "@/providers/auth-provider";
import TanstackProvider from "@/providers/tanstack-provider";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/providers/theme-provider";
import DashbaordSidebar from "@/components/dashboard-sidebar/dashboard-sidebar";
import DashboardSidebarProvider from "@/components/dashboard-sidebar/dashboard-sidebar-provider";
import PromptProvider from "@/components/prompt-provider";
import UserBar from "@/components/user-bar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Agzakhana",
//   description: "Find the best health care products.",
// };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return {
    title:
      locale === "ar"
        ? "أجزاخانة | دليلك لمنتجات الرعاية الصحية"
        : "Agzakhana | Your Guide to Health Care Products",
    description:
      locale === "ar"
        ? "ابحث عن أفضل منتجات الرعاية الصحية."
        : "Find the best health care products.",
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      className={locale === "ar" ? "font-cairo" : "font-quicksand"}
      dir={locale === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable}  antialiased bg-slate-50 dark:bg-dark-background h-screen w-screen min-h-screen max-w-auto m-auto text-text-primary!`}
      >
        <NextIntlClientProvider>
          <PromptProvider>
            <DashboardSidebarProvider>
              <AuthProvider>
                <TanstackProvider>
                  <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                    disableTransitionOnChange
                  >
                    <main className="flex flex-row h-full w-full overflow-x-hidden relative overflow-y-hidden">
                      <DashbaordSidebar />
                      <div className="pt-0 w-full h-[calc(100%_-70px)]">
                        <UserBar />
                        <div className=" overflow-y-auto h-full">
                          {children}
                        </div>
                      </div>
                    </main>
                    <Toaster />
                  </ThemeProvider>
                </TanstackProvider>
              </AuthProvider>
            </DashboardSidebarProvider>
          </PromptProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
