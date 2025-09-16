import { t, TOptions } from "i18next";

export const tr = (
  messageKey: string,
  options: { placeholders?: Record<string, string> } & TOptions = {}
): any => {
  const { placeholders, ...rest } = options;

  return () =>
    t(messageKey, {
      ...rest,
      ...Object.fromEntries(
        Object.entries(placeholders ?? {}).map(([key, value]) => [
          key,
          t(value), // now runs when the function is called
        ])
      ),
    });
};
