"use client";
import { Drawer } from "./ui/drawer";
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
      open={showModal}
      direction="right"
      onClose={handleClose}
      onAnimationEnd={handleRouting}
    >
      {children}
    </Drawer>
  );
}
