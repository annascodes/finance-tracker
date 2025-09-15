import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link'
import React from 'react'
import { HiOutlineTemplate } from "react-icons/hi";
import { HiOutlineViewGrid } from "react-icons/hi";
import { HiOutlineUser } from "react-icons/hi";
import { HiOutlineCollection } from "react-icons/hi";
import { HiOutlineHome } from "react-icons/hi";
import { LuBookText } from "react-icons/lu";
import { LuBookPlus } from "react-icons/lu";
import { LuHouse } from "react-icons/lu";
{/* <LuHouse /> // home  */ }
{/* <LuBookPlus /> // add records  */ }
{/* <LuBookText /> // records  */ }
{/* <HiOutlineHome /> //home */ }
{/* <HiOutlineCollection /> //records */ }
{/* <HiOutlineUser /> //profile  */ }
{/* <HiOutlineViewGrid /> //dashboard  */ }
{/* <HiOutlineTemplate /> //dashboard */ }

const MobileHeader = () => {
    return (
        <div className='p-3 bg-neutral-800    w-full '>
            <Link href={'/'} className="text-xl md:text-3xl font-bold ">Finance <span className="text-sm tracking-wider">Tracker.M</span> </Link>
            <SignedIn>
                <div className='flex flex-row  w-full gap-2 p-2 overflow-x-auto'>
                    <Link href={'/'} className='btn btn-outline btn-xs'>
                        <LuHouse className='text-xl ' />
                        <span className='' >Home</span>
                    </Link>
                    <Link href={'/dashboard'} className='btn btn-outline btn-xs'>
                        <HiOutlineViewGrid className='text-xl ' />
                        <span className='' >Dashboard</span>
                    </Link>
                    <Link href={'/dashboard'} className='btn btn-outline btn-xs'>
                        <LuBookText className='text-xl ' />
                        <span className='' >All Records</span>
                    </Link>
                    <Link href={'/dashboard'} className='btn btn-outline btn-xs'>
                        <LuBookPlus className='text-xl ' />
                        <span className='' >Add Record</span>
                    </Link>
                    <Link href={'/dashboard'} className='btn btn-outline btn-xs'>
                        <HiOutlineUser className='text-xl ' />
                        <span className='' >Profile</span>
                    </Link>
                    <div  className='mx-5'>
                        <UserButton />
                    </div>
                </div>

            </SignedIn>

            <SignedOut>
                <div className='flex flex-row  w-full gap-2 p-2 overflow-x-auto'>
                    <SignUpButton>
                        <button className='btn btn-outline btn-xs'>
                            {/* <HiOutlineHome className='text-xl ' /> */}
                            <span className='' >Sign Up</span>
                        </button>
                    </SignUpButton>
                    <SignInButton>
                        <button className='btn btn-outline btn-xs'>
                            {/* <HiOutlineHome className='text-xl ' /> */}
                            <span className='' >Sign In</span>
                        </button>
                    </SignInButton>
                </div>
            </SignedOut>



        </div>
    )
}

export default MobileHeader
