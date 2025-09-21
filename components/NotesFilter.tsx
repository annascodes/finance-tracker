'use client'
// import { TAG_OPTIONS } from '@/lib/notesTags'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import MultiTagSelect from './MultiTagSelect'
type Query = {
    tags?: string[];
    title?: string;
    text?: string;
    createdAt?: string;
};
type propType ={
    setQuery: Dispatch<SetStateAction<Query>>
}

const NotesFilter = ({ setQuery }:propType) => {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [tags, setTags] = useState<string[]>([]);
    const [createdAt, setCreatedAt] = useState('')
    const[form,setForm ] = useState({})

    useEffect(()=>{
        setQuery((prev:Query)=>{
            return {...prev, tags: tags}
        })
    },[tags])

    return (
        <div className='flex flex-row flex-wrap items-center gap-5'>
            {/* title  */}
            <fieldset className="fieldset">
                <legend className="fieldset-legend">Title</legend>
                <input 
                onChange={(e)=>setQuery((prev:Query)=>{
                    return {...prev, [e.target.name]: e.target.value }
                })}
                type="text" name='title' className="input" placeholder="Type here" />
            </fieldset>
            {/* text  */}
            <fieldset className="fieldset">
                <legend className="fieldset-legend">Text</legend>
                <input 
                  onChange={(e)=>setQuery((prev:Query)=>{
                    return {...prev, [e.target.name]: e.target.value }
                })}
                type="text" name='text' className="input" placeholder="Type here" />
            </fieldset>
            {/* createdAt  */}

            <fieldset className="fieldset">
                <legend className="fieldset-legend">Created at</legend>
                <input 
                onChange={(e)=>setQuery((prev:Query)=>{
                    return {...prev, [e.target.name]: e.target.value }
                })}
                type="date" name='createdAt' className="input" />
            </fieldset>
            <MultiTagSelect tags={tags} setTags={setTags} />

        </div>
    )
}

export default NotesFilter
