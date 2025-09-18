import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const amount = searchParams.get('amount')
  const category = searchParams.get('category')
  const date = searchParams.get('date')

  const where: any = { userId: user.id }

  if (amount) {
    console.log('---------------------amount----:', amount)
    where.amount = { lte: Number(amount) };
  }
  if (category) {
    console.log('---------------------category----:', category)
    where.category = category;
  }
  if (date) {
    console.log('---------------------date----:', date)
    where.date = {
      gte: new Date(date),
      lte: new Date(new Date(date).setHours(23, 59, 59, 999)),
    }
  }

  const records = await db.record.findMany({
    where,
    orderBy: { date: "desc" },
    take: 10, // just fetch latest 10
    include: {
      user: true
    }

  });

  return NextResponse.json(records);
}
