'use client';

import Link from "next/link";
import { PageTitle } from "@/components/layouts/PageTitle";

const initialTitle = "-----";
const resultTitle = "Rikuto Kanzaki";
const githubUrl = "https://github.com/rikutokanzaki";

export const UserCard = () => {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-start gap-4 rounded-4xl px-6 py-6 sm:px-8">
      <PageTitle initialTitle={initialTitle} resultTitle={resultTitle} />
      <p className="max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
        Cybersecurity grad student | Software Engineer
      </p>

      <p className="font-mono text-sm tracking-[0.08em] text-white/70">
        GitHub:
        <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
          <span className="ml-2 text-sky-200 underline decoration-sky-300/60 underline-offset-4">
            rikutokanzaki
          </span>
        </Link>
      </p>
    </div>
  );
};
