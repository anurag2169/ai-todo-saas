"use client";

import { useState } from "react";
import { TodoGrid } from "./todo-grid";
import { EmptyTodos } from "./empty-todos";
import { Todo } from "@prisma/client";
import Pagination from "./pagination";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string, newDescription: string) => void;
  onShare?: (id: string, email: string) => void;
  showShareButton?: boolean;
}

export function TodoList({
  todos,
  onToggle,
  onDelete,
  onEdit,
  onShare,
  showShareButton = false,
}: TodoListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  if (todos?.length === 0) {
    return <EmptyTodos />;
  }

  const totalPages = Math.ceil(todos?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTodos = todos?.slice(startIndex, endIndex);

  return (
    <div className="space-y-6">
      <TodoGrid
        todos={currentTodos}
        onToggle={onToggle}
        onDelete={onDelete}
        onEdit={onEdit}
        onShare={onShare}
        showShareButton={showShareButton}
      />
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
