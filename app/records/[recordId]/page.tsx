'use client'
import ErrorDiv from '@/components/ErrorDiv';
import RecordCard from '@/components/RecordCard';
import { useApiReq } from '@/lib/hooks/useApiReq';
import React, { use, useEffect, useState } from 'react'
import { AiTwotoneDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { RxBookmark } from "react-icons/rx";
import { RxBookmarkFilled } from "react-icons/rx";


import {
    LuUtensils,
    LuBus,
    LuShoppingBag,
    LuReceipt,
    LuTag
} from "react-icons/lu";
import RecordCategory from '@/components/RecordCategory';
import moment from 'moment';

const categories = [
    { label: "Food", icon: LuUtensils },
    { label: "Transport", icon: LuBus },
    { label: "Shopping", icon: LuShoppingBag },
    { label: "Bills", icon: LuReceipt },
    { label: "Other", icon: LuTag },
];

const page = ({ params }: { params: Promise<{ recordId: string }> }) => {

    const [text, setText] = useState("");
    const [amount, setAmount] = useState<number | "">("");
    const [category, setCategory] = useState("Other");
    const [date, setDate] = useState<string>("");


    const { recordId } = use(params);
    const { request, data, loading, error } = useApiReq()
    useEffect(() => {
        console.log('fetcing this record: ', recordId)
        // request(`/api/records/123`)
        request(`/api/records/${recordId}`)
    }, [])

    return (
        <div>

            {
                loading && <div className='flex flex-row h-40 justify-center items-center'>
                    <span className='loading loading-spinner loading-xl'></span>
                </div>
            }



            {data &&
                <div className='flex flex-col items-center'>
                    
                    {/* actions  */}
                    <div className='flex md:w-md w-sm justify-between items-center gap-5 my-5'>
                        <button className='flex items-center btn btn-ghost btn-sm'>
                            {true
                                ? <RxBookmarkFilled className='text-2xl' />
                                : <RxBookmark className='text-2xl' />
                            } 
                        </button>
                        <h1 className='text-5xl font-extrabold opacity-35'>Details</h1>
                        
                        <button className='flex items-center btn btn-ghost btn-sm'>
                            <AiTwotoneDelete className='text-2xl textred' />
                        </button>
                         
                    </div>

                    {/* card  */}
                    <div className='flex justify-center'>
                        <RecordCard record={data} />
                    </div>

                    {/* edit collapse div  */}
                    <div className="collapse md:w-md w-sm bg-base-100 my-10 border-base-300 border">
                        <input type="checkbox" />
                        <div className="collapse-title font-semibold flex items-center gap-5">
                            <button className='flex items-center btn btn-ghost btn-sm'>
                                <BiEdit className='text-2xl' />
                                <span className='text-neutral-500'>  Edit you record here:</span>
                            </button>

                        </div>
                        <div className="collapse-content text-sm">
                            {/* Amount */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Amount</span>
                                </label>
                                <input
                                    type="number"
                                    placeholder="Enter amount"
                                    className="input input-bordered w-full"
                                    value={data.amount}
                                    onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
                                    required
                                />
                            </div>

                            {/* Category */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Category</span>
                                </label>
                                <select
                                    className={`select select-bordered  w-full `}
                                    value={data.category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    {categories.map((cat) => (
                                        <option
                                            key={cat.label}
                                            value={cat.label}
                                            className={`flex flex-row items-center gap-4 `}>
                                            <RecordCategory category={cat.label} />
                                        </option>

                                    ))}
                                </select>
                            </div>

                            {/* Date */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Date</span>
                                </label>
                                <input
                                    type="date"
                                    className="input input-bordered w-full"
                                   value={moment(data.date).format("YYYY-MM-DD")}

                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                </div>
            }




            {
                error && <ErrorDiv error={error} />
            }

            {/* 
            <pre>
                {data && JSON.stringify(data, null, 10)}
            </pre> */}

        </div>
    )
}

export default page
