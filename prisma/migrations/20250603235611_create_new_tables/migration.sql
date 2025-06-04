/*
  Warnings:

  - You are about to drop the column `taskId` on the `task_history` table. All the data in the column will be lost.
  - You are about to drop the column `teamId` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `teamId` on the `team_member` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `team_member` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[team_id]` on the table `team_member` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `team_member` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `task_id` to the `task_history` table without a default value. This is not possible if the table is not empty.
  - Added the required column `team_id` to the `tasks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `team_id` to the `team_member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `team_member` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "task_history" DROP CONSTRAINT "task_history_taskId_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_teamId_fkey";

-- DropForeignKey
ALTER TABLE "team_member" DROP CONSTRAINT "team_member_teamId_fkey";

-- DropForeignKey
ALTER TABLE "team_member" DROP CONSTRAINT "team_member_userId_fkey";

-- DropIndex
DROP INDEX "team_member_teamId_key";

-- DropIndex
DROP INDEX "team_member_userId_key";

-- AlterTable
ALTER TABLE "task_history" DROP COLUMN "taskId",
ADD COLUMN     "task_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "teamId",
ADD COLUMN     "team_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "team_member" DROP COLUMN "teamId",
DROP COLUMN "userId",
ADD COLUMN     "team_id" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "team_member_team_id_key" ON "team_member"("team_id");

-- CreateIndex
CREATE UNIQUE INDEX "team_member_user_id_key" ON "team_member"("user_id");

-- AddForeignKey
ALTER TABLE "team_member" ADD CONSTRAINT "team_member_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_member" ADD CONSTRAINT "team_member_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_history" ADD CONSTRAINT "task_history_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
