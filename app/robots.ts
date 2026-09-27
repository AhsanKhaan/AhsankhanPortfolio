import type { MetadataRoute } from "next";
import { profile } from "@/data/profile";

// AI search/citation bots (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Bingbot)
// are already covered by the wildcard rule below — listed explicitly too so it's
// auditable at a glance that none of them are blocked. See ai-seo skill.
const AI_BOTS = ["GPTBot", "ChatGPT-User", "ClaudeBot", "anthropic-ai", "PerplexityBot", "Google-Extended", "Bingbot"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/brand", "/api/"] },
      ...AI_BOTS.map((userAgent) => ({ userAgent, allow: "/", disallow: ["/brand", "/api/"] })),
    ],
    sitemap: `${profile.links.portfolio}/sitemap.xml`,
  };
}
