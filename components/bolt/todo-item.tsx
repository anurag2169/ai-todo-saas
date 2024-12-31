"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Edit2,
  Trash2,
  X,
  Check,
  ChevronDown,
  ChevronUp,
  PinIcon,
  PinOffIcon,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { ShareTodoDialog } from "./share-todo-dialog";
import { Todo } from "@prisma/client";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string, completed: boolean) => void;
  onPinned: (id: string, pinned: boolean) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string, newDescription: string) => void;
  onShare?: (id: string, email: string) => void;
  showShareButton?: boolean;
  isAdmin?: boolean;
}

export default function TodoItem({
  todo,
  onToggle,
  onPinned,
  onDelete,
  onEdit,
  onShare,
  showShareButton = false,
  isAdmin,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState<any | null>(
    todo?.description
  );

  const handleShare = (email: string) => {
    onShare?.(todo.id, email);
  };

  const truncateText = (text: string, maxLength: number) => {
    if (!text) return "";
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  return (
    <div className="p-4">
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <Checkbox
            checked={todo.completed}
            onCheckedChange={() => onToggle(todo.id, !todo.completed)}
            className="mt-1"
          />

          {isEditing ? (
            <div className="flex-1 space-y-2">
              <Input
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="flex-1"
                autoFocus
              />
              <Input
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                placeholder="Add description (optional)"
                className="min-h-[80px]"
              />
              <div className="flex gap-2 justify-end">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    onEdit(todo.id, editedTitle, editedDescription);
                    setIsEditing(false);
                  }}
                >
                  <Check className="h-4 w-4 mr-1" /> Save
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setIsEditing(false);
                    setEditedTitle(todo.title);
                    setEditedDescription(todo.description);
                  }}
                >
                  <X className="h-4 w-4 mr-1" /> Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex-1 space-y-2">
              <div className="flex justify-between items-start">
                <span
                  className={`block font-medium ${
                    todo.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {todo.title}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="ml-2"
                >
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>

              <div className={cn("space-y-2", !isExpanded && "hidden")}>
                {todo.description && (
                  <p
                    className={`text-sm ${
                      todo.completed
                        ? "line-through text-gray-400"
                        : "text-gray-600"
                    }`}
                  >
                    {todo.description}
                  </p>
                )}
                {todo.sharedBy && (
                  <p className="text-sm text-blue-600">
                    Shared by: {todo.sharedBy}
                  </p>
                )}
                {todo.sharedWith && todo.sharedWith.length > 0 && (
                  <p className="text-sm text-blue-600">
                    Shared with: {todo.sharedWith.join(", ")}
                  </p>
                )}
              </div>

              {!isExpanded && todo.description && (
                <p
                  className={`text-sm ${
                    todo.completed
                      ? "line-through text-gray-400"
                      : "text-gray-600"
                  }`}
                >
                  {truncateText(todo.description, 60)}
                </p>
              )}

              <div className="flex items-center justify-between pt-2">
                <span className="text-sm text-gray-400">
                  {format(todo.createdAt, "MMM d, yyyy")}
                </span>
                <div className="flex gap-1">
                  {showShareButton && onShare && (
                    <>
                      <ShareTodoDialog onShare={handleShare} />

                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setIsEditing(true)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => onDelete(todo.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => onPinned(todo.id, !todo.pinned)}
                  >
                    {todo.pinned ? (
                      <PinOffIcon className="h-4 w-4" />
                    ) : (
                      <PinIcon className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
