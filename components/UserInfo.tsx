import React from 'react'
import type { User } from '@clerk/nextjs/server'
import moment from 'moment';
import { CiCalendarDate } from 'react-icons/ci';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { FaRegCalendarPlus } from 'react-icons/fa'; 

type UserInfoProps = { user: User; }


const UserInfo = ({ user }: UserInfoProps) => {
    return user && (
        <div className='max-w-3xl mx-auto border  border-stone-700 rounded-2xl'>
            <ul className="list  rounded-box shadow-md">

                <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Brief information regarding user</li>

                <li className="list-row">
                    <div><img className="size-10 rounded-box" src={user.imageUrl} /></div>
                    <div>
                        <div className='font-bold text-lg'>{user.firstName} {user.lastName}</div>
                        {/* <div className="text-xs uppercase font-semibold opacity-60">Cappuccino</div> */}
                        <p className="list-col-wrap text-sm">
                           Quickly gained attention for its smooth melody and relatable themes. The songs success propelled Sabrino into the spotlight, solidifying their status as a rising star.
                        </p>
                        <div className='p-4 pb-2 text-xs opacity-90 tracking-wide flex flex-row gap-2 items-center'>

                            <div className='border border-stone-700  p-2 rounded-lg flex flex-col md:flex-row justify-center items-center '>
                                <div className='flex flex-row items-center gap-2'> <FaRegCalendarPlus className='text-lg' /> <span>Created </span>
                                </div>
                                <div className="badge badge-secondary badge-xs tracking-wider m-1 ">
                                    {/* {moment(user.createdAt).format(`dddd, Do MMMM YYYY`)} */}
                                    {moment(user.createdAt).format(`D  MMMM YYYY`)}
                                </div>
                            </div>
                            <div className='border border-stone-700  p-2 rounded-lg  flex flex-col md:flex-row justify-center items-center '>
                                <div className='flex flex-row items-center gap-2'> <AiOutlineClockCircle className='text-lg' /> <span>Last active </span>
                                </div>
                                <div className="badge badge-secondary badge-xs tracking-wider m-1 ">
                                    {moment(user.createdAt).fromNow()}
                                </div>
                            </div>



                        </div>

                    </div>
                    {/* <p className="list-col-wrap text-xs">
                        "Cappuccino" quickly gained attention for its smooth melody and relatable themes. The song’s success propelled Sabrino into the spotlight, solidifying their status as a rising star.
                    </p> */}

                </li>


                {/* <li className='p-4 pb-2 text-xs opacity-60 tracking-wide flex flex-row gap-2 items-center'>
                     <div className="badge badge-primary badge-outline badge-sm tracking-wider ">
                     created {moment(user.createdAt).fromNow()}
                    </div>
                     <div className="badge badge-primary badge-outline badge-sm tracking-wider ">
                      last active {moment(user.lastActiveAt).fromNow()}
                    </div>
                      
                    
                </li> */}

            </ul>


        </div>
    )
}

export default UserInfo
