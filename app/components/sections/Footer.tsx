import Link from "next/link";
import { IconArrowUp } from "@tabler/icons-react";
import { profile, socialLinks } from "@/data/profile";

const Footer = () => {
  return (
    <footer className="border-t border-brand-border bg-brand-bg px-5 py-10 sm:px-8 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="text-center md:text-left">
          <p className="font-display text-xl font-bold bg-brand-accent bg-clip-text text-transparent">{profile.name}</p>
          <p className="text-sm text-brand-muted">
            {profile.title} · {profile.location}
          </p>
        </div>
        <nav aria-label="Social links" className="flex gap-6">
          {socialLinks.map((l) => (
            <a
              key={l.title}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="inline-flex min-h-[44px] items-center text-sm uppercase tracking-wider text-brand-text hover:opacity-70"
            >
              {l.title}
            </a>
          ))}
          <a href="/cv" className="inline-flex min-h-[44px] items-center text-sm uppercase tracking-wider text-brand-text hover:opacity-70">
            Get CV
          </a>
          <Link href="/for" className="inline-flex min-h-[44px] items-center text-sm uppercase tracking-wider text-brand-text hover:opacity-70">
            Hiring? Start Here
          </Link>
        </nav>
        <a href="#home" className="inline-flex min-h-[44px] items-center gap-2 text-sm uppercase tracking-wider text-brand-muted hover:text-brand-text">
          Back to top <IconArrowUp size={16} aria-hidden="true" />
        </a>
      </div>
      <p className="mt-8 text-center text-xs text-brand-muted">© {new Date().getFullYear()} {profile.name}</p>
    </footer>
  );
};

export default Footer;
