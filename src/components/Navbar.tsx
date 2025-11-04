"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  // Load saved theme from localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "light") {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = darkMode ? "light" : "dark";
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", newTheme);
  };

  // 🧭 Navigation Links
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 w-full border-b border-gray-800 z-50 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/premium-photo/high-quality-desktop-wallpaper_941097-71826.jpg?semt=ais_hybrid&w=740&q=80')",
      }}
    >
      {/* Transparent overlay for readability */}
      <div className="bg-black/40 dark:bg-black/50 backdrop-saturate-150">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3 md:py-4">
          <Link
            href="/"
            className="text-2xl font-poppins font-semibold text-cyan-400 drop-shadow-lg"
            onClick={() => setMenuOpen(false)}
          >
            Subramanaya
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) =>
              link.href.startsWith("#") ? (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-inter text-sm tracking-wide text-gray-200 hover:text-cyan-400 transition drop-shadow-sm"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-inter text-sm tracking-wide text-gray-200 hover:text-cyan-400 transition drop-shadow-sm"
                >
                  {link.label}
                </Link>
              )
            )}

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-800/70 text-gray-200 hover:text-cyan-400 transition"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded text-gray-200 hover:text-cyan-400 transition"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              // 🟢 Changed: removed black bg, added semi-transparent glass
              className="md:hidden bg-black/30 backdrop-blur-[2px] px-4 py-3 border-t border-gray-700 overflow-hidden"
            >
              {navLinks.map((link) =>
                link.href.startsWith("#") ? (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-2 text-gray-200 hover:text-cyan-400 font-inter text-sm"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-2 text-gray-200 hover:text-cyan-400 font-inter text-sm"
                  >
                    {link.label}
                  </Link>
                )
              )}
              <button
                onClick={toggleTheme}
                className="mt-3 flex items-center gap-2 px-3 py-2 bg-gray-900/50 rounded text-gray-200 hover:text-cyan-400 transition"
              >
                {darkMode ? <Sun size={16} /> : <Moon size={16} />}
                {darkMode ? "Light Mode" : "Dark Mode"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
