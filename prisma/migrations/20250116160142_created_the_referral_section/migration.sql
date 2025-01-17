-- AlterTable
ALTER TABLE "registrations" ALTER COLUMN "Referral_Code" SET DEFAULT '';

-- CreateTable
CREATE TABLE "ReferralCode" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "usageCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ReferralCode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ReferralCode_code_key" ON "ReferralCode"("code");

-- CreateIndex
CREATE UNIQUE INDEX "ReferralCode_ownerId_key" ON "ReferralCode"("ownerId");

-- AddForeignKey
ALTER TABLE "registrations" ADD CONSTRAINT "registrations_Referral_Code_fkey" FOREIGN KEY ("Referral_Code") REFERENCES "ReferralCode"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReferralCode" ADD CONSTRAINT "ReferralCode_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "registrations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
