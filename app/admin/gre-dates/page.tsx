"use client";

import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import TestDatesManager from "@/components/admin/TestDatesManager";

export const dynamic = "force-dynamic";

export default function AdminGreDatesPage() {
  return (
    <AdminAuthGuard>
      <TestDatesManager exam="gre" examLabel="GRE" />
    </AdminAuthGuard>
  );
}

