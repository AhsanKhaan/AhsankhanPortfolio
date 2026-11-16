import Link from "next/link";
import { profile } from "@/data/profile";

const links = [
  { title: "Home", href: "/" },
  { title: "Agency", href: "/agency" },
  { title: "GitHub", href: "/contributions" },
  { title: "Contact", href: "/#contact" },
];

// Header for standalone pages (/agency, /contributions). The homepage keeps its own Navbar.
const SiteHeader = ({ current }: { current?: string }) => {
  return (
    <header className="sticky top-0 z-50 border-b border-brand-border bg-brand-bg/80 px-5 backdrop-blur sm:px-8 md:px-10">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <Link href="/" className="whitespace-nowrap font-display text-xl font-extrabold bg-brand-accent bg-clip-text text-transparent sm:text-2xl">
          {profile.name}
        </Link>
        <nav aria-label="Main" className="flex items-center gap-4 sm:gap-7">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={current === l.href ? "page" : undefined}
              className={`${l.href === "/" ? "hidden sm:inline-flex" : "inline-flex"} min-h-[44px] items-center text-xs font-medium uppercase tracking-wider transition-opacity hover:opacity-70 sm:text-sm ${
                current === l.href ? "text-brand-accent-end" : "text-brand-text"
              }`}
            >
              {l.title}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default SiteHeader;
