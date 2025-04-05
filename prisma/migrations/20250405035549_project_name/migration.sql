/*
  Warnings:

  - Added the required column `project_name` to the `Parameter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Parameter" ADD COLUMN     "project_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Version" ADD COLUMN     "project_name" TEXT NOT NULL DEFAULT 'mcproj';
