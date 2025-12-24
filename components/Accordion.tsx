"use client";

import { useState, ReactNode } from "react";

interface AccordionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  id: string;
}

export default function Accordion({
  title,
  children,
  defaultOpen = false,
  id,
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentId = `accordion-content-${id}`;
  const buttonId = `accordion-button-${id}`;

  return (
    <div className="border-b border-neutral-200">
      <button
        id={buttonId}
        type="button"
        className={`w-full flex items-center justify-between py-4 px-4 text-left rounded-lg border border-neutral-200 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white hover:bg-neutral-50 ${
          isOpen ? "bg-neutral-50" : "bg-white"
        }`}
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 pr-4">{title}</h2>
        <span className="text-xl sm:text-2xl font-light text-gray-600 ml-2 sm:ml-4 flex-shrink-0">
          {isOpen ? "−" : "+"}
        </span>
      </button>
      <div
        id={contentId}
        role="region"
        aria-labelledby={buttonId}
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="pb-4 pt-2 px-4">{children}</div>
      </div>
    </div>
  );
}


