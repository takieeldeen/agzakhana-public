import { useEffect, useState } from "react";
import { useDebounceFn } from "./use-debounce-call";

type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl";
type Direction = "up" | "down";

const breakpoints: Record<Breakpoint, number> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

export const useResponsive = (dir: Direction, breakpoint: Breakpoint) => {
  const [matchingQuery, setMatchingQuery] = useState(true);

  const handler = useDebounceFn(() => {
    const currentWindowWidth = window.innerWidth;
    if (dir === "up")
      setMatchingQuery(currentWindowWidth >= breakpoints[breakpoint]);
    if (dir === "down")
      setMatchingQuery(currentWindowWidth <= breakpoints[breakpoint]);
  }, 300);

  useEffect(() => {
    handler(); // Run once immediately
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [handler]);

  return matchingQuery;
};
