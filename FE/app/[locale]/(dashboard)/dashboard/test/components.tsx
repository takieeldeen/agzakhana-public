"use client";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const arr = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thurusday",
  "Friday",
];
export default function TestingPage() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col gap-2 w-96">
        {arr?.map((el) => (
          <DayComponent day={el} key={el} />
        ))}
      </div>
    </div>
  );
}

function DayComponent({ day }: { day: any }) {
  const [expanded, setExpanded] = useState<boolean>(false);
  return (
    <div
      className={cn(
        "w-full bg-gray-100 p-2 flex flex-col rounded-lg border-2 transition-all duration-300  min-h-12",
        expanded ? "bg-transparent border-gray-200 " : "h-12 border-transparent"
      )}
    >
      <div className="flex flex-row justify-between w-full items-center">
        <p className="font-semibold">{day}</p>
        {/* use onChange or onClick depending on your Switch API */}
        <Switch onClick={() => setExpanded((p) => !p)} />
      </div>

      <AnimatePresence mode="popLayout">
        {expanded && (
          <motion.div
            layout
            key="content"
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring" }}
            style={{ overflow: "hidden" }}
            className="mt-2"
          >
            <div className="py-2">
              Hello I was collapsed — the parent will now expand to fit me.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
