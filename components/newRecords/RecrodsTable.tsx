import moment from 'moment'
import React from 'react'
import RecordCategory from '../RecordCategory'
import { LuSquareArrowOutUpRight, LuSquareArrowUpRight } from 'react-icons/lu'
import Link from 'next/link'
import { BiDotsHorizontal } from 'react-icons/bi'
import { RecordType } from '@/lib/types'
type PropType ={ records: object[] }

const RecrodsTable = ({ records }: PropType ) => {
    const tableHeading = <> <th></th>
        <th>Event Date</th>
        <th>Added on</th>
        <th>Category</th>
        <th>Amount</th>
        <th>Text</th>
        <th>Details</th></>
    const tableCss = 'min-w-50'
    return (
        <div>
            <div className="overflow-x-auto my-10">
                <table className="table table-md">
                    <thead>
                        <tr>
                            {tableHeading}
                        </tr>
                    </thead>
                    <tbody>
                        {/* replace any with some suitable without changing PropType */}
                        {records.map((r, i) => {
                             const record = r as RecordType;
                            return (
                                <tr key={record.id}>
                                    <th >{++i}</th>
                                    <td className={`${tableCss}`}>{moment(record.date).format('Do MMM YYYY')}</td>
                                    <td className={`${tableCss}`}>{moment(record.createdAt).format('Do MMM YYYY')}</td>
                                    <td>
                                        <span className='badge badge-secondary text-black tracking-widest badge-sm'>
                                            <RecordCategory category={record.category} />
                                        </span>
                                    </td>
                                    <td className={`${tableCss}`}>Rs {record.amount.toLocaleString('en-US')} /-</td>
                                    <td className={`${tableCss}`}>
                                        {record.text.length > 45 ? <span>{record.text.slice(0, 45)} ...</span> : record.text}
                                    </td>
                                    <td>
                                        <Link href={`/records/${record.id}`} target='_blank' >
                                            <LuSquareArrowUpRight className='text-2xl hover:text-blue-400 duration-200' />
                                        </Link>
                                    </td>
                                </tr>
                            )
                        })}
                       

                    </tbody>
                    <tfoot>
                        <tr>
                            {tableHeading}
                        </tr>
                    </tfoot>
                </table>
            </div>

        </div>
    )
}

export default RecrodsTable
