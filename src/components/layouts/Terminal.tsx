'use client';

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { simulateTyping } from "@/utils/displayText";
import { delay } from "@/utils/delay";
import { TerminalParams } from "@/types/terminal";
import Link from "next/link";

export const Terminal = ({
  title,
  head = "rikuto@swe",
  delimiter = ":",
  cwd = "~",
  symbol = "$",
  commands,
  url,
  headColor = "#22c55e",
  delimiterColor,
  cwdColor = "#60a5fa",
  symbolColor,
  cursorColor,
  commandColor,
  targetOption,
}: TerminalParams) => {
  const router = useRouter();
  const [displayedCommand, setDisplayedCommand] = useState("");
  const [statusLines, setStatusLines] = useState<Array<string>>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const typingRunId = useRef(0);
  const isUnmounted = useRef(false);

  useEffect(() => {
    isUnmounted.current = false;

    return () => {
      isUnmounted.current = true;
      typingRunId.current += 1;
    };
  }, []);

  const appendStatusLine = (line: string) => {
    setStatusLines((previousLines) => {
      const nextLines = [...previousLines, line];

      return nextLines.slice(-3);
    });
  };

  const handleMouseEnter = async () => {
    if (isExecuting) {
      return;
    }

    const currentRunId = typingRunId.current + 1;
    typingRunId.current = currentRunId;
    setDisplayedCommand("");
    setStatusLines([]);

    await simulateTyping(commands, (nextCommand) => {
      if (typingRunId.current === currentRunId) {
        setDisplayedCommand(nextCommand);
      }
    });
  };

  const handleMouseLeave = () => {
    if (isExecuting) {
      return;
    }

    typingRunId.current += 1;
    setDisplayedCommand("");
    setStatusLines([]);
  };

  const navigateToTarget = () => {
    if (targetOption === "_blank") {
      window.open(url, "_blank", "noopener,noreferrer");
      return true;
    }

    router.push(url);
    return false;
  };

  const handleTerminalClick = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    if (isExecuting) {
      return;
    }

    const fixedCommand = commands[0] ?? `./${title}`;
    const appName = `${title}.app`;

    typingRunId.current += 1;
    setIsExecuting(true);
    setDisplayedCommand(fixedCommand);
    setStatusLines([]);
    appendStatusLine("Click Detected...");

    await delay(240);
    if (isUnmounted.current) {
      setIsExecuting(false);
      return;
    }

    appendStatusLine(`Executing ${appName}`);
    appendStatusLine(`Starting ${appName}...`);
    await delay(800);
    if (isUnmounted.current) {
      setIsExecuting(false);
      return;
    }

    const openedInNewTab = navigateToTarget();
    if (openedInNewTab) {
      setIsExecuting(false);
    }
  };

  return (
    <div className="w-full max-w-[24rem]">
      <div className="mb-3 flex items-center justify-between gap-3 px-1 text-sm text-white/70">
        <p className="truncate font-mono tracking-[0.32em] uppercase">
          {title}
        </p>
        <p className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[0.65rem] tracking-[0.28em] text-white/55">
          click to run
        </p>
      </div>

      <Link
        href={url}
        onClick={handleTerminalClick}
        target={targetOption}
        rel={targetOption === "_blank" ? "noopener noreferrer" : undefined}
        aria-label={`${title} terminal`}
        className="block"
      >
        <div
          className="terminal-link glass-panel w-full min-h-52 flex flex-col overflow-hidden rounded-xl cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex shrink-0 items-center justify-between bg-gray-200 border-b border-white/10 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#f87171] shadow-[0_0_12px_rgba(248,113,113,0.5)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#facc15] shadow-[0_0_12px_rgba(250,204,21,0.45)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#22c55e] shadow-[0_0_12px_rgba(34,197,94,0.45)]" />
            </div>
          </div>

          <div
            className="min-h-36 flex-1 space-y-3 bg-black px-3 py-2 font-mono text-[0.9rem] leading-6 sm:text-[0.95rem]"
            style={{ fontFamily: "var(--font-roboto-mono)" }}
          >
            <div className="text-white/85">
              <span style={{ color: headColor }}>{head}</span>
              <span style={{ color: delimiterColor ?? "rgba(248, 250, 252, 0.75)" }}>
                {delimiter}
              </span>
              <span style={{ color: cwdColor }}>{cwd}</span>
              <span style={{ color: symbolColor ?? "rgba(248, 250, 252, 0.8)" }}>
                {symbol}{" "}
              </span>
              <span style={{ color: commandColor ?? "rgba(248, 250, 252, 0.92)" }}>
                {displayedCommand}
              </span>
              <span
                aria-hidden="true"
                className="caret"
                style={{ backgroundColor: cursorColor ?? "#e2e8f0" }}
              />

              <div className="space-y-1 text-white/65">
                {statusLines.map((statusLine, index) => (
                  <div key={`${statusLine}-${index}`} style={{ color: commandColor ?? "#cbd5e1" }}>
                    {statusLine}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </Link>
    </div>
  );
}
