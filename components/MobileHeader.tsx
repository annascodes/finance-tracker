'use client'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link'
import React from 'react'
import { HiOutlineTemplate } from "react-icons/hi";
import { HiOutlineViewGrid } from "react-icons/hi";
import { HiOutlineUser } from "react-icons/hi";
import { HiOutlineCollection } from "react-icons/hi";
import { HiOutlineHome } from "react-icons/hi";
import { LuBookText, LuNotebook } from "react-icons/lu";
import { LuBookPlus } from "react-icons/lu";
import { LuHouse } from "react-icons/lu";
import Drawer from './Drawer';
{/* <LuHouse /> // home  */ }
{/* <LuBookPlus /> // add records  */ }
{/* <LuBookText /> // records  */ }
{/* <HiOutlineHome /> //home */ }
{/* <HiOutlineCollection /> //records */ }
{/* <HiOutlineUser /> //profile  */ }
{/* <HiOutlineViewGrid /> //dashboard  */ }
{/* <HiOutlineTemplate /> //dashboard */ }

const MobileHeader = () => {
    const css = 'text-xs'
    const iconCss = 'text-xl'
    const linkCss ='btn btn-outline border-neutral-700 btn-xs'
    return (
        <div className='p-3 bg-neutral-800    w-full '>

            <SignedIn>
                <div className='flex justify-between items-center'>
                    <Drawer/>
                    <Link href={'/'} className="text-xl md:text-3xl font-bold ">Finance <span className="text-sm tracking-wider">Tracker.</span> </Link>

                    <div className='mx-5'>
                        <UserButton />
                    </div>
                </div>
                <div className='hidden flex flex-row justify-around  w-full gap-4 p-2 overflow-x-auto'>
                    <Link href={'/'} className={`${linkCss}`}>
                        <LuHouse className={`${iconCss}`} />
                        <span className={`${css}`} >Home</span>
                    </Link>
                    <Link href={'/dashboard'} className={`${linkCss}`}>
                        <HiOutlineViewGrid className={`${iconCss}`}/>
                        <span className={`${css}`} >Dashboard</span>
                    </Link>
                    <Link href={'/records'} className={`${linkCss}`}>
                        <LuBookText className={`${iconCss}`} />
                        <span className={`${css}`}>All Records</span>
                    </Link>
                    <Link href={'/records/addRecord'} className={`${linkCss}`}>
                        <LuBookPlus className={`${iconCss}`} />
                        <span className={`${css}`} >Add Record</span>
                    </Link>
                    <Link href={'/note'} className={`${linkCss}`}>
                        <LuNotebook className={`${iconCss}`} />
                        <span className={`${css}`} >Notes</span>
                    </Link>

                </div>

            </SignedIn>

            <SignedOut>
                <div className='flex justify-between items-center '>
                    <Link href={'/'} className="text-2xl md:text-3xl font-bold ">
                        Finance <span className="text-sm tracking-wider">Tracker.M</span>
                        
                    </Link>
                    <div className='flex flex-row   gap-2 p-2 overflow-x-auto'>
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
                </div>
            </SignedOut>



        </div>
    )
}

export default MobileHeader
