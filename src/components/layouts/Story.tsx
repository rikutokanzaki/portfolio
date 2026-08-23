import { StoryItem } from "@/components/layouts/StoryItem";
import { fetchStories } from "@/lib/fetchStories";

export const Story = async () => {
  const storyDataList = await fetchStories();

  return (
    <div className="glass-panel rounded-[1.75rem] p-5">
      <div className="flex flex-col gap-5">
        <div className="mx-auto w-full max-w-md border-b border-dashed border-white/15 pb-3 text-center">
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.4em] text-sky-200/70">
            timeline
          </p>
          <h2 className="pb-2 text-2xl tracking-[0.12em] text-white">
            What&apos;s New
          </h2>
        </div>

        <div className="flex flex-col gap-8">
          {storyDataList.map((value, index) => (
            <StoryItem
              key={`${value.title}-${index}`}
              title={value.title}
              period={value.period}
              description={value.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
