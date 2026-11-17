import Link from "next/link";
import { IconArrowUp } from "@tabler/icons-react";
import { profile } from "@/data/profile";

const linkClass =
  "inline-flex min-h-[40px] items-center text-sm text-brand-muted transition-colors hover:text-brand-text";

const columns = [
  {
    title: "Work",
    links: [
      { title: "Agency & pricing", href: "/agency" },
      { title: "GitHub contributions", href: "/contributions" },
      { title: "Case studies", href: "/#case-studies" },
      { title: "Hiring? Start here", href: "/for" },
    ],
  },
  {
    title: "Connect",
    links: [
      { title: "LinkedIn", href: profile.links.linkedin },
      { title: "GitHub", href: profile.links.github },
      { title: "Email", href: `mailto:${profile.email}` },
      { title: "Get my CV", href: "/cv" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="border-t border-brand-border bg-brand-bg px-5 pb-8 pt-14 sm:px-8 md:px-10">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 md:grid-cols-[1.6fr_1fr_1fr]">
        <div className="col-span-2 md:col-span-1">
          <Link href="/" className="font-display text-2xl font-bold bg-brand-accent bg-clip-text text-transparent">
            {profile.name}
          </Link>
          <p className="mt-2 text-sm text-brand-muted">{profile.title}</p>
          <p className="text-sm text-brand-muted">
            {profile.location} · {profile.timezone}
          </p>
        </div>
        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <p className="mb-2 text-xs font-medium uppercase tracking-widest text-brand-text">{col.title}</p>
            <ul>
              {col.links.map((l) => {
                const external = l.href.startsWith("http");
                return (
                  <li key={l.title}>
                    {l.href.startsWith("/") ? (
                      <Link href={l.href} className={linkClass}>
                        {l.title}
                      </Link>
                    ) : (
                      <a
                        href={l.href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                        className={linkClass}
                      >
                        {l.title}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        ))}
      </div>
      <div className="mx-auto mt-10 flex max-w-6xl items-center justify-between gap-4 border-t border-brand-border pt-6">
        <p className="text-xs text-brand-muted">
          © {new Date().getFullYear()} {profile.name}
        </p>
        <a href="#top" className="inline-flex min-h-[40px] items-center gap-2 whitespace-nowrap text-xs uppercase tracking-wider text-brand-muted hover:text-brand-text">
          Back to top <IconArrowUp size={14} aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
