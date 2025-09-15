import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import colors from 'colors'

export async function POST(req: Request) {
    const body = await req.json()
    const { userId } = await auth()

    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    let newNote;
    try {
        console.log(`-----------1--------`.bgYellow)

        newNote = await db.note.create(
            {
                data: {
                    title: body.title,
                    text: body.text,
                    tags: body.tags,
                    userId // getting under line here
                }
            }
        )
        console.log(`-----------2-------`.bgYellow)
        return NextResponse.json(newNote, { status: 201 })
    } catch (error) {
        console.log(`-----------3--------`.bgRed)
        console.log(error)

        return NextResponse.json({ error: 'Error in creating note' }, { status: 500 })
    }
}

export async function GET(req: Request) {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    console.log(`###########################`)
    console.log(searchParams)

    const title = searchParams.get("title") ?? undefined;// ??=>keep '' as ''
    // const title = searchParams.get("title") || undefined; //turn''empty string to undefine 
    const text = searchParams.get("text") ?? undefined;
    // const tags = searchParams.getAll("tags"); // multiple ?tags=WORK&tags=BILLS
    const tags = searchParams.get('tags')?.split(',') || [];
    const createdAt = searchParams.get("createdAt") ?? undefined;

    const where: any = {
        userId,
    };

    console.log(`--------------------TAGS:--------------------`)
    console.log(tags)

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
         where.tags = { hasSome: tags };
         isfilter = true
    }
    if (createdAt) {
         where.createdAt = { gte: new Date(createdAt) };
         isfilter = true
    }
    
    console.log(`^^^^^^^^^^^^^^^^^^^^^^^^^^where^^^^^^^^^^^^^^^^^^^6`)
    console.log(where)

    const notes = await db.note.findMany({
        where,
        orderBy: { createdAt: "desc" },
        include: {
            user: { select: { name: true } },
        },
    });

    return NextResponse.json({notes, isfilter}, { status: 200 });
}

 