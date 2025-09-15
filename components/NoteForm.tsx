"use client";

import { useEffect, useState } from "react";
// import { TAG_OPTIONS } from "@/lib/notesTags";



import {
    Briefcase,     // WORK
    User,          // PERSONAL
    Home,          // HOME
    Stethoscope,   // MEDICAL
    FileText,      // BILLS
    MoreHorizontal // OTHER
} from "lucide-react";
import MultiTagSelect from "./MultiTagSelect";
import { useApiReq } from "@/lib/hooks/useApiReq";
import { FaCheck } from "react-icons/fa";

const tagOptions = [
    { value: "WORK", label: "Work", icon: Briefcase },
    { value: "PERSONAL", label: "Personal", icon: User },
    { value: "HOME", label: "Home", icon: Home },
    { value: "MEDICAL", label: "Medical", icon: Stethoscope },
    { value: "BILLS", label: "Bills", icon: FileText },
    { value: "OTHER", label: "Other", icon: MoreHorizontal },
];
interface NoteFormProps {
    onSubmit: (note: { title: string; text: string; tags: string[] }) => void;
}
type PropType = {
    preBuilt?: any
}
export default function NoteForm({ preBuilt }: PropType) {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const { request, data, loading, error } = useApiReq()
    useEffect(() => {
        if (preBuilt) {
            setTitle(preBuilt.title ?? "");
            setText(preBuilt.text ?? "");
            setTags(preBuilt.tags ?? []);
        }
    }, [preBuilt])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!title || title.trim() === '' || !text ||
            text.trim() === '' || tags.length === 0) {
            alert('title, text, tag NEEDED!!!')
            return
        }
        // console.log('Note: ', note)

        request(`/api/note`, 'POST', { title, text, tags })

        setTitle("");
        setText("");
        setTags([]);
    };
    const handleUpate = (e: React.FormEvent) => {
        e.preventDefault();

        const note = { title, text, tags, }
        if (!title || title.trim() === '' ||
            !text || text.trim() === '' || tags.length === 0) {
            alert('(updating); title, text, tag NEEDED!!!')
            return
        }
        // console.log('Updating Note: ', note)
        request(`/api/note/${preBuilt.id}`, 'PUT', note)
    }

    return (
        <form

            className="w-full max-w-md mx-auto p-6 bg-base-200 rounded-2xl shadow-lg space-y-4"
        >
            <h2 className="text-xl font-bold text-center">
                {preBuilt ? 'Update Note' : 'Create a Note'}
            </h2>
            {data &&
                <div className="text-xs flex items-center gap-2 bg-green-950 p-2 rounded-lg">

                    <FaCheck className="text-green-500" />
                    <div className="w-full">
                        <p className="text-center text-[10px] opacity-45 tracking-wider">recently added</p>
                        <h1 className="font-bold">{data.title} </h1>
                        <h1>{data.text} </h1>
                        <div>
                            {data.tags.map((t: string, i: number) => {
                                return (
                                    <div className="badge text-xs badge-xs badge-secondary" key={i}>{t} </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            }

            {/* Title */}
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Title</span>
                </label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="input input-bordered w-full"
                    placeholder="Enter note title"
                    required
                />
            </div>

            {/* Text */}
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Text</span>
                </label>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="textarea textarea-bordered w-full"
                    placeholder="Write your note here..."
                    required
                />
            </div>

            {/* Tags  */}
            <MultiTagSelect tags={tags} setTags={setTags} />

            {/* Submit */}
            {
                preBuilt ?
                    <button onClick={handleUpate} disabled={loading} type="submit" className="btn btn-primary w-full">
                        {loading ? <span className="loading loading-spinner loading-xs"></span>
                            : ' Update'}

                    </button>

                    :
                    <button onClick={handleSubmit} disabled={loading} type="submit" className="btn btn-primary w-full">
                        {loading ? <span className="loading loading-spinner loading-xs"></span>
                            : ' Save Note'}

                    </button>

            }
            {/* <button disabled={loading} type="submit" className="btn btn-primary w-full">
                {loading ? <span className="loading loading-spinner loading-xs"></span>
                    : ' Save Note'}

            </button> */}

            <pre className="text-red-400 text-xs tracking-widest">
                {error && JSON.stringify(error, null, 10)}
            </pre>
            <pre className="text-blue-400 text-xs tracking-widest">
                {data && JSON.stringify(data, null, 10)}
            </pre>

        </form>
    );
}
