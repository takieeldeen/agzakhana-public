// import { Logo, LogoImage, LogoText } from "@/components/shadcnblocks/logo";

import { getTranslations } from "next-intl/server";
import Logo from "./logo";

export default async function Footer() {
  const t = await getTranslations();
  const footerData = [
    {
      title: t("FOOTER.DAILY_CARE"),
      links: [
        { text: t("FOOTER.HAIR_CARE"), url: "#" },
        { text: t("FOOTER.SKIN_CARE"), url: "#" },
        { text: t("FOOTER.PERSONAL_CARE"), url: "#" },
      ],
    },
    {
      title: t("FOOTER.FIRST_AID_PRODUCTS"),
      links: [
        { text: t("FOOTER.INJURY_CARE_PRODUCTS"), url: "#" },
        { text: t("FOOTER.FIRST_AIDS"), url: "#" },
      ],
    },
    {
      title: t("FOOTER.LONG_TERM_PRODUCTS"),
      links: [
        { text: t("FOOTER.DIGESTION_MEDICINES"), url: "#" },
        { text: t("FOOTER.DIABETES_PRODUCTS"), url: "#" },
        { text: t("FOOTER.BLOOD_PRESSURE_PRODUCTS"), url: "#" },
        { text: t("FOOTER.HEART_PRODUCTS"), url: "#" },
        { text: t("FOOTER.VITAMINS_AND_SUPPLEMENTS"), url: "#" },
      ],
    },
  ];
  return (
    <footer className="py-16 px-16">
      <div className=" w-full">
        <footer>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-8 lg:grid-cols-6">
            <div className="col-span-2 mb-8 lg:mb-0 md:block flex items-center justify-center">
              <Logo />
            </div>
            {footerData.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold dark:text-gray-300">
                  {section.title}
                </h3>
                <ul className="text-muted-foreground space-y-4">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="hover:text-primary font-medium"
                    >
                      <a href={link.url}>{link.text}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-muted-foreground mt-24 flex flex-col justify-between gap-4 border-t pt-8 text-sm font-medium md:flex-row md:items-center">
            <p>{t("FOOTER.ALL_RIGHT_RESERVED")}</p>
          </div>
        </footer>
      </div>
    </footer>
  );
}
