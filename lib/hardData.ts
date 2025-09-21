import moment from "moment";
import {
    LuUtensils,
    LuBus,
    LuShoppingBag,
    LuReceipt,
    LuTag,
} from "react-icons/lu";
import { LuMilk } from "react-icons/lu";
import { MdOutlineLocalDrink } from "react-icons/md";
import { IoIosClose, IoIosWater } from "react-icons/io";




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



// export const TAG_OPTIONS: string[] = Object.values(Tag);


export const categories = [
  { label: "Null", icon: IoIosClose },
    { label: "Food", icon: LuUtensils },
    { label: "Milk", icon: LuMilk },
    { label: "Water", icon: IoIosWater },
    { label: "Transport", icon: LuBus },
    { label: "Shopping", icon: LuShoppingBag },
    { label: "Bills", icon: LuReceipt },
    { label: "Other", icon: LuTag },
    
    
];






 