export type RecordType = {
    id?: string;
    text: string;
    amount: number;
    category: string;
    date: string | Date;      // ISO string
    userId?: string;
    createdAt?: string; // ISO string
    user?: {
        email: string;
        imageUrl: string;
        name: string;
    };
};
