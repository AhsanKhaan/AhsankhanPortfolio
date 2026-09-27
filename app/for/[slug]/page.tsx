import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PersonaTemplate from "@/app/components/sections/PersonaTemplate";
import { personas } from "@/data/personas";
import { profile } from "@/data/profile";

export function generateStaticParams() {
  return personas.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const persona = personas.find((p) => p.slug === slug);
  if (!persona) return {};
  return {
    title: persona.metaTitle,
    description: persona.metaDescription,
    alternates: { canonical: `/for/${persona.slug}` },
    openGraph: { title: `${persona.metaTitle} | ${profile.name}`, description: persona.metaDescription, url: `/for/${persona.slug}` },
  };
}

export default async function PersonaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const persona = personas.find((p) => p.slug === slug);
  if (!persona) notFound();
  return <PersonaTemplate persona={persona} />;
}
