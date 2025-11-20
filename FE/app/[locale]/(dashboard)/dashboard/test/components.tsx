"use client";
import Z from "zod";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@/components/ui/button";
import { useForm, useFormContext } from "react-hook-form";
import RHFForm from "@/components/rhf-form";
import { RHFComboxbox } from "@/components/rhf-combobox";
import { zodResolver } from "@hookform/resolvers/zod";

const weekDays = [
  { id: 1, nameEn: "Saturday", nameAr: "السبت", weekDay: 6 },
  { id: 2, nameEn: "Sunday", nameAr: "الأحد", weekDay: 7 },
  { id: 3, nameEn: "Monday", nameAr: "الاثنين", weekDay: 1 },
  { id: 4, nameEn: "Tuesday", nameAr: "الثلاثاء", weekDay: 2 },
  { id: 5, nameEn: "Wednesday", nameAr: "الأربعاء", weekDay: 3 },
  { id: 6, nameEn: "Thursday", nameAr: "الخميس", weekDay: 4 },
  { id: 7, nameEn: "Friday", nameAr: "الجمعة", weekDay: 5 },
];

const dayHours = {
  "00:00:00": {
    id: 1,
    nameAr: "12:00 ص",
    nameEn: "12:00 AM",
    value: "00:00:00",
  },
  "00:30:00": {
    id: 2,
    nameAr: "12:30 ص",
    nameEn: "12:30 AM",
    value: "00:30:00",
  },
  "01:00:00": { id: 3, nameAr: "1:00 ص", nameEn: "1:00 AM", value: "01:00:00" },
  "01:30:00": { id: 4, nameAr: "1:30 ص", nameEn: "1:30 AM", value: "01:30:00" },
  "02:00:00": { id: 5, nameAr: "2:00 ص", nameEn: "2:00 AM", value: "02:00:00" },
  "02:30:00": { id: 6, nameAr: "2:30 ص", nameEn: "2:30 AM", value: "02:30:00" },
  "03:00:00": { id: 7, nameAr: "3:00 ص", nameEn: "3:00 AM", value: "03:00:00" },
  "03:30:00": { id: 8, nameAr: "3:30 ص", nameEn: "3:30 AM", value: "03:30:00" },
  "04:00:00": { id: 9, nameAr: "4:00 ص", nameEn: "4:00 AM", value: "04:00:00" },
  "04:30:00": {
    id: 10,
    nameAr: "4:30 ص",
    nameEn: "4:30 AM",
    value: "04:30:00",
  },
  "05:00:00": {
    id: 11,
    nameAr: "5:00 ص",
    nameEn: "5:00 AM",
    value: "05:00:00",
  },
  "05:30:00": {
    id: 12,
    nameAr: "5:30 ص",
    nameEn: "5:30 AM",
    value: "05:30:00",
  },
  "06:00:00": {
    id: 13,
    nameAr: "6:00 ص",
    nameEn: "6:00 AM",
    value: "06:00:00",
  },
  "06:30:00": {
    id: 14,
    nameAr: "6:30 ص",
    nameEn: "6:30 AM",
    value: "06:30:00",
  },
  "07:00:00": {
    id: 15,
    nameAr: "7:00 ص",
    nameEn: "7:00 AM",
    value: "07:00:00",
  },
  "07:30:00": {
    id: 16,
    nameAr: "7:30 ص",
    nameEn: "7:30 AM",
    value: "07:30:00",
  },
  "08:00:00": {
    id: 17,
    nameAr: "8:00 ص",
    nameEn: "8:00 AM",
    value: "08:00:00",
  },
  "08:30:00": {
    id: 18,
    nameAr: "8:30 ص",
    nameEn: "8:30 AM",
    value: "08:30:00",
  },
  "09:00:00": {
    id: 19,
    nameAr: "9:00 ص",
    nameEn: "9:00 AM",
    value: "09:00:00",
  },
  "09:30:00": {
    id: 20,
    nameAr: "9:30 ص",
    nameEn: "9:30 AM",
    value: "09:30:00",
  },
  "10:00:00": {
    id: 21,
    nameAr: "10:00 ص",
    nameEn: "10:00 AM",
    value: "10:00:00",
  },
  "10:30:00": {
    id: 22,
    nameAr: "10:30 ص",
    nameEn: "10:30 AM",
    value: "10:30:00",
  },
  "11:00:00": {
    id: 23,
    nameAr: "11:00 ص",
    nameEn: "11:00 AM",
    value: "11:00:00",
  },
  "11:30:00": {
    id: 24,
    nameAr: "11:30 ص",
    nameEn: "11:30 AM",
    value: "11:30:00",
  },
  "12:00:00": {
    id: 25,
    nameAr: "12:00 م",
    nameEn: "12:00 PM",
    value: "12:00:00",
  },
  "12:30:00": {
    id: 26,
    nameAr: "12:30 م",
    nameEn: "12:30 PM",
    value: "12:30:00",
  },
  "13:00:00": {
    id: 27,
    nameAr: "1:00 م",
    nameEn: "1:00 PM",
    value: "13:00:00",
  },
  "13:30:00": {
    id: 28,
    nameAr: "1:30 م",
    nameEn: "1:30 PM",
    value: "13:30:00",
  },
  "14:00:00": {
    id: 29,
    nameAr: "2:00 م",
    nameEn: "2:00 PM",
    value: "14:00:00",
  },
  "14:30:00": {
    id: 30,
    nameAr: "2:30 م",
    nameEn: "2:30 PM",
    value: "14:30:00",
  },
  "15:00:00": {
    id: 31,
    nameAr: "3:00 م",
    nameEn: "3:00 PM",
    value: "15:00:00",
  },
  "15:30:00": {
    id: 32,
    nameAr: "3:30 م",
    nameEn: "3:30 PM",
    value: "15:30:00",
  },
  "16:00:00": {
    id: 33,
    nameAr: "4:00 م",
    nameEn: "4:00 PM",
    value: "16:00:00",
  },
  "16:30:00": {
    id: 34,
    nameAr: "4:30 م",
    nameEn: "4:30 PM",
    value: "16:30:00",
  },
  "17:00:00": {
    id: 35,
    nameAr: "5:00 م",
    nameEn: "5:00 PM",
    value: "17:00:00",
  },
  "17:30:00": {
    id: 36,
    nameAr: "5:30 م",
    nameEn: "5:30 PM",
    value: "17:30:00",
  },
  "18:00:00": {
    id: 37,
    nameAr: "6:00 م",
    nameEn: "6:00 PM",
    value: "18:00:00",
  },
  "18:30:00": {
    id: 38,
    nameAr: "6:30 م",
    nameEn: "6:30 PM",
    value: "18:30:00",
  },
  "19:00:00": {
    id: 39,
    nameAr: "7:00 م",
    nameEn: "7:00 PM",
    value: "19:00:00",
  },
  "19:30:00": {
    id: 40,
    nameAr: "7:30 م",
    nameEn: "7:30 PM",
    value: "19:30:00",
  },
  "20:00:00": {
    id: 41,
    nameAr: "8:00 م",
    nameEn: "8:00 PM",
    value: "20:00:00",
  },
  "20:30:00": {
    id: 42,
    nameAr: "8:30 م",
    nameEn: "8:30 PM",
    value: "20:30:00",
  },
  "21:00:00": {
    id: 43,
    nameAr: "9:00 م",
    nameEn: "9:00 PM",
    value: "21:00:00",
  },
  "21:30:00": {
    id: 44,
    nameAr: "9:30 م",
    nameEn: "9:30 PM",
    value: "21:30:00",
  },
  "22:00:00": {
    id: 45,
    nameAr: "10:00 م",
    nameEn: "10:00 PM",
    value: "22:00:00",
  },
  "22:30:00": {
    id: 46,
    nameAr: "10:30 م",
    nameEn: "10:30 PM",
    value: "22:30:00",
  },
  "23:00:00": {
    id: 47,
    nameAr: "11:00 م",
    nameEn: "11:00 PM",
    value: "23:00:00",
  },
  "23:30:00": {
    id: 48,
    nameAr: "11:30 م",
    nameEn: "11:30 PM",
    value: "23:30:00",
  },
};
export default function TestingPage() {
  const [initialRender, setInitialRender] = useState(false);

  const scheduleSchema = Z.array(
    Z.object({
      weekDay: Z.number(),
      intervals: Z.array(
        Z.object({
          start: Z.object({
            id: Z.number(),
            nameAr: Z.string(),
            nameEn: Z.string(),
            value: Z.string(),
          }),
          end: Z.object({
            id: Z.number(),
            nameAr: Z.string(),
            nameEn: Z.string(),
            value: Z.string(),
          }),
        })
      ),
    })
  );
  const defaultValues = useMemo(
    () => [
      {
        weekDay: 6,
        intervals: [
          { start: dayHours?.["08:00:00"], end: dayHours?.["16:00:00"] },
        ],
      },
      {
        weekDay: 7,
        intervals: [],
      },
      {
        weekDay: 1,
        intervals: [],
      },
      {
        weekDay: 2,
        intervals: [],
      },
      {
        weekDay: 3,
        intervals: [],
      },
      {
        weekDay: 4,
        intervals: [],
      },
      {
        weekDay: 5,
        intervals: [],
      },
    ],
    []
  );
  const methods = useForm({
    resolver: zodResolver(scheduleSchema),
    defaultValues,
  });
  const { reset } = methods;
  const onSubmit = (data: any) => {};
  useEffect(() => {
    if (initialRender) return;
    setInitialRender(true);
    reset(defaultValues);
  }, [defaultValues, initialRender, reset]);
  return (
    <RHFForm methods={methods} onSubmit={onSubmit}>
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex flex-col gap-2 w-128">
          {weekDays?.map((el) => (
            <DayComponent day={el} key={el.id} />
          ))}
        </div>
      </div>
    </RHFForm>
  );
}

