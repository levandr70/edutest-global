import Link from "next/link";
import Container from "./Container";

export default function Footer() {
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

  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <Container>
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-xl font-bold mb-4">
              EduTest Global
            </h3>
            <p className="text-sm text-neutral-400">
              International Testing Center
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="hover:text-white transition-colors duration-200 text-sm text-neutral-400"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-sm text-neutral-400 mb-4">
              <p>67/1 Baghramyan Ave.</p>
              <p>Yerevan, Armenia</p>
              <p>Hours: 10:00–18:00</p>
            </div>
            {/* Action Buttons */}
            <div className="mt-4">
              <a
                href="tel:+37460509709"
                className="px-4 py-2 bg-primary text-white rounded-md font-semibold hover:bg-primary-800 transition-colors text-sm flex items-center justify-center gap-2"
              >
                <svg
                  className="w-4 h-4"
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
          </div>
        </div>

        <div className="border-t border-neutral-800 py-6 text-center text-sm text-neutral-400">
          <p>&copy; {new Date().getFullYear()} EduTest Global. All rights reserved.</p>
          <p className="mt-2 text-xs text-neutral-500">
            Exam availability, scheduling, and registration are determined by each provider.
          </p>
        </div>
      </Container>
    </footer>
  );
}

