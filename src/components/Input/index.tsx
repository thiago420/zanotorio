import React from "react";
// import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  required?: boolean;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  required = false,
  // className,
  ...props
}) => {
  return (
    // <input
    //   className={clsx(
    //     "rounded-lg border border-green-600 px-4 py-2 text-[1.8rem] text-white focus:outline-none",
    //     className,
    //   )}
    //   {...props}
    // />
    <div className="relative mt-8 flex flex-row items-center [--clr:#1f1f1f] dark:[--clr:#999999]">
      <input
        defaultValue=""
        name="email"
        required
        aria-invalid="false"
        placeholder=""
        spellCheck="false"
        autoComplete="off"
        id="email"
        type="email"
        className="peer m-0 box-border block h-[40px] min-h-[40px] w-full resize-none appearance-none rounded-[10px] border border-solid bg-white p-0 pr-[40px] pl-2 text-left text-base leading-normal text-black text-inherit outline-0 focus-visible:border-teal-500 focus-visible:ring-4 focus-visible:ring-[#71717a2e] focus-visible:outline-0 focus-visible:outline-none dark:bg-zinc-800 dark:text-white dark:focus-visible:ring-[#14b8a61a]"
        {...props}
      />
      <label
        className="absolute z-0 mb-px inline-block origin-[0] translate-x-[12px] transform cursor-text text-start text-sm font-normal text-[--clr] duration-300 select-none peer-focus-visible:translate-x-[0px] peer-focus-visible:translate-y-[-36px] peer-focus-visible:text-teal-500 peer-[:not(:placeholder-shown)]:translate-x-[8px] peer-[:not(:placeholder-shown)]:translate-y-[-36px] peer-[:not(:placeholder-shown)]:text-[-36px]"
        htmlFor="email"
      >
        Email
      </label>
      <div className="group peer-focus-visible:[&amp;_span]:border-teal-600 absolute top-0 right-0 bottom-0 flex w-[40px] items-center justify-center text-[--clr] peer-focus-visible:text-teal-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1rem"
          height="1rem"
          strokeLinejoin="round"
          strokeLinecap="round"
          viewBox="0 0 24 24"
          strokeWidth={2}
          fill="none"
          stroke="currentColor"
        >
          <path fill="none" d="M0 0h24v24H0z" stroke="none" />
          <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
          <path d="M12 8v4" />
          <path d="M12 16h.01" />
        </svg>
        <span className="absolute right-0 -z-10 cursor-default rounded-[4px] px-1.5 text-sm text-amber-300 opacity-0 transition-all duration-300 select-none group-hover:-translate-y-[calc(100%+18px)] group-hover:opacity-100">
          Required!
        </span>
      </div>
    </div>
  );
};

export default Input;
