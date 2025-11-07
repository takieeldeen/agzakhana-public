"use client";
import { Icon, IconifyIconProps } from "@iconify/react/dist/iconify.js";
import Image, { ImageProps } from "next/image";
import { ReactNode, useState } from "react";

export type FallbackImageProps = {
  slotProps?: {
    fallbackProps?: IconifyIconProps;
  };
  fallback?: ReactNode;
} & ImageProps;
export default function FallbackImage({
  slotProps,
  fallback,
  ...other
}: FallbackImageProps) {
  const [error, setError] = useState<boolean>(false);

  if (error)
    return (
      fallback ?? (
        <Icon
          icon="lets-icons:img"
          {...((slotProps?.fallbackProps as any) ?? {})}
        />
      )
    );
  return (
    <Image
      onError={(error) => {
        if (error) {
          setError(true);
        }
      }}
      {...other}
      alt={other?.alt ?? "--"}
    />
  );
}
