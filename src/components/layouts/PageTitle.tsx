'use client';

import { useState, useEffect } from "react";
import { replaceText } from "@/utils/displayText";

type Props = {
  initialTitle: string;
  resultTitle: string;
}

export const PageTitle = ({ initialTitle, resultTitle }: Props) => {
  const [titleText, setTitleText] = useState(initialTitle);

  useEffect(() => {
    let isActive = true;

    const runReplaceText = async () => {
      await replaceText(initialTitle, resultTitle, (text) => {
        if (isActive) {
          setTitleText(text);
        }
      });
    };

    runReplaceText();

    return () => {
      isActive = false;
    };
  }, [initialTitle, resultTitle]);

  return (
    <div className="page-title mb-6 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[0.65rem] tracking-[0.35em] text-white/55 uppercase">
          portfolio
        </span>
        <div className="h-px flex-1 bg-linear-to-r from-white/30 via-white/10 to-transparent" />
      </div>
      <h1 className="text-4xl tracking-[0.12em] text-white sm:text-5xl md:text-6xl">
        {titleText}
      </h1>
    </div>
  );
}
