import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import colors from 'colors'

export async function GET(req: Request, { params }: { params: { recordId: string } }) {
    const { recordId } = params;
    console.log(`-------------------single record fetching-------------`.bgYellow)
    const record = await db.record.findUnique(
        {
            where: {
                id: recordId
            },
            include:{
              user: {select: {email:true, imageUrl:true, name:true}}
            }
        }
    )
    if(!record) return NextResponse.json({error:'Record not found'},{status: 404})
    
    return NextResponse.json(record)
}