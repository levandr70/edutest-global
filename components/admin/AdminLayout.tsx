"use client";

import { ReactNode } from "react";
import Container from "@/components/Container";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="py-12 md:py-20">
      <Container>
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </Container>
    </div>
  );
}


