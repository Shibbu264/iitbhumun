/*
  Warnings:

  - You are about to drop the `ReferralCode` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ReferralCode" DROP CONSTRAINT "ReferralCode_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "registrations" DROP CONSTRAINT "registrations_Referral_Code_fkey";

-- DropTable
DROP TABLE "ReferralCode";
