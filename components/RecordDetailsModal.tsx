import React from 'react'
import { LuNotebookPen, LuNotebook } from "react-icons/lu"; // create note and your notes
import NoteForm from './NoteForm';

const RecordDetailsModal = () => {
    return (
        <div>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <button
                className='btn btn-outline btn-xs tracking-widest'
                onClick={() => {
                    const modal = document.getElementById("my_modal_3Record-detail-modal") as HTMLDialogElement | null;
                    modal?.showModal();
                }
                }
            >
details
            </button>
            <dialog id="my_modal_3Record-detail-modal" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    fill it
                </div>
            </dialog>

        </div>
    )
}

export default RecordDetailsModal
