import { useCallback, useEffect, useState } from "react";
import { MotionButton } from "./ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";

export function DashboardPaginationItem() {
  return (
    <MotionButton
      whileHover={{ scale: 1.1 }}
      whileTap={{
        scale: 0.8,
        transition: { duration: 0.05 }, // ⚡ instant feedback
      }}
      transition={{ type: "tween" }} // no spring delay
      className="rounded-xl bg-gray-200 text-black"
    >
      1
    </MotionButton>
  );
}

export type PaginationProps = {
  totalRowsCount: number;
  rowsPerPage?: number;
  page: number;
  visibleButtons?: number; // default: 5
  onChange?: (newPage: number) => void;
};
export default function DashboardPagination({
  totalRowsCount = 0,
  page,
  rowsPerPage = 9,
  visibleButtons = 5,
  onChange,
}: PaginationProps) {
  const [prevHovered, setPrevHovered] = useState<boolean>(false);
  const [nextHovered, setNextHovered] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(page);
  const pageCount = Math.ceil(totalRowsCount / rowsPerPage);
  let pages = [];
  const locale = useLocale();
  const firstPage = 1;
  const lastPage = pageCount;
  let leftBoundry = currentPage - 2;
  let rightBoundry = currentPage + 2;
  const handleChange = useCallback(
    (newPage: number) => {
      setCurrentPage(newPage);
      if (onChange) onChange(newPage);
    },
    [onChange]
  );
  if (leftBoundry < 2) {
    leftBoundry = 2;
    rightBoundry = leftBoundry + 4;
  }
  if (rightBoundry > pageCount - 1) {
    rightBoundry = pageCount - 1;
    leftBoundry = rightBoundry - 4;
  }
  pages.push(firstPage);
  if (leftBoundry > 2) pages.push("prev");
  for (let i = leftBoundry; i <= rightBoundry; i++) {
    pages.push(i);
  }
  if (rightBoundry < pageCount - 1) pages.push("next");
  pages.push(lastPage);
  if (pageCount <= visibleButtons)
    pages = Array.from({ length: pageCount }, (_, i) => i + 1);
  useEffect(() => {}, []);
  if (pageCount <= 1) return null;
  return (
    <div className="flex flex-row gap-2">
      {currentPage !== 1 && (
        <MotionButton
          onClick={() => handleChange(currentPage - 1)}
          whileHover={{ scale: 1.1 }}
          whileTap={{
            scale: 0.8,
            transition: { duration: 0.05 }, // ⚡ instant feedback
          }}
          transition={{ type: "tween" }} // no spring delay
          className="rounded-xl bg-gray-200 text-gray-500 h-10 aspect-square p-0 dark:bg-dark-card"
        >
          <Icon
            icon={
              locale === "ar"
                ? "fluent:chevron-right-12-regular"
                : "fluent:chevron-left-12-regular"
            }
          />
        </MotionButton>
      )}

      {pages?.map((page, i) => (
        <div key={i}>
          {typeof page === "number" && (
            <MotionButton
              onClick={() => handleChange(page)}
              key={i}
              whileHover={{ scale: 1.1 }}
              whileTap={{
                scale: 0.8,
                transition: { duration: 0.05 }, // ⚡ instant feedback
              }}
              transition={{ type: "tween" }} // no spring delay
              className={cn(
                "rounded-xl bg-gray-200 text-black transition-all duration-300 h-10 aspect-square p-0 dark:bg-dark-card dark:text-white",
                currentPage === page &&
                  "bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-600 hover:dark:bg-emerald-700"
              )}
            >
              {page}
            </MotionButton>
          )}
          {page === "prev" && (
            <MotionButton
              onMouseEnter={() => setPrevHovered(true)}
              onMouseLeave={() => setPrevHovered(false)}
              onClick={() => handleChange(currentPage - 2)}
              key={i}
              whileHover={{ scale: 1.1 }}
              whileTap={{
                scale: 0.8,
                transition: { duration: 0.05 }, // ⚡ instant feedback
              }}
              transition={{ type: "tween" }} // no spring delay
              className={cn(
                "rounded-xl bg-transparent shadow-none text-black dark:text-white "
              )}
            >
              <AnimatePresence>
                {!prevHovered && (
                  <motion.div animate={{ opacity: 1 }}>
                    <Icon icon="ri:more-fill" />
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {prevHovered && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <Icon
                      icon={
                        locale === "ar"
                          ? "fluent:chevron-double-right-16-filled"
                          : "fluent:chevron-double-left-16-filled"
                      }
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </MotionButton>
          )}
          {page === "next" && (
            <MotionButton
              onMouseEnter={() => setNextHovered(true)}
              onMouseLeave={() => setNextHovered(false)}
              onClick={() => handleChange(currentPage + 2)}
              key={i}
              whileHover={{ scale: 1.1 }}
              whileTap={{
                scale: 0.8,
                transition: { duration: 0.05 }, // ⚡ instant feedback
              }}
              transition={{ type: "tween" }} // no spring delay
              className={cn(
                "rounded-xl bg-transparent shadow-none text-black dark:text-white"
              )}
            >
              <AnimatePresence>
                {!nextHovered && (
                  <motion.div animate={{ opacity: 1 }}>
                    <Icon icon="ri:more-fill" />
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {nextHovered && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <Icon
                      icon={
                        locale === "ar"
                          ? "fluent:chevron-double-left-16-filled"
                          : "fluent:chevron-double-right-16-filled"
                      }
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </MotionButton>
          )}
        </div>
      ))}
      {currentPage !== pageCount && (
        <MotionButton
          onClick={() => handleChange(currentPage + 1)}
          whileHover={{ scale: 1.1 }}
          whileTap={{
            scale: 0.8,
            transition: { duration: 0.05 }, // ⚡ instant feedback
          }}
          transition={{ type: "tween" }} // no spring delay
          className="rounded-xl bg-gray-200 text-gray-500 h-10 aspect-square p-0 dark:bg-dark-card"
        >
          <Icon
            icon={
              locale === "ar"
                ? "fluent:chevron-left-12-regular"
                : "fluent:chevron-right-12-regular"
            }
          />
        </MotionButton>
      )}
    </div>
  );
}
