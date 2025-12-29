// Hero.tsx - Completely Redesigned with Unique Dark/Light Themes
"use client";

import { motion, useMotionValue, useTransform, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { ChevronDown } from "lucide-react";

type ProfileType = {
  name: string;
  title: string;
  bio: string;
  profileImage?: string;
  socials?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    email?: string;
    phone?: string;
  };
};

const safeAsset = (url?: string) =>
  url && /^https?:\/\//i.test(url) ? url : (url || "/default.jpg");

const toHref = (value?: string, kind?: "url" | "email" | "phone") => {
  if (!value) return "";
  if (kind === "email") return `mailto:${value}`;
  if (kind === "phone") return `tel:${value}`;
  if (!/^https?:\/\//i.test(value)) return `https://${value}`;
  return value;
};

// Social icons
const Icon = {
  github: (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.31 6.85 9.66.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.79.62-3.38-1.37-3.38-1.37-.46-1.2-1.12-1.52-1.12-1.52-.92-.64.07-.63.07-.63 1.02.07 1.55 1.07 1.55 1.07.9 1.58 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.23-.26-4.57-1.14-4.57-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .85-.28 2.8 1.04a9.4 9.4 0 0 1 5.1 0c1.95-1.32 2.8-1.04 2.8-1.04.55 1.42.2 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.94-2.35 4.8-4.59 5.06.36.33.68.98.68 1.98 0 1.43-.01 2.58-.01 2.93 0 .27.18.58.69.48A10.04 10.04 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" />
    </svg>
  ),
  linkedin: (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4V8zM8 8h3.8v2.05h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V23h-4v-6.6c0-1.58-.03-3.6-2.2-3.6-2.2 0-2.53 1.72-2.53 3.49V23H8V8z" />
    </svg>
  ),
  twitter: (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.43 1a9 9 0 0 1-2.83 1.08A4.51 4.51 0 0 0 11.5 6.03 12.8 12.8 0 0 1 2.23 2.2A4.51 4.51 0 0 0 3.48 8a4.41 4.41 0 0 1-2.05-.56v.06a4.51 4.51 0 0 0 3.62 4.42 4.52 4.52 0 0 1-2.04.08 4.51 4.51 0 0 0 4.21 3.13A9.06 9.06 0 0 1 1 18.57 12.79 12.79 0 0 0 7.93 20c8.3 0 12.85-6.93 12.85-12.94 0-.2 0-.41-.02-.61A9.1 9.1 0 0 0 23 3z" />
    </svg>
  ),
  instagram: (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.9a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
    </svg>
  ),
  mail: (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5L4 8V6l8 5 8-5v2Z" />
    </svg>
  ),
  phone: (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M6.6 10.8c1.7 3.2 4.4 5.9 7.6 7.6l2.5-2.5c.3-.3.8-.4 1.2-.3 1 .3 2 .5 3 .5.7 0 1.1.5 1.1 1.1V22c0 .7-.5 1.1-1.1 1.1C9.9 23.1.9 14.1.9 2.2.9 1.5 1.4 1 2.1 1h4.8c.7 0 1.1.5 1.1 1.1 0 1 .2 2 .5 3 .1.4 0 .9-.3 1.2L6.6 10.8Z" />
    </svg>
  ),
};

export default function Hero() {
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { isDark } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    setMounted(true);
    fetch("/api/profile", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setProfile(d))
      .catch(() => {});

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!profile || !mounted) return null;

  const socials = profile.socials || {};
  const iconButtons = [
    socials.github && { key: "github", href: toHref(socials.github, "url"), Icon: Icon.github },
    socials.linkedin && { key: "linkedin", href: toHref(socials.linkedin, "url"), Icon: Icon.linkedin },
    socials.twitter && { key: "twitter", href: toHref(socials.twitter, "url"), Icon: Icon.twitter },
    socials.instagram && { key: "instagram", href: toHref(socials.instagram, "url"), Icon: Icon.instagram },
    socials.email && { key: "mail", href: toHref(socials.email, "email"), Icon: Icon.mail },
    socials.phone && { key: "phone", href: toHref(socials.phone, "phone"), Icon: Icon.phone },
  ].filter(Boolean) as Array<{ key: string; href: string; Icon: any }>;

  return (
    <section
      className={`relative min-h-screen w-full overflow-hidden flex items-center justify-center pt-20 md:pt-24 transition-colors duration-300 ${
        isDark ? "bg-black" : "bg-gradient-to-b from-white via-blue-50 to-indigo-50"
      }`}
      id="home"
    >
      {/* DARK MODE: Animated grid */}
      {isDark && (
        <motion.div
          className="absolute inset-0 -z-10 opacity-10"
          animate={{
            backgroundPosition: ["0px 0px", "100px 100px"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundImage: "linear-gradient(0deg, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px"
          }}
        />
      )}

      {/* LIGHT MODE: Soft gradient background */}
      {!isDark && (
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-80 h-80 bg-indigo-300/20 rounded-full blur-3xl" />
        </div>
      )}

      {/* Blob animations - Different per theme */}
      {isDark && (
        <>
          <motion.div
            className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-white to-gray-400 rounded-full blur-3xl opacity-5 -z-10"
            animate={{
              x: [0, 50, 0],
              y: [0, 100, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-10 right-20 w-80 h-80 bg-gradient-to-bl from-white to-gray-400 rounded-full blur-3xl opacity-5 -z-10"
            animate={{
              x: [0, -80, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </>
      )}

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl px-6 md:px-12">
        <motion.div
          className={`grid md:gap-16 items-center ${
            isDark ? "md:grid-cols-[1.2fr_1.3fr]" : "md:grid-cols-[1fr_1.2fr]"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* LEFT: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 md:space-y-8 order-2 md:order-1"
          >
            {/* DARK: Code-styled intro */}
            {isDark && (
              <motion.div 
                className="font-mono text-sm text-gray-400 space-y-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <p>{'// '} Full-Stack Developer & Thinker</p>
                <p className="text-white">
                  {'<h1>'} {profile.name} {'</h1>'}
                </p>
              </motion.div>
            )}

            {/* LIGHT: Clean intro */}
            {!isDark && (
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <p className="text-blue-600 font-semibold tracking-widest uppercase text-sm">Welcome to my portfolio</p>
              </motion.div>
            )}

            {/* DARK: Large styled title */}
            {isDark && (
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                <span className="block">I</span>
                <span className="block text-gray-400">Think</span>
                <span className="block">Deeply</span>
              </h1>
            )}

            {/* LIGHT: Gradient title */}
            {!isDark && (
              <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Think Deep.<br />
                Code Smart.
              </h2>
            )}

            {/* PROFILE NAME - HIGHLIGHTED & ANIMATED */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className={`text-3xl md:text-5xl font-bold tracking-tight ${
                isDark ? "text-white" : "bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
              }`}
            >
              {profile.name}
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className={`text-lg md:text-xl font-semibold mt-2 ${
                isDark ? "text-gray-300" : "text-blue-600"
              }`}
            >
              {profile.title}
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className={`text-lg leading-relaxed max-w-md ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {profile.bio.substring(0, 120)}...
            </motion.p>

            {/* CTA Buttons - Completely Different Designs */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {isDark ? (
                <>
                  <motion.a
                    href="#projects"
                    whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,255,255,0.2)" }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-white text-black rounded-lg font-mono font-semibold hover:bg-gray-200 transition-colors text-center shadow-lg"
                  >
                    {'<'} Explore Work {'/'}
                  </motion.a>
                  <motion.a
                    href="#contact"
                    whileHover={{ scale: 1.05, borderColor: "#ffffff", boxShadow: "0 0 20px rgba(255,255,255,0.1)" }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 border-2 border-white text-white rounded-lg font-mono font-semibold hover:bg-white/10 transition-colors text-center"
                  >
                    Get In Touch
                  </motion.a>
                </>
              ) : (
                <>
                  <motion.a
                    href="#projects"
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(37, 99, 235, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all text-center shadow-lg"
                  >
                    View Projects
                  </motion.a>
                  <motion.a
                    href="#contact"
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(37, 99, 235, 0.2)", backgroundColor: "rgba(37, 99, 235, 0.05)" }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all text-center"
                  >
                    Let's Talk
                  </motion.a>
                </>
              )}
            </motion.div>

            {/* Social Links */}
            <motion.div 
              className="flex gap-4 pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {iconButtons.map((btn, idx) => (
                <motion.a
                  key={btn.key}
                  href={btn.href}
                  target={btn.key === "mail" ? "_self" : "_blank"}
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + idx * 0.1, duration: 0.5 }}
                  whileHover={{ 
                    scale: 1.2, 
                    rotate: 5,
                    boxShadow: isDark 
                      ? "0 0 25px rgba(255,255,255,0.2)"
                      : "0 0 25px rgba(37, 99, 235, 0.3)"
                  }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                    isDark
                      ? "bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/40 text-white"
                      : "bg-blue-100 border border-blue-300 hover:bg-blue-200 text-blue-600"
                  }`}
                >
                  <btn.Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT: Image Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="order-1 md:order-2 relative"
          >
            {isDark ? (
              // DARK: 3D tilted frame with glow
              <div className="relative h-96 md:h-[500px]">
                <motion.div
                  className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-white/20 to-gray-400/20 blur-2xl -z-10"
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                />
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative rounded-2xl overflow-hidden border-2 border-white/30 backdrop-blur-sm bg-gradient-to-br from-white/10 to-gray-400/10 h-full"
                >
                  <img
                    src={safeAsset(profile.profileImage)}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none"
                    animate={{ y: ["0%", "200%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  />
                </motion.div>
              </div>
            ) : (
              // LIGHT: Clean modern frame with shadow
              <div className="relative h-96 md:h-[500px]">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="relative rounded-3xl overflow-hidden border-8 border-white shadow-2xl h-full bg-white"
                >
                  <img
                    src={safeAsset(profile.profileImage)}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                {/* Floating accent circles */}
                <motion.div
                  className="absolute -top-8 -right-8 w-32 h-32 bg-blue-400/30 rounded-full blur-2xl -z-10"
                  animate={{
                    x: [0, 20, 0],
                    y: [0, -20, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                  }}
                />
                <motion.div
                  className="absolute -bottom-8 -left-8 w-32 h-32 bg-indigo-400/30 rounded-full blur-2xl -z-10"
                  animate={{
                    x: [0, -20, 0],
                    y: [0, 20, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                  }}
                />
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* Scroll indicator - Different style per theme */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown
            className={`w-6 h-6 ${isDark ? "text-gray-400" : "text-blue-500"}`}
          />
        </motion.div>
      </div>
    </section>
  );
}
 