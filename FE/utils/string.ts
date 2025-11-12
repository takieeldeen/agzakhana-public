export const handleEmptyString = (text: string, fallback: string = "--") => {
  if (text === null || text === undefined || text.trim() === "") {
    return fallback;
  }
  return text;
};

export const getInitials = (text: string): string => {
  return (
    text
      ?.split(" ")
      ?.map((name) => name?.[0])
      ?.slice(0, 2)
      ?.join("") ?? ""
  );
};
