'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Button } from "@/components/elements/Button";
import { simulateTyping } from "@/utils/displayText";

export const TogglePageBar = () => {
  const pathName = usePathname();
  const [displayedCommand, setDisplayedCommand] = useState("");
  const typingRunId = useRef(0);

  const pageLinks = [
    { href: "/", label: "Home", command: "cd ~/" },
    { href: "/about", label: "About", command: "cd ~/about" },
    { href: "/works", label: "Works", command: "cd ~/works" },
    { href: "/contact", label: "Contact", command: "cd ~/contact" },
  ];

  const textClassByPath = ["text-white", "text-white", "text-white", "text-white"];

  const backgroundPositionClass =
    pathName === "/" ? "translate-x-[0%]" : pathName === "/about" ? "translate-x-[100%]" : pathName === "/works" ? "translate-x-[200%]" : "translate-x-[300%]";

  const startTypingPreview = async (command: string) => {
    const currentRunId = typingRunId.current + 1;
    typingRunId.current = currentRunId;
    setDisplayedCommand("");

    await simulateTyping([command], (nextCommand) => {
      if (typingRunId.current === currentRunId) {
        setDisplayedCommand(nextCommand);
      }
    }, 60);
  };

  const clearTypingPreview = () => {
    typingRunId.current += 1;
    setDisplayedCommand("");
  };

  return (
    <div className="toggle-page-bar glass-panel min-h-24 overflow-hidden rounded-xl p-2">
      <div
        className="mb-3 h-5 truncate font-mono text-sm text-white/80"
        style={{ fontFamily: "var(--font-roboto-mono)" }}
      >
        <span className="pl-2" style={{ color: "#22c55e" }}>rikuto@swe</span>
        <span className="text-white/70">:</span>
        <span style={{ color: "#60a5fa" }}>{`~${pathName}`}</span>
        <span className="text-white/70">$ </span>
        <span>{displayedCommand}</span>
        <span aria-hidden="true" className="caret" style={{ backgroundColor: "#e2e8f0" }} />
      </div>

      <div className="relative isolate grid w-full grid-cols-4 items-center gap-1 rounded-xl border border-white/10 bg-black/20 p-1">
        <div className={`pointer-events-none absolute top-1/2 left-1 z-0 h-[calc(100%-0.5rem)] w-[calc(25%-0.25rem)] -translate-y-1/2 rounded-lg border border-white/25 bg-slate-700/90 shadow-[0_4px_14px_rgba(2,6,23,0.3)] transition-transform duration-300 ease-out ${backgroundPositionClass}`} />

        {pageLinks.map((pageLink, index) => (
          <Link
            key={pageLink.href}
            href={pageLink.href}
            className="relative z-10 w-full"
            onMouseEnter={() => void startTypingPreview(pageLink.command)}
            onMouseLeave={clearTypingPreview}
          >
            <Button className={`w-full rounded-lg border-transparent bg-transparent! px-2 py-2 text-sm tracking-[0.12em] shadow-none transition-none hover:translate-y-0 hover:border-transparent hover:bg-white/10! ${textClassByPath[index]}`}>
              {pageLink.label}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}
