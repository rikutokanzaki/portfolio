'use client';

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { simulateTyping } from "@/utils/displayText";
import { delay } from "@/utils/delay";
import { TerminalParams } from "@/types/terminal";
import Link from "next/link";

export const Terminal = ({ title, head = "rikuto@swe", delimiter = ":", cwd = "~", symbol = "$", commands, url, headColor = "#22c55e", delimiterColor, cwdColor = "#60a5fa", symbolColor, cursorColor, commandColor, targetOption }: TerminalParams) => {
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
    <div className="w-full max-w-72">
      <div className="text-xl text-center">
        <p>{title}</p>
      </div>

      <Link
        href={url}
        onClick={handleTerminalClick}
        target={targetOption}
        rel={targetOption === "_blank" ? "noopener noreferrer" : undefined}
      >
        <div
          className="terminal-link w-full min-w-70 border-2 border-white shadow-[17px_20px_40px_0px_rgba(0,0,0,0.65)] cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="w-full h-3 bg-white"></div>
          <div className="px-1.5 mt-1/12 w-full h-30 bg-(--background)" style={{ fontFamily: 'var(--font-cascadia-code), monospace' }}>
            <div className="text-sm">
              <span style={{ color: headColor }}>{head}</span>
              <span style={{ color: delimiterColor }}>{delimiter}</span>
              <span style={{ color: cwdColor }}>{cwd}</span>
              <span style={{ color: symbolColor }}>{symbol} </span>
              <span style={{ color: commandColor }}>{displayedCommand}</span>
              <span aria-hidden="true" className="caret" style={{ backgroundColor: cursorColor }}></span>
            </div>
            {statusLines.map((statusLine, index) => (
              <div key={`${statusLine}-${index}`} style={{ color: commandColor }}>
                {statusLine}
              </div>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
}
