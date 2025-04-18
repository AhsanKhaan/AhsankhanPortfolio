"use client";

import { useEffect, useCallback } from "react";
import Link from "next/link";

interface NavbarProps {
  items: { title: string; icon: React.ReactNode; href: string; target?: string }[];
}

const Navbar: React.FC<NavbarProps> = ({ items }) => {
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

  return (
    <nav className="fixed z-1000 top-0 left-0 w-full flex justify-between items-center px-6 py-4 transition-all duration-300 bg-transparent">
      {/* Brand Name */}
      <Link href="#home" >

      <div className="text-3xl font-extrabold text-gray-900 dark:bg-gradient-sky bg-clip-text text-transparent ">Ahsan Khan</div>
      </Link>

      {/* Navigation Links */}
      <div className="flex space-x-6">
        {items.map((item) => (
          <Link
            href={item.href}
            key={item.title}
            target={item.target || "_self"}
            className="flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-500 transition-colors"
          >
            <span>{item.icon}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
