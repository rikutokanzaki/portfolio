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
    <div {...props}>
      <div className="flex items-end gap-2">
        {logo ? (
          <div
            className="p-1 rounded-sm"
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
        <h2 className="text-lg">{title}</h2>
      </div>

      <Link href={url} target="_blank" rel="noopener noreferrer">
        <p className="text-md underline">{linkText}</p>
      </Link>
    </div>
  );
};
