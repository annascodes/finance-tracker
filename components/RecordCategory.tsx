import React from "react";
import {
  LuUtensils,
  LuBus,
  LuShoppingBag,
  LuReceipt,
  LuTag,
} from "react-icons/lu";

// Category → Icon map
const categoryIcons: Record<string, React.ElementType> = {
  Food: LuUtensils,
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
