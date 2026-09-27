import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Kanit } from "next/font/google";
import "./globals.css";
import brand from "@/brand/dist/tokens.resolved.json";
import { profile } from "@/data/profile";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

const title = `${profile.name} — React Developer, Frontend & Full Stack Developer`;
// 155 chars — inside Google's ~155-160 SERP display limit (was 225, got truncated).
const description =
  "Senior React, Next.js & Full Stack Developer with 5+ yrs in fintech and food-tech. 100K+ users served. Open to relocation, remote roles and freelance work.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.links.portfolio),
  title: {
    default: title,
    template: `%s | ${profile.name}`,
  },
  description,
  keywords: [
    "React Developer",
    "React.js Developer",
    "Frontend Developer",
    "Front End Developer",
    "Front-End Engineer",
    "Full Stack Developer",
    "Full-Stack Engineer",
    "Senior Frontend Engineer",
    "Senior React Developer",
    "Senior React Developer for Hire",
    "Next.js Developer",
    "Next.js Engineer",
    "TypeScript Developer",
    "TypeScript Frontend Developer",
    "Node.js Developer",
    "JavaScript Developer",
    "JavaScript Engineer",
    "Web Developer",
    "Web Application Developer",
    "UI Engineer",
    "Fintech Developer",
    "Fintech Frontend Engineer",
    "Remote Frontend Developer",
    "Remote React Developer",
    "Remote Full Stack Developer",
    "Hire React Developer",
    "React Developer Portfolio",
    "Full Stack Developer Portfolio",
    "Freelance Web Developer",
    "Freelance React Developer",
    // Recruiter / hiring-persona intent
    "Developer Open to Relocation",
    "Software Engineer Relocation Sponsorship",
    "Remote Software Engineer for Hire",
    "Senior Developer for Hire",
    "React Developer Available Now",
    "Talent Acquisition React Developer",
    "Ahsan Khan",
    "Ahsan Khan Developer",
  ],
  authors: [{ name: profile.name, url: profile.links.portfolio }],
  creator: profile.name,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: profile.name,
    title,
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  icons: {
    icon: [
      { url: "/assets/favicon/favicon-32x32.png", sizes: "32x32" },
      { url: "/assets/favicon/favicon-16x16.png", sizes: "16x16" },
    ],
    apple: "/assets/favicon/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: brand.semantic.color.bg,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${profile.links.portfolio}/#person`,
  name: profile.name,
  alternateName: ["React Developer", "Frontend Developer", "Full Stack Developer"],
  jobTitle: "Senior Full Stack & Frontend Developer",
  description,
  url: profile.links.portfolio,
  email: `mailto:${profile.email}`,
  image: `${profile.links.portfolio}/assets/Profile-v3.png`,
  address: { "@type": "PostalAddress", addressLocality: "Karachi", addressCountry: "PK" },
  sameAs: [profile.links.linkedin, profile.links.github],
  knowsAbout: [
    "React",
    "React.js",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Laravel",
    "REST APIs",
    "AWS",
    "Docker",
    "CI/CD",
    "MongoDB",
    "MySQL",
    "Frontend Development",
    "Full Stack Development",
    "Fintech",
    "PCI DSS",
    "OWASP Top 10",
    "Web Performance",
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "Full Stack & Frontend Developer",
    skills: "React, Next.js, TypeScript, Node.js, Laravel",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${profile.links.portfolio}/#website`,
  url: profile.links.portfolio,
  name: `${profile.name} — Portfolio`,
  description,
  publisher: { "@id": `${profile.links.portfolio}/#person` },
  inLanguage: "en-US",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning is shallow (only covers this element's own attributes,
    // not descendants) — it silences the false-positive noise some browser extensions
    // cause by injecting attributes (e.g. Bitdefender's bis_skin_checked/bis_register,
    // ColorZilla's cz-shortcut-listen) onto <html>/<body> before React hydrates. It
    // does not hide a real hydration mismatch anywhere else in the tree.
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${kanit.variable} antialiased`} suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([personJsonLd, websiteJsonLd]) }}
        />
        {children}
      </body>
    </html>
  );
}
