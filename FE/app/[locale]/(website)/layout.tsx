import { Geist, Geist_Mono } from "next/font/google";
import "./globals-website.css";
import Header from "@/components/header";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { AuthProvider } from "@/providers/auth-provider";
import TanstackProvider from "@/providers/tanstack-provider";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/providers/theme-provider";
import AppSidebarProvider from "@/components/app-sidebar/sidebar-provider";
import { AppSidebar } from "@/components/app-sidebar/app-sidebar";

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
        className={`${geistSans.variable} ${geistMono.variable}  antialiased bg-gray-100 dark:bg-agzakhana-background-dark min-h-screen max-w-[2180px] m-auto text-text-primary!`}
      >
        <AuthProvider>
          <NextIntlClientProvider>
            <TanstackProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="light"
                enableSystem
                disableTransitionOnChange
              >
                <AppSidebarProvider>
                  <AppSidebar />
                  <Header />
                  <Navbar />
                  <main className="md:px-8 px-1">
                    <div className="flex flex-row p-2">
                      {/* <FiltersToolbar /> */}
                      <div className="flex flex-col w-full">{children}</div>
                    </div>
                  </main>
                  <Toaster />
                  <Footer />
                </AppSidebarProvider>
              </ThemeProvider>
            </TanstackProvider>
          </NextIntlClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
