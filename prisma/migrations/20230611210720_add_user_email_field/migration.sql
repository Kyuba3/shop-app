/*
  Warnings:

  - You are about to drop the column `userId` on the `order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userEmail]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_userId_fkey`;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `userId`,
    ADD COLUMN `userEmail` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Order_userEmail_key` ON `Order`(`userEmail`);

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_userEmail_fkey` FOREIGN KEY (`userEmail`) REFERENCES `User`(`email`) ON DELETE CASCADE ON UPDATE CASCADE;
