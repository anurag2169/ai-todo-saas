import { ClipboardList } from "lucide-react";
import { Card } from "@/components/ui/card";

export function EmptyTodos() {
  return (
    <Card className="p-8 text-center">
      <div className="flex justify-center mb-4">
        <ClipboardList className="h-12 w-12 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold mb-2">No tasks yet</h3>
      <p className="text-gray-500">Add your first task to get started!</p>
    </Card>
  );
}