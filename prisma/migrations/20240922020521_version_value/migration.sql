-- AlterTable
ALTER TABLE "Version" ALTER COLUMN "value" SET DEFAULT 0,
ALTER COLUMN "value" DROP DEFAULT;
DROP SEQUENCE "Version_value_seq";
