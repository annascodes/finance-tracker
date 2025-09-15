"use client";

import { Dispatch, SetStateAction, useState } from "react";

interface MultiTagSelectProps {
    tags: string[]
    setTags: Dispatch<SetStateAction<string[]>>;
}
import {
    Briefcase,
    User,
    Home,
    Stethoscope,
    FileText,
    MoreHorizontal,
    CheckSquare,
    Square,
} from "lucide-react";

const tagOptions = [
    { value: "WORK", label: "Work", icon: Briefcase },
    { value: "PERSONAL", label: "Personal", icon: User },
    { value: "HOME", label: "Home", icon: Home },
    { value: "MEDICAL", label: "Medical", icon: Stethoscope },
    { value: "BILLS", label: "Bills", icon: FileText },
    { value: "OTHER", label: "Other", icon: MoreHorizontal },
];

export default function MultiTagSelect({tags, setTags }: MultiTagSelectProps)  
{
    // const [selected, setSelected] = useState<string[]>([]);


    const toggleTag = (value: string) => {
        setTags((prev) => {
            const updated = prev.includes(value)
                ? prev.filter((v) => v !== value)
                : [...prev, value];

            //   setTags(updated); //  updates parent state
            return updated;
        });
    };
    return (
        <div className="space-y-2">
            <h3 className="font-semibold">Select Tags</h3>
            <div className="flex flex-row items-center gap-3 flex-wrap justify-start">
                {tagOptions.map((tag) => {
                    const Icon = tag.icon;
                    // const isSelected = selected.includes(tag.value);
                    const isSelected = tags.includes(tag.value);

                    return (
                        <div
                            key={tag.value}
                            className="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-base-200 "
                            onClick={() => toggleTag(tag.value)}
                        >
                            {isSelected ? (
                                <CheckSquare className="w-5 h-5 text-primary" />
                            ) : (
                                <Square className="w-5 h-5 text-base-content/50" />
                            )}
                            <div className="flex items-center gap-2 badge badge-secondary badge-sm tracking-widest">
                                <Icon className="w-4 h-4" />
                                <span>{tag.label}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
            <p className="text-sm opacity-70 mt-2">
                Selected: {tags.length > 0 ? tags.join(", ") : "None"}
            </p>
        </div>
    );
}
