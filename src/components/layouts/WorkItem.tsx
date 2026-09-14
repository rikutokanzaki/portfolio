import Image from "next/image";
import Link from "next/link";
import { Terminal } from "@/components/layouts/Terminal";
import { TerminalParams } from "@/types/terminal";
import type { WorkAchievement } from "@/types/work";

type Props = {
  title: string;
  itemIconPath?: string;
  iconAlt?: string;
  description: string;
  url: string;
  bgColor?: string;
  terminalParams: TerminalParams;
  achievements?: WorkAchievement[];
};

export const WorkItem = ({ title, itemIconPath, iconAlt, description, url, bgColor, terminalParams, achievements = [] }: Props) => {
  const isResearch = title.toLowerCase() === "research";

  return (
    <div className="w-full rounded-[1.75rem] border border-white/10 bg-white/5 p-5 shadow-[0_24px_80px_rgba(2,6,23,0.35)]">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-2xl tracking-[0.18em] text-white">{title}</h2>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[0.65rem] tracking-[0.28em] text-white/50 uppercase">
          project
        </span>
      </div>

      <div className="grid min-w-0 gap-6 md:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] md:items-stretch">
        <div className="self-center">
          <Terminal {...terminalParams} />
        </div>

        <div className="glass-panel flex min-h-full min-w-0 items-start rounded-3xl p-5">
          <div className="flex w-full flex-col items-center gap-5 md:items-start">
            {itemIconPath ? (<Link href={url}>
              <div
                className="overflow-hidden rounded-2xl border border-white/10 bg-white p-2 shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition hover:-translate-y-0.5"
                style={bgColor ? { backgroundColor: bgColor } : undefined}
              >
                <Image
                  src={itemIconPath}
                  alt={iconAlt ?? `${title}_logo`}
                  width={84}
                  height={84}
                />
              </div>
            </Link>) : null}

            <p className="w-full text-sm leading-7 text-white/78">{description}</p>

            {isResearch ? (
              <section className="w-full border-t border-white/10 pt-4">
                <p className="font-mono text-xs tracking-[0.32em] text-emerald-300/70 uppercase">
                  achievements
                </p>

                {achievements.length > 0 ? (
                  <ul className="mt-3 space-y-3">
                    {achievements.map((achievement, index) => (
                      <li key={`${achievement.title}-${index}`} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                        {achievement.url ? (
                          <Link href={achievement.url} target="_blank" rel="noopener noreferrer" className="text-sky-200 underline decoration-sky-300/60 underline-offset-4">
                            {achievement.title}
                          </Link>
                        ) : (
                          <p className="text-sm text-white/90">{achievement.title}</p>
                        )}
                        {achievement.detail ? (
                          <p className="mt-1 text-xs leading-5 text-white/55">{achievement.detail}</p>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm text-white/50">No achievements recorded yet.</p>
                )}
              </section>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
