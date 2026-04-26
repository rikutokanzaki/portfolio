import { WorkItem } from "@/components/layouts/WorkItem";
import { PageTitle } from "@/components/layouts/PageTitle";
import { fetchWorks } from "@/services/fetchWorks";
import type { TerminalParams } from "@/types/terminal";
import type { WorkItemData } from "@/types/work";

const initialTitle = "＊＊＊＊＊";
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
    <div
      className="w-full"
      style={{ height: "calc(100dvh - var(--toggle-page-bar-reserved))", overflow: "hidden" }}
    >
      <main className="pt-10 mx-auto w-4/5 h-full flex flex-col">
        <PageTitle initialTitle={initialTitle} resultTitle={resultTitle} />

        <div className="w-full h-full flex flex-col justify-evenly">
          {workItemViews.map((value, index) => (
            <WorkItem
              key={index}
              title={value.title}
              itemIconPath={value.itemIconPath}
              description={value.description}
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
