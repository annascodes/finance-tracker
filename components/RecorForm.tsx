"use client";

import React, { useState } from "react";
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
import {
    LuUtensils,
    LuBus,
    LuShoppingBag,
    LuReceipt,
    LuTag
} from "react-icons/lu";
import RecordCategory from "./RecordCategory";

const categories = [
    { label: "Food", icon: LuUtensils },
    { label: "Transport", icon: LuBus },
    { label: "Shopping", icon: LuShoppingBag },
    { label: "Bills", icon: LuReceipt },
    { label: "Other", icon: LuTag },
];

type RecordType = {
    text: String;
    amount: Number;
    category: String;
    date: Date;

}
const RecordForm = () => {
    const [text, setText] = useState("");
    const [amount, setAmount] = useState<number | "">("");
    const [category, setCategory] = useState("Other");
    const [date, setDate] = useState<string>("");
    const [loading, setLoading] = useState(false)



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true)

        const newRecord: RecordType = {
            text,
            amount: Number(amount),
            category,
            date: date ? new Date(date) : new Date(),
        };

        // 👇 Replace with your API call (Next.js API Route or Server Action)
        console.log("Submitting record:", newRecord);
        const { error, data } = await addExpenseRecord(newRecord)

        if (error) {
            console.log('error: ', error)
        }
        if (data) {
            setLoading(false)
            toast.success('Record has saved.')
            console.log('data: ', data)
        }

        // Reset form
        setText("");
        setAmount("");
        setCategory("Other");
        setDate("");
        setLoading(false)
    };

    return (
        <form
            onSubmit={handleSubmit}

            // className="max-w-md mx-auto p-6 shadow-xl rounded-xl bg-base-100 space-y-4"
            className="max-w-md p-6 border border-stone-700 shadow-xl rounded-2xl "
        >
            <div className="text-xl font-bold mt-3 mb-10  flex flex-row justify-start items-center gap-4">
                <FaCreditCard className="text-2xl" />
                <div className="">
                    <p>Add Expense</p>
                    <p className="text-sm">Track your spending by adding it.</p>
                </div>
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
                        className={`flex flex-row items-center gap-4 ${category === cat.label && 'bg-blue-100'}`}>
                            <RecordCategory category={cat.label}  />
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
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>

            {/* Submit */}
            <button type="submit" className="btn btn-secondary w-full mt-5 text-white">
                {loading ? <span className="loading loading-spinner loading-sm"></span> : 'Save Record'}
            </button>
        </form>
    );
};

export default RecordForm;
