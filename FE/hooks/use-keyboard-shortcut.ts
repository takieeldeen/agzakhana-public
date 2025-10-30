import { useEffect } from "react";

type ModifierKey = "ctrl" | "alt" | "shift" | "meta"; // meta = ⌘ on mac
type Shortcut = `${ModifierKey}+${string}`;

export function useKeyboardShortcut(shortcut: Shortcut, callback: () => void) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const keys = shortcut.toLowerCase().split("+");
      const mainKey = keys[keys.length - 1];
      const modifiers = keys.slice(0, -1);

      const isMatch =
        (!modifiers.includes("ctrl") || event.ctrlKey) &&
        (!modifiers.includes("alt") || event.altKey) &&
        (!modifiers.includes("shift") || event.shiftKey) &&
        (!modifiers.includes("meta") || event.metaKey) &&
        event.key.toLowerCase() === mainKey.toLowerCase();

      if (isMatch) {
        event.preventDefault();
        callback();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [shortcut, callback]);
}
