import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, timeOut: number = 500) {
  const [state, setState] = useState<T>(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setState(value);
    }, timeOut);
    return () => clearTimeout(timer);
  }, [timeOut, value]);
  return state;
}
