-- CreateEnum
CREATE TYPE "PropertyStatus" AS ENUM ('Approved', 'Rejected', 'Expired', 'Pending');

-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "status" "PropertyStatus" NOT NULL DEFAULT 'Pending';
