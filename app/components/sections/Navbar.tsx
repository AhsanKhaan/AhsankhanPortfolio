"use client";

import { useEffect, useCallback, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { IconMenu2, IconX, IconBrandLinkedin } from "@tabler/icons-react";
import CvRequestModal from "../ui/CvRequestModal";
import { rafThrottle } from "@/lib/rafThrottle";
import { profile } from "@/data/profile";

interface NavbarProps {
  items: { title: string; icon: React.ReactNode; href: string; target?: string }[];
  socialLinks: { icon: React.ReactNode; href: string; title: string; target?: string; rel?: string }[];
}

const Navbar: React.FC<NavbarProps> = ({ items, socialLinks }) => {
  const handleScroll = useCallback(() => {
    document.documentElement.classList.toggle("scrolled", window.scrollY > 30);
  }, []);

  useEffect(() => {
    const onScroll = rafThrottle(handleScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      onScroll.cancel();
    };
  }, [handleScroll]);

  const [menuOpen, setMenuOpen] = useState(false);
  // Owned here, not inside the AnimatePresence mobile overlay below, so closing the
  // menu doesn't fade the CV dialog out along with it.
  const [cvOpen, setCvOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      <nav className="site-nav fixed z-1000 top-0 left-0 w-full flex justify-between items-center px-6 py-4 transition-all duration-300 bg-transparent">
        {/* Brand Name */}
        <Link href="#home" >

          <div className="font-display text-2xl md:text-3xl font-extrabold bg-brand-accent bg-clip-text text-transparent">Ahsan Khan</div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden lg:flex gap-8">
          {items.map((item) => (
            <Link
              href={item.href}
              key={item.title}
              target={item.target || "_self"}
              className="flex min-h-[44px] items-center text-sm font-medium uppercase tracking-wider text-brand-text hover:opacity-70 transition-opacity duration-200"
            >
              <span>{item.title}</span>
            </Link>
          ))}
        </div>

        {/* Right - Social Links */}
        <div className="hidden lg:flex items-center justify-end gap-4">
          {socialLinks.map((icon, index) => (
            <a
              href={icon.href}
              key={index}
              title={icon.title}
              aria-label={icon.title}
              target={icon.target}
              rel={icon.rel}
              className="flex h-11 w-11 items-center justify-center hover:opacity-70 transition-opacity"
            >
              {icon.icon}
            </a>
          ))}
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border-2 border-brand-text px-5 text-xs font-medium uppercase tracking-widest text-brand-text hover:bg-white/10 transition-colors"
          >
            <IconBrandLinkedin size={16} aria-hidden="true" /> LinkedIn
          </a>
        </div>


        {/* Mobile Breadcrumb */}
        <button
          className="lg:hidden flex h-11 w-11 items-center justify-center text-brand-text"
          onClick={toggleMenu}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <IconX size={28} /> : <IconMenu2 size={28} />}
        </button>

      </nav>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-[60px] left-0 w-full h-[calc(100vh-60px)] bg-brand-surface flex flex-col items-center justify-center px-6 py-6 z-[999]"
          >
            {/* Navigation Items */}
            <div className="flex flex-col items-center gap-6">
              {items.map((item) => (
                <Link
                  href={item.href}
                  key={item.title}
                  target={item.target || "_self"}
                  className="font-display text-2xl uppercase tracking-wider text-brand-text hover:opacity-70 transition-opacity"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
            </div>

            {/* Primary CTA for recruiters */}
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="mt-8 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-brand-accent px-8 text-sm font-medium uppercase tracking-widest text-brand-on-accent"
            >
              <IconBrandLinkedin size={16} aria-hidden="true" /> View LinkedIn
            </a>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                setCvOpen(true);
              }}
              className="mt-4 min-h-[44px] text-xs uppercase tracking-widest text-brand-muted underline underline-offset-4 hover:text-brand-text"
            >
              Get my CV by email
            </button>
            {/* Social Links */}
            <div className="flex space-x-4 mt-auto">
              {socialLinks.map((icon, index) => (
                <a
                  href={icon.href}
                  key={index}
                  title={icon.title}
                  aria-label={icon.title}
                  target={icon.target}
                  rel={icon.rel}
                  className="flex h-11 w-11 items-center justify-center hover:opacity-70 transition-opacity"
                >
                  {icon.icon}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CvRequestModal open={cvOpen} onOpenChange={setCvOpen} />
    </>
  );
};

export default Navbar;
