'use client'
import FilterRecord from '@/components/FilterRecord';
import RecordCategory from '@/components/RecordCategory'
import RecordDetailsModal from '@/components/RecordDetailsModal';
import { useApiReq } from '@/lib/hooks/useApiReq';
import moment from 'moment'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { BsThreeDots } from "react-icons/bs";
import { LuRefreshCw } from "react-icons/lu";


type User = {
    id: string;
    clerkUserId: string;
    email: string;
    name: string;
    imageUrl: string;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
};

type Record = {
    id: string;
    text: string;
    amount: number;
    category: string;
    date: string;      // ISO date string
    userId: string;
    createdAt: string; // ISO date string
    user: User;
};


const page = () => {
    // const [data, setData] = useState<Record[] | null>(null);
    // const [loading, setLoading] = useState(true)
    // const [err, setErr] = useState(null)
    const { request, data, loading, error } = useApiReq<Record[]>()

    useEffect(() => {
        // async function getRecords() {
        //     setLoading(true)
        //     try {

        //         const res = await fetch('/api/records')
        //         const result = await res.json()
        //         if (!res.ok) {
        //             setErr(result.error)
        //             setLoading(false)
        //             setData(null)
        //         } else {
        //             setData(result)
        //             setLoading(false)
        //             setErr(null)
        //         }

        //     } catch (error) {
        //         console.log('err in fetching records: ')
        //         console.log(error)
        //     }
        // }

        // getRecords()
        request("/api/records", "GET");
    }, [])


    const handleFilter = (data: { amount: number | '', category: string; date: string; }) => {
        console.log('filtering data :', data)
        request(`/api/records?amount=${data.amount}&category=${data.category}&date=${data.date}`)
    }
    const handleRefresh = () => {
        request('/api/records', 'GET')
    }
    return (
        <div>
            <h1 className="text-2xl text-center justify-center flex flex-row items-center gap-2 font-bold my-1 md:my-5">
                <span className="text-sm tracking-wider mx-1">your's</span>
                Records
                <button
                    onClick={handleRefresh}
                    className='btn btn-ghost btn-sm '>
                    <LuRefreshCw className='text-xl' />
                </button>
            </h1>

            <FilterRecord handleFilter={handleFilter} loading={loading} />
            {
                error && <pre className='text-xs text-red-400'>{error && JSON.stringify(error, null, 10)}</pre>
            }


            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                {/* <label>
                                    <input type="checkbox" className="checkbox" />
                                </label> */}
                            </th>
                            <th>User</th>
                            <th>Description | Tag</th>
                            <th>Amount</th>
                            <th>Entery for</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loading ?

                                <tr >
                                    <th>
                                        <span className='loading loading-dots loading-xs'></span>
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <span className='loading loading-dots loading-xs'></span>
                                                </div>
                                            </div>

                                        </div>
                                    </td>
                                    <td>
                                        <p className=' max-w-56 '>
                                            <span className='loading loading-dots loading-xs'></span>

                                        </p>

                                    </td>
                                    <td>
                                        <span className='loading loading-dots loading-xs'></span>
                                    </td>
                                    <th>
                                        <span className='loading loading-dots loading-xs'></span>
                                    </th>
                                    <td>
                                        <span className='loading loading-dots loading-xs'></span>
                                    </td>
                                </tr>
                                : data && data.map((r, indx) => {
                                    return (
                                        <tr key={r.id}>
                                            <th>
                                                {/* <label>
                                                <input type="checkbox" className="checkbox" />
                                            </label> */}
                                                {++indx}
                                            </th>
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle h-12 w-12">
                                                            <img
                                                                src={r.user.imageUrl || "https://img.daisyui.com/images/profile/demo/2@94.webp"}
                                                                alt="Avatar Tailwind CSS Component" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold">
                                                            {r.user.name}
                                                        </div>
                                                        <div className="text-sm opacity-50">
                                                            {r.user.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p className=' max-w-56 '>
                                                    {
                                                        r.text.length > 40
                                                            ?
                                                            <>
                                                                {r.text.slice(0, 40)} . . .
                                                            </>
                                                            :
                                                            r.text
                                                    }

                                                </p>
                                                <br />
                                                <span className="badge badge-neutral">
                                                    <RecordCategory category={r.category} />
                                                </span>
                                            </td>
                                            <td className='min-w-40'>
                                                Rs {r.amount.toLocaleString('en-US')} /-
                                            </td>
                                            <th className='min-w-40'>
                                                {moment(r.date).format('Do MMMM YYYY')}
                                                <br />
                                                <span className="badge badge-secondary badge-xs tracking-widest">
                                                    {moment(r.date).fromNow()}
                                                </span>

                                            </th>
                                            <td>
                                                <Link href={`/records/${r.id}`} target='_blank' className='btn btn-outline btn-xs tracking-widest'>
                                                    details
                                                </Link>
                                                {/* <RecordDetailsModal/> */}
                                            </td>
                                        </tr>
                                    )
                                })
                        }

                        {
                            // data && data.map((r, indx) => {
                            //     return (
                            //         <tr key={r.id}>
                            //             <th>
                            //                 {/* <label>
                            //                     <input type="checkbox" className="checkbox" />
                            //                 </label> */}
                            //                 {++indx}
                            //             </th>
                            //             <td>
                            //                 <div className="flex items-center gap-3">
                            //                     <div className="avatar">
                            //                         <div className="mask mask-squircle h-12 w-12">
                            //                             <img
                            //                                 src={r.user.imageUrl || "https://img.daisyui.com/images/profile/demo/2@94.webp"}
                            //                                 alt="Avatar Tailwind CSS Component" />
                            //                         </div>
                            //                     </div>
                            //                     <div>
                            //                         <div className="font-bold">
                            //                             {r.user.name}
                            //                         </div>
                            //                         <div className="text-sm opacity-50">
                            //                             {r.user.email}
                            //                         </div>
                            //                     </div>
                            //                 </div>
                            //             </td>
                            //             <td>
                            //                 <p className=' max-w-56 '>
                            //                     {
                            //                         r.text.length > 40
                            //                             ?
                            //                             <>
                            //                                 {r.text.slice(0, 40)} . . .
                            //                             </>
                            //                             :
                            //                             r.text
                            //                     }

                            //                 </p>
                            //                 <br />
                            //                 <span className="badge badge-neutral">
                            //                     <RecordCategory category={r.category} />
                            //                 </span>
                            //             </td>
                            //             <td className='min-w-40'>
                            //                 Rs {r.amount.toLocaleString('en-US')} /-
                            //             </td>
                            //             <th className='min-w-40'>
                            //                 {moment(r.createdAt).format('do MMMM YYYY')}
                            //                 <br />
                            //                 <span className="badge badge-secondary badge-xs tracking-widest">
                            //                     {moment(r.createdAt).fromNow()}
                            //                 </span>

                            //             </th>
                            //             <td>
                            //                 <button className='btn btn-outline btn-xs tracking-widest'>
                            //                     details
                            //                 </button>
                            //             </td>
                            //         </tr>
                            //     )
                            // })
                        }



                    </tbody>
                    {/* foot */}
                    {/* <tfoot>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th></th>
                        </tr>
                    </tfoot> */}
                </table>
                {
                    (data && data.length === 0) &&
                    <p className='text-center tracking-widest my-10  '> no records found</p>
                }
            </div>


            
            <pre>
                {data && JSON.stringify(data, null, 10)}
            </pre>

        </div>
    )
}

export default page
