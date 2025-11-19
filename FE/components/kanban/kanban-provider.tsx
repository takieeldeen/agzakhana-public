import {
  DndContext,
  DndContextProps,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { createPortal } from "react-dom";

export type UseKanbanProps = {
  activeColumn: any;
  activeCard: any;
};

const KanbanContext = createContext<UseKanbanProps | undefined>(undefined);

export type KanbanProviderProps = {
  children: ReactNode;
  columnOverlay?: (activeColumn: any) => ReactNode;
  cardOverlay?: (activeCard: any) => ReactNode;
} & DndContextProps;
export default function Kanban({
  children,
  onDragStart,
  onDragEnd,
  columnOverlay,
  cardOverlay,
  ...props
}: KanbanProviderProps) {
  // State Management ///////////////////////////////////////////////
  const [activeColumn, setActiveColumn] = useState<any | null>(null);
  const [activeCard, setActiveCard] = useState<any | null>(null);
  // Default API ///////////////////////////////////////////////////
  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      const activeData = event?.active?.data?.current;
      if (activeData?.type === "COLUMN") {
        setActiveColumn(activeData.data);
      } else if (activeData?.type === "CARD") {
        setActiveCard(activeData?.data);
      }
      onDragStart?.(event);
    },
    [onDragStart]
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setActiveColumn(null);
      setActiveCard(null);
      onDragEnd?.(event);
    },
    [onDragEnd]
  );
  const providerValue = useMemo(
    () => ({
      activeColumn,
      activeCard,
    }),
    [activeColumn, activeCard]
  );
  const HAS_OVERLAY = !!cardOverlay || !!columnOverlay;
  const CardOverlay = cardOverlay?.(activeCard) ?? null;
  const ColumnOverlay = columnOverlay?.(activeColumn) ?? null;
  return (
    <KanbanContext.Provider value={providerValue}>
      <DndContext
        {...props}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {children}
        {HAS_OVERLAY &&
          createPortal(
            <DragOverlay>
              {activeColumn && ColumnOverlay}
              {activeCard && CardOverlay}
            </DragOverlay>,
            document?.body
          )}
      </DndContext>
    </KanbanContext.Provider>
  );
}

export function useKanban() {
  const kanbanContext = useContext(KanbanContext);
  if (!kanbanContext)
    throw Error("useKanban must be used within kanbanProvider");
  return kanbanContext;
}
