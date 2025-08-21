"use client";

import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useCallback, useState } from "react";

export default function StarRating({
  rating = 0,
  disabled = false,
}: {
  rating?: number;
  disabled?: boolean;
}) {
  const [currentRating, setCurrentRating] = useState<number>(
    Math.floor(rating)
  );
  const [hovered, setHovered] = useState<number>(0);
  const handleChangeRating = useCallback(
    (newRating: number) => {
      if (disabled) return;
      if (currentRating === newRating) {
        setCurrentRating(0);
      } else {
        setCurrentRating(newRating);
      }
    },
    [currentRating, disabled]
  );

  return (
    <div className="flex flex-row items-center gap-1 justify-between">
      {Array?.from({ length: 5 }, (_, i) => (
        <Icon
          onMouseEnter={() => setHovered(i + 1)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => handleChangeRating(i + 1)}
          key={i}
          icon="material-symbols:star"
          className={cn(
            "text-3xl text-gray-300   transition-all duration-300",
            !disabled ? "hover:text-gray-400 cursor-pointer" : "",
            i < hovered && !disabled ? "text-gray-400" : "",
            i < currentRating ? "text-agzakhana-primary" : "",
            i < currentRating && !disabled
              ? " hover:text-agzakhana-primary"
              : ""
          )}
        />
      ))}
    </div>
  );
}
