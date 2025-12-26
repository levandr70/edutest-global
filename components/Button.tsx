import Link from "next/link";
import { ReactNode, MouseEvent } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  onClick?: (e?: MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
}

export default function Button({
  children,
  href,
  variant = "primary",
  onClick,
  type = "button",
  className = "",
  disabled = false,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 text-sm sm:text-base font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm hover:shadow-md active:scale-[0.98]";
  const variants = {
    primary:
      "bg-primary text-white hover:bg-primary-800 focus:ring-primary-500 focus:ring-offset-white",
    secondary:
      "bg-neutral-700 text-white hover:bg-neutral-800 focus:ring-neutral-500 focus:ring-offset-white",
  };

  const disabledStyles = disabled
    ? "opacity-50 cursor-not-allowed pointer-events-none"
    : "";

  const combinedClassName = `${baseStyles} ${variants[variant]} ${disabledStyles} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={(e) => {
        if (onClick) {
          onClick(e);
        }
      }}
      className={combinedClassName}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

