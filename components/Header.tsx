'use client'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { HiOutlineTemplate } from "react-icons/hi";
import { HiOutlineViewGrid } from "react-icons/hi";
import { HiOutlineUser } from "react-icons/hi";
import { HiOutlineCollection } from "react-icons/hi";
import { HiOutlineHome } from "react-icons/hi";
import { LuBookText } from "react-icons/lu";
import { LuBookPlus } from "react-icons/lu";
import { LuHouse } from "react-icons/lu";
import { LuNotebookPen, LuNotebook } from "react-icons/lu"; // create note and your notes
{/* <LuHouse /> // home  */ }
{/* <LuBookPlus /> // add records  */ }
{/* <LuBookText /> // records  */ }
{/* <HiOutlineHome /> //home */ }
{/* <HiOutlineCollection /> //records */ }
{/* <HiOutlineUser /> //profile  */ }
{/* <HiOutlineViewGrid /> //dashboard  */ }
{/* <HiOutlineTemplate /> //dashboard */ }

const Header = () => {
    const classname = `btn btn-soft`
    const pathName = usePathname()
    return (
        <div className='p-3 flex flex-col gap-5 '>
            <Link href={'/'} className="text-xl md:text-3xl font-bold ">Finance <span className="text-sm tracking-wider">Tracker.</span> </Link>

            <SignedIn>

                <div className='flex flex-col justify-start items-start gap-5 h-svh overflow-auto '>
                    <Link href={'/'} className={`${classname} 
                    ${pathName === '/' && 'btn-active '} `}>
                        <LuHouse className='text-xl ' />
                        <span className='hidden lg:flex' >Home</span>
                    </Link>
                    <Link href={'/dashboard'} className={`${classname}
                     ${pathName === '/dashboard' && 'btn-active'}`}>
                        <HiOutlineViewGrid className='text-xl ' />
                        <span className='hidden lg:flex' >Dashboard</span>
                    </Link>
                    <Link href={'/records'} className={`${classname}`}>
                        <LuBookText className='text-xl ' />
                        <span className='hidden lg:flex' >All Records</span>
                    </Link>
                    <Link href={'/records/addRecord'} className={`${classname}`}>
                        <LuBookPlus className='text-xl ' />
                        <span className='hidden lg:flex' >Add Records</span>
                    </Link>
                    <Link href={'/note'} className={`${classname}`}>
                        <LuNotebookPen className='text-xl ' />
                        <span className='hidden lg:flex' >Add note</span>
                    </Link>
                    <Link href={'/note'} className={`${classname}`}>
                        <LuNotebook className='text-xl ' />
                        <span className='hidden lg:flex' >Your notes</span>
                    </Link>


                    




                    <Link href={'/dashboard'} className={`${classname}`}>
                        <HiOutlineUser className='text-xl ' />
                        <span className='hidden lg:flex' >Profile</span>
                    </Link>
                    <Link href={'/dashboard'} className={`${classname}`}>
                        {/* <HiOutlineUser className='text-xl ' /> */}
                        <UserButton />
                    </Link>
                </div>
            </SignedIn>
            <SignedOut>
                <div className='flex flex-col justify-start items-start gap-5 h-svh overflow-auto '>
                    <SignUpButton>
                        <button className={`${classname}`}>
                            <HiOutlineHome className='text-xl ' />
                            <span className='hidden lg:flex' >Sign Up</span>
                        </button>
                    </SignUpButton>
                    <SignInButton>
                        <button className={`${classname}`}>
                            <HiOutlineHome className='text-xl ' />
                            <span className='hidden lg:flex' >Sign In</span>
                        </button>
                    </SignInButton>
                </div>
            </SignedOut>


        </div>
    )
}

export default Header
