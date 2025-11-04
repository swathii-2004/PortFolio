// Hero.tsx - Complete Hero Component File
"use client";

import { motion, useMotionValue, useTransform, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { Satisfy } from "next/font/google";

const satisfy = Satisfy({ subsets: ["latin"], weight: "400", display: "swap" });

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

const BACKGROUND_URL =
  "https://img.freepik.com/premium-photo/high-quality-desktop-wallpaper_941097-71826.jpg?semt=ais_hybrid&w=1600&q=80";

const safeAsset = (url?: string) =>
  url && /^https?:\/\//i.test(url) ? url : (url || "/default.jpg");

const toHref = (value?: string, kind?: "url" | "email" | "phone") => {
  if (!value) return "";
  if (kind === "email") return `mailto:${value}`;
  if (kind === "phone") return `tel:${value}`;
  if (!/^https?:\/\//i.test(value)) return `https://${value}`;
  return value;
};

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

  useEffect(() => {
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

  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  if (!profile) return null;
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
    <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center pt-20 md:pt-24" id="home">
      {/* Parallax Background */}
      <motion.div 
        className="absolute inset-0 -z-10"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
          style={{ backgroundImage: `url('${BACKGROUND_URL}')` }}
        />
      </motion.div>

      {/* Animated Grid Overlay */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px] animate-pulse" />

      {/* Spotlight Effect */}
      <motion.div
        className="absolute -z-10 w-[600px] h-[600px] rounded-full blur-[120px] opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(0,255,255,0.4) 0%, transparent 70%)",
          left: mousePos.x - 300,
          top: mousePos.y - 300,
        }}
        animate={{
          left: mousePos.x - 300,
          top: mousePos.y - 300,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400/20 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
            }}
            animate={{
              y: [null, Math.random() * -500, Math.random() * 500],
              x: [null, Math.random() * -200, Math.random() * 200],
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 8 + 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl px-6 md:px-12">
        <motion.div
          className="grid md:grid-cols-[1fr_1.3fr] gap-12 items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Profile Image with 3D Tilt - PNG OUTLINE ONLY */}
          <motion.div
            style={{ 
              rotateX, 
              rotateY,
              transformStyle: "preserve-3d",
            }}
            onMouseMove={(e: React.MouseEvent<HTMLDivElement>) => {
              const rect = e.currentTarget.getBoundingClientRect();
              x.set(e.clientX - (rect.left + rect.width / 2));
              y.set(e.clientY - (rect.top + rect.height / 2));
            }}
            onMouseLeave={() => {
              x.set(0);
              y.set(0);
            }}
            className="relative group perspective-1000"
          >
            {/* Image Container - No border, no rounded corners for outline PNG */}
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <img
                src={safeAsset(profile.profileImage)}
                alt={profile.name}
                className="w-full h-[350px] md:h-[450px] object-contain"
                style={{ mixBlendMode: 'normal' }}
              />
              
              {/* Scan Line Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent pointer-events-none"
                animate={{ y: ["0%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>

            {/* Floating Badge */}
            <motion.div
              className="absolute -bottom-4 -right-4 bg-black/80 backdrop-blur-md border border-cyan-400 rounded-2xl px-6 py-3"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              <p className="text-cyan-400 font-bold text-lg">Available</p>
            </motion.div>
          </motion.div>

          {/* Text Content */}
          <div className="text-center md:text-left space-y-6">
            {/* Name with Glitch Effect */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.h1
                className={`${satisfy.className} text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-500 italic drop-shadow-[0_0_30px_rgba(0,255,255,0.5)]`}
                animate={{
                  textShadow: [
                    "0 0 20px rgba(0,255,255,0.5)",
                    "0 0 40px rgba(0,255,255,0.8)",
                    "0 0 20px rgba(0,255,255,0.5)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {profile.name}
              </motion.h1>
            </motion.div>

            {/* Title with Typing Effect */}
            <motion.h2
              className="text-2xl md:text-3xl text-cyan-400 font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <span className="inline-block">{'<'}</span>
              {profile.title}
              <span className="inline-block">{'/>'}</span>
              <motion.span
                className="inline-block w-1 h-6 bg-cyan-400 ml-1"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            </motion.h2>

            {/* Bio */}
            <motion.p
              className="text-gray-200 text-lg leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {profile.bio}
            </motion.p>

            {/* Social Icons - NO GLOW */}
            <motion.div
              className="flex flex-wrap gap-4 justify-center md:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              {iconButtons.map(({ key, href, Icon: Brand }, idx) => (
                <motion.a
                  key={key}
                  href={href}
                  target={key === "mail" || key === "phone" ? "_self" : "_blank"}
                  rel="noreferrer"
                  className="relative group"
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + idx * 0.1 }}
                >
                  <div className="relative w-14 h-14 rounded-xl bg-black/40 backdrop-blur-md border border-cyan-400/40 flex items-center justify-center text-cyan-400 hover:border-cyan-400 hover:bg-cyan-400/10 transition-all duration-300">
                    <Brand className="w-6 h-6" />
                  </div>
                </motion.a>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex gap-4 justify-center md:justify-start flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <motion.a
                href="#projects"
                className="relative px-8 py-3 rounded-xl font-bold text-black bg-cyan-400 overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">View Projects</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
              
              <motion.a
                href="#contact"
                className="relative px-8 py-3 rounded-xl font-bold border-2 border-cyan-400 text-cyan-400 overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 group-hover:text-black transition-colors duration-300">Contact Me</span>
                <motion.div
                  className="absolute inset-0 bg-cyan-400"
                  initial={{ y: "100%" }}
                  whileHover={{ y: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center p-2">
          <motion.div
            className="w-1.5 h-1.5 bg-cyan-400 rounded-full"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}