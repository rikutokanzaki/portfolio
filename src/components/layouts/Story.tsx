import { StoryItem } from "@/components/layouts/StoryItem";
import { fetchStories } from "@/services/fetchStories";

export const Story = async () => {
  const storyDataList = await fetchStories();

  return (
    <div>
      <div className="flex flex-col gap-3">
        <div className="pb-1 mx-auto w-50 border-b-2 border-dashed">
          <h2 className="pb-2 text-2xl text-center">What&apos;s New</h2>
        </div>

        <div className="flex flex-col gap-10">
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
