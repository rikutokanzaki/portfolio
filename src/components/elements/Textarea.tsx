import { TextareaHTMLAttributes } from "react";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = ({ ...props }: Props) => {
  return (
    <textarea
      className="w-full min-h-24 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-base text-white/90 outline-none placeholder:text-white/30 transition focus:border-emerald-300 focus:bg-white/7 focus:ring-0 resize-none"
      {...props}
    />
  );
}
