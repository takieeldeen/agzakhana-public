import { useTranslations } from "next-intl";
import { useMemo } from "react";
export type NavPath = {
  path: string;
  label: string;
  icon: string;
  children?: {
    path: string;
    label: string;
    icon: string;
  }[];
};
export const useGetNavData = () => {
  const t = useTranslations();
  const navData: NavPath[] = useMemo(
    () => [
      {
        path: "/",
        label: t("NAV_BAR.HOME"),
        icon: "lucide-lab:home",
      },
      {
        path: "/products",
        label: t("NAV_BAR.BROWSE_ALL_CATEGORIES"),
        icon: "hugeicons:dashboard-square-01",
      },
      {
        path: "/deals",
        label: t("NAV_BAR.DEALS"),
        icon: "mingcute:fire-line",
      },
      {
        path: "/products",
        label: t("NAV_BAR.CATEGORIES"),
        icon: "cuida:medicine-outline",
        children: [
          {
            path: "/products?category=68ae00041d5513897936eaa2",
            label: t("FOOTER.SKIN_CARE"),
            icon: "streamline-ultimate:hair-skin",
          },
          {
            path: "/products?category=68ae00041d5513897936eaa1",
            label: t("FOOTER.HAIR_CARE"),
            icon: "mingcute:hair-2-line",
          },
          {
            path: "/products?category=68ae00041d5513897936eaa4",
            label: t("FOOTER.VITAMINS_AND_SUPPLEMENTS"),
            icon: "solar:pills-linear",
          },
        ],
      },
      {
        path: "/contact-us",
        label: t("NAV_BAR.CONTACT_US"),
        icon: "solar:phone-linear",
      },
    ],
    [t]
  );
  return navData;
};
