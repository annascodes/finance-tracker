
'use client'
import React, { useState } from 'react'

import {
    LuUtensils,
    LuBus,
    LuShoppingBag,
    LuReceipt,
    LuTag
} from "react-icons/lu";
import RecordCategory from "./RecordCategory";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { FiToggleRight } from 'react-icons/fi';
const categories = [
    { label: "Food", icon: LuUtensils },
    { label: "Transport", icon: LuBus },
    { label: "Shopping", icon: LuShoppingBag },
    { label: "Bills", icon: LuReceipt },
    { label: "Other", icon: LuTag },
];







type FilterData = {
    amount: number | '';
    category: string;
    date: string;
}

type ComponentProps = {
    handleFilter: (filter: FilterData) => void;
    loading: boolean;

}

const FilterRecord: React.FC<ComponentProps> = ({ handleFilter, loading = false }) => {
    const [amount, setAmount] = useState<number | "">("");
    const [category, setCategory] = useState("Other");
    const [date, setDate] = useState<string>("");
    const [showFilter, setShowFilter] = useState(false)


    const handleBtn = () => {
        handleFilter({ amount, category, date })
    }
    const handleReset =()=>{
        setAmount('')
        setCategory('')
        setDate('')
    }
    return (
        <div className="collapse  ">
            <input onChange={() => setShowFilter(!showFilter)} type="checkbox" />
            <div
                className="collapse-title bg-neutral-900   font-semibold ">

                {showFilter
                    ? <p className='tracking-widest'>
                        <span className='text-xs text-neutral-700 mx-1'>Hide</span>
                        filter
                    </p>
                    : <p className='tracking-widest'>
                        <span className='text-xs text-neutral-700 mx-1'>Show</span>
                        filter
                    </p>
                }
            </div>
            <div className="collapse-content bg-neutral-900   pt-5 text-sm flex flex-row  justify-center gap-4   flex-wrap">


                {/* Amount */}
                <div className="form-control">
                    <label className="label mb-1">
                        <span className="label-text"> Amount ( under ) </span>
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
                        <span className="label-text mb-1">Category</span>
                    </label>
                    <select
                        className={`select select-bordered w-full `}
                        value={category || 'select'}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        {categories.map((cat) => (
                            <option
                                key={cat.label}
                                value={cat.label}
                                className={`flex flex-row items-center gap-4 ${category === cat.label && 'bg-stone-800'}`}>
                                <RecordCategory category={cat.label} />
                            </option>

                        ))}
                    </select>
                </div>

                {/* Date */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text mb-1">Date</span>
                    </label>
                    <input
                        type="date"
                        className="input input-bordered w-full"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>

                <div className=' flex flex-row  items-end'>
                    <button onClick={handleBtn} className='btn btn-secondary flex items-center gap-2'>
                        {loading
                            ? <span className='loading loading-spinner loading-xs'></span>
                            : 'filter'}
                    </button>
                    <button onClick={handleReset} className='btn btn-ghost flex items-center gap-2 tracking-widest'>
                       reset 
                    </button>
                </div>

            </div>
        </div>
    )
}

export default FilterRecord
