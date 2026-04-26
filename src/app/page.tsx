import { Terminal } from "@/components/layouts/Terminal";
import { UserCard } from "@/components/layouts/UserCard";

const displayAboutTerminalParams = {
  title: "About",
  commands: ["./About.app"],
  url: "/about",
};

const displayWorksTerminalParams = {
  title: "Works",
  commands: ["./Works.app"],
  url: "/works",
};

const displayContactTerminalParams = {
  title: "Contact",
  commands: ["./Contact.app"],
  url: "/contact",
};

export default function Home() {
  return (
    <div
      className="w-full"
      style={{ height: "calc(100dvh - var(--toggle-page-bar-reserved))", overflow: "hidden" }}
    >
      <main className="pt-10 w-full h-full flex flex-col align-middle">
        <UserCard />

        <div className="flex-1 w-full flex flex-col justify-center gap-8">
          <div className="w-full flex justify-center px-4 -translate-x-20 md:pl-35 md:px-0 md:justify-start">
            <Terminal {...displayAboutTerminalParams} />
          </div>
          <div className="w-full flex justify-center px-4 translate-x-22 md:pr-40 md:px-0 md:justify-end">
            <Terminal {...displayWorksTerminalParams} />
          </div>
          <div className="w-full flex justify-center px-4 -translate-x-10 md:pr-80 md:px-0">
            <Terminal {...displayContactTerminalParams} />
          </div>
        </div>
      </main>
    </div>
  );
}
