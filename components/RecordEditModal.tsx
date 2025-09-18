import React, { Dispatch, SetStateAction } from 'react'
import { IoMdClose } from 'react-icons/io';
import { LuPencil } from 'react-icons/lu';
import RecordForm from './RecorForm';

type PropType = {
    id: string;
    preBuilt: any | null;
    setData: Dispatch<SetStateAction<any | null>>
}
const RecordEditModal = ({id, preBuilt, setData}:PropType) => {
     const modalId = `${id}-recordeditmodal`
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
                               <button className="btn btn-error btn-xs tracking-widest uppercase"> <IoMdClose className="" />Close</button>
                           </form>
                       </div>
   
                    <div className='flex justify-center mb-5'>
                          <RecordForm preBuilt={preBuilt} setData={setData} />
                    </div>
   
                   </div>
               </dialog>
           </div>
  )
}

export default RecordEditModal
