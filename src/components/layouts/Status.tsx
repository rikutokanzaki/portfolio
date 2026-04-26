type StatusProps = {
  statusList: string[];
};

export const Status = ({ statusList }: StatusProps) => {
  return (
    <ul className="pb-0.5 mb-2 border-b-2 flex">
      {statusList.map((value, index) => (
        <li key={`${value}-${index}`} className="relative flex-1 px-2 text-center">
          <p>{value}</p>

          {index < statusList.length - 1 ? (
            <span className="absolute right-0 top-1/2 h-4 w-px -translate-y-1/2 translate-x-1/2 bg-current" />
          ) : null}
        </li>
      ))}
    </ul>
  );
};
