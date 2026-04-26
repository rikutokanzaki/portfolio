import type { HTMLAttributes } from "react";
import type { StoryItemData } from "@/types/story";

type StoryItemProps = StoryItemData & HTMLAttributes<HTMLDivElement>;

export const StoryItem = ({ title, period, description, ...props }: StoryItemProps) => {
  return (
    <div className="w-full border-b-2 flex flex-col justify-end" {...props}>
      <div className="flex justify-between">
        <h2 className="pb-2 text-2xl">{title}</h2>
        <p>{period}</p>
      </div>

      <p className="p-2 text-md">{description}</p>
    </div>
  );
};
