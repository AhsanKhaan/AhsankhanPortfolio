import type { MetadataRoute } from "next";
import { profile } from "@/data/profile";
import { personas } from "@/data/personas";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: profile.links.portfolio, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${profile.links.portfolio}/cv`, lastModified, changeFrequency: "monthly", priority: 0.5 },
    { url: `${profile.links.portfolio}/for`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    ...personas.map((p) => ({
      url: `${profile.links.portfolio}/for/${p.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
