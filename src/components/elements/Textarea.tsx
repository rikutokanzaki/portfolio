import { TextareaHTMLAttributes } from "react";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = ({ ...props }: Props) => {
  return (
    <textarea
      className="min-h-24 w-full resize-none rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-base text-white/90 transition outline-none placeholder:text-white/30 focus:border-emerald-300 focus:bg-white/7 focus:ring-0"
      {...props}
    />
  );
}
