"use client";

import React, { useEffect, useState } from "react";
import { PiFilesBold } from "react-icons/pi";
import { HiOutlineRefresh } from "react-icons/hi";
import moment from "moment";
import RecordCategory from "./RecordCategory";

type Record = {
    id: string;
    text: string;
    amount: number;
    category: string;
    date: string;
    createdAt?: string;
};

const RecordsDiv = () => {
    const [records, setRecords] = useState<Record[]>([]);
    const [loading, setLoading] = useState(false);


    async function fetchRecords() {
        setLoading(true)
        try {
            const res = await fetch("/api/records");
            if (!res.ok) throw new Error("Failed to fetch records");
            const data = await res.json();
            setRecords(data);
        } catch (err) {
            console.error(err);
            setLoading(false)
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {

        fetchRecords();
    }, []);
    // console.log('reocords:', records)
    return (
        <div className="max-w-md p-6 border border-stone-700 shadow-xl rounded-2xl">
            <div className="text-xl font-bold mt-3 mb-10 flex flex-row justify-start items-center gap-4">
                <PiFilesBold className="text-4xl" />
                <div className="w-full">
                    <div className="flex justify-between items-center">Records
                        <button onClick={fetchRecords} className="btn btn-soft btn-xs mx-2"> <HiOutlineRefresh className="text-lg" /></button>


                    </div>

                    <p className="text-sm">Your recently added records.</p>
                </div>
            </div>

            {loading ? (
               <div className="flex justify-center text-center  min-w-80">
                <span className="loading loading-spinner loading-md"></span>
               </div>
            ) : records.length === 0 ? (
                <p>No records found.</p>
            ) : (
                <div className=" h-80 overflow-auto">
                    {records.map((r, indx) => (
                        <div key={r.id} className="flex min-w-80 flex-col gap-2 justify-between border border-stone-700 rounded-lg my-3 p-2">
                            <div className="flex justify-end">
                                <h1 className="badge badge-ghost badge-sm">{moment(r.createdAt).format('do MMMM YYYY')}</h1>
                            </div>

                            <div className="flex justify-between items-center w-full">
                                <h1>{r.text}</h1>
                            </div>

                            <div className="flex justify-between items-center w-full">
                                <h1 className="badge badge-ghost  ">
                                    <RecordCategory category={r.category} />
                                </h1>
                                <h1 className="badge badge-neutral ">$ {r.amount.toLocaleString("en-US")}</h1>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* <pre className="text-[10px]">
                {records && JSON.stringify(records, null, 10)}
            </pre> */}
        </div>
    );
};

export default RecordsDiv;
