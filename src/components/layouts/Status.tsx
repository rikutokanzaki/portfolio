import { Fragment } from "react";

type StatusProps = {
  statusList: string[];
};

export const Status = ({ statusList }: StatusProps) => {
  return (
    <ul className="mb-4 flex items-center justify-center gap-3 border-b border-white/10 pb-3">
      {statusList.map((value, index) => (
        <Fragment key={`${value}-${index}`}>
          <li className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-center text-sm tracking-[0.2em] text-white/80">
            {value}
          </li>

          {index < statusList.length - 1 ? (
            <li aria-hidden="true" className="font-mono text-white/45">
              |
            </li>
          ) : null}
        </Fragment>
      ))}
    </ul>
  );
};
