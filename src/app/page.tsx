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
    <div className="w-full">
      <main className="mx-auto min-h-[calc(100dvh-var(--toggle-page-bar-reserved))] w-full max-w-7xl flex flex-col gap-10 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section>
          <UserCard />
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div>
            <Terminal {...displayAboutTerminalParams} />
          </div>
          <div>
            <Terminal {...displayWorksTerminalParams} />
          </div>
          <div>
            <Terminal {...displayContactTerminalParams} />
          </div>
        </section>
      </main>
    </div>
  );
}
