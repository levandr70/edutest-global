"use client";

import { useEffect, useRef, useState, FormEvent } from "react";
import Script from "next/script";
import Button from "./Button";

declare global {
  interface Window {
    turnstile: {
      render: (
        element: string | HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "error-callback"?: () => void;
        }
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

export default function ContactForm() {
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [isTurnstileReady, setIsTurnstileReady] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileError, setTurnstileError] = useState<string | null>(null);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    if (isTurnstileReady && turnstileRef.current && siteKey && !widgetIdRef.current) {
      try {
        const widgetId = window.turnstile.render(turnstileRef.current, {
          sitekey: siteKey,
          callback: (token: string) => {
            setTurnstileToken(token);
            setTurnstileError(null);
          },
          "error-callback": (error?: any) => {
            setTurnstileToken("");
            // Error 110200 typically means invalid site key or domain mismatch
            if (error?.code === 110200 || error?.message?.includes("110200")) {
              setTurnstileError("Verification configuration error. Please contact support.");
              console.error("Turnstile error 110200: Invalid site key or domain mismatch. Check NEXT_PUBLIC_TURNSTILE_SITE_KEY and domain configuration in Cloudflare.");
            } else {
              setTurnstileError("Verification failed. Please refresh the page.");
              console.error("Turnstile error:", error);
            }
          },
        });
        widgetIdRef.current = widgetId;
      } catch (error) {
        console.error("Turnstile render error:", error);
        setTurnstileError("Failed to load verification. Please refresh the page.");
      }
    }

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
          widgetIdRef.current = null;
        } catch (error) {
          console.error("Turnstile remove error:", error);
        }
      }
    };
  }, [isTurnstileReady, siteKey]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // If Turnstile is enabled but token is missing, show error
    if (siteKey && !turnstileToken && !turnstileError) {
      setSubmitStatus({
        type: "error",
        message: "Please complete the verification challenge.",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
      phone: formData.get("phone") as string || "",
      turnstileToken: turnstileToken || "",
      website: formData.get("website") as string || "",
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.ok) {
        // Success
        setSubmitStatus({
          type: "success",
          message: "Thank you. We will contact you during business hours.",
        });
        formRef.current?.reset();
        setTurnstileToken("");
        // Reset Turnstile widget
        if (widgetIdRef.current && window.turnstile) {
          try {
            window.turnstile.reset(widgetIdRef.current);
          } catch (error) {
            console.error("Turnstile reset error:", error);
          }
        }
      } else {
        // Error
        setSubmitStatus({
          type: "error",
          message: result.error || "Something went wrong. Please try again.",
        });
        // Reset Turnstile widget on error
        if (widgetIdRef.current && window.turnstile) {
          try {
            window.turnstile.reset(widgetIdRef.current);
            setTurnstileToken("");
          } catch (error) {
            console.error("Turnstile reset error:", error);
          }
        }
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
      // Reset Turnstile widget on error
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.reset(widgetIdRef.current);
          setTurnstileToken("");
        } catch (error) {
          console.error("Turnstile reset error:", error);
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!siteKey) {
    console.warn("NEXT_PUBLIC_TURNSTILE_SITE_KEY is not set. Turnstile verification will be disabled.");
  }

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="lazyOnload"
        onLoad={() => {
          if (window.turnstile) {
            setIsTurnstileReady(true);
          } else {
            console.error("Turnstile script loaded but window.turnstile is not available");
            setTurnstileError("Failed to load verification service. Please refresh the page.");
          }
        }}
        onError={() => {
          console.error("Failed to load Turnstile script");
          setTurnstileError("Failed to load verification service. Please refresh the page.");
        }}
      />
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="space-y-6 max-w-2xl mx-auto"
      >
        {/* Honeypot field */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-neutral-700 mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              autoComplete="name"
              className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Your name"
              required
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-neutral-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="your.email@example.com"
              required
              disabled={isSubmitting}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-neutral-700 mb-2"
          >
            Phone (Optional)
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            autoComplete="tel"
            className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="+374 XX XXX-XXX"
            disabled={isSubmitting}
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-neutral-700 mb-2"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Tell us how we can help you..."
            required
            disabled={isSubmitting}
          />
        </div>
        {siteKey && (
          <div>
            <div ref={turnstileRef} className="flex justify-center my-4" />
            {turnstileError ? (
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-4">
                <p className="text-xs text-yellow-800 text-center">
                  {turnstileError}
                </p>
                <p className="text-xs text-yellow-700 text-center mt-1">
                  You can still submit the form, but verification may fail. Please contact us directly if needed.
                </p>
              </div>
            ) : (
              <p className="text-xs text-neutral-500 text-center mt-2">
                Verification helps prevent spam.
              </p>
            )}
          </div>
        )}

        {/* Status messages */}
        {submitStatus.type && (
          <div
            className={`p-4 rounded-md ${
              submitStatus.type === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            <p className="text-sm font-medium">{submitStatus.message}</p>
          </div>
        )}

        <div className="text-center">
          <Button 
            type="submit" 
            variant="primary" 
            disabled={isSubmitting || (siteKey && !turnstileToken && !turnstileError)}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
          {siteKey && turnstileError && (
            <p className="text-xs text-neutral-500 mt-2">
              Form submission may fail without verification. Please refresh the page to retry.
            </p>
          )}
        </div>
      </form>
    </>
  );
}
