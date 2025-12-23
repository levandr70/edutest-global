import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getMetadataBaseUrl } from "@/lib/env";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: getMetadataBaseUrl(),
  title: {
    default: "EduTest Global — International Testing Center",
    template: "%s | EduTest Global",
  },
  description:
    "EduTest Global is an international testing center in Yerevan, Armenia offering TOEFL, GRE, ACT, and other standardized tests, plus CELTA certification.",
  keywords: [
    "TOEFL",
    "GRE",
    "ACT",
    "CELTA",
    "testing center",
    "Yerevan",
    "Armenia",
    "international exams",
    "standardized tests",
    "certification",
  ],
  authors: [{ name: "EduTest Global" }],
  creator: "EduTest Global",
  publisher: "EduTest Global",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "EduTest Global",
    title: "EduTest Global — International Testing Center",
    description:
      "Official testing center in Yerevan, Armenia for TOEFL, GRE, ACT, and other standardized tests, plus CELTA certification.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "EduTest Global — International Testing Center",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EduTest Global — International Testing Center",
    description:
      "Official testing center in Yerevan, Armenia for TOEFL, GRE, ACT, and other standardized tests, plus CELTA certification.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

