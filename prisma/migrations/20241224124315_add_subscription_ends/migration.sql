/*
  Warnings:

  - You are about to drop the column `sunscriptionEnds` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "sunscriptionEnds",
ADD COLUMN     "subscriptionEnds" TIMESTAMP(3);
