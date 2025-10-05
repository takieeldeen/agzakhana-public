import { t, TOptions } from "i18next";
import { clientLocale } from "../app";

export const tr = (
  messageKey: string,
  options: { placeholders?: Record<string, string> } & TOptions = {}
): any => {
  const { placeholders, ...rest } = options;

  return () =>
    t(messageKey, {
      lng: clientLocale,
      ...rest,
      ...Object.fromEntries(
        Object.entries(placeholders ?? {}).map(([key, value]) => [
          key,
          t(value, { lng: clientLocale }), // now runs when the function is called
        ])
      ),
    });
};
