"use client";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { Drawer } from "../ui/drawer";
import { useLocale } from "next-intl";

export type SideBarContextProps = {
  opened: boolean;
  toggleOpen: VoidFunction;
};

type SidebarProviderProps = { children: ReactNode };

const SideBarContext = createContext<SideBarContextProps | null>(null);

export default function AppSidebarProvider({ children }: SidebarProviderProps) {
  const locale = useLocale();
  // State Management ///////////////////////////////////////
  const [opened, setOpened] = useState<boolean>(false);
  // Callbacks ///////////////////////////////////////
  const toggleOpen = useCallback(() => {
    setOpened((prev) => !prev);
  }, []);
  // Cotnext Value /////////////////////////////////////////
  const value = {
    opened,
    toggleOpen,
  };
  return (
    <SideBarContext.Provider value={value}>
      <Drawer
        direction={locale === "ar" ? "right" : "left"}
        container={document?.body}
      >
        {children}
      </Drawer>
    </SideBarContext.Provider>
  );
}

export function useAppSidebar() {
  const contextValue = useContext(SideBarContext);
  if (!contextValue)
    throw Error("useAppSidebar can't be used outside Sidebar Provider");
  return contextValue;
}
