export const handleEmptyString = (text: string, fallback: string = "--") => {
  if (text === null || text === undefined || text.trim() === "") {
    return fallback;
  }
  return text;
};
