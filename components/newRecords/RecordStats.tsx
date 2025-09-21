import moment from 'moment';
import React from 'react'
import { LuBadgeDollarSign, LuBookText } from 'react-icons/lu'
import RecordCategory from '../RecordCategory';
import { GoArrowSwitch } from 'react-icons/go';

type PropType = {
    records: string | number;
    amount: string | number;
    filterData?: { startDate?: string, endDate?: string, amount?: string | number, category?: string };

}
const RecordStats = ({ records, amount, filterData }: PropType) => {
    return (
        <div className='bg-neutral-800 mx-auto w-xs md:w-lg'>
            <div className='flex flex-wrap  gap-3 justify-start md:justify-center border-0 border-neutral-600 rounded-lg '>
                <div className='border-0 border-neutral-600 rounded-lg p-2 md:p-5'>
                    {filterData ? <span className='badge mb-3  badge-success tracking-widest   font-bold'>Filtered: Records</span>
                        : <p className='text-xl mb-3  w-44 md:w-full'>

                            Total Records
                        </p>
                    }

                    <div className='flex items-center gap-5 '>
                        <LuBookText className='text-xl md:text-3xl' />
                        <p className='font-extrabold text-xl  md:text-4xl'> {records.toLocaleString('en-US')}</p>
                    </div>

                </div>
                <div className='border-0 border-neutral-600 rounded-lg p-2 md:p-5'>
                    {filterData ? <span className='badge mb-3  badge-success tracking-widest   font-bold'>Filtered: Amount Summation</span>
                        : <p className='text-xl mb-3  w-44 md:w-full'>

                            Accumulated Amount
                        </p>
                    }
                    <div className='flex items-center gap-5 '>
                        <LuBadgeDollarSign className='text-xl md:text-3xl' />
                        <p className='font-extrabold text-xl  md:text-4xl'> {Number(amount).toLocaleString('en-US')}</p>
                    </div>

                </div>
            </div>

            {filterData && <FilterInfo filterData={filterData} />}
        </div>
    )
}

export default RecordStats

// {filterData && <FilterInfo filterData={filterData} />}
const FilterInfo = ({ filterData }: { filterData?: { startDate?: string, endDate?: string, amount?: string | number, category?: string }; }) => {
    return (filterData &&
        <div className='border-0 border-dashed border-neutral-700 p-2 mt-3'>
            {(filterData?.startDate && filterData?.endDate) &&
                <p className=' text-sm opacity-70 border-0 flex flex-col md:flex-row  flex-wrap items-start md:items-center gap-1  justify-start w-44 md:w-full'>
                    {moment(filterData?.startDate).format('Do MMMM YYYY')}
                    <span> <GoArrowSwitch className='text-white mx-2' /> </span>
                    {moment(filterData?.endDate).format('Do MMMM YYYY')}
                </p>
            }

            {filterData?.category && <div className='  badge badge-secondary badge-xs'>
                <RecordCategory category={filterData.category} />
            </div>}

            {filterData?.amount && <p className=' text-sm opacity-40 w-44 md:w-full'>
                amount less then {Number(filterData.amount).toLocaleString("en-US")} /-
            </p>}
        </div>

    )
}