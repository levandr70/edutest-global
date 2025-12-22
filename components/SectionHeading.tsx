import { ReactNode } from "react";

interface SectionHeadingProps {
  children: ReactNode;
  className?: string;
}

export default function SectionHeading({
  children,
  className = "",
}: SectionHeadingProps) {
  return (
    <h2
      className={`text-center mb-12 md:mb-16 text-gray-900 ${className}`}
    >
      {children}
    </h2>
  );
}

