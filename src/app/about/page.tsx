import { PageTitle } from "@/components/layouts/PageTitle";
import { Profile } from "@/components/layouts/Profile";
import { Story } from "@/components/layouts/Story";

const initialTitle = "-----";
const resultTitle = "About";
const statusList = ["SWE", "SIT"];

export default function About() {
  return (
    <div className="w-full">
      <main className="mx-auto flex min-h-[calc(100dvh-var(--toggle-page-bar-reserved))] w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <PageTitle initialTitle={initialTitle} resultTitle={resultTitle} />

        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <Profile
            name="Rikuto Kanzaki"
            iconPath="/rikutokanzaki_icon.png"
            statusList={statusList}
            description="I build software with a security-first mindset, and I like interfaces that feel purposeful instead of generic. This portfolio keeps the terminal motif while making the experience calmer, cleaner, and easier to explore."
          />

          <Story />
        </div>
      </main>
    </div>
  );
}
