"use client";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type SidebarContextType =
  | {
      collapsed: boolean;
      activeTab: string;
      activeChild: string;
      openedMenu: string;
      onToggleCollapse: VoidFunction;
      onTabClick: (
        newTabId: string,
        hasChildren?: boolean,
        isChild?: boolean
      ) => void;
    }
  | undefined;

const SidebarContext = createContext<SidebarContextType>(undefined);

export default function DashboardSidebarProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>("");
  const [openedMenu, setOpenedMenu] = useState<string>("");
  const [activeChild, setActiveChild] = useState<string>("");

  const onToggleCollapse = useCallback(() => {
    setCollapsed((prev) => !prev);
    if (!collapsed) setOpenedMenu("");
  }, [collapsed]);

  const onTabClick = useCallback(
    (
      newTabId: string,
      hasChildren: boolean = false,
      isChild: boolean = false
    ) => {
      if (hasChildren) {
        setOpenedMenu((prev) => (prev === newTabId ? "" : newTabId));
      } else if (!isChild) {
        setActiveTab(newTabId);
        setActiveChild("");
        setOpenedMenu("");
      } else if (isChild && !collapsed) {
        setActiveChild(newTabId);
        setActiveTab("");
      } else if (isChild && collapsed) {
        setActiveChild(newTabId);
        setActiveTab("");
        setOpenedMenu("");
      }
    },
    [collapsed]
  );

  const memoizedValue = useMemo(
    () => ({
      collapsed,
      activeTab,
      activeChild,
      openedMenu,
      onToggleCollapse,
      onTabClick,
    }),
    [
      activeChild,
      activeTab,
      collapsed,
      onTabClick,
      onToggleCollapse,
      openedMenu,
    ]
  );
  return (
    <SidebarContext.Provider value={memoizedValue}>
      {children}
    </SidebarContext.Provider>
  );
}

export const useDashboardSidebar = () => {
  const sidebarContext = useContext(SidebarContext);
  if (!sidebarContext)
    throw Error("useDashboardSidebar must be used within dashboard provider");
  return sidebarContext;
};
