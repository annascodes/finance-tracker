import moment from "moment";

export const convertDate = (dateValue: string| Date) => {
  try {
    // Expect input like "2025-06-25"
    const isoDate = moment(dateValue)
      .utc()
      .set({ hour: 12 }) // set noon UTC
      .toISOString();

    return isoDate;
  } catch (err) {
    console.error("Invalid date format:", err);
    return { error: "Invalid date format" };
  }
};



 