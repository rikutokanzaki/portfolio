import { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ ...props }: Props) => {
  return (
    <input
      className="w-full rounded-none border-b border-white/20 bg-transparent py-2 text-base text-white/90 outline-none placeholder:text-white/30 focus:border-emerald-300 focus:ring-0"
      {...props}
    />
  );
}
