"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import Container from "@/components/Container";
import AdminLoginForm from "@/components/admin/AdminLoginForm";

export const dynamic = "force-dynamic";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showForbiddenBanner, setShowForbiddenBanner] = useState(false);

  useEffect(() => {
    const reason = searchParams.get("reason");
    if (reason === "forbidden") {
      setShowForbiddenBanner(true);
    }
  }, [searchParams]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/admin");
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <div className="py-12 md:py-20">
      <Container>
        <div className="max-w-md mx-auto">
          <h1 className="mb-2">Admin Login</h1>
          <p className="text-gray-600 mb-8">
            Sign in to access the admin dashboard
          </p>
          
          {showForbiddenBanner && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              <p className="font-semibold">Access denied.</p>
              <p className="text-sm mt-1">This account is not authorized for admin.</p>
            </div>
          )}
          
          <AdminLoginForm />
        </div>
      </Container>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={
      <div className="py-12 md:py-20">
        <Container>
          <div className="max-w-md mx-auto text-center">
            <p className="text-gray-600">Loading...</p>
          </div>
        </Container>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}

