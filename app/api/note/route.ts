import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    const body = await req.json()
    const { userId } = await auth()

    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    let newNote;
    try {
        // console.log(`-----------1--------`.bgYellow)
        console.log('-----------------userid----------------------------')
        console.log(userId)


        newNote = await db.note.create(
            {
                data: {
                    title: body.title,
                    text: body.text,
                    tags: body.tags,
                    userId:userId // getting under line here
                }
            }
        )
        // console.log(`-----------2-------`.bgYellow)
        return NextResponse.json(newNote, { status: 201 })
    } catch (error) {
        // console.log(`-----------3--------`.bgRed)
        console.log(error)

        return NextResponse.json({ error: 'Error in creating note' }, { status: 500 })
    }
}

export async function GET(req: Request) {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // console.log('--------------------------------------------------------------------')
    const { searchParams } = new URL(req.url);
    // console.log(searchParams)

    const title = searchParams.get("title") ?? undefined;// ??=>keep '' as ''
    // const title = searchParams.get("title") || undefined; //turn''empty string to undefine 
    const text = searchParams.get("text") ?? undefined;
    // const tags = searchParams.getAll("tags"); // multiple ?tags=WORK&tags=BILLS
    const tags = searchParams.get('tags')?.split(',') || [];
    const createdAt = searchParams.get("createdAt") ?? undefined;

    const where: Prisma.NoteWhereInput = {
        userId,
    };


    let isfilter = false
    if (title) {
        where.title = { contains: title, mode: "insensitive" };
        isfilter = true
    }
    if (text) {
        where.text = { contains: text, mode: "insensitive" };
        isfilter = true
    }
    if (tags.length > 0) {

        where.tags = { hasSome: tags }; // red line under hasSome
        isfilter = true
    }
    if (createdAt) {
        where.createdAt = { gte: new Date(createdAt) };
        isfilter = true
    }


    // console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
    //     console.log(where)

    const notes = await db.note.findMany({
        where,
        orderBy: { createdAt: "desc" },
        include: {
            user: { select: { name: true } },
        },
    });

    // console.log('***********************************************8')
    // console.log(notes)
    return NextResponse.json({ notes, isfilter }, { status: 200 });
}

