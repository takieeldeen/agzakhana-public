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
    if (tempRef.current) {
      const element = tempRef.current;
      // Check if the text is trimmed
      const isTextTrimmed = element?.scrollHeight > element?.clientHeight;
      setIsTrimmed(isTextTrimmed);
    }
  }, [other.children]); // Re-run effect when children change

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
          {/* <Tooltip
            title={other?.children}
            PopperProps={{
              sx: {
                zIndex: 3000, // higher than your Dialog (2001)
              },
            }}
            componentsProps={{
              tooltip: {
                sx: {
                  fontSize: "14px !important",
                  textAlign: "center",
                },
              },
            }}
            sx={{
              "& .MuiTooltip-tooltip": {
                fontSize: "24px !important",
              },
            }}
          >
            <Typography
              {...other}
              ref={tempRef}
              sx={{
                display: "-webkit-box",
                boxOrient: "vertical",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                lineClamp: maxLines,
                WebkitLineClamp: maxLines,
                textOverflow: "ellipsis",
                wordBreak: "break-word",
                width: "100%",
                ...sx,
              }}
            />
          </Tooltip> */}
        </>
      )}
    </>
  );
}
