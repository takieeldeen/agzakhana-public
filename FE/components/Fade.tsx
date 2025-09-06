import { ReactNode } from "react";
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion";
type Props = {
  children: ReactNode;
  condition?: boolean;
} & HTMLMotionProps<"div">;
export default function Fade({ children, condition = false, ...props }: Props) {
  return (
    <AnimatePresence>
      {condition && (
        <motion.div
          {...props}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
