import { MetadataRoute } from "next";
import { getPublicSiteUrl } from "@/lib/env";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getPublicSiteUrl();

  const routes = [
    "",
    "/testing",
    "/testing/toefl",
    "/testing/gre",
    "/testing/act",
    "/celta",
    "/about",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));
}









