"use client";

import { useToast } from "@/hooks/use-toast";
import { useCallback, useEffect, useState } from "react";
import { Todo } from "@prisma/client";
import { useUser } from "@clerk/nextjs";
import { Lightbulb, RefreshCwIcon } from "lucide-react";
import { useDebounceValue } from "usehooks-ts";
import { useCopilotAction, useCopilotReadable } from "@copilotkit/react-core";
import { TodoTabs } from "@/components/bolt/todo-tabs";
import { AddTodoForm } from "@/components/bolt/add-todo-form";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipArrow } from "@radix-ui/react-tooltip";

export interface SharedTodo {
  id: string;
  todoId: string;
  userId: string;
  sharedAt: string;
  todo: Todo;
}

export default function Dashboard() {
  const { user } = useUser();
  const { toast } = useToast();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounceValue(searchTerm, 200);
  const [sharedTodos, setSharedTodos] = useState<SharedTodo[]>([]);
  // Define Copilot action
  useCopilotAction({
    name: "handleAddTodo",
    description: "Add a new todo item",
    parameters: [
      {
        name: "title",
        type: "string",
        description: "The title of the todo item",
        required: true,
      },
    ],
    handler: async ({ title }) => {
      await handleAddTodo(title);
    },
  });

  useCopilotAction({
    name: "shareTodo",
    description: "Share a todo item with another user",
    parameters: [
      {
        name: "id",
        type: "string",
        description: "The id of the todo item",
        required: true,
      },
      {
        name: "email",
        type: "string",
        description: "The email of the user to share the todo with",
        required: true,
      },
    ],
    handler: async ({ id, email }) => {
      await shareTodo(id, email);
    },
  });
  
  useCopilotAction({
    name: "handleUpdateTodo",
    description: "Update a todo item",
    parameters: [
      {
        name: "id",
        type: "string",
        description: "The id of the todo item",
        required: true,
      },
      {
        name: "completed",
        type: "boolean",
        description: "The completed status of the todo item",
        required: true,
      },
    ],
    handler: async ({ id, completed }) => {
      await handleUpdateTodo(id, completed);
    },
  });

  useCopilotAction({
    name: "handleDeleteTodo",
    description: "Delete a todo item",
    parameters: [
      {
        name: "id",
        type: "string",
        description: "The id of the todo item",
        required: true,
      },
    ],
    handler: async ({ id }) => {
      await handleDeleteTodo(id);
    },
  });

  useCopilotReadable({
    description: "The state of the todo list",
    value: JSON.stringify(todos),
  });

  useCopilotReadable({
    description: "subscription status",
    value: JSON.stringify(isSubscribed),
  });

  useCopilotReadable({
    description: "The current user",
    value: JSON.stringify(user),
  });

  const fetchTodos = useCallback(
    async (page: number) => {
      try {
        const response = await fetch(
          `/api/todos?page=${page}&search=${debouncedSearchTerm}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }
        const data = await response.json();
        setTodos(data.todos);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);
        setIsLoading(false);
        toast({
          title: "Success",
          description: "Todos fetched successfully.",
        });
      } catch (error) {
        setIsLoading(false);
        toast({
          title: "Error",
          description: "Failed to fetch todos. Please try again.",
          variant: "destructive",
        });
      }
    },
    [toast, debouncedSearchTerm]
  );

  async function fetchSharedTodos() {
    try {
      const response = await fetch(`/api/shareTodo`);

      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }
      const data = await response.json();
      setSharedTodos(data.sharedTodos);
      toast({
        title: "Success",
        description: "Shared Todos fetched successfully.",
      });
    } catch (err: any) {
      console.error("Failed to fetch shared todos:", err);
      toast({
        title: "Error",
        description: "Failed to fetch Shared todos. Please try again.",
        variant: "destructive",
      });
    }
  }

  useEffect(() => {
    fetchTodos(1);
    fetchSubscriptionStatus();
    fetchSharedTodos();
  }, [fetchTodos]);

  const fetchSubscriptionStatus = async () => {
    const response = await fetch("/api/subscription");
    if (response.ok) {
      const data = await response.json();
      setIsSubscribed(data.isSubscribed);
    }
  };

  const handleAddTodo = async (title: string) => {
    toast({
      title: "Adding Todo",
      description: "Please wait...",
    });
    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      if (!response.ok) {
        throw new Error("Failed to add todo");
      }
      await fetchTodos(currentPage);
      toast({
        title: "Success",
        description: "Todo added successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add todo. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateTodo = async (id: string, completed: boolean) => {
    toast({
      title: "Updating Todo",
      description: "Please wait...",
    });
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed }),
      });
      if (!response.ok) {
        throw new Error("Failed to update todo");
      }
      await fetchTodos(currentPage);
      toast({
        title: "Success",
        description: "Todo updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update todo. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteTodo = async (id: string) => {
    toast({
      title: "Deleting Todo",
      description: "Please wait...",
    });
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }
      await fetchTodos(currentPage);
      await fetchSharedTodos();
      toast({
        title: "Success",
        description: "Todo deleted successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete todo. Please try again.",
        variant: "destructive",
      });
    }
  };

  const shareTodo = async (id: string, email: string) => {
    try {
      const response = await fetch("/api/shareTodo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ todoId: id, recipientEmail: email }),
      });

      const data = await response.json();

      if (response.ok) {
        return toast({
          title: "Success",
          description: "Todos Shared successfully.",
        });
      } else {
        return toast({
          title: "Uh oh! Something went wrong.",
          description: data.message,
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to fetch todos. Please try again.",
        variant: "destructive",
      });
    }
  };

  const editTodo = (id: string, newTitle: string, newDescription: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, title: newTitle, description: newDescription }
          : todo
      )
    );
    setSharedTodos(
      sharedTodos.map((todo) =>
        todo.id === id
          ? { ...todo, title: newTitle, description: newDescription }
          : todo
      )
    );
  };

  const handleRefresh = () => {
    fetchTodos(currentPage);
    fetchSharedTodos();
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Lightbulb className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              IntelliDo
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Organize your tasks efficiently
            </p>
          </div>

          <AddTodoForm onAdd={handleAddTodo} />

          <div className="mt-8">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant={"outline"}>
                    <RefreshCwIcon
                      onClick={handleRefresh}
                      className="h-8 w-8"
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left" className="bg-white text-black">
                  <p>Refresh Todos</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="mt-8">
            <TodoTabs
              todos={todos}
              sharedTodos={sharedTodos}
              onToggle={handleUpdateTodo}
              onDelete={handleDeleteTodo}
              onEdit={editTodo}
              onShare={shareTodo}
            />
          </div>
        </div>
      </div>
    </>
  );
}
