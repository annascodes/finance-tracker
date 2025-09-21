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
import RecordEditModal from '@/components/RecordEditModal';
import DeletePermitModal from '@/components/DeletePermitModal';
import toast from 'react-hot-toast';

const categories = [
    { label: "Food", icon: LuUtensils },
    { label: "Transport", icon: LuBus },
    { label: "Shopping", icon: LuShoppingBag },
    { label: "Bills", icon: LuReceipt },
    { label: "Other", icon: LuTag },
];

type RecordType = {
    id: string;
    text: string;
    amount: number;
    category: string;
    date: string;      // ISO string
    userId: string;
    createdAt: string; // ISO string
    user: {
        email: string;
        imageUrl: string;
        name: string;
    };
};

const Page = ({ params }: { params: Promise<{ recordId: string }> }) => {

    const [data, setData] = useState<RecordType | null>(null) // versel error for any type
    const [delPermit, setDelPermit] = useState<string | null>(null)


    const { recordId } = use(params);
    const { request, data: record, loading, error } = useApiReq()
    const { request: delReq,
        data: delData,
        loading: delLoading,
        error: delError
    } = useApiReq()
    useEffect(() => {
        // console.log('fetcing this record: ', recordId)
        request(`/api/records/${recordId}`)
    }, [])
    useEffect(() => {
        if (record) {
            setData(record)
        }
    }, [record])
    useEffect(() => {
        if (!delData && delPermit) {
            delReq(`/api/records/${delPermit}`, 'DELETE')
        }
        if (delData && delData.success) {
            toast.success('Record permanently deleted')
        }
    }, [delPermit, delData])


    return (
        <div  >

            {
                loading && <div className='flex flex-row h-40 justify-center items-center'>
                    <span className='loading loading-spinner loading-xl'></span>
                </div>
            }

            {/* <pre className='text-orange-300 text-[10px]'>
                {data && JSON.stringify(data, null, 10)}
            </pre> */}


            {data &&
                <div className='flex flex-col items-center'>
                    <h1 className="text-5xl md:text-5xl text-center font-bold my-5 opacity-30">

                        <span className="text-sm tracking-wider mx-1">record</span>
                        Details

                    </h1>

                    {/* actions  */}
                    {
                        !delData &&
                        <div className='mx-auto max-w-lg flex justify-end items-center gap-5 w-full px-5'>
                            <RecordEditModal id={data.id} preBuilt={data} setData={setData} />
                            <DeletePermitModal
                                id={data.id}
                                setPermit={setDelPermit}
                                permit={delPermit}
                                prompt={'Do really want to delete this record, it would be deleted permanently.'}
                                loading={delLoading}
                            />
                        </div>
                    }

                    {delData && <h1 className='text-4xl tracking-widest text-red-400 text-center font-thin '>This record is DELETED</h1>}


                    {/* card  */}
                    <div className='flex justify-center'>
                        <RecordCard record={data} />
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

export default Page
