"use client";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";

export function OfferTimer({ expiresIn }: { expiresIn: string }) {
  const EXPIRY_DATE = new Date(expiresIn).getTime();
  const t = useTranslations();
  const getTimeLeft = useCallback(() => {
    const now = Date.now();
    const diff = EXPIRY_DATE - now;

    if (diff <= 0) return null;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return { days, hours, minutes, seconds };
  }, [EXPIRY_DATE]);

  const [timeLeft, setTimeLeft] =
    useState<ReturnType<typeof getTimeLeft>>(null);

  useEffect(() => {
    setTimeLeft(getTimeLeft()); // first calculation in browser

    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [getTimeLeft]);

  if (!timeLeft) return null;

  return (
    <ul className="flex flex-row gap-2 items-center">
      {[
        { label: t("HOME_PAGE.DAYS"), value: timeLeft.days },
        { label: t("HOME_PAGE.HOURS"), value: timeLeft.hours },
        { label: t("HOME_PAGE.MINUTES"), value: timeLeft.minutes },
        { label: t("HOME_PAGE.SECONDS"), value: timeLeft.seconds },
      ].map(({ label, value }) => (
        <li
          key={label}
          className="flex flex-col bg-gray-100 rounded-md items-center p-2 shadow-md w-1/4 min-w-16 select-none text-sm font-bold dark:bg-card-background-dark dark:text-gray-300 brightness-90"
        >
          <span className="text-agzakhana-primary text-2xl font-medium">
            {value}
          </span>
          {label}
        </li>
      ))}
    </ul>
  );
}
