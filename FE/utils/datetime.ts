export function formatTime(time?: string | Date, locale = "en"): string {
  if (!time) return "";

  let dateObj = typeof time === "object" ? time : new Date(time);
  if (typeof time === "string" && time?.split(":").length === 3)
    dateObj = new Date(`1970-01-01T${time}Z`);
  const formatedTime = new Intl.DateTimeFormat(
    locale === "en" ? "en-US" : "ar-EG",
    { hour12: true, hour: "2-digit", minute: "2-digit" }
  ).format(dateObj);
  return formatedTime;
}
