"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TodoList } from "./todo-list";
import { Todo } from "@prisma/client";

interface TodoTabsProps {
  todos: Todo[];
  sharedTodos: Todo[];
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string, newDescription: string) => void;
  onShare: (id: string, email: string) => void;
}

export function TodoTabs({
  todos,
  sharedTodos,
  onToggle,
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
          onDelete={onDelete}
          onEdit={onEdit}
          onShare={onShare}
          showShareButton
        />
      </TabsContent>
      <TabsContent value="shared-todos">
        <TodoList
          todos={sharedTodos}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          onShare={onShare}
          showShareButton={false}
        />
      </TabsContent>
    </Tabs>
  );
}
