"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Container from "./Container";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [announcementDismissed, setAnnouncementDismissed] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const dismissed = localStorage.getItem("announcementDismissed");
      if (dismissed === "true") {
        setAnnouncementDismissed(true);
      }
    }
  }, []);

  const handleDismissAnnouncement = () => {
    setAnnouncementDismissed(true);
    if (typeof window !== "undefined") {
      localStorage.setItem("announcementDismissed", "true");
    }
  };

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Professional Tests", href: "/testing" },
    { name: "TOEFL iBT", href: "/testing/toefl" },
    { name: "GRE", href: "/testing/gre" },
    { name: "ACT", href: "/testing/act" },
    { name: "CELTA", href: "/celta" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Announcement Strip */}
      {!announcementDismissed && (
        <div className="bg-primary text-white py-2.5 relative">
          <Container>
            <div className="flex items-center justify-center">
              <p className="text-sm font-medium text-center px-8">
                Official International Exams in Yerevan • 10:00–18:00
              </p>
              <button
                onClick={handleDismissAnnouncement}
                className="absolute right-4 md:right-8 p-1 hover:bg-primary-800 rounded transition-colors"
                aria-label="Dismiss announcement"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </Container>
        </div>
      )}

      <Container>
        <nav className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-bold text-primary hover:text-primary-800 transition-colors"
            >
              EduTest Global
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            {navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                    active
                      ? "bg-primary text-white"
                      : "text-neutral-700 hover:text-primary hover:bg-neutral-50"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
            {/* Desktop Call Button */}
            <a
              href="tel:+37460509709"
              className="ml-4 px-6 py-2 bg-primary text-white rounded-md font-semibold hover:bg-primary-800 transition-colors duration-200 flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              Call
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-neutral-700 hover:text-primary focus:outline-none focus:text-primary p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? "max-h-[500px] pb-4" : "max-h-0"
          }`}
        >
          <div className="flex flex-col space-y-1 pt-2">
            {navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-3 rounded-md font-medium transition-colors ${
                    active
                      ? "bg-primary text-white"
                      : "text-neutral-700 hover:text-primary hover:bg-neutral-50"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              );
            })}
            {/* Mobile Action Links */}
            <div className="pt-4 mt-2 border-t border-neutral-200">
              <a
                href="tel:+37460509709"
                className="mx-4 px-4 py-3 bg-primary text-white rounded-md font-semibold hover:bg-primary-800 transition-colors flex items-center justify-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Call Us
              </a>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}

