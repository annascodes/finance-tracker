'use client'
import CreateNoteModal from '@/components/CreateNoteModal'
import NoteForm from '@/components/NoteForm'
import { useApiReq } from '@/lib/hooks/useApiReq'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { HiDotsVertical } from "react-icons/hi";

import { LuTrash2 } from "react-icons/lu";
import NotesFilter from '@/components/NotesFilter'
import NoteEditModal from '@/components/NoteEditModal'
const page = () => {
    const [query, setQuery] = useState<any>({})
    const { request, data, loading, error } = useApiReq()
    useEffect(() => {
        request('/api/note')

    }, [])
    const handleFilterNotes = () => {
        console.log('query: ', query)
        const params = new URLSearchParams();
        if (query.tags && query.tags.length > 0) params.append('tags', query.tags.join(','));
        if (query.title) params.append('title', query.title);
        if (query.text) params.append('text', query.text);
        if (query.createdAt) params.append('createdAt', query.createdAt)

        const url = `/api/note?${params.toString()}`
        console.log('url: ', url)
        request(url)


    }
    // console.log('data: ', data)
    return (
        <div>
            <div className='flex justify-between items-center mb-5'>
                <h1 className='text-5xl flex items-center gap-1 font-semibold tracking-wide opacity-30'>
                    {loading &&
                        <span className='loading loading-spinner loading-lg'></span>}
                    My notes</h1>
                <CreateNoteModal />
            </div>


            <div className="collapse bg-base-100 border-neutral-700 border border-dashed">
                <input type="checkbox" />
                <div className="collapse-title font-semibold   ">
                    <h1 className='text-xs opacity-35 tracking-widest'>Filter</h1>
                </div>
                <div className="collapse-content text-sm">
                    <NotesFilter setQuery={setQuery} />
                    <div className='flex justify-center '>
                        <button disabled={loading} onClick={handleFilterNotes} className='btn btn-primary '>
                            {loading ? <span className='loading loading-spinner'></span> : 'filter it.'}
                        </button>
                    </div>
                </div>

            </div>


            {(data && data.isfilter) &&
                <div className='flex justify-center mt-5'>
                    <button onClick={() => request(`/api/note`)} className='btn btn-soft btn-warning btn-xs tracking-widest'> turn off filter </button>
                </div>
            }

            <div className='flex items-center flex-wrap flex-row justify-center my-10 gap-2'>
                {data && data.notes.map((n: any) => {
                    return (
                        <div className='border border-stone-600 p-3 max-w-xs min-w-xs min-h-56'>
                            <div className='flex justify-end items-center gap-2'>

                                <h1 className='text-xs opacity-35'>
                                    {moment(n.createdAt).format('Do MMMM YYYY')}

                                </h1>

                                <NoteEditModal key={n.id} id={n.id} note={n} />
                                {/* -----dropdown starts------- */}
                                {/* <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="hover:text-blue-400 duration-200">
                                        <HiDotsVertical />
                                    </div>
                                    <ul tabIndex={0} className="dropdown-content menu bg-neutral-800  rounded-box z-1 w-52 p-2 shadow-sm">
                                        <li>
                                            <NoteEditModal />  
                                        </li>
                                        <li>
                                            <button className='flex items-center gap-2'> <LuTrash2 /> Delete</button>
                                        </li>

                                    </ul>
                                </div> */}
                                {/* -----dropdown ends------- */}
                            </div>
                            <h1 className='text-lg font-bold tracking-wider'>{n.title.slice(0, 30)}</h1>
                            <h1 className=' whitespace-pre-line    h-44 my-5 overflow-auto'>
                                <p className='font-semibold'> {n.title}</p>
                                <p className='font-thin'> {n.text}</p>
                            </h1>
                            <div className='h-11 flex   justify-start items-center flex-wrap gap-1 '>
                                {n.tags.map((t: string, i: number) => {
                                    return (
                                        <div className='badge badge-success badge-xs text-xs' key={i}>{t}</div>
                                    )
                                })}
                            </div>


                        </div>
                    )
                })}
            </div>








            <pre className='text-xs tracking-widest text-red-400'>
                {error && JSON.stringify(error, null, 10)}
            </pre>

            <pre className='text-xs tracking-widest text-blue-400'>
                {data && JSON.stringify(data, null, 10)}
            </pre>
        </div>
    )
}

export default page
