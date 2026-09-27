// Serves the built email templates so they can be previewed on /brand and copied
// into Gmail (open the URL, Ctrl+A, Ctrl+C, paste into Settings → Signature).
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const dynamic = "force-static";

const FILES: Record<string, string> = {
  signature: "email-signature.html",
  "recruiter-email": "recruiter-email.html",
  "cv-delivery": "cv-delivery-email.html",
};

export function generateStaticParams() {
  return Object.keys(FILES).map((email) => ({ email }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ email: string }> }) {
  const key = (await params).email;
  const file = FILES[key];
  if (!file) return new Response("Not found", { status: 404 });
  let html = await readFile(join(process.cwd(), "brand/dist", file), "utf8");
  // Preview-only: fill the runtime placeholders with sample values so this route shows
  // what the real email looks like (the live send fills these per-request instead).
  if (key === "cv-delivery") {
    html = html.replaceAll("{{ download_url }}", "#preview-only-link").replaceAll("{{ expires_minutes }}", "30");
  }
  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8", "X-Robots-Tag": "noindex" },
  });
}
