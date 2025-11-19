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
type KanbanCardsProps = {
  children: ReactNode;
  cardIds: UniqueIdentifier[];
  asChild?: boolean;
  sortableContextAPI?: Omit<SortableContextProps, "items">;
} & ComponentProps<"div">;
export function KanbanCards({
  cardIds,
  asChild,
  sortableContextAPI,
  ...props
}: KanbanCardsProps) {
  const Comp = asChild ? Slot : "div";

  return (
    <SortableContext {...sortableContextAPI} items={cardIds}>
      <Comp {...props} />
    </SortableContext>
  );
}

// Kanban Column
type KanbanCardProps = {
  children: ReactNode;
  cardId: UniqueIdentifier;
  cardData?: any;
  asChild?: boolean;
  sortableAPI?: Omit<UseSortableArguments, "id" | "data">;
  renderPlaceholder?: (activeCard: any) => ReactNode;
} & ComponentProps<"div">;
export function KanbanCard({
  children,
  cardId,
  cardData,
  asChild,
  sortableAPI,
  renderPlaceholder,
  ...props
}: KanbanCardProps) {
  const Comp = asChild ? Slot : "div";
  const { activeCard } = useKanban();
  const {
    listeners,
    attributes,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    ...sortableAPI,
    id: cardId,
    data: {
      type: "CARD",
      data: cardData,
    },
  });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  const PlaceholderComponent = renderPlaceholder
    ? cloneElement(renderPlaceholder?.(activeCard) as any, {
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
