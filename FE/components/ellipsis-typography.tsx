"use client";
import { useRef, useState, useEffect, ComponentProps } from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export type EllipsisTypographyProps = ComponentProps<"p"> & {
  maxLines?: number;
  tooltipProps?: React.ComponentProps<typeof TooltipPrimitive.Root>;
};
/**
 * Component That handles long text
 * @param maxLines Determine maximum number of lines to show
 * @param param0
 */
export default function EllipsisTypography({
  maxLines = 1,
  //   tooltipProps,
  style,
  ...other
}: EllipsisTypographyProps) {
  const tempRef = useRef<HTMLDivElement | null>(null);
  const [isTrimmed, setIsTrimmed] = useState(false);

  useEffect(() => {
    if (!tempRef.current) return;

    const { actualHeight, contentHeight } = measureElementSize(tempRef.current);
    setIsTrimmed(contentHeight > actualHeight);
  }, [other.children]);

  return (
    <>
      {!isTrimmed && (
        <p
          {...other}
          ref={tempRef}
          style={{
            display: "-webkit-box",
            boxOrient: "vertical",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            lineClamp: maxLines,
            WebkitLineClamp: maxLines,
            textOverflow: "ellipsis",
            wordBreak: "break-word",
            width: "100%",
            ...style,
          }}
        />
      )}
      {isTrimmed && (
        <>
          <Tooltip>
            <TooltipTrigger asChild>
              <p
                {...other}
                ref={tempRef}
                style={{
                  display: "-webkit-box",
                  boxOrient: "vertical",
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  lineClamp: maxLines,
                  WebkitLineClamp: maxLines,
                  textOverflow: "ellipsis",
                  wordBreak: "break-word",
                  width: "100%",
                  ...style,
                }}
              />
            </TooltipTrigger>
            <TooltipContent>{other?.children}</TooltipContent>
          </Tooltip>
        </>
      )}
    </>
  );
}

function measureElementSize(el: HTMLElement) {
  if (!el) {
    return {
      actualHeight: 0,
      contentHeight: 0,
      actualWidth: 0,
      contentWidth: 0,
    };
  }

  // Use bounding rects for precise visible measurements
  const elRect = el.getBoundingClientRect();
  const actualHeight = elRect.height;
  const actualWidth = elRect.width;

  // Clone node
  const clone = el.cloneNode(true) as HTMLElement;

  // Copy computed styles that affect layout and text metrics
  const cs = getComputedStyle(el);
  const importantStyles = [
    "fontFamily",
    "fontSize",
    "fontWeight",
    "fontStyle",
    "letterSpacing",
    "wordSpacing",
    "lineHeight",
    "textTransform",
    "textIndent",
    "whiteSpace",
    "wordBreak",
    "boxSizing",
    "paddingTop",
    "paddingBottom",
    "paddingLeft",
    "paddingRight",
    "borderLeftWidth",
    "borderRightWidth",
    "borderTopWidth",
    "borderBottomWidth",
  ] as const;

  // Apply a safe baseline + copied styles to the clone
  clone.style.position = "absolute";
  clone.style.visibility = "hidden";
  clone.style.pointerEvents = "none";
  clone.style.margin = "0";
  clone.style.top = "0";
  clone.style.left = "0";
  clone.style.maxHeight = "none";
  clone.style.overflow = "visible";
  clone.style.display = "block"; // remove -webkit-box
  // unset clamp-related inline styles that might exist
  clone.style.webkitLineClamp = "unset";
  clone.style.webkitBoxOrient = "unset";

  for (const prop of importantStyles) {
    // map JS style prop to CSS property name where needed
    // e.g., "fontFamily" -> "font-family" via cs.getPropertyValue
    const cssProp = prop.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
    const val = cs.getPropertyValue(cssProp);
    if (val) clone.style.setProperty(cssProp, val);
  }

  // Append clone so browser can compute sizes
  document.body.appendChild(clone);

  // 1) contentWidth: let it expand naturally to its intrinsic width
  clone.style.width = "fit-content";
  // Force layout
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _a = clone.getBoundingClientRect();
  const contentWidth = clone.getBoundingClientRect().width;

  // 2) contentHeight: constrain clone to the actual element width to get wrapped height
  // Ensure we use the same width (including box-sizing/padding) as the real element
  clone.style.width = `${elRect.width}px`;
  // Force layout again
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _b = clone.getBoundingClientRect();
  const contentHeight = clone.getBoundingClientRect().height;

  // Cleanup
  document.body.removeChild(clone);

  return {
    actualHeight,
    contentHeight,
    actualWidth,
    contentWidth,
  };
}
