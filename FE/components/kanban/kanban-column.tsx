import { UniqueIdentifier } from "@dnd-kit/core";
import {
  SortableContext,
  SortableContextProps,
  useSortable,
  UseSortableArguments,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Slot } from "@radix-ui/react-slot";
import { cloneElement, ComponentProps, ReactNode } from "react";
import { useKanban } from "./kanban-provider";

// Columns Wrapper
type KanbanColumnsProps = {
  children: ReactNode;
  columnIds: UniqueIdentifier[];
  asChild?: boolean;
  sortableContextAPI?: Omit<SortableContextProps, "items">;
} & ComponentProps<"div">;
export function KanbanColumns({
  columnIds,
  asChild,
  sortableContextAPI,
  ...props
}: KanbanColumnsProps) {
  const Comp = asChild ? Slot : "div";

  return (
    <SortableContext {...sortableContextAPI} items={columnIds}>
      <Comp {...props} />
    </SortableContext>
  );
}

// Kanban Column
type KanbanColumnProps = {
  children: ReactNode;
  columnId: UniqueIdentifier;
  columnData?: any;
  asChild?: boolean;
  sortableAPI?: Omit<UseSortableArguments, "id" | "data">;
  renderPlaceholder?: (activeColumn: any) => ReactNode;
} & ComponentProps<"div">;
export function KanbanColumn({
  children,
  columnId,
  columnData,
  asChild,
  sortableAPI,
  renderPlaceholder,
  ...props
}: KanbanColumnProps) {
  const Comp = asChild ? Slot : "div";
  const { activeColumn } = useKanban();
  const {
    listeners,
    attributes,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    ...sortableAPI,
    id: columnId,
    data: {
      type: "COLUMN",
      data: columnData,
    },
  });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  const PlaceholderComponent = renderPlaceholder
    ? cloneElement(renderPlaceholder?.(activeColumn) as any, {
        style,
        ref: setNodeRef,
      })
    : null;
  if (isDragging) return PlaceholderComponent;
  return (
    <Comp
      {...props}
      {...listeners}
      {...attributes}
      style={style}
      ref={setNodeRef}
    >
      {children}
    </Comp>
  );
}
