'use client';

import { Button } from "@/components/elements/Button";
import { simulateTyping } from "@/utils/displayText";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";

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

  const textClassByPath =
    pathName === "/" ? ["text-black", "text-white", "text-white", "text-white"] : pathName === "/about" ? ["text-white", "text-black", "text-white", "text-white"] : pathName === "/works" ? ["text-white", "text-white", "text-black", "text-white"] : ["text-white", "text-white", "text-white", "text-black"];

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
    <div className="toggle-page-bar px-3 py-2 w-full bg-(--background) border-2 border-white border-solid rounded-xl shadow-[0_5px_15px_rgba(0,0,0,0.35)] overflow-hidden">
      <div className="mb-2 h-5 text-sm text-white whitespace-nowrap overflow-hidden text-ellipsis" style={{ fontFamily: 'var(--font-cascadia-code), monospace' }}>
        <span style={{ color: "#22c55e" }}>rikuto@swe</span>
        <span style={{ color: "#ffffff" }}>:</span>
        <span style={{ color: "#60a5fa" }}>{`~${pathName}`}</span>
        <span style={{ color: "#ffffff" }}>$ </span>
        <span>{displayedCommand}</span>
        <span aria-hidden="true" className="caret" style={{ backgroundColor: "#ffffff" }}></span>
      </div>

      <div className="relative w-full grid grid-cols-4 items-center isolate">
        <div className={`absolute top-1/2 left-0 w-1/4 h-7 bg-white rounded-lg pointer-events-none -translate-y-1/2 transition-transform duration-300 ease-out z-0 ${backgroundPositionClass}`} />

        {pageLinks.map((pageLink, index) => (
          <Link
            key={pageLink.href}
            href={pageLink.href}
            className="relative w-full z-10"
            onMouseEnter={() => void startTypingPreview(pageLink.command)}
            onMouseLeave={clearTypingPreview}
          >
            <Button className={`px-3 py-1 w-full text-center cursor-pointer ${textClassByPath[index]}`}>
              {pageLink.label}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}
