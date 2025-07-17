/*
  Warnings:

  - You are about to drop the column `reviewers_json` on the `tb_phase_submission` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tb_phase_submission" DROP COLUMN "reviewers_json",
ADD COLUMN     "reviewers" TEXT[];
