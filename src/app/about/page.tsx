import { PageTitle } from "@/components/layouts/PageTitle";
import { Profile } from "@/components/layouts/Profile";
import { Story } from "@/components/layouts/Story";

const initialTitle = "＊＊＊＊＊";
const resultTitle = "About";
const statusList = ["SWE", "SIT"];

export default function About() {
  return (
    <div
      className="w-full"
      style={{ height: "calc(100dvh - var(--toggle-page-bar-reserved))", overflow: "hidden" }}
    >
      <main className="pt-10 mx-auto w-4/5 h-full flex flex-col">
        <PageTitle initialTitle={initialTitle} resultTitle={resultTitle} />

        <div className="w-full h-full flex flex-col justify-evenly">
          <Profile
            name="Rikuto Kanzaki"
            iconPath="/rikutokanzaki_icon.png"
            statusList={statusList}
            description="Hi there!"
          />

          <Story />
        </div>
      </main>
    </div>
  );
}
