import { ButtonHTMLAttributes, ReactNode } from "react"

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export const Button = ({ children, className = "", ...props }: Props) => {
  return (
    <div className="w-full flex justify-center">
      <button
        className={`inline-flex items-center justify-center rounded-full border border-emerald-400/40 bg-white/5 px-5 py-2 text-sm tracking-[0.2em] text-white/90 transition duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-white/10 active:translate-y-0 active:border-sky-300 active:text-sky-200 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
        {...props}
      >
        {children}
      </button>
    </div>
  );
}
