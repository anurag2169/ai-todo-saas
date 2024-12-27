-- DropForeignKey
ALTER TABLE "SharedTodo" DROP CONSTRAINT "SharedTodo_todoId_fkey";

-- AddForeignKey
ALTER TABLE "SharedTodo" ADD CONSTRAINT "SharedTodo_todoId_fkey" FOREIGN KEY ("todoId") REFERENCES "Todo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
