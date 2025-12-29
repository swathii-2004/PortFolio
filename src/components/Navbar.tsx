"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X } from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? isDark
            ? "border-b border-white/10 backdrop-blur-md bg-black/50"
            : "border-b border-gray-300/30 backdrop-blur-md bg-white/50"
          : "border-b border-transparent"
      }`}
    >
      {/* Top accent line */}
      <div
        className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r transition-opacity duration-300 ${
          isDark
            ? "from-transparent via-white/40 to-transparent"
            : "from-transparent via-blue-400/40 to-transparent"
        }`}
      />

      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-4 md:py-5">
        {/* Logo - Different styles per theme */}
        <Link
          href="/"
          className={`font-bold hover:opacity-80 transition duration-300 ${
            isDark
              ? "text-2xl text-white font-mono"
              : "text-2xl text-blue-600 font-bold"
          }`}
          onClick={() => setMenuOpen(false)}
        >
          {isDark ? "</Portfolio>" : "Portfolio"}
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <motion.div key={link.href} whileHover={{ scale: 1.05 }}>
              {link.href.startsWith("#") ? (
                <a
                  href={link.href}
                  className={`relative text-sm tracking-wide transition duration-300 group ${
                    isDark
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-700 hover:text-blue-600 font-medium"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-0 w-0 h-px group-hover:w-full transition-all duration-300 ${
                      isDark ? "bg-white" : "bg-blue-600"
                    }`}
                  />
                </a>
              ) : (
                <Link
                  href={link.href}
                  className={`relative text-sm tracking-wide transition duration-300 group ${
                    isDark
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-700 hover:text-blue-600 font-medium"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-0 w-0 h-px group-hover:w-full transition-all duration-300 ${
                      isDark ? "bg-white" : "bg-blue-600"
                    }`}
                  />
                </Link>
              )}
            </motion.div>
          ))}
        </div>

        {/* Theme Toggle + Mobile Menu Button */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle Button - Unique Design */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1, rotate: isDark ? 180 : -180 }}
            whileTap={{ scale: 0.95 }}
            className={`relative w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
              isDark
                ? "bg-gradient-to-br from-yellow-400/20 to-orange-500/20 border border-yellow-400/30 hover:border-yellow-400/60 text-yellow-300"
                : "bg-gradient-to-br from-blue-100 to-indigo-100 border border-blue-300 hover:border-blue-500 text-blue-600"
            }`}
            aria-label="Toggle theme"
          >
            <motion.div
              initial={false}
              animate={{
                rotate: isDark ? 0 : 360,
                scale: isDark ? 1 : 0.8,
              }}
              transition={{ duration: 0.5 }}
            >
              {isDark ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </motion.div>
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isDark
                ? "hover:bg-white/10 text-white"
                : "hover:bg-gray-200 text-gray-800"
            }`}
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden border-t transition-colors ${
              isDark
                ? "border-white/10 bg-black/80 backdrop-blur-md"
                : "border-gray-300/30 bg-white/80 backdrop-blur-md"
            }`}
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  {link.href.startsWith("#") ? (
                    <a
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`block py-2 transition-colors ${
                        isDark
                          ? "text-gray-300 hover:text-white"
                          : "text-gray-700 hover:text-blue-600 font-medium"
                      }`}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`block py-2 transition-colors ${
                        isDark
                          ? "text-gray-300 hover:text-white"
                          : "text-gray-700 hover:text-blue-600 font-medium"
                      }`}
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
