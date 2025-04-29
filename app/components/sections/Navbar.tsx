"use client";

import { useEffect, useCallback, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons-react";

interface NavbarProps {
  items: { title: string; icon: React.ReactNode; href: string; target?: string }[];
  socialLinks: { icon: React.ReactNode; href: string; title: string; target?: string; rel?: string }[];
}

const Navbar: React.FC<NavbarProps> = ({ items, socialLinks }) => {
  const handleScroll = useCallback(() => {
    if (window.scrollY > 30) {
      document.documentElement.classList.add("scrolled");
    } else {
      document.documentElement.classList.remove("scrolled");
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      <nav className="fixed z-1000 top-0 left-0 w-full flex justify-between items-center px-6 py-4 transition-all duration-300 bg-transparent">
        {/* Brand Name */}
        <Link href="#home" >

          <div className="text-3xl font-extrabold text-gray-900 dark:bg-gradient-sky bg-clip-text text-transparent ">Ahsan Khan</div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          {items.map((item) => (
            <Link
              href={item.href}
              key={item.title}
              target={item.target || "_self"}
              className="flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-500 transition-colors"
            >
              <span>{item.title}</span>
            </Link>
          ))}
        </div>

        {/* Right - Social Links */}
        <div className="hidden md:flex justify-end space-x-4">
          {socialLinks.map((icon, index) => (
            <a
              href={icon.href}
              key={index}
              title={icon.title}
              target={icon.target}
              rel={icon.rel}
              className="hover:text-sky-500 transition-colors"
            >
              {icon.icon}
            </a>
          ))}
        </div>


        {/* Mobile Breadcrumb */}
        <button
          className="md:hidden text-gray-800 dark:text-white focus:outline-none"
          onClick={toggleMenu}
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
            className="fixed top-[60px] left-0 w-full h-[calc(100vh-60px)] bg-white dark:bg-[#111827] flex flex-col items-center justify-center px-6 py-6 z-[999]"
          >
            {/* Navigation Items */}
            <div className="flex flex-col items-center gap-6">
              {items.map((item) => (
                <Link
                  href={item.href}
                  key={item.title}
                  target={item.target || "_self"}
                  className="text-gray-800 dark:text-gray-200 hover:text-sky-500 transition-colors text-xl"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 mt-auto">
              {socialLinks.map((icon, index) => (
                <a
                  href={icon.href}
                  key={index}
                  title={icon.title}
                  target={icon.target}
                  rel={icon.rel}
                  className="hover:text-sky-500 transition-colors"
                >
                  {icon.icon}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
};

export default Navbar;
