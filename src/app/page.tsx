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
          <div className="w-full flex items-center justify-around">
            <div className="w-1/3 h-full border-4 border-dotted rounded-xl"></div>
            <div className="flex justify-center px-4 translate-x-20 md:pr-35 md:px-0 md:justify-center">
              <Terminal {...displayAboutTerminalParams} />
            </div>
          </div>
          <div className="w-full flex items-center justify-around">
            <div className="flex justify-center px-4 -translate-x-20 md:pl-35 md:px-0 md:justify-center">
              <Terminal {...displayWorksTerminalParams} />
            </div>
            <div className="w-1/3 h-full border-4 border-dotted rounded-xl"></div>
          </div>
          <div className="w-full flex items-center justify-around">
            <div className="w-1/3 h-full border-4 border-dotted rounded-xl"></div>
            <div className="flex justify-center px-4 translate-x-20 md:pr-35 md:px-0 md:justify-center">
              <Terminal {...displayContactTerminalParams} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
