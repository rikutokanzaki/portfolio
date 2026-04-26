import { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ ...props }: Props) => {
  return (
    <input
      className="py-1.5 text-md border-b-2 border-(--foreground) outline-none"
      {...props}
    />
  );
}
