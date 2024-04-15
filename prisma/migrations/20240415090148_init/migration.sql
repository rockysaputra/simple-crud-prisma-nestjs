/*
  Warnings:

  - Added the required column `Producer` to the `Film` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Film` ADD COLUMN `Producer` VARCHAR(191) NOT NULL;
