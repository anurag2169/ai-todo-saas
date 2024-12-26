-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "description" TEXT,
ADD COLUMN     "sharedBy" TEXT,
ADD COLUMN     "sharedWith" TEXT[];
