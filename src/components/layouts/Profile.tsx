import Image from "next/image";
import { Status } from "@/components/layouts/Status";

type Props = {
  name: string;
  iconPath: string;
  iconAlt?: string;
  statusList: string[];
  description: string;
}

export const Profile = ({ name, iconPath, iconAlt, statusList, description }: Props) => {
  return (
    <div className="py-3 px-4 w-full mx-auto bg-(--background) border-2 border-white rounded-md shadow-[0_5px_15px_rgba(0,0,0,0.35)] flex justify-around">
      <div className="flex flex-col items-center">
        <Image
          src={iconPath}
          alt={iconAlt ?? `${name}_logo`}
          width={80}
          height={80}
        />
        <p>{name}</p>
      </div>

      <div className="w-2/3 flex flex-col">
        <Status statusList={statusList} />
        <p className="h-full">{description}</p>
      </div>
    </div>
  );
}
