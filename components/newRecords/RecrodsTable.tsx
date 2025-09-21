import moment from 'moment'
import React from 'react'
import RecordCategory from '../RecordCategory'
import { LuSquareArrowOutUpRight, LuSquareArrowUpRight } from 'react-icons/lu'
import Link from 'next/link'
import { BiDotsHorizontal } from 'react-icons/bi'

const RecrodsTable = ({ records }: { records: object[] }) => {
    const tableHeading = <> <th></th>
        <th>Event Date</th>
        {/* <th>Diff</th> */}
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
                        {records.map((r: any, i) => {
                            return (
                                <tr>
                                    <th >{++i}</th>
                                    <td className={`${tableCss}`}>{moment(r.date).format('Do MMM YYYY')}</td>
                                    {/* <td>{moment(r.date).from(r.createdAT)}</td> */}
                                    <td className={`${tableCss}`}>{moment(r.createdAt).format('Do MMM YYYY')}</td>
                                    <td>
                                        <span className='badge badge-secondary text-black tracking-widest badge-sm'>
                                            <RecordCategory category={r.category} />
                                        </span>
                                    </td>
                                    <td className={`${tableCss}`}>Rs {r.amount.toLocaleString('en-US')} /-</td>
                                    <td className={`${tableCss}`}>
                                        {r.text.length > 45 ? <span>{r.text.slice(0, 45)} ... </span> : r.text}
                                    </td>
                                    <td>
                                        <Link href={`/records/${r.id}`} target='_blank' >
                                            <LuSquareArrowUpRight className='text-2xl hover:text-blue-400 duration-200' />
                                        </Link>
                                    </td>
                                </tr>
                            )
                        })}
                        {/* <tr>
                            <th>1</th>
                            <td>Cy Ganderton</td>
                            <td>Quality Control Specialist</td>
                            <td>Littel, Schaden and Vandervort</td>
                            <td>Canada</td>
                            <td>12/16/2020</td>
                            <td>Blue</td>
                        </tr> */}

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
