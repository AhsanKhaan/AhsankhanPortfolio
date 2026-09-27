// LinkedIn post image renderer. Example:
//   /brand/social?template=metric&title=35%25&body=Faster%20admin%20portal%20load%20time&tag=Performance
// Returns a 1080×1350 PNG in the brand theme. The future Python poster fetches this URL.
import { ImageResponse } from "next/og";
import brand from "@/brand/dist/tokens.resolved.json";
import { SocialCard, SOCIAL_TEMPLATES, loadFonts, type SocialTemplate } from "./templates";

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const requested = params.get("template") ?? "tip";
  const template: SocialTemplate = (SOCIAL_TEMPLATES as readonly string[]).includes(requested)
    ? (requested as SocialTemplate)
    : "tip";

  const title = (params.get("title") ?? "Ship fast, measure faster").slice(0, 90);
  const body = params.get("body")?.slice(0, 220) || undefined;
  const tag = params.get("tag")?.slice(0, 30) || undefined;
  const { width, height } = brand["social-canvas"];

  return new ImageResponse(<SocialCard template={template} title={title} body={body} tag={tag} />, {
    width,
    height,
    fonts: await loadFonts(),
    headers: { "Cache-Control": "public, max-age=86400, immutable" },
  });
}
