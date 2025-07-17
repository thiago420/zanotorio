import clsx from "clsx";
import React from "react";
// import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  className?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  className,
  error,
  ...props
}) => {
  return (
    <div className={clsx(
      "flex flex-col [--clr:#1f1f1f] dark:[--clr:#999999]"
    )}>
      {/* <input
        // defaultValue=""
        // name="email"
        // required
        // aria-invalid="false"
        // spellCheck="false"
        // autoComplete="off"
        placeholder=""
        id={id}
        className={clsx(
          "peer m-0 box-border z-10 block h-[40px] min-h-[40px] w-full resize-none appearance-none rounded-[10px] border border-solid bg-white p-0 pr-[40px] pl-2 text-left text-base leading-normal text-black text-inherit outline-0 focus-visible:border-teal-500 focus-visible:ring-4 focus-visible:ring-[#71717a2e] focus-visible:outline-0 focus-visible:outline-none dark:bg-zinc-800 dark:text-white dark:focus-visible:ring-[#14b8a61a]",
          className,
        )}
        {...props}
      /> */}
      <label
        className="mb-px inline-block cursor-text text-start text-sm font-normal text-[--clr] select-none"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className={clsx(
          "rounded-lg border border-green-600 px-4 py-2 text-[1.8rem] text-white focus:outline-none",
          className,
        )}
        {...props}
      />
      {error && (
        <span className={clsx(
          "cssanimation ca__fx-rattle",
          "text-[0.8rem] text-red-600",
        )}>
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
