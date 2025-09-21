"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FaCreditCard } from "react-icons/fa6";

import { FaUtensils, FaBus, FaShoppingBag, FaFileInvoice, FaTag } from "react-icons/fa";
import addExpenseRecord from "@/app/actions/addExpenseRecord";
import toast from "react-hot-toast";

//  const categories = [
//   { label: "Food", icon: FaUtensils },
//   { label: "Transport", icon: FaBus },
//   { label: "Shopping", icon: FaShoppingBag },
//   { label: "Bills", icon: FaFileInvoice },
//   { label: "Other", icon: FaTag },
// ];
// import {
//     LuUtensils,
//     LuBus,
//     LuShoppingBag,
//     LuReceipt,
//     LuTag
// } from "react-icons/lu";
import RecordCategory from "./RecordCategory";
import moment from "moment";
import { useApiReq } from "@/lib/hooks/useApiReq";
import ErrorDiv from "./ErrorDiv";
import { categories } from "@/lib/hardData";
import { redirect } from "next/navigation";
import { RecordType } from "@/lib/types";

// const categories = [
//     { label: "Food", icon: LuUtensils },
//     { label: "Transport", icon: LuBus },
//     { label: "Shopping", icon: LuShoppingBag },
//     { label: "Bills", icon: LuReceipt },
//     { label: "Other", icon: LuTag },
// ];

type RecordType_ = {
    id?: string;
    text: string;
    amount: number;
    category: string;
    date: Date;


}

type PropType = {
    preBuilt?: RecordType | null;
    setData?: Dispatch<SetStateAction<RecordType | null>>
}
const RecordForm = ({ preBuilt, setData }: PropType) => {
    const [text, setText] = useState("");
    const [amount, setAmount] = useState<number | "">("");
    const [category, setCategory] = useState("Other");
    const [date, setDate] = useState<string | Date>("");
    const [loading, setLoading] = useState(false)
    const { request: updRequest, data: updData, loading: updLoading, error: updError } = useApiReq()

    useEffect(() => {
        if (preBuilt) {
            console.log('-----------HERE-----------------')
            setText(preBuilt?.text ?? '')
            setAmount(preBuilt?.amount ?? '')
            setCategory(preBuilt?.category ?? '')
            setDate(preBuilt?.date ?? '')
        }
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true)

        const newRecord: RecordType = {
            text,
            amount: Number(amount),
            category,
            date: date ? new Date(date) : new Date(),
        };

        // console.log("Submitting record:", newRecord);
        const { error, data } = await addExpenseRecord(newRecord)

        if (error) {
            console.log('error: ', error)
        }
        if (data) {
            setLoading(false)
            toast.success('Record has saved.')
            // console.log('data: ', data)
            redirect(`/records/${data.id}`)
        }

        // Reset form
        setText("");
        setAmount("");
        setCategory("Other");
        setDate("");
        setLoading(false)
    };

    const handleUpdate = () => {
        // console.log('updating record: ', `/api/records/${preBuilt?.id}`)
        updRequest(`/api/records/${preBuilt?.id}`, 'PUT', { text, amount, category, date })
    }

    useEffect(() => {
        if (updData) {
            toast.success('Updated successfully !!!')
            if (setData)

                setData((prev) => {
                    if (!prev) return prev;
                    console.log('prev:', prev)
                    return {
                        ...prev,
                        text: updData.text,
                        amount: updData.amount,
                        category: updData.category,
                        date: updData.date
                    }
                })
        }
    }, [updData])


    // console.log('In RecordForm.tsx component: ')
    // console.log('text: ', text)
    // console.log('amount: ', amount)
    // console.log('category: ', category)
    // console.log('date: ', date)
    // console.log('preBuilt: ', preBuilt)

    return (
        <form


            // className="max-w-md mx-auto p-6 shadow-xl rounded-xl bg-base-100 space-y-4"
            className="max-w-md p-6 border border-stone-700 shadow-xl rounded-2xl "
        >
            <div className="text-xl font-bold mt-3 mb-10  flex flex-row justify-start items-center gap-4">
                {/* <pre className="text-blue-400 text-[10px]">
                    prebuilt:
                    {preBuilt && JSON.stringify(preBuilt, null, 10)}
                </pre> */}

                {preBuilt ?
                    <>
                        <FaCreditCard className="text-2xl" />
                        <div className="">
                            <p>Update Expense / Record</p>
                        </div>
                    </>

                    : <>
                        <FaCreditCard className="text-2xl" />
                        <div className="">
                            <p>Add Expense</p>
                            <p className="text-sm">Track your spending by adding it.</p>
                        </div>
                    </>

                }

            </div>

            {/* Text */}
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Description</span>
                </label>
                <input
                    type="text"
                    placeholder="Enter description"
                    className="input input-bordered w-full"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                />
            </div>

            {/* Amount */}
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Amount</span>
                </label>
                <input
                    type="number"
                    placeholder="Enter amount"
                    className="input input-bordered w-full"
                    value={amount}
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
                    className={`select select-bordered w-full `}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    {categories.map((cat) => (
                        <option
                            key={cat.label}
                            value={cat.label}
                            className={`flex flex-row items-center gap-4 ${category === cat.label && 'bg-neutral-700'}`}>
                            <RecordCategory category={cat.label} />
                        </option>
                        // <option key={cat.label} value={cat.label}
                        //     className={`flex flex-row items-center gap-4 ${category === cat.label && 'bg-blue-100'}`}>
                        //     <cat.icon className="text-md" />
                        //     <span>{cat.label}</span>
                        // </option>
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
                    value={moment(date).format('YYYY-MM-DD')}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>

            {/* Submit */}

            {
                updError && <>
                    <ErrorDiv error={updError} />
                    {/* <pre className="text-red-400 text-[10px]">
                        {JSON.stringify(updError, null, 10)}
                    </pre> */}
                </>
            }
            {/* {
                updData && <>
                    <pre className="text-blue-400 text-[10px]">
                        updData:
                        {JSON.stringify(updData, null, 10)}
                    </pre>
                </>
            } */}

            {preBuilt
                ? <button disabled={updLoading} onClick={handleUpdate} type="submit" className="btn btn-secondary w-full mt-5 text-white">
                    {updLoading ? <span className="loading loading-spinner loading-sm"></span> : 'Update Record'}
                </button>
                :
                <button disabled={loading} onClick={handleSubmit} type="submit" className="btn btn-secondary w-full mt-5 text-white">
                    {loading ? <span className="loading loading-spinner loading-sm"></span> : 'Save Record'}
                </button>
            }

        </form>
    );
};

export default RecordForm;
