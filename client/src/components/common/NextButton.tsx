import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

export function NextButton({
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseStyle =
    "py-3 px-7 border border-[#4E2FD2] rounded-[7px] text-[#4E2FD2] text-xl leading-[24px] tracking-normal font-bold bg-transparent hover:bg-[#4E2FD2]/5 active:scale-97 transition-all duration-300 cursor-pointer shadow-sm disabled:opacity-50 disabled:cursor-not-allowed select-none text-center inline-flex items-center justify-center";

  return (
    <button className={`${baseStyle} ${className}`} {...props}>
      {children}
    </button>
  );
}

export default NextButton;
