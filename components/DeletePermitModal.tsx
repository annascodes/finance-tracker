// 'use client'
import React, { Dispatch, ReactNode, SetStateAction } from 'react'
import { LuTrash2 } from 'react-icons/lu';

type PropType = {
    id: string;
    setPermit: Dispatch<SetStateAction<string | null>>;
    prompt: ReactNode;
    loading?: boolean
    permit: string | null
}
const DeletePermitModal = ({ id, setPermit, prompt, loading, permit }: PropType) => {
    const modalId = `${id}-delete-permit-modal`
    return (
        <div>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <button disabled={loading&& permit=== id} className='cursor-pointer hover:text-red-400 duration-300'
            onClick={() => {
                const modal = document.getElementById(modalId) as HTMLDialogElement | null;
                modal?.showModal()
            }}> 
            {(loading&& permit=== id)? <span className='loading text-red-400 loading-spinner loading-xs'></span>: <LuTrash2 /> }
            
            
            </button>
            <dialog id={modalId} className="modal">
                <div className="modal-box">

                    <h3 className="font-bold text-lg text-red-500">Permission to DELETE !!!</h3>
                    <p className="py-4">
                        {prompt}
                    </p>
                    <form method="dialog" className='flex justify-between'>
                        {/* if there is a button in form, it will close the modal */}
                        <button onClick={()=>setPermit(id)} className="btn btn-error">Yes</button>
                        <button className="btn btn-outline">No</button>
                    </form>
                </div>
            </dialog>

        </div>
    )
}

export default DeletePermitModal
