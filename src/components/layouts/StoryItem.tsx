import type { HTMLAttributes } from "react";
import type { StoryItemData } from "@/types/story";

type StoryItemProps = StoryItemData & HTMLAttributes<HTMLDivElement>;

export const StoryItem = ({ title, period, description, ...props }: StoryItemProps) => {
  return (
    <div className="flex w-full flex-col justify-end border-b border-white/10 pb-5" {...props}>
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="pb-2 text-xl tracking-widest text-white">{title}</h2>
        <p className="font-mono text-xs tracking-[0.3em] text-white/45">{period}</p>
      </div>

      <p className="p-2 text-sm leading-7 text-white/75">{description}</p>
    </div>
  );
};
