import { HTMLAttributes } from "react";
import Link from "next/link";
import Image from "next/image";

type Props = HTMLAttributes<HTMLDivElement> & {
  title: string;
  linkText: string;
  url: string;
  logo?: string;
  logoAlt?: string;
  bgColor?: string;
};

export const ContactInfo = ({ title, linkText, url, logo, logoAlt, bgColor, ...props }: Props) => {
  return (
    <div
      {...props}
      className="p-4 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
    >
      <div className="flex items-end gap-3">
        {logo ? (
          <div
            className="rounded-xl border border-white/10 p-2"
            style={bgColor ? { backgroundColor: bgColor } : undefined}
          >
            <Image
              src={logo}
              alt={logoAlt ?? `${title}_logo`}
              width={25}
              height={25}
              className="object-contain"
              style={{ width: 25, height: 25 }}
            />
          </div>
        ) : null}
        <h2 className="text-lg tracking-[0.18em] text-white/90">{title}</h2>
      </div>

      <Link href={url} target="_blank" rel="noopener noreferrer">
        <p className="font-mono text-sm tracking-[0.12em] text-sky-200 underline decoration-sky-300/60 underline-offset-4">
          {linkText}
        </p>
      </Link>
    </div>
  );
};
