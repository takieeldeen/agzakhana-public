export function formatTime(time?: string | Date, locale = "en"): string {
  if (!time) return "";
  const dateObj = typeof time === "object" ? time : new Date(time);
  const formatedTime = new Intl.DateTimeFormat(
    locale === "en" ? "en-US" : "ar-EG",
    { hour12: true, hour: "2-digit", minute: "2-digit" }
  ).format(dateObj);
  return formatedTime;
}
