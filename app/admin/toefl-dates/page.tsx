"use client";

import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import TestDatesManager from "@/components/admin/TestDatesManager";

export const dynamic = "force-dynamic";

export default function AdminToeflDatesPage() {
  return (
    <AdminAuthGuard>
      <TestDatesManager exam="toefl" examLabel="TOEFL" />
    </AdminAuthGuard>
  );
}

