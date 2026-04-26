import { HTMLAttributes, ReactNode } from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export const Title = ({ children, ...props }: Props) => {
  return (
    <div className="page-title inline-flex w-fit text-4xl">
      <h1 {...props}>{children}</h1>
      <span aria-hidden="true" className="caret" style={{ backgroundColor: "#ffffff" }}></span>
    </div>
  );
}
