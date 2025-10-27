import { Icon } from "@iconify/react/dist/iconify.js";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import useSound from "use-sound";

type Props = {
  variant: "success" | "fail";
  title?: string;
  subtitle?: string;
  t: number | string;
};
export default function ToastMessage({
  variant = "success",
  title,
  subtitle,
  t,
}: Props) {
  const [play] = useSound("/sounds/success.mp3");

  const tr = useTranslations();
  const variantProps = {
    success: {
      title: tr("TOAST.SUCCESSFUL_PROCESS"),
      icon: "iconamoon:check-fill",
      color: "bg-agzakhana-primary",
    },
    fail: {
      title: tr("TOAST.UNSUCCESSFUL_PROCESS"),
      icon: "material-symbols:close-rounded",
      color: "bg-red-500",
    },
  };
  let finalTitle = "";
  if (!!title) finalTitle = title;
  if (!title) finalTitle = variantProps[variant].title;
  useEffect(() => {
    play();
  }, [play]); // This runs once when the component mounts
  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        className="p-1 bg-[#181C20] rounded-2xl flex flex-row "
        transition={{
          type: "spring",
        }}
      >
        <AnimatePresence>
          <motion.div
            initial={{ width: 0, opacity: 0.8 }}
            animate={{ width: 240, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{
              delay: 0.6,
              type: "spring",
            }}
            className="px-2"
          >
            <AnimatePresence>
              <motion.p
                initial={{ width: 0, height: 0, opacity: 0, scale: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  width: "auto",
                  height: "auto",
                }}
                transition={{ delay: 0.8, type: "spring", duration: 0.3 }}
                className="text-white font-semibold origin-bottom-left rtl:origin-bottom-right rtl:font-cairo ltr:font-quicksand"
              >
                {finalTitle}
              </motion.p>
            </AnimatePresence>

            <AnimatePresence>
              <motion.p
                initial={{ width: 0, height: 0, opacity: 0, scale: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  width: "auto",
                  height: "auto",
                }}
                transition={{ delay: 0.9, type: "spring", duration: 0.3 }}
                className=" text-sm text-gray-300 origin-bottom-left rtl:origin-bottom-right rtl:font-cairo ltr:font-quicksand"
              >
                {subtitle}
              </motion.p>
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
        <motion.div
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
          }}
          className="h-12 w-12 bg-emerald-600 rounded-xl flex items-center justify-center"
        >
          <Icon icon="line-md:confirm" className="h-10 w-10 text-white" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function pushDashboardMessage({
  title,
  subtitle,
  variant,
}: Omit<Props, "t">) {
  toast.custom((t) => (
    <ToastMessage title={title} subtitle={subtitle} variant={variant} t={t} />
  ));
}
