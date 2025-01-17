-- AlterTable
ALTER TABLE "registrations" ADD COLUMN     "myReferralCode" TEXT DEFAULT '',
ADD COLUMN     "myReferralCount" INTEGER DEFAULT 0;
