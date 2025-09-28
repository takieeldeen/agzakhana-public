import { ReactNode } from "react";
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";

export type CollapseProps = {
  children: ReactNode;
  collapsed: boolean;
} & Omit<
  HTMLMotionProps<"div">,
  "initial" | "animate" | "exit" | "transition" | "style"
>;

export default function Collapse({
  children,
  collapsed,
  ...other
}: CollapseProps) {
  return (
    <AnimatePresence>
      {collapsed && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{ overflow: "hidden" }}
          {...other}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
