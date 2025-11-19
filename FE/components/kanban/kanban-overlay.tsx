import { DragOverlay } from "@dnd-kit/core";
import { ReactNode } from "react";
import { useKanban } from "./kanban-provider";

export type KanbanOverlayProps = {
  children: ReactNode;
};
export default function KanbanOverlay({ children }: KanbanOverlayProps) {
  return <DragOverlay>{children}</DragOverlay>;
}

export type KanbanColumnOverlayProps = {
  children: ReactNode;
};
export function KanbanColumnOverlay({ children }: KanbanColumnOverlayProps) {
  const { activeColumn } = useKanban();
  if (!activeColumn) return null;
  return <>{children}</>;
}

export type KanbanOverlayCardProps = {
  children: ReactNode;
};
export function KanbanCardOverlay({ children }: KanbanOverlayCardProps) {
  const { activeCard } = useKanban();
  if (!activeCard) return null;
  return <>{children}</>;
}
