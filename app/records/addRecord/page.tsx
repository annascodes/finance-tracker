import RecordForm from '@/components/RecorForm'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col gap-5 justify-center items-center md:h-svh'>
        <h1 className='text-center text-4xl font-extrabold tracking-widest text-neutral-700'>Add Record</h1>
       <div className='min-w-sm max-w-xl'>

         <RecordForm/>
       </div>
      
    </div>
  )
}

export default page
