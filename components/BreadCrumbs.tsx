import React from 'react'
import { LuFolder } from "react-icons/lu";
{/* <LuFolder /> */ }
import { LuFileText } from "react-icons/lu";
{/* <LuFileText /> */ }

type PropType = {
    crumbs: { label: string, type?: 'folder'| 'file' }[]
}

const BreadCrumbs = ({ crumbs }: PropType) => {
    return (
        <div>
            <div className="breadcrumbs text-xs">
                <ul className=''>
                    {crumbs.map(c => {
                        return (
                            <li key={`${c.label}-breadcrumbs`} className='flex items-center gap-2 tracking-wider'>
                                {c.type === 'folder' ? <LuFolder className='text-lg' /> : <LuFileText className='text-lg' />}
                                <p>{c.label}</p>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default BreadCrumbs
