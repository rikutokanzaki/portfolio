import Image from "next/image";
import { Status } from "@/components/layouts/Status";

type Props = {
  name: string;
  iconPath: string;
  iconAlt?: string;
  statusList: string[];
  description: string;
};

export const Profile = ({ name, iconPath, iconAlt, statusList, description }: Props) => {
  return (
    <div className="glass-panel w-full rounded-[1.75rem] px-5 py-5">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-6">
        <div className="flex flex-col items-center gap-2">
          <Image
            src={iconPath}
            alt={iconAlt ?? `${name}_logo`}
            width={80}
            height={80}
            className="rounded-2xl border border-white/10 bg-white/5 p-1"
          />
          <p className="font-mono text-sm tracking-[0.18em] text-white/90">{name}</p>
        </div>

        <div className="flex-1">
          <Status statusList={statusList} />
          <p className="text-sm leading-7 text-white/78">{description}</p>
        </div>
      </div>
    </div>
  );
};
