import { db } from "@/lib/db";

export async function getUserRecords(userId: string) {
  const records = await db.record.findMany({
    where: { userId },
    orderBy: { date: "desc" }, // sort by expense date
  });
  return records;
}
