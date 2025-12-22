/**
 * Environment variable helpers
 * Safe utilities for accessing environment variables
 */

/**
 * Get the public site URL from environment variables
 * @returns The site URL or empty string if not set
 */
export function getPublicSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || "";
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

