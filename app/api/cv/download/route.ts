import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { verifyCvToken } from "@/lib/cvToken";
import { profile } from "@/data/profile";

const CV_FILE = join(process.cwd(), "private/cv/AhsanKhan_SrSoftwareEngineer.pdf");
const DOWNLOAD_NAME = "Ahsan-Khan-CV.pdf";

function messagePage(heading: string, body: string) {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${heading} · ${profile.name}</title></head>
<body style="margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#000;color:#E5E5E5;font-family:Arial,Helvetica,sans-serif;padding:24px">
  <div style="max-width:420px;text-align:center">
    <h1 style="font-size:28px;margin-bottom:12px">${heading}</h1>
    <p style="color:#A3A3A3;line-height:1.6">${body}</p>
    <p style="margin-top:28px">
      <a href="${profile.links.portfolio}/cv" style="background:linear-gradient(90deg,#60A5FA,#34D399);color:#000;text-decoration:none;font-weight:bold;padding:12px 24px;border-radius:999px;display:inline-block;margin-right:8px">Request a new link</a>
      <a href="${profile.links.linkedin}" style="border:2px solid #E5E5E5;color:#E5E5E5;text-decoration:none;font-weight:bold;padding:11px 22px;border-radius:999px;display:inline-block">View LinkedIn</a>
    </p>
  </div>
</body></html>`;
}

function htmlResponse(html: string, status: number) {
  return new Response(html, {
    status,
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "X-Robots-Tag": "noindex" },
  });
}

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token") ?? "";
  const secret = process.env.CV_ACCESS_SECRET;

  if (!secret) {
    console.error("CV download: CV_ACCESS_SECRET is not configured.");
    return htmlResponse(messagePage("Not available", "CV downloads aren't configured yet. Please reach out directly instead."), 500);
  }

  const result = verifyCvToken(token, secret);
  if (!result.ok) {
    const body =
      result.reason === "expired"
        ? "This link has expired. Links are valid for 30 minutes to keep the CV out of scrapers' hands."
        : "This link isn't valid.";
    return htmlResponse(messagePage("Link expired", body), result.reason === "expired" ? 410 : 401);
  }

  let file: Buffer;
  try {
    file = await readFile(CV_FILE);
  } catch (err) {
    console.error("CV download: file read failed:", err);
    return htmlResponse(messagePage("Not available", "Something went wrong on my end. Please reach out directly instead."), 500);
  }

  return new Response(new Uint8Array(file), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${DOWNLOAD_NAME}"`,
      "Content-Length": String(file.byteLength),
      "Cache-Control": "no-store, private",
      "X-Robots-Tag": "noindex",
    },
  });
}
