"use client";
import React from "react";
import { LuPencil } from "react-icons/lu";
import NoteForm from "./NoteForm";
import { IoMdClose } from "react-icons/io";

type PropType = {
    id: string;
    note: any;
}
const NoteEditModal = ({ id, note }: PropType) => {
    const modalId = `${id}-note-edit-modal`
    return (
        <div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button className='flex items-center gap-2'
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
                        <NoteForm key={note.id} preBuilt={note} />
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
