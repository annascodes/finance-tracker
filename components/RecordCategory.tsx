import React from "react";
import {
  LuUtensils,
  LuBus,
  LuShoppingBag,
  LuReceipt,
  LuTag,
  LuMilk,
} from "react-icons/lu";
import { MdOutlineLocalDrink } from "react-icons/md";
import { IoIosWater } from "react-icons/io";

// Category → Icon map
const categoryIcons: Record<string, React.ElementType> = {
  Food: LuUtensils,
  Milk : LuMilk,
  Water: IoIosWater,
  Transport: LuBus,
  Shopping: LuShoppingBag,
  Bills: LuReceipt,
  Other: LuTag,
};

// Define props type
type RecordCategoryProps = {
  category?: keyof typeof categoryIcons; // optional + restricted to keys
};

const RecordCategory: React.FC<RecordCategoryProps> = ({ category = "Other" }) => {
  // Pick the icon, fallback to LuTag
  const Icon = categoryIcons[category] || LuTag;

  return (
    <div className="flex flex-row justify-start items-center gap-2">
      <Icon className="text-md" />
      <h1>{category}</h1>
    </div>
  );
};

export default RecordCategory;
