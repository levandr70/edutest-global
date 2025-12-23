/**
 * Environment variable helpers
 * Safe utilities for accessing environment variables
 */

/**
 * Get the public site URL from environment variables
 * Ensures the URL has a protocol (https://) for valid URL construction
 * @returns The site URL with protocol, or default localhost URL
 */
export function getPublicSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  
  // Remove any trailing slashes
  const trimmedUrl = url.trim().replace(/\/+$/, "");
  
  // If URL doesn't start with http:// or https://, add https://
  if (!trimmedUrl.startsWith("http://") && !trimmedUrl.startsWith("https://")) {
    return `https://${trimmedUrl}`;
  }
  
  return trimmedUrl;
}

/**
 * Get a valid URL object for metadata
 * Falls back to localhost if URL is invalid
 */
export function getMetadataBaseUrl(): URL {
  try {
    const url = getPublicSiteUrl();
    return new URL(url);
  } catch (error) {
    // Fallback to localhost if URL is invalid
    console.warn("Invalid NEXT_PUBLIC_SITE_URL, using localhost fallback:", error);
    return new URL("http://localhost:3000");
  }
}

/**
 * Parse admin emails from environment variable
 * Safely handles missing, empty, or malformed values
 * @returns Array of normalized (lowercase, trimmed) email addresses
 */
export function getAdminEmails(): string[] {
  const emailsEnv = process.env.NEXT_PUBLIC_ADMIN_EMAILS || "";
  
  if (!emailsEnv.trim()) {
    return [];
  }
  
  return emailsEnv
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter((email) => email.length > 0 && email.includes("@"));
}

/**
 * Check if admin emails are configured
 * @returns true if at least one admin email is set
 */
export function hasAdminEmails(): boolean {
  return getAdminEmails().length > 0;
}


