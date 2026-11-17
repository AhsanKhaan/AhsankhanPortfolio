import { IconBrandGithub, IconBrandLinkedin, IconMail } from "@tabler/icons-react";
import Navbar from "./Navbar";
import { profile } from "@/data/profile";

const iconClass = "h-6 w-6 text-brand-text";

const sections = [
  { title: "About", hash: "#about" },
  { title: "Services", hash: "#services" },
  { title: "Experience", hash: "#experience" },
  { title: "Projects", hash: "#case-studies" },
];

const pages = [
  { title: "Agency", href: "/agency" },
  { title: "GitHub", href: "/contributions" },
];

// One header for every page, so the logo and links never move between routes.
// On the homepage section links are plain hashes; elsewhere they point back to "/#…".
const SiteNav = ({ onHome = false }: { onHome?: boolean }) => {
  const prefix = onHome ? "" : "/";
  const items = [
    ...sections.map((s) => ({ title: s.title, icon: null, href: `${prefix}${s.hash}` })),
    ...pages.map((p) => ({ title: p.title, icon: null, href: p.href })),
    { title: "Contact", icon: null, href: `${prefix}#contact` },
  ];

  const socialLinks = [
    {
      title: "LinkedIn",
      icon: <IconBrandLinkedin className={iconClass} aria-hidden="true" />,
      href: profile.links.linkedin,
      target: "_blank",
      rel: "noopener noreferrer",
    },
    {
      title: "GitHub",
      icon: <IconBrandGithub className={iconClass} aria-hidden="true" />,
      href: profile.links.github,
      target: "_blank",
      rel: "noopener noreferrer",
    },
    { title: "Email", icon: <IconMail className={iconClass} aria-hidden="true" />, href: `mailto:${profile.email}` },
  ];

  return <Navbar items={items} socialLinks={socialLinks} />;
};

export default SiteNav;
