"use client";
import { useLocale } from "next-intl";
import { Drawer, DrawerContent } from "./ui/drawer";
import { useRouter } from "next/navigation";
import { ReactNode, useCallback, useState } from "react";

type InterceptingDrawerProps = {
  url?: string;
  children: ReactNode;
};
export default function InterceptingDrawer({
  url,
  children,
}: InterceptingDrawerProps) {
  const [showModal, setShowModal] = useState<boolean>(true);
  const router = useRouter();
  const locale = useLocale();
  const handleClose = useCallback(() => {
    setShowModal(false);
  }, []);
  const handleRouting = useCallback(() => {
    if (url) {
      router.push(url);
    } else {
      router.back();
    }
  }, [router, url]);
  return (
    <Drawer
      modal={true}
      open={showModal}
      direction={locale === "ar" ? "right" : "left"}
      onClose={handleClose}
      onAnimationEnd={handleRouting}
      onDrag={() => {
        alert("test");
      }}
      dismissible={false}
    >
      <DrawerContent
        onInteractOutside={(event) => {
          // Check if the click target is the overlay
          const target = event.target as HTMLElement;
          console.log(target);
          // You can add a class or data attribute to your overlay, e.g., "drawer-overlay"
          if (target.closest('[data-slot="drawer-overlay"]')) {
            handleClose();
            setTimeout(() => {
              handleRouting();
            }, 300);
          }
          // Otherwise, do nothing (clicked inside content, button, or portal)
        }}
        className="data-[vaul-drawer-direction=left]:sm:max-w-[1200px] data-[vaul-drawer-direction=right]:sm:max-w-[1200px] border-l-0! border-r-0! will-change-auto [transform:none]"
      >
        {children}
      </DrawerContent>
    </Drawer>
  );
}
