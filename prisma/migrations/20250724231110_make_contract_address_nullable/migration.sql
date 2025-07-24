/*
  Warnings:

  - You are about to drop the column `documento_url` on the `tb_phase_submission` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tb_phase_call" ADD COLUMN     "contract_address" TEXT;

-- AlterTable
ALTER TABLE "tb_phase_contract" ADD COLUMN     "contract_address" TEXT;

-- AlterTable
ALTER TABLE "tb_phase_logistics" ADD COLUMN     "contract_address" TEXT;

-- AlterTable
ALTER TABLE "tb_phase_review" ADD COLUMN     "contract_address" TEXT;

-- AlterTable
ALTER TABLE "tb_phase_selection" ADD COLUMN     "contract_address" TEXT;

-- AlterTable
ALTER TABLE "tb_phase_submission" DROP COLUMN "documento_url",
ADD COLUMN     "contract_address" TEXT;
