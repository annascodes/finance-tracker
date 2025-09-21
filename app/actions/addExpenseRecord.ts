'use server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import moment from 'moment';
import { RecordType } from '@/lib/types';

interface RecordData {
     id:string;
    text: string;
    amount: number;
    category: string;
    date: string; // Added date field
}

interface RecordResult {
    data?: RecordData;
    error?: string;
}

// type RecordType = {
   
//     text: string;
//     amount: number;
//     category: string;
//     date: Date;

// }

async function addExpenseRecord(formData: RecordType): Promise<RecordResult> {
    /*   const textValue = formData.get('text');
      const amountValue = formData.get('amount');
      const categoryValue = formData.get('category');
      const dateValue = formData.get('date'); // Extract date from formData */
    const textValue = formData.text;
    const amountValue = formData.amount;
    const categoryValue = formData.category;
    const dateValue = formData.date;

    // console.log('whats in dateValue: ', dateValue)
    // console.log('type of dateValue: ', typeof dateValue)
    // Check for input values
    if (
        !textValue ||
        textValue === '' ||
        !amountValue ||
        !categoryValue ||
        categoryValue === '' ||
        !dateValue ||
        dateValue === new Date()
    ) {
        return { error: 'Text, amount, category, or date is missing' };
    }

    const text: string = textValue.toString(); // Ensure text is a string
    const amount: number = parseFloat(amountValue.toString()); // Parse amount as number
    const category: string = categoryValue.toString(); // Ensure category is a string


    let date: string;


    try {
        // Expect input like "2025-06-25"
        const isoDate = moment(dateValue)
            .utc()
            .set({ hour: 12 }) // set noon UTC
            .toISOString();

        date = isoDate;
    } catch (err) {
        console.error("Invalid date format:", err);
        return { error: "Invalid date format" };
    }

    // Get logged in user
    const { userId } = await auth();

    // Check for user
    if (!userId) {
        return { error: 'User not found' };
    }

    try {
        // Create a new record (allow multiple expenses per day)
        const createdRecord = await db.record.create({
            data: {
                text,
                amount,
                category,
                date, // Save the date to the database
                userId,
            },
        });

        const recordData: RecordData = {
            id: createdRecord.id,
            text: createdRecord.text,
            amount: createdRecord.amount,
            category: createdRecord.category,
            date: createdRecord.date?.toISOString() || date,
        };

        revalidatePath('/');

        return { data: recordData };
    } catch (error) {
        console.error('Error adding expense record:', error); // Log the error
        return {
            error: 'An unexpected error occurred while adding the expense record.',
        };
    }
}

export default addExpenseRecord;