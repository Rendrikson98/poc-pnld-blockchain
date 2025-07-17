-- AlterTable
ALTER TABLE "tb_phase_review" ADD COLUMN     "actor" TEXT;

-- AlterTable
ALTER TABLE "tb_phase_submission" ADD COLUMN     "actor" TEXT,
ADD COLUMN     "reviewers_json" JSONB;
