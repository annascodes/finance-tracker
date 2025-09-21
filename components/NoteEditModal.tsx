"use client";
import React, { Dispatch, SetStateAction } from "react";
import { LuPencil } from "react-icons/lu";
import NoteForm from "./NoteForm";
import { IoMdClose } from "react-icons/io";
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
type PropType = {
    id: string;
    note: Note;
    setData: Dispatch<SetStateAction<NotesResponse | null>>
}
const NoteEditModal = ({ id, note, setData }: PropType) => {
    const modalId = `${id}-note-edit-modal`
    return (
        <div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button className='flex items-center gap-2 cursor-pointer'
                onClick={() => {
                    const modal = document.getElementById(modalId) as HTMLDialogElement | null;
                    modal?.showModal();
                }}>
                <LuPencil />

            </button>
            <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box p-0">
                    <div className="modal-action m-1  ">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}

                            <button className="btn btn-soft btn-error btn-xs tracking-widest uppercase"> <IoMdClose className="" />Close</button>
                        </form>
                    </div>

                    <p className="  ">
                        <NoteForm setData={setData} key={note.id} preBuilt={note} />
                        {/* <pre className="text-xs text-blue-400">
                            {JSON.stringify(note, null, 10)}
                        </pre> */}
                    </p>

                </div>
            </dialog>
        </div>
    );
};

export default NoteEditModal;
