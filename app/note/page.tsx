'use client'
import CreateNoteModal from '@/components/CreateNoteModal'
import { useApiReq } from '@/lib/hooks/useApiReq'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import NotesFilter from '@/components/NotesFilter'
import NoteEditModal from '@/components/NoteEditModal'
import { LuTrash2 } from "react-icons/lu";
import DeletePermitModal from '@/components/DeletePermitModal'
import toast from 'react-hot-toast'
import { IoMdCheckmark } from "react-icons/io";



const page = () => {
    const [query, setQuery] = useState<any>({})
    const [data, setData] = useState<any>(null) // having all the notes
    const [delPermit, setDelPermit] = useState<string | null>(null)

    const { request, data: data_, loading, error } = useApiReq()
    const { request: delReq, data: delData, loading: delLoading, error: delError } = useApiReq()
    useEffect(() => {
        request('/api/note')

    }, [])
    useEffect(() => {
        if (data_) {
            setData(data_)
        }
    }, [data_])
    useEffect(() => {

        if (!delData && delPermit) // when no delData but delPermit
        {
            console.log('deleting this note: ', delPermit)
            delReq(`/api/note/${delPermit}`, 'DELETE')
        }
        if (delData && delData.success) {
            toast.custom(() => (
                <div className="bg-neutral-200 p-4 rounded-xl shadow-md flex items-center gap-2">
                    <IoMdCheckmark className='text-green-500 text-2xl' />
                    <p className='text-stone-700 font-bold tracking-wider'>
                        {'Note has Deleted Successfully'}  </p>
                </div>
            ))
            console.log(delData.message)
            // setData((prev:any)=> prev.filter((n:any)=>n.id !== delData.delId))
            setData((prev: any) => ({ ...prev, notes: prev.notes.filter((n: any) => n.id !== delData.delId) }))
            setDelPermit(null)
        }
    }, [delPermit, delData])
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
    console.log('data: ', data)

    return (
        <div>
            <div className='flex justify-between items-center mb-5'>
                <h1 className='text-5xl flex items-center gap-1 font-semibold tracking-wide opacity-30'>
                    {loading &&
                        <span className='loading loading-spinner loading-lg'></span>}
                    My notes</h1>
                <CreateNoteModal setData={setData} />
            </div>

            <pre className='text-red-400 text-[10px]'>
                {delError && JSON.stringify(delError, null, 10)}
            </pre>

            {/* notes filter  */}
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


            {/* turn off filter btn  */}
            {(data && data.isfilter) &&
                <div className='flex justify-center mt-5'>
                    <button
                        onClick={() => request(`/api/note`)}
                        className='btn btn-soft btn-warning btn-xs tracking-widest'>
                        turn off filter
                    </button>
                </div>}


            {/* when there no any note  */}
            {(data && data.notes.length === 0) &&
                <div className='h-44 flex justify-center items-center'>
                    <p className='opacity-30'>
                        {data.isfilter ? 'no match of this filter':" Click on top right at 'Create note' to add a new not."}
                       </p>
                </div>}

            {/* mapping all notes  */}
            <div className='flex items-center flex-wrap flex-row justify-center my-10 gap-2'>
                {data && data.notes.map((n: any) => {
                    return (
                        <div className='border border-stone-600 p-3 max-w-xs min-w-xs min-h-56'>
                            <div className='flex justify-end items-center gap-2'>

                                <h1 className='text-xs opacity-35'>
                                    {moment(n.createdAt).format('Do MMMM YYYY')}

                                </h1>

                                <NoteEditModal key={n.id} setData={setData} id={n.id} note={n} />

                                <DeletePermitModal
                                    key={`${n.id}-DeletePermitModal`}
                                    id={n.id}
                                    setPermit={setDelPermit}
                                    prompt={<>Are you sure you want to delete this note, having title "<span className='text-2xl font-bold italic'>{n.title}</span>".</>}
                                    loading={delLoading}
                                    permit={delPermit}
                                />



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

            {/* <pre className='text-xs tracking-widest text-blue-400'>
                {data && JSON.stringify(data, null, 10)}
            </pre> */}
        </div>
    )
}

export default page
