export const handleEmptyString = (text: string, fallback: string = "--") => {
  console.log(handleEmptyString);
  if (text === null || text === undefined || text.trim() === "") {
    return fallback;
  }
  return text;
};
