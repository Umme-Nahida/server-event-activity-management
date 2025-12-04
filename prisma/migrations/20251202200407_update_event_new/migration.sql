/*
  Warnings:

  - You are about to drop the column `fee` on the `Event` table. All the data in the column will be lost.
  - The `status` column on the `Event` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `time` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Event` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "fee",
ADD COLUMN     "joiningFee" DOUBLE PRECISION,
ADD COLUMN     "participantsCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "time" TEXT NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "maxParticipants" DROP NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'OPEN',
ALTER COLUMN "minParticipants" DROP NOT NULL;
