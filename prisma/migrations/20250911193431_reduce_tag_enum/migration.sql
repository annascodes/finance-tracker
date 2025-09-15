/*
  Warnings:

  - The values [FOOD,ENTERTAINMENT,TRAVEL,EDUCATION,SHOPPING,SAVINGS,GIFTS] on the enum `Tag` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."Tag_new" AS ENUM ('WORK', 'PERSONAL', 'HOME', 'MEDICAL', 'BILLS', 'OTHER');
ALTER TABLE "public"."Note" ALTER COLUMN "tags" TYPE "public"."Tag_new"[] USING ("tags"::text::"public"."Tag_new"[]);
ALTER TYPE "public"."Tag" RENAME TO "Tag_old";
ALTER TYPE "public"."Tag_new" RENAME TO "Tag";
DROP TYPE "public"."Tag_old";
COMMIT;
