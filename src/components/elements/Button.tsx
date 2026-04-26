import { ButtonHTMLAttributes, ReactNode } from "react"

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export const Button = ({ children, ...props }: Props) => {
  return (
    <div className="w-full flex justify-center">
      <button className="py-1 px-2 border-2 rounded-md cursor-pointer bg-(--background) border-[#22c55e] text-(--foreground) active:bg-(--background) active:border-(--foreground) active:text-[#60a5fa]" {...props}>
        {children}
      </button>
    </div >
  );
}
