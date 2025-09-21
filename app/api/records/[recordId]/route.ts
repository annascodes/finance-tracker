import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import colors from 'colors'
import { auth } from "@clerk/nextjs/server";
import moment from "moment";

export async function GET(req: Request, { params }: { params: { recordId: string } }) {
    const { recordId } = params;
    // console.log(`-------------------single record fetching-------------`.bgYellow)
    const record = await db.record.findUnique(
        {
            where: {
                id: recordId
            },
            include: {
                user: { select: { email: true, imageUrl: true, name: true } }
            }
        }
    )
    if (!record) return NextResponse.json({ error: 'Record not found' }, { status: 404 })

    return NextResponse.json(record)
}

export async function PUT(req: Request, { params }: { params: { recordId: string } }) {
    const body = await req.json()

    const { recordId } = params;
    const { userId } = await auth()
    if (!userId)
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const  date = moment(body.date)
        .utc()
        .set({ hour: 12 }) // set noon UTC
        .toISOString();

    try {

        const updRecord = await db.record.update({
            where: {
                id: recordId,
                userId
            },
            data: {
                text: body.text,
                amount: body.amount,
                category: body.category,
                date: date,
            }
        })
        return NextResponse.json(updRecord, { status: 200 })

    } catch (error) {
        console.log('Error in updated record api/records/[recordId] PUT', error)
        return NextResponse.json({ error: "Error in updated record" }, { status: 5000 })
    }
}

export async function DELETE(req: Request, { params }: { params: { recordId: string } }) {
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    try {
        const delRecord = await db.record.delete({
            where: {
                id: params.recordId,
                userId,
            }
        })
        return NextResponse.json({success: true,delRecord}, { status: 200 })
    } catch (error) {
        console.log('error in deleting record api/records/[recordId] DELETE', error)
        return NextResponse.json({ error: "Error in deleting record" }, { status: 500 })
    }
}