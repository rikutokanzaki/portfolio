import { TextareaHTMLAttributes } from "react";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = ({ ...props }: Props) => {
  return (
    <textarea
      className="py-1.5 w-full h-25 text-md border-b-2 border-(--foreground) outline-none resize-none"
      {...props}
    >
    </textarea>
  );
}
