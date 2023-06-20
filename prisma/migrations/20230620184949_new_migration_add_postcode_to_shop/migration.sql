/*
  Warnings:

  - Added the required column `postcode` to the `Shops` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `shops` ADD COLUMN `postcode` VARCHAR(191) NOT NULL;
