'use client'
import BreadCrumbs from '@/components/BreadCrumbs'
import RecordStats from '@/components/newRecords/RecordStats'
import RecrodsTable from '@/components/newRecords/RecrodsTable'
import { categories } from '@/lib/hardData'
import { useApiReq } from '@/lib/hooks/useApiReq'
import React, { ReactElement, useEffect, useState } from 'react'
import { GoArrowLeft, GoArrowRight } from 'react-icons/go'
import { LuBadgeDollarSign, LuBookText, LuFilter } from "react-icons/lu";


type FilterFormProp = {
    amount?: string | number,
    category?: string,
    startDate?: string,
    endDate?: string
}

const page = () => {
    const fLabelCss = 'text-xs mb-0.5 mt-5'
    const [filterForm, setFilterForm] = useState<FilterFormProp>({}) // error by versel: for this line
    const { request, data, loading, error } = useApiReq()
    const [records, setRecords] = useState<object[]>([])
    const { request: fRequest, data: fData, loading: fLoading, error: fError } = useApiReq()
    const [isFiltered, setIsFiltered] = useState(false)

    const handleSetFilterForm = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFilterForm({ ...filterForm, [e.target.name]: e.target.value })

    }
    const handleFilterBtn = () => {
        // console.log('filterForm: ', filterForm)
        setRecords([])
        setIsFiltered(true)
        fRequest(`/api/records/newway?amount=${filterForm?.amount}&category=${filterForm.category}&startDate=${filterForm.startDate}&endDate=${filterForm.endDate}`)
    }

    useEffect(() => {
        request(`/api/records/newway`)
    }, [])
    useEffect(() => {
        if (data) {
            setRecords([...records, ...data.records])
        }
    }, [data])
    useEffect(() => {
        if (fData) {
            setRecords([...records, ...fData.records])
        }
    }, [fData])



    return (
        <div>

            <div className='flex flex-row flex-wrap gap-1 items-center'>
                <div className='text-6xl font-extrabold opacity-50 mb-5 flex flex-row items-center gap-2'>

                    {data &&
                        <div className='text-sm font-medium tracking-wider'>Total
                            <span className='text-xl mx-1'>
                                {Number(data.report._count._all).toLocaleString('en-US')}
                            </span>
                        </div>}
                    <div>Records</div>

                    {data && <div className='text-sm font-medium tracking-wider'>worth Rs
                        <span className='text-xl mx-1'>
                            {Number(data.report._sum.amount).toLocaleString('en-US')}
                        </span>
                        /-
                    </div>}


                </div>

                {loading && <span className='loading loading-spinner mx-5'></span>}




            </div>

            {/* <BreadCrumbs crumbs={[
                { label: 'newrecord', type: 'folder' },
                { label: 'page.tsx', type: 'file' }
            ]} /> */}

            {/* --------collapse div starts ----------  */}
            <div className="collapse bg-base-100 border border-neutral-500 border-dashed ">
                <input id="collapse-toggle" type="checkbox" />
                <div className="collapse-title font-semibold flex items-center gap-1">
                    <LuFilter className='' />
                    <p className='text-xs tracking-widest '>filter</p>
                </div>
                <div className="collapse-content text-sm border-0">
                    {/* filter  */}
                    <div className='  border-0   border-neutral-600 rounded-2xl flex flex-row flex-wrap justify-center items-end gap-3'>
                        {/* <h1 className='text-4xl opacity-50 font-extrabold '>Filter</h1> */}
                        {/* text  */}
                        <div>
                            <p className={`${fLabelCss}`}>Amount</p>
                            <input name='amount' onChange={handleSetFilterForm} type="number" placeholder="Amount" className="input" />
                        </div>
                        {/* category  */}
                        <div>
                            <p className={`${fLabelCss}`}>Category</p>
                            <select name='category' onChange={handleSetFilterForm} defaultValue="Pick a color" className="select">
                                {categories.map((c, i: number) => {
                                    return (
                                        <option value={c.label} key={i}>{c.label}</option>
                                    )
                                })}
                            </select>
                        </div>
                        {/* startDate  */}
                        <div>
                            <p className={`${fLabelCss}`}>Start date</p>
                            <input name='startDate' onChange={handleSetFilterForm} type="date" className="input" />
                        </div>
                        {/* endDate  */}
                        <div>
                            <p className={`${fLabelCss}`}>End date</p>
                            <input name='endDate' onChange={handleSetFilterForm} type="date" className="input" />
                        </div>

                        <div>
                            <button onClick={handleFilterBtn} className='btn btn-ghost btn-outline mt-5 w-full'>
                                {fLoading ? <span className='loading loading-spinner loading-sm'></span> : 'filter.'}
                            </button>
                        </div>
                        {/* <pre className='text-orange-400 text-[10px] tracking-widest'>
                            filterForm
                            {filterForm && JSON.stringify(filterForm, null, 10)}
                        </pre> */}
                    </div>

                    {/* hide the collapse  */}
                    <button
                        className="btn btn-xs btn-outline mt-5 text-yellow-300 tracking-widest"
                        onClick={() => {
                            const checkbox = document.getElementById(
                                "collapse-toggle"
                            ) as HTMLInputElement;
                            if (checkbox) checkbox.checked = false; // hide collapse
                        }}
                    >
                        hide filter
                    </button>
                </div>
            </div>
            {/* --------collapse div ends ----------  */}

            {/* turn off filter btn  */}
            {
                (isFiltered && fData) &&
                <div className='flex justify-end my-5'>
                    <button onClick={() => {
                        setRecords([])
                        setIsFiltered(false)
                        request(`/api/records/newway`)
                    }} className='btn btn-warning btn-sm '>turn off the filter</button>
                </div>
            }

            {/* stats  */}

            {
                (fData && isFiltered) && <RecordStats
                    records={fData.report._count._all}
                    amount={fData.report._sum.amount}
                    filterData={fData.filterData}

                />
            }

            <div className='  tracking-widest text-sm flex md:hidden items-center gap-2  justify-center my-5'>
                <GoArrowLeft className='text-xl' /> <span>swipe</span> <GoArrowRight className='text-xl' /> </div>


            <div className='flex justify-end mt-3 '>
                <button
                    onClick={() => {
                        if (isFiltered) {
                            handleFilterBtn()
                        } else {
                              setRecords([])
                            request(`/api/records/newway`)
                        }
                    }}
                    className='tracking-widest btn btn-neutral btn-xs '>refresh</button>
            </div>

            {/* records table  */}
            {
                records && <RecrodsTable records={records} />
            }




            {/* see more: non filter  */}

            {
                (data && data.nextCursor && !isFiltered) &&
                <button
                    disabled={loading}
                    onClick={() => {


                        request(`/api/records/newway?cursor=${data.nextCursor}`)
                    }}
                    className='btn btn-ghost btn-outline w-full tracking-widest'>
                    {loading ? <div className='flex justify-center'>  <span className='loading loading-spinner '></span> </div> : 'see more.'}
                </button>
            }

            {/* see more: filter  */}

            {
                (fData && fData.nextCursor && isFiltered) &&
                <button
                    disabled={fLoading}
                    onClick={() => {
                        if (isFiltered)
                            fRequest(`/api/records/newway?amount=${filterForm?.amount}&category=${filterForm.category}&startDate=${filterForm.startDate}&endDate=${filterForm.endDate}&cursor=${fData.nextCursor}`)

                    }}
                    className='btn btn-ghost btn-outline w-full tracking-widest'>
                    {fLoading ? <div className='flex justify-center'>  <span className='loading loading-spinner '></span> </div> : '.see more.'}
                </button>
            }



            {/* 0000000000000000000000000000000 */}
            {/* 
            <pre className='text-blue-400 text-xs tracking-widest'>
                data:  {data && JSON.stringify(data, null, 10)}
            </pre>
            <pre className='text-pink-400 text-xs tracking-widest'>
                fData  {fData && JSON.stringify(fData, null, 10)}
            </pre> */}






        </div>
    )
}

export default page
