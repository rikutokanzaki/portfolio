'use client';

import Link from "next/link";
import { PageTitle } from "@/components/layouts/PageTitle";

const initialTitle = "＊＊＊＊＊＊＊＊＊";
const resultTitle = "Rikuto Kanzaki";
const githubUrl = "https://github.com/rikutokanzaki";

export const UserCard = () => {
  return (
    <div className="mx-auto flex flex-col">
      <PageTitle initialTitle={initialTitle} resultTitle={resultTitle} />
      <p>Cybersecurity grad student | Software Engineer</p>

      <p>GitHub:
        <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
          <span className="ml-1 underline">rikutokanzaki</span>
        </Link>
      </p>
    </div>
  );
}
