import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

export function NextButton({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyle =
    "px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 active:scale-97 cursor-pointer shadow-sm disabled:opacity-50 disabled:cursor-not-allowed select-none";

  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-md shadow-blue-100",
    secondary:
      "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default NextButton;
