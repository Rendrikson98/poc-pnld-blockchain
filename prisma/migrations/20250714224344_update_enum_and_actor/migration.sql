-- CreateEnum
CREATE TYPE "EventCallType" AS ENUM ('Receive', 'Update', 'Forward');

-- CreateTable
CREATE TABLE "tb_phase_call" (
    "event_id" SERIAL NOT NULL,
    "call_id" INTEGER,
    "event_type" "EventCallType",
    "title" TEXT,
    "year" INTEGER,
    "document_url" TEXT,
    "old_values" JSONB,
    "new_values" JSONB,
    "actor" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_phase_call_pkey" PRIMARY KEY ("event_id")
);

-- CreateTable
CREATE TABLE "tb_phase_contract" (
    "event_id" SERIAL NOT NULL,
    "school_id" INTEGER,
    "contract_id" INTEGER,
    "cnpj" TEXT,
    "publisher_id" INTEGER,
    "book_json" TEXT,
    "hash" TEXT,
    "event_type" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_phase_contract_pkey" PRIMARY KEY ("event_id")
);

-- CreateTable
CREATE TABLE "tb_phase_logistics" (
    "event_id" SERIAL NOT NULL,
    "record_id" INTEGER,
    "publisher_id" INTEGER,
    "delivery_status" TEXT,
    "hash" TEXT,
    "event_type" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_phase_logistics_pkey" PRIMARY KEY ("event_id")
);

-- CreateTable
CREATE TABLE "tb_phase_review" (
    "event_id" SERIAL NOT NULL,
    "book_id" INTEGER,
    "call_id" INTEGER,
    "book_status" TEXT,
    "reviewers_json" JSONB,
    "report_document" TEXT,
    "criteria_json" JSONB,
    "review_description" TEXT,
    "hash" TEXT,
    "event_type" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_phase_review_pkey" PRIMARY KEY ("event_id")
);

-- CreateTable
CREATE TABLE "tb_phase_selection" (
    "event_id" SERIAL NOT NULL,
    "book_id" INTEGER,
    "school" INTEGER,
    "review_description" TEXT,
    "book_status" TEXT,
    "manager_id" INTEGER,
    "document" TEXT,
    "book_json" JSONB,
    "hash" TEXT,
    "event_type" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_phase_selection_pkey" PRIMARY KEY ("event_id")
);

-- CreateTable
CREATE TABLE "tb_phase_submission" (
    "event_id" SERIAL NOT NULL,
    "call_id" INTEGER,
    "publisher_id" INTEGER,
    "publisher_name" TEXT,
    "book_id" INTEGER,
    "book_status" TEXT,
    "document_url" TEXT,
    "documento_url" TEXT,
    "event_type" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_phase_submission_pkey" PRIMARY KEY ("event_id")
);

-- CreateTable
CREATE TABLE "tb_phase_usage" (
    "event_id" SERIAL NOT NULL,
    "book_id" INTEGER,
    "school_id" INTEGER,
    "evaluations_json" JSONB,
    "indicators_json" JSONB,
    "hash" TEXT,
    "event_type" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_phase_usage_pkey" PRIMARY KEY ("event_id")
);
