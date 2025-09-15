import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

type putParamType = {
    params: {
        noteId: string
    }
}
export async function PUT(req: Request, { params }: { params: { noteId: string } }) {
    const body = await req.json()
    const { userId } = await auth()

    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    try {
        const updatedNote = await db.note.update({
            where:{
                id: params.noteId,
                userId,
            },
            data:{
                title: body.title,
                text: body.text,
                tags: body.tags,
            }
        })

        return NextResponse.json(updatedNote,{status: 200})
    } catch (error) {
        console.log("Error in api/note/[noteId]=>put", error)
        return NextResponse.json({error: "Error while updating the Note."},{status: 500})
    }


}