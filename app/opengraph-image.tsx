import { ImageResponse } from "next/og";
import { OgCard, loadFonts } from "./brand/social/templates";

export const alt = "Ahsan Khan, Senior Full Stack & Frontend Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(<OgCard />, { ...size, fonts: await loadFonts() });
}
