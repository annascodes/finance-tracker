"use client";
import { Calendar, User, Tag, DollarSign, FileText, Image as ImageIcon } from "lucide-react";
import { PiMoneyBold } from "react-icons/pi";
import RecordCategory from "./RecordCategory";
import moment from "moment";
import { RecordType } from "@/lib/types";


// type RecordProps = {
//     id: string;
//     text: string;
//     amount: number;
//     category: string;
//     date: string;      // ISO string
//     userId: string;
//     createdAt: string; // ISO string
//     user: {
//         email: string;
//         imageUrl: string;
//         name: string;
//     };
// };

const RecordCard = ({ record }: { record: RecordType }) => {
    return (
        <div className="card w-sm md:w-xl  bg-base-100 shadow-md rounded-2xl p-4 flex flex-col gap-3 border border-neutral-700">

            {/* createdAt (aka: added on)  */}
            <div className=" flex justify-end tracking-widest">
                <span className="text-xs text-neutral-600">Added on </span>
                <span className="badge badge-ghost badge-xs">{moment(record.createdAt).format("Do MMMM YYYY")}</span>
            </div>

            {/* Top: User Info */}
            <div className="flex items-center gap-3">
                {record?.user?.imageUrl ? (
                    <img
                        src={record.user.imageUrl}
                        alt={record.user.name}
                        className="w-12 h-12 rounded-full object-cover border"
                    />
                ) : (
                    <div className="w-12 h-12 rounded-full bg-base-300 flex items-center justify-center">
                        <ImageIcon className="w-6 h-6 text-base-content/60" />
                    </div>
                )}
                <div>
                    <p className="font-semibold flex items-center gap-2">
                        {/* <User className="w-4 h-4 text-primary" /> */}
                        { record?.user?.name}
                    </p>
                    <p className="text-sm text-base-content/60">{record?.user?.email}</p>
                </div>
            </div>

            {/* Record Text */}
            <div className="flex items-start gap-2 text-sm">
                {/* <FileText className="text-2xl mt-1 text-secondary" /> */}
                <p className="">{record.text}</p>
            </div>

            {/* category  and  amount */}
            <div className="flex justify-between items-center gap-3">

                <div className="badge badge-secondary badge-lg rounded-md">
                    <RecordCategory category={record.category} />
                </div>


                <p>Rs <span className="text-3xl font-extrabold">{record.amount.toLocaleString('en-US')}</span> /-</p>
            </div>

            {/* date (aka: event date) */}
            <div className="flex justify-between items-center gap-3 badge badge-neutral badge-lg rounded-md">

                <div className="tracking-widest">
                    <span className="">{moment(record.date).format("Do MMMM YYYY")}</span>
                    <span className="text-xs text-neutral-600 mx-2">event date </span>

                </div>
                
            </div>


        </div>
    );
};

export default RecordCard;
