/*
  Warnings:

  - A unique constraint covering the columns `[project_name]` on the table `Version` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Version_project_name_key" ON "Version"("project_name");
