"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function ModalGuard({
  paramName,
  whiteList,
  children,
}: {
  paramName: string;
  whiteList: string[];
  children: ReactNode;
}) {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const paramVal = Array.isArray(params[paramName])
    ? params[paramName][0]
    : (params[paramName] as string | undefined);

  const HIDE_MODAL = !!paramVal && whiteList.includes(paramVal);

  // If we should hide the modal, navigate to the non-modal route.
  useEffect(() => {
    if (!HIDE_MODAL) return;
    // redirect("");
    // construct the full-page path you want. adjust if your route differs.
    // e.g. if this guard sits in app/@modal/data/[id], navigate to /data/<id>
    // window.location.href = pathname;

    // replace so we don't add a history entry (you can use push if you prefer)
  }, [HIDE_MODAL, paramVal, pathname, router]);

  // don't render modal while we're redirecting
  //   if (HIDE_MODAL) return null;

  return <>{children}</>;
}