type DaySchedule = {
  weekday: number;
  intervals: { start: string; end: string }[];
};

type WeekSchedule = DaySchedule[];

function DayComponent({ day }: { day: any }) {
  const { watch, setValue, reset } = useFormContext();
  const values = watch();
  console.log(values, "values");
  const currentDaySchedule = values[day.id - 1];
  const [expanded, setExpanded] = useState<boolean>(
    currentDaySchedule?.intervals?.length > 0
  );
  const locale = useLocale();
  const t = useTranslations();
  const SHOW_REMOVE_BUTTON = currentDaySchedule?.intervals?.length > 1;
  const onDayToggle = useCallback(
    (includeDay: boolean) => {
      setValue(
        "" + (day.id - 1) + ".intervals",
        includeDay
          ? [{ start: dayHours?.["08:00:00"], end: dayHours?.["16:00:00"] }]
          : []
      );

      setExpanded(includeDay);
    },
    [day.id, setValue]
  );
  const handleIntervalAddition = useCallback(() => {
    const updatedIntervals = [
      ...currentDaySchedule.intervals,
      { start: dayHours?.["08:00:00"], end: dayHours?.["16:00:00"] },
    ];
    setValue("" + (day.id - 1) + ".intervals", updatedIntervals);
  }, [currentDaySchedule?.intervals, day.id, setValue]);
  const handleIntervalRemoval = useCallback(
    (intervalIndex: number) => {
      const updatedIntervals = [...currentDaySchedule.intervals];
      updatedIntervals.splice(intervalIndex, 1);
      setValue("" + (day.id - 1) + ".intervals", updatedIntervals);
    },
    [currentDaySchedule?.intervals, day.id, setValue]
  );
  return (
    <motion.div
      className={cn(
        "w-full bg-gray-100 p-2 flex flex-col rounded-lg border-2 transition-all duration-300  min-h-12 overflow-hidden",
        expanded ? "bg-transparent border-gray-200 " : " border-transparent"
      )}
    >
      <div className="flex flex-row justify-between w-full items-center">
        <p className="font-semibold">
          {locale === "ar" ? day?.nameAr : day?.nameEn}
        </p>
        {/* use onChange or onClick depending on your Switch API */}
        <Switch onClick={() => onDayToggle(!expanded)} checked={expanded} />
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="opened"
            exit="collapsed"
            variants={{
              opened: {
                opacity: 1,
                height: "auto",
                transition: {
                  type: "spring",
                  damping: 10,
                  stiffness: 250,
                },
              },
              collapsed: {
                opacity: 0,
                height: 0,
                transition: {
                  type: "spring",
                  damping: 15,
                  stiffness: 200,
                },
              },
            }}
            // transition={{ }}
          >
            <ul className="py-2 flex flex-col gap-2">
              {currentDaySchedule?.intervals?.map(
                (interval: DaySchedule, index: number) => (
                  <li className="flex flex-row  gap-2" key={index}>
                    {
                      <Button
                        onClick={() => handleIntervalRemoval(index)}
                        type="button"
                        className={cn(
                          "bg-transparent shadow-none border-2 border-transparent p-0! h-12 w-12 rounded-full hover:border-rose-700 group",
                          index === 0 && "invisible"
                        )}
                      >
                        <Icon
                          icon="mynaui:trash"
                          className="text-gray-600 h-6! w-6! group-hover:text-rose-700"
                        />
                      </Button>
                    }
                    <RHFComboxbox
                      name={`${day.id - 1}.intervals.${index}.start`}
                      className="w-full"
                      placeholder={t("COMMON.FROM")}
                      options={Object.values(dayHours)}
                      getOptionLabel={(option) =>
                        locale === "ar"
                          ? option?.nameAr ?? ""
                          : option?.nameEn ?? ""
                      }
                    />
                    <Icon
                      icon={
                        locale === "ar"
                          ? "mingcute:arrow-left-line"
                          : "mingcute:arrow-right-line"
                      }
                      className="h-12"
                    />
                    <RHFComboxbox
                      name={`${day.id - 1}.intervals.${index}.end`}
                      className="w-full"
                      placeholder={t("COMMON.TO")}
                      options={Object.values(dayHours)}
                      getOptionLabel={(option) =>
                        locale === "ar"
                          ? option?.nameAr ?? ""
                          : option?.nameEn ?? ""
                      }
                    />
                    <Button
                      type="button"
                      onClick={handleIntervalAddition}
                      className="bg-transparent shadow-none border-2 border-transparent p-0! h-12 w-12 rounded-full hover:border-emerald-600 group"
                    >
                      <Icon
                        icon="ic:round-plus"
                        className="text-gray-600 h-6! w-6! group-hover:text-emerald-600"
                      />
                    </Button>
                  </li>
                )
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
