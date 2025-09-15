-- CreateEnum
CREATE TYPE "public"."Tag" AS ENUM ('WORK', 'PERSONAL', 'HOME', 'MEDICAL', 'BILLS', 'FOOD', 'ENTERTAINMENT', 'TRAVEL', 'EDUCATION', 'SHOPPING', 'SAVINGS', 'GIFTS', 'OTHER');

-- CreateTable
CREATE TABLE "public"."Note" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "tags" "public"."Tag"[],
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Note_userId_idx" ON "public"."Note"("userId");

-- AddForeignKey
ALTER TABLE "public"."Note" ADD CONSTRAINT "Note_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("clerkUserId") ON DELETE CASCADE ON UPDATE CASCADE;
