import { WorkItem } from "@/components/layouts/WorkItem";
import { PageTitle } from "@/components/layouts/PageTitle";
import { fetchWorks } from "@/lib/fetchWorks";
import type { TerminalParams } from "@/types/terminal";
import type { WorkItemData } from "@/types/work";

const initialTitle = "-----";
const resultTitle = "Works";

type WorkItemViewData = WorkItemData & {
  terminalParams: TerminalParams;
};

const buildTerminalParams = (workItem: WorkItemData): TerminalParams => ({
  commands: [`./${workItem.title}.app`],
  url: workItem.url,
  targetOption: "_blank",
});

export default async function Works() {
  const workItems = await fetchWorks();
  const workItemViews: WorkItemViewData[] = workItems.map((workItem) => ({
    ...workItem,
    terminalParams: buildTerminalParams(workItem),
  }));

  return (
    <div className="w-full">
      <main className="mx-auto flex min-h-[calc(100dvh-var(--toggle-page-bar-reserved))] w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <PageTitle initialTitle={initialTitle} resultTitle={resultTitle} />

        <div className="grid gap-6">
          {workItemViews.map((value) => (
            <WorkItem
              key={value.title}
              title={value.title}
              itemIconPath={value.itemIconPath}
              description={value.description}
              achievements={value.achievements}
              url={value.url}
              bgColor="#fff"
              terminalParams={value.terminalParams}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
