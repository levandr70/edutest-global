"use client";

import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import TestDatesManager from "@/components/admin/TestDatesManager";

export const dynamic = "force-dynamic";

export default function AdminActDatesPage() {
  return (
    <AdminAuthGuard>
      <TestDatesManager exam="act" examLabel="ACT" />
    </AdminAuthGuard>
  );
}

