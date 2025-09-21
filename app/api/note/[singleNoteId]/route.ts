import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"


export async function PUT(req: Request, { params }: { params: Promise<{ singleNoteId: string }> }) {
    const body = await req.json()
    const { userId } = await auth()
    const { singleNoteId } = await params;

    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    try {
        const updatedNote = await db.note.update({
            where: {
                id: singleNoteId,
                userId,
            },
            data: {
                title: body.title,
                text: body.text,
                tags: body.tags,
            }
        })

        return NextResponse.json(updatedNote, { status: 200 })
    } catch (error) {
        console.log("Error in api/note/[noteId]=>put", error)
        return NextResponse.json({ error: "Error while updating the Note." }, { status: 500 })
    }


}

export async function DELETE(req: Request, { params }: { params: Promise<{ singleNoteId: string }> }) {
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const { singleNoteId } = await params;
    try {
        const delNote = await db.note.delete({
            where: { userId, id: singleNoteId }
        })
        console.log('-----------JUST DELETED THIS---------------')
        console.log(delNote)
        return NextResponse.json({ delId: delNote.id, delNoteTitle:delNote.title, success: true, message: 'Deleted successfully' }, { status: 200 })

    } catch (error) {
        console.log('error in deleting note path: api/note/[noteId]=>DELETE', error)
        return NextResponse.json({ error: 'Error in deleting note' }, { status: 500 })
    }
}