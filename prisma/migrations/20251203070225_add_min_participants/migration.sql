/*
  Warnings:

  - You are about to drop the column `joiningFee` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `participantsCount` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `Event` table. All the data in the column will be lost.
  - Made the column `maxParticipants` on table `Event` required. This step will fail if there are existing NULL values in that column.
  - Made the column `minParticipants` on table `Event` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "joiningFee",
DROP COLUMN "participantsCount",
DROP COLUMN "time",
ADD COLUMN     "fee" DOUBLE PRECISION NOT NULL DEFAULT 0,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "maxParticipants" SET NOT NULL,
ALTER COLUMN "minParticipants" SET NOT NULL;
