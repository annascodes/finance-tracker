import RecordsDiv from '@/components/RecordsDiv'
import RecordForm from '@/components/RecorForm'
import UserInfo from '@/components/UserInfo'
import { SignInButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'

const page: React.FC = async () => {
    const user = await currentUser()
    return user ? (
        <div>
            <h1 className="text-xl text-center font-bold">Dashboard<span className="text-sm tracking-wider">.</span> </h1>

            <div className='my-5'>
                <UserInfo user={user} />
            </div>
            <div className="my-5 flex justify-center  flex-wrap  gap-5 ">
                <RecordsDiv/>
                <RecordForm />
            </div>


        </div>
    ) :
        <div className=' h-screen flex flex-col justify-center items-center '>
            <div className='border border-stone-200 flex flex-col justify-center items-center gap-5 p-5 rounded-2xl shadow-2xl shadow-stone-900'>
                <p>For Dashboard, you need sign in. </p>
                <SignInButton><button className='btn btn-neutral btn-sm tracking-wider'>Sign in</button></SignInButton>
            </div>
        </div>
}

export default page
