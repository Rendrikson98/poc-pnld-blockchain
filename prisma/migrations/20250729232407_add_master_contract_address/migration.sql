-- AlterTable
ALTER TABLE "tb_phase_call" ADD COLUMN     "master_contract_adress" TEXT;

-- AlterTable
ALTER TABLE "tb_phase_contract" ADD COLUMN     "master_contract_adress" TEXT;

-- AlterTable
ALTER TABLE "tb_phase_logistics" ADD COLUMN     "master_contract_adress" TEXT;

-- AlterTable
ALTER TABLE "tb_phase_review" ADD COLUMN     "master_contract_adress" TEXT;

-- AlterTable
ALTER TABLE "tb_phase_selection" ADD COLUMN     "master_contract_adress" TEXT;

-- AlterTable
ALTER TABLE "tb_phase_submission" ADD COLUMN     "master_contract_adress" TEXT;

-- AlterTable
ALTER TABLE "tb_phase_usage" ADD COLUMN     "contract_address" TEXT,
ADD COLUMN     "master_contract_adress" TEXT;
