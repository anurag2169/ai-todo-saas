"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TodoList } from "./todo-list";
import { Todo } from "@prisma/client";
import { SharedTodo } from "@/app/(authenticated)/dashboard/page";

interface TodoTabsProps {
  todos: Todo[];
  sharedTodos: SharedTodo[];
  onToggle: (id: string, completed: boolean) => void;
  onPinned: (id: string, pinned: boolean) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string, newDescription: string) => void;
  onShare: (id: string, email: string) => void;
}

export function TodoTabs({
  todos,
  sharedTodos,
  onToggle,
  onPinned,
  onDelete,
  onEdit,
  onShare,
}: TodoTabsProps) {
  return (
    <Tabs defaultValue="my-todos" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-8">
        <TabsTrigger value="my-todos">My Todos</TabsTrigger>
        <TabsTrigger value="shared-todos">Shared Todos</TabsTrigger>
      </TabsList>
      <TabsContent value="my-todos">
        <TodoList
          todos={todos}
          onToggle={onToggle}
          onPinned={onPinned}
          onDelete={onDelete}
          onEdit={onEdit}
          onShare={onShare}
          showShareButton
        />
      </TabsContent>
      <TabsContent value="shared-todos">
        <TodoList
          todos={
            sharedTodos ? sharedTodos.map((sharedTodo) => sharedTodo.todo) : []
          }
          onToggle={onToggle}
          onPinned={onPinned}
          onDelete={onDelete}
          onEdit={onEdit}
          onShare={onShare}
          showShareButton={false}
        />
      </TabsContent>
    </Tabs>
  );
}
