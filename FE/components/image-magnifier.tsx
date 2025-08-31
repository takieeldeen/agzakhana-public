"use client";
import { cn } from "@/lib/utils";
import Image, { ImageProps } from "next/image";
import { ComponentProps, useState } from "react";

type Props = {
  zoomLevel?: number; // 2 = 200% zoom
  containerProps?: ComponentProps<"div">;
} & ImageProps;

export default function ImageMagnifier({
  zoomLevel = 2,
  containerProps,
  ...imageProps
}: Props) {
  const [[x, y], setXY] = useState([50, 50]); // default center
  const [showMagnifier, setShowMagnifier] = useState(false);

  return (
    <div
      {...containerProps}
      className={cn(
        "relative h-96 w-full border border-gray-300 rounded-md overflow-hidden cursor-zoom-in",
        containerProps?.className
      )}
      onMouseEnter={() => setShowMagnifier(true)}
      onMouseLeave={() => setShowMagnifier(false)}
      onMouseMove={(e) => {
        const { left, top, width, height } =
          e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setXY([x, y]);
      }}
    >
      <Image
        {...imageProps}
        fill
        sizes="100%"
        alt={imageProps.alt ?? "-"}
        className={cn("object-contain transition-transform duration-150")}
        style={{
          transformOrigin: `${x}% ${y}%`,
          transform: showMagnifier ? `scale(${zoomLevel})` : "scale(1)",
        }}
      />
    </div>
  );
}
