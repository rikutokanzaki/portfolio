import Image from "next/image";
import Link from "next/link";
import { Terminal } from "@/components/layouts/Terminal";
import { TerminalParams } from "@/types/terminal";

type Props = {
  title: string;
  itemIconPath?: string;
  iconAlt?: string;
  description: string;
  url: string;
  bgColor?: string;
  terminalParams: TerminalParams;
};

export const WorkItem = ({ title, itemIconPath, iconAlt, description, url, bgColor, terminalParams }: Props) => {
  return (
    <div className="w-full flex flex-col">
      <h2 className="pb-7 w-fit text-2xl">{title}</h2>

      <div className="w-full flex flex-col items-center md:flex-row md:justify-between">
        <Terminal {...terminalParams} />

        <div className="w-3/5 h-full border-b-2 flex">
          <div className="w-full flex justify-around items-center">
            {itemIconPath ? (<Link href={url}>
              <div
                className="p-1 rounded-md cursor-pointer overflow-hidden"
                style={bgColor ? { backgroundColor: bgColor } : undefined}
              >
                <Image
                  src={itemIconPath}
                  alt={iconAlt ?? `${title}_logo`}
                  width={80}
                  height={80}
                />
              </div>
            </Link>) : null}

            <p className="py-3 w-full h-full">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
