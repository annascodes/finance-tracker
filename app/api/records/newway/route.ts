import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";

export async function GET(req: Request) {
    
    const user = await currentUser();
    if (!user) {
        return NextResponse.json({ error: "Not signed in" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const amount = searchParams.get("amount");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const cursor = searchParams.get("cursor"); // last record id
    const limit = Number(searchParams.get("limit")) || 5;

    const where: Prisma.RecordWhereInput = { userId: user.id };  //FFV
    const filterData:{[key:string]:string}={};

    if (category && category!=='undefined' && category!='' && category!=='Null') {
        // console.log(`-----category-----` )
        // console.log(category)
        filterData['category'] = category
        where.category = category;
    }
    if (amount && amount!=='undefined' && amount!='') {
        // console.log(`-----amount-----`)
        // console.log(amount)
        // console.log(typeof amount)
        filterData['amount']= amount;
        where.amount = {lte: Number(amount)};
    }

    if (startDate && endDate && startDate!=='undefined' && startDate!='' && endDate!=='undefined' && endDate!='') {
        filterData['startDate']=startDate
        filterData['endDate']=endDate
        // console.log(`-----startDate-----` )
        // console.log(startDate)
        // console.log(`-----endDate-----` )
        // console.log(endDate)
        where.date = {
            gte: new Date(startDate), // >= startDate
            lte: new Date(new Date(endDate).setHours(23, 59, 59, 999)), // <= endDate
        };
    }

    const records = await db.record.findMany({
        where,
        orderBy: { date: "desc" },
        take: limit + 1, // fetch 1 extra for nextCursor check
        // ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
        ...(cursor ? { cursor: { id: cursor } } : {}),
        include: {
            user: true,
        },
    });

    let nextCursor = null;
    if (records.length > limit) {
        const nextItem = records.pop(); // remove extra one
        nextCursor = nextItem?.id ?? null;
    }

    const report = await db.record.aggregate({
        where,
        _sum: {amount: true},
        _count: {_all:true}
    })

    return NextResponse.json({
        records,
        nextCursor,
        report,
        filterData: Object.keys(filterData).length>0 ? filterData: null
    });
}
