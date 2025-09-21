'use client'

import { use, useEffect, useState } from 'react'
import { useApiReq } from '@/lib/hooks/useApiReq'
import ErrorDiv from '@/components/ErrorDiv'
import RecordCard from '@/components/RecordCard'
import RecordEditModal from '@/components/RecordEditModal'
import DeletePermitModal from '@/components/DeletePermitModal'
import toast from 'react-hot-toast'
import { RecordType } from '@/lib/types'

type DeleteResponse = { success: boolean; delId: string }

type PageProps = {
  params: Promise<{ recordId: string }>
}


const Page = ({ params }: PageProps) => {
//   const { recordId } = params
    const [data, setData] = useState<RecordType | null>(null);
    const [delPermit, setDelPermit] = useState<string | null>(null);

    const { recordId } = use(params)  

    const { request, data: record, loading, error } = useApiReq<RecordType>();
    const {
        request: delReq,
        data: delData,
        loading: delLoading,
        error: delError,
    } = useApiReq<DeleteResponse>();

    useEffect(() => {
        request(`/api/records/${recordId}`);
    }, [recordId]);

    useEffect(() => {
        if (record) {
            setData(record);
        }
    }, [record]);

    useEffect(() => {
        if (!delData && delPermit) {
            delReq(`/api/records/${delPermit}`, 'DELETE');
        }
        if (delData?.success) {
            toast.success('Record permanently deleted');
        }
    }, [delPermit, delData, delReq]);

    return (
        <div>
            {loading && (
                <div className="flex flex-row h-40 justify-center items-center">
                    <span className="loading loading-spinner loading-xl"></span>
                </div>
            )}

            {data && (
                <div className="flex flex-col items-center">
                    <h1 className="text-5xl md:text-5xl text-center font-bold my-5 opacity-30">
                        <span className="text-sm tracking-wider mx-1">record</span>
                        Details
                    </h1>

                    {!delData && (
                        <div className="mx-auto max-w-lg flex justify-end items-center gap-5 w-full px-5">
                            {data?.id && (
                                <>
                                    <RecordEditModal id={data.id} preBuilt={data} setData={setData} />
                                    <DeletePermitModal
                                        id={data.id}
                                        setPermit={setDelPermit}
                                        permit={delPermit}
                                        prompt="Do really want to delete this record, it would be deleted permanently."
                                        loading={delLoading}
                                    />
                                </>
                            )}
                        </div>
                    )}

                    {delData && (
                        <h1 className="text-4xl tracking-widest text-red-400 text-center font-thin">
                            This record is DELETED
                        </h1>
                    )}

                    <div className="flex justify-center">
                        <RecordCard record={data} />
                    </div>
                </div>
            )}

            {error && <ErrorDiv error={error} />}
        </div>
    );
};

export default Page;
