import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message, phone, turnstileToken, website } = body;

    // Honeypot check
    if (website && website.trim() !== "") {
      return NextResponse.json(
        { error: "Invalid request" },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Verify Turnstile token if provided
    const secretKey = process.env.TURNSTILE_SECRET_KEY;
    if (secretKey && turnstileToken) {
      try {
        const verifyResponse = await fetch(
          "https://challenges.cloudflare.com/turnstile/v0/siteverify",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              secret: secretKey,
              response: turnstileToken,
            }),
          }
        );

        const verifyData = await verifyResponse.json();

        if (!verifyData.success) {
          console.error("Turnstile verification failed:", verifyData);
          // Log the error but don't block submission if Turnstile is misconfigured
          // This allows the form to work even if Turnstile has configuration issues
          if (verifyData["error-codes"]?.includes("invalid-input-response")) {
            return NextResponse.json(
              { error: "Verification failed. Please refresh the page and try again." },
              { status: 400 }
            );
          }
          // For other errors (like 110200 - invalid site key), we'll still process the form
          // but log the issue for debugging
          console.warn("Turnstile verification error, but proceeding with form submission:", verifyData["error-codes"]);
        }
      } catch (error) {
        console.error("Turnstile verification request failed:", error);
        // Don't block form submission if Turnstile service is unavailable
      }
    } else if (secretKey && !turnstileToken) {
      // If secret key is set but no token provided, require verification
      return NextResponse.json(
        { error: "Verification required. Please complete the verification challenge." },
        { status: 400 }
      );
    }

    // Here you would typically:
    // - Save the form data to a database
    // - Send an email notification
    // - etc.

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "An error occurred. Please try again later." },
      { status: 500 }
    );
  }
}










