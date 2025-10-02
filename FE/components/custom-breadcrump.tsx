"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { ComponentProps } from "react";
type Props = ComponentProps<"nav">;
export default function CustomBreadCrump({ ...props }: Props) {
  const pathname = usePathname();
  const t = useTranslations("BREADCRUMBS");
  const paths = pathname
    .split("/")
    .splice(1, pathname.split("/").length - 2)
    ?.map((path) => ({
      label: t(path),
      href: path === "Home" ? "/" : `/${path}`,
    }));
  paths[0] = {
    label: t("Home"),
    href: "/",
  };
  return (
    <Breadcrumb {...props}>
      <BreadcrumbList>
        {paths.map((path, i) => (
          <>
            <BreadcrumbItem className="text-gray-500 text-[15px] capitalize font-semibold dark:text-gray-300">
              <BreadcrumbLink href={path?.href}>{path?.label}</BreadcrumbLink>
            </BreadcrumbItem>
            {i < paths.length - 1 && <BreadcrumbSeparator />}
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
