// Brand image templates rendered with next/og (Satori). Shared by the LinkedIn
// post renderer (/brand/social) and the site's OpenGraph image.
// Colors come from brand/tokens.json — see brand/brand-guidelines.md §8.
import brand from "@/brand/dist/tokens.resolved.json";
import profile from "@/brand/profile.json";

export const SOCIAL_TEMPLATES = ["tip", "metric", "project", "quote"] as const;
export type SocialTemplate = (typeof SOCIAL_TEMPLATES)[number];

const c = brand.component.social;
const gradient = `linear-gradient(90deg, ${c["headline-start"]}, ${c["headline-end"]})`;

export interface CardContent {
  template: SocialTemplate;
  title: string;
  body?: string;
  tag?: string;
}

// Kanit is fetched once from Google Fonts as TTF (Satori can't read woff2).
// If the fetch fails, Satori falls back to its built-in font.
let fontCache: Promise<{ name: string; data: ArrayBuffer; weight: 400 | 700 | 900 }[]> | null = null;
export function loadFonts() {
  fontCache ??= Promise.all(
    ([400, 700, 900] as const).map(async (weight) => {
      const css = await fetch(`https://fonts.googleapis.com/css2?family=Kanit:wght@${weight}`).then((r) => r.text());
      const url = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/)?.[1];
      if (!url) throw new Error("Kanit TTF not found");
      return { name: "Kanit", data: await fetch(url).then((r) => r.arrayBuffer()), weight };
    }),
  ).catch((err) => {
    console.error("Brand font load failed, using fallback font:", err);
    fontCache = null;
    return [];
  });
  return fontCache;
}

function Footer({ scale = 1 }: { scale?: number }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: c.footer,
        padding: `${28 * scale}px ${brand["social-canvas"]["safe-margin"] * scale}px`,
        borderTop: `${4 * scale}px solid ${c["headline-start"]}`,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontSize: 34 * scale, fontWeight: 700, color: c.text }}>{profile.name}</span>
        <span style={{ fontSize: 22 * scale, color: c.muted }}>{profile.title}</span>
      </div>
      <span style={{ fontSize: 22 * scale, color: c.muted }}>{profile.links.portfolio.replace("https://", "")}</span>
    </div>
  );
}

function Tag({ children, scale = 1 }: { children: string; scale?: number }) {
  return (
    <div
      style={{
        display: "flex",
        alignSelf: "flex-start",
        border: `2px solid ${c["headline-start"]}`,
        color: c["headline-start"],
        borderRadius: 999,
        padding: `${8 * scale}px ${22 * scale}px`,
        fontSize: 24 * scale,
        letterSpacing: 3,
        textTransform: "uppercase",
      }}
    >
      {children}
    </div>
  );
}

function GradientText({ children, size, weight = 900 }: { children: string; size: number; weight?: number }) {
  return (
    <div
      style={{
        display: "flex",
        backgroundImage: gradient,
        backgroundClip: "text",
        color: "transparent",
        fontSize: size,
        fontWeight: weight,
        lineHeight: 1.02,
        textTransform: "uppercase",
      }}
    >
      {children}
    </div>
  );
}

const defaults: Record<SocialTemplate, string> = {
  tip: "Engineering tip",
  metric: "Impact",
  project: "Project spotlight",
  quote: "Lesson learned",
};

// 1080×1350 LinkedIn portrait post.
export function SocialCard({ template, title, body, tag }: CardContent) {
  const m = brand["social-canvas"]["safe-margin"];
  const titleSize = template === "metric" ? 260 : title.length > 60 ? 76 : title.length > 30 ? 96 : 120;

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", background: c.canvas, fontFamily: "Kanit" }}>
      {/* accent bar */}
      <div style={{ display: "flex", height: 12, backgroundImage: gradient }} />
      <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: m, gap: 40, justifyContent: "center" }}>
        <Tag>{tag || defaults[template]}</Tag>
        {template === "quote" && <div style={{ display: "flex", fontSize: 220, lineHeight: 0.6, color: c["headline-end"] }}>“</div>}
        {template === "quote" ? (
          <div style={{ display: "flex", fontSize: 64, lineHeight: 1.2, color: c.text, fontWeight: 400 }}>{body || title}</div>
        ) : (
          <GradientText size={titleSize}>{title}</GradientText>
        )}
        {template === "quote" ? (
          <div style={{ display: "flex", fontSize: 34, color: c.muted }}>{title}</div>
        ) : (
          body && <div style={{ display: "flex", fontSize: template === "metric" ? 52 : 44, lineHeight: 1.3, color: c.text, fontWeight: 400 }}>{body}</div>
        )}
      </div>
      <Footer />
    </div>
  );
}

// 1200×630 OpenGraph / link preview card.
export function OgCard() {
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", background: c.canvas, fontFamily: "Kanit" }}>
      <div style={{ display: "flex", height: 10, backgroundImage: gradient }} />
      <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "56px 72px", gap: 20, justifyContent: "center" }}>
        <GradientText size={104}>{`Hi, I'm ${profile.name.split(" ")[0]}`}</GradientText>
        <div style={{ display: "flex", fontSize: 40, color: c.text }}>{profile.title}</div>
        <div style={{ display: "flex", fontSize: 28, color: c.muted }}>{profile.availability.join("  ·  ")}</div>
      </div>
      <Footer scale={0.8} />
    </div>
  );
}
