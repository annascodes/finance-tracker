'use client'
import React, { Dispatch, SetStateAction } from 'react'
import { LuNotebookPen } from 'react-icons/lu';
import NoteForm from './NoteForm';
type Note = {
    id: string;
    title: string;
    text: string;
    tags: string[];
    createdAt: string;
};

type NotesResponse = {
    notes: Note[];
    isfilter?: boolean;
};
type PropType={
    setData: Dispatch<SetStateAction<NotesResponse | null>>
}

const CreateNoteModal = ({setData}:PropType) => {
    return (
        <div>
            
            <button
                className='btn btn-outline border-dashed text-xs tracking-widest'
                onClick={() => {
                    const modal = document.getElementById("my_modal_3-CreateNoteModal") as HTMLDialogElement | null;
                    modal?.showModal();
                }
                }
            >
                <LuNotebookPen className='text-xl' />
                Create note
            </button>
            <dialog id="my_modal_3-CreateNoteModal" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div className='mt-5'>
                        <NoteForm  setData={setData} />
                    </div>
                </div>
            </dialog>

        </div>
    )
}

export default CreateNoteModal
