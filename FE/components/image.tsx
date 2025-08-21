"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image, { ImageProps } from "next/image";
import { useState } from "react";

type FallbackImageProps = { fallbackIcon?: string } & ImageProps;
export default function FallbackImage({
  fallbackIcon = "ph:pill-light",
  ...props
}: FallbackImageProps) {
  const [imageError, setImageError] = useState<boolean>(false);
  if (imageError)
    return (
      <Icon
        icon={fallbackIcon}
        width={130}
        height={130}
        className="color-[#BCE3C9]"
      />
    );
  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image {...props} onError={() => setImageError(true)} />;
}
