"use client";

import { Card } from "@/components/ui/card";
import { Todo } from "@prisma/client";
import TodoItem from "./todo-item";

interface TodoGridProps {
  todos: Todo[];
  onToggle: (id: string, completed: boolean) => void;
  onPinned: (id: string, pinned: boolean) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string, newDescription: string) => void;
  onShare?: (id: string, email: string) => void;
  showShareButton?: boolean;
}

export function TodoGrid({
  todos,
  onToggle,
  onPinned,
  onDelete,
  onEdit,
  onShare,
  showShareButton = false,
}: TodoGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {todos.map((todo) => (
        <Card
          key={todo.id}
          className="shadow-lg hover:shadow-xl transition-shadow"
        >
          <TodoItem
            todo={todo}
            onToggle={onToggle}
            onPinned={onPinned}
            onDelete={onDelete}
            onEdit={onEdit}
            onShare={onShare}
            showShareButton={showShareButton}
          />
        </Card>
      ))}
    </div>
  );
}
