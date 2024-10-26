/*
  Warnings:

  - Added the required column `cookieConsent` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "cookieConsent" JSONB NOT NULL;

-- set all existing users to have required: true, optional: true
UPDATE "User" SET "cookieConsent" = '{"required": true, "optional": true}' WHERE "cookieConsent" IS NULL;
