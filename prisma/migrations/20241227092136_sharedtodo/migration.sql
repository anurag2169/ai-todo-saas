-- CreateTable
CREATE TABLE "SharedTodo" (
    "id" TEXT NOT NULL,
    "todoId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sharedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SharedTodo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SharedTodo" ADD CONSTRAINT "SharedTodo_todoId_fkey" FOREIGN KEY ("todoId") REFERENCES "Todo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SharedTodo" ADD CONSTRAINT "SharedTodo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
