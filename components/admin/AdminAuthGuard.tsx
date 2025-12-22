"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { getAuthInstance } from "@/lib/firebase/client";
import Container from "@/components/Container";

interface AdminAuthGuardProps {
  children: React.ReactNode;
}

// Parse admin emails from environment variable
function getAdminEmails(): string[] {
  const emailsEnv = process.env.NEXT_PUBLIC_ADMIN_EMAILS || "";
  if (!emailsEnv.trim()) {
    return [];
  }
  
  return emailsEnv
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter((email) => email.length > 0);
}

export default function AdminAuthGuard({ children }: AdminAuthGuardProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [accessDenied, setAccessDenied] = useState(false);
  const router = useRouter();
  const redirectingRef = useRef(false);
  const checkingAccessRef = useRef(false);

  useEffect(() => {
    // Only run in browser
    if (typeof window === "undefined") {
      return;
    }

    let unsubscribe: (() => void) | null = null;

    try {
      const authInstance = getAuthInstance();
      
      unsubscribe = onAuthStateChanged(
        authInstance,
        async (user) => {
          setUser(user);
          setError(null);
          
          // If not logged in, redirect to login
          if (!user) {
            setLoading(false);
            if (!redirectingRef.current) {
              redirectingRef.current = true;
              router.push("/admin/login");
            }
            return;
          }

          // Check admin allowlist
          const adminEmails = getAdminEmails();
          
          // If allowlist is empty or missing, deny access
          if (adminEmails.length === 0) {
            setError("Admin not configured");
            setLoading(false);
            return;
          }

          // Check if user email is in allowlist
          const userEmail = user.email?.toLowerCase() || "";
          
          if (!userEmail || !adminEmails.includes(userEmail)) {
            // User is not authorized - sign them out and redirect
            if (!checkingAccessRef.current) {
              checkingAccessRef.current = true;
              setAccessDenied(true);
              setLoading(false);
              
              try {
                await signOut(authInstance);
                router.push("/admin/login?reason=forbidden");
              } catch (signOutError) {
                console.error("Sign out error:", signOutError);
                router.push("/admin/login?reason=forbidden");
              }
            }
            return;
          }

          // User is authorized
          setLoading(false);
          setAccessDenied(false);
        },
        (error) => {
          console.error("Auth state error:", error);
          setError("Authentication error. Please check your Firebase configuration.");
          setLoading(false);
        }
      );
    } catch (err: any) {
      console.error("Firebase initialization error:", err);
      setError(
        err.message || 
        "Firebase is not properly configured. Please check your environment variables."
      );
      setLoading(false);
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [router]);

  if (loading) {
    return (
      <div className="py-12 md:py-20">
        <Container>
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="text-neutral-600">Checking access…</p>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (error) {
    const isConfigError = error === "Admin not configured";
    
    return (
      <div className="py-12 md:py-20">
        <Container>
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
              <p className="font-semibold mb-2 text-lg">
                {isConfigError ? "Admin Not Configured" : "Configuration Error"}
              </p>
              <p className="mb-3">{error}</p>
              {isConfigError ? (
                <>
                  <p className="text-sm text-red-600 mb-2">
                    Admin access is not configured. Please set the admin email allowlist.
                  </p>
                  <p className="text-sm text-red-600">
                    Set <code className="bg-red-100 px-1 rounded">NEXT_PUBLIC_ADMIN_EMAILS</code> in <code className="bg-red-100 px-1 rounded">.env.local</code>
                  </p>
                  <p className="text-sm text-red-600 mt-2">
                    Example: <code className="bg-red-100 px-1 rounded">NEXT_PUBLIC_ADMIN_EMAILS="admin@example.com,admin2@example.com"</code>
                  </p>
                </>
              ) : (
                <>
                  <p className="text-sm text-red-600">
                    Please ensure your Firebase environment variables are set in <code className="bg-red-100 px-1 rounded">.env.local</code>
                  </p>
                  <p className="text-sm text-red-600 mt-2">
                    Required variables: <code className="bg-red-100 px-1 rounded">NEXT_PUBLIC_FIREBASE_API_KEY</code>, <code className="bg-red-100 px-1 rounded">NEXT_PUBLIC_FIREBASE_PROJECT_ID</code>
                  </p>
                </>
              )}
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (accessDenied || !user) {
    // Show loading state while redirecting
    return (
      <div className="py-12 md:py-20">
        <Container>
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-neutral-600">Redirecting to login…</p>
          </div>
        </Container>
      </div>
    );
  }

  // User is authenticated and authorized
  return <>{children}</>;
}

