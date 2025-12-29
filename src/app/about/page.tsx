"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

const ABOUT = {
  name: "Subramanaya Prabhu",
  tagline: "I can Make You Think",
  dobISO: "2005-04-09",
  location: "Udupi, India",
  company: "Averigo Privated Limited",
  email: "subramanyaprabhuu1001@gmail.com",
  phone: "+91 7795700861",
  bio: `I am a thinker, a l human who loves thinking deeply about life, systems, and ideas. 
An ambivert by nature — I enjoy meaningful conversations as much as quiet reflection. 
I'm passionate about acquiring knowledge across any field — from philosophy to technology, 
from psychology to chess strategy. Coding is not just work; it's a way of thinking, solving, and creating.`,
  socials: {
    github: "https://github.com/subbu-2005/",
    linkedin: "https://www.linkedin.com/in/subramanya119/",
    twitter: "",
    instagram: "https://www.instagram.com/_subbu119?igsh=dGszODRtNnV5ZjV3",
    email: "mailto:subramanyaprabhuu1001@gmail.com",
  },
  otherSkills: [
    "Odoo Development",
    "Python",
    "Communication",
    "Debating",
    "Chess Strategy",
  ],
  hobbies: [
    {
      name: "Writing",
      img: "https://img.freepik.com/premium-vector/hand-writing-notebook-with-pen-white-background-vector-illustration_345238-4637.jpg?semt=ais_hybrid&w=740&q=80",
    },
    {
      name: "Thinking",
      img: "https://png.pngtree.com/png-vector/20230220/ourmid/pngtree-thinking-man-vector-illustration-hd-transparent-png-image_6610360.png",
    },
    {
      name: "Reading",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG1E3IhHdNFqMjp1LbT04bZgyz2VxV8jvYmg&s",
    },
    {
      name: "Watching Movies",
      img: "https://cdn-icons-png.flaticon.com/512/4222/4222071.png",
    },
    {
      name: "Coding",
      img: "https://cdn-icons-png.flaticon.com/512/2621/2621018.png",
    },
    {
      name: "Gaming",
      img: "https://png.pngtree.com/png-vector/20240930/ourmid/pngtree-retro-neon-video-game-controller-png-image_13929194.png",
    },
  ],
  profileImage: "/profile.jpg", 
};

// Social Media Icons
const SocialIcons = {
  github: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.31 6.85 9.66.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.79.62-3.38-1.37-3.38-1.37-.46-1.2-1.12-1.52-1.12-1.52-.92-.64.07-.63.07-.63 1.02.07 1.55 1.07 1.55 1.07.9 1.58 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.23-.26-4.57-1.14-4.57-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .85-.28 2.8 1.04a9.4 9.4 0 0 1 5.1 0c1.95-1.32 2.8-1.04 2.8-1.04.55 1.42.2 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.94-2.35 4.8-4.59 5.06.36.33.68.98.68 1.98 0 1.43-.01 2.58-.01 2.93 0 .27.18.58.69.48A10.04 10.04 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4V8zM8 8h3.8v2.05h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V23h-4v-6.6c0-1.58-.03-3.6-2.2-3.6-2.2 0-2.53 1.72-2.53 3.49V23H8V8z" />
    </svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.43 1a9 9 0 0 1-2.83 1.08A4.51 4.51 0 0 0 11.5 6.03 12.8 12.8 0 0 1 2.23 2.2A4.51 4.51 0 0 0 3.48 8a4.41 4.41 0 0 1-2.05-.56v.06a4.51 4.51 0 0 0 3.62 4.42 4.52 4.52 0 0 1-2.04.08 4.51 4.51 0 0 0 4.21 3.13A9.06 9.06 0 0 1 1 18.57 12.79 12.79 0 0 0 7.93 20c8.3 0 12.85-6.93 12.85-12.94 0-.2 0-.41-.02-.61A9.1 9.1 0 0 0 23 3z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.9a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
    </svg>
  ),
  email: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5L4 8V6l8 5 8-5v2Z" />
    </svg>
  ),
};

function calcAge(dobISO: string) {
  const dob = new Date(dobISO);
  const now = new Date();
  let age = now.getFullYear() - dob.getFullYear();
  const m = now.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < dob.getDate())) age--;
  return age;
}

const glass =
  "rounded-2xl border border-white/10 bg-black/50 backdrop-blur-md shadow-lg";

export default function AboutPage() {
  const { isDark } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const age = calcAge(ABOUT.dobISO);

  const socialItems = Object.entries(ABOUT.socials)
    .filter(([, v]) => !!v)
    .map(([k, v]) => ({ key: k, href: v as string }));

  return (
    <>
      <main
        className={`relative min-h-screen pt-24 pb-20 px-4 sm:px-6 md:px-8 overflow-hidden transition-colors duration-300 ${
          isDark
            ? "text-white bg-black"
            : "text-gray-900 bg-white"
        }`}
      >
        {/* Subtle background gradient */}
        {isDark ? (
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black via-gray-950 to-black" />
        ) : (
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-gray-50 to-blue-50" />
        )}

        {/* Advanced Back Button - Different Styles Per Theme */}
        <div className="max-w-7xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {isDark ? (
              // DARK: Monospace/tech style
              <Link
                href="/"
                className="group inline-flex items-center gap-3 px-5 py-2.5 rounded-xl bg-white/5 backdrop-blur-md border border-white/20 hover:border-white/50 hover:bg-white/10 transition-all duration-300"
              >
                <motion.span
                  className="text-white text-lg font-mono"
                  animate={{ x: [0, -4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {'<'}
                </motion.span>
                <span className="text-white font-mono text-sm tracking-wide">
                  Back
                </span>
                <motion.span
                  className="text-white text-lg font-mono"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {'/'}
                </motion.span>
              </Link>
            ) : (
              // LIGHT: Clean modern style
              <Link
                href="/"
                className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-300 hover:border-blue-500 hover:shadow-md transition-all duration-300"
              >
                <motion.span
                  animate={{ x: [0, -3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-blue-600 text-lg"
                >
                  ←
                </motion.span>
                <span className="text-blue-700 font-semibold text-sm">
                  Back to Home
                </span>
              </Link>
            )}
          </motion.div>
        </div>

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto mb-16"
        >
          <h1
            className={`text-5xl md:text-7xl font-bold mb-4 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            About Me
          </h1>
          <div className="h-1 w-20 bg-white mb-6" />
          <p className="text-gray-400 text-lg max-w-2xl">Get to know the person behind the code</p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Hero Section with Image and Quick Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-3 gap-8 items-start"
          >
            {/* Left: Profile Image */}
            <div className="md:col-span-1">
              <div className="relative rounded-2xl overflow-hidden border-2 border-white/20 h-96 sticky top-32">
                <img
                  src={ABOUT.profileImage}
                  alt={ABOUT.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </div>

            {/* Right: Quick Info + Bio */}
            <div className="md:col-span-2 space-y-8">
              {/* Quick Info Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-2xl border border-white/20 bg-white/5 backdrop-blur-md p-8"
              >
                <h2 className="text-3xl font-bold text-white mb-2">{ABOUT.name}</h2>
                <p className="text-xl text-gray-300 mb-6 italic">{ABOUT.tagline}</p>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div>
                    <p className="text-gray-500 text-sm font-mono mb-1">Age</p>
                    <p className="text-white font-semibold text-lg">{age}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm font-mono mb-1">Location</p>
                    <p className="text-white font-semibold text-lg">{ABOUT.location}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-500 text-sm font-mono mb-1">Currently</p>
                    <p className="text-white font-semibold">{ABOUT.company}</p>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex flex-wrap gap-3">
                  {socialItems.map((s) => (
                    <motion.a
                      key={s.key}
                      href={s.href}
                      target={s.key === "email" ? "_self" : "_blank"}
                      rel="noreferrer"
                      whileHover={{ scale: 1.1 }}
                      className="w-11 h-11 rounded-lg bg-white/10 border border-white/20 hover:border-white/50 hover:bg-white/20 transition-all flex items-center justify-center text-white"
                    >
                      {SocialIcons[s.key as keyof typeof SocialIcons]}
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Main Bio Section */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-2xl border border-white/20 bg-white/5 backdrop-blur-md p-8"
              >
                <h3 className="text-2xl font-bold text-white mb-4">Who I Am</h3>
                <p className="text-gray-300 leading-relaxed text-justify whitespace-pre-line">
                  {ABOUT.bio}
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Detailed Life Journey Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="rounded-2xl border border-white/20 bg-white/5 backdrop-blur-md p-8 md:p-12"
          >
            <h3 className="text-3xl font-bold text-white mb-8">My Journey</h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* College Life */}
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-white flex items-center gap-2">
                  <span className="text-2xl">🎓</span> College Years
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  My college journey has been transformative. I've been exposed to cutting-edge technology and innovative thinking. Beyond academics, I've participated in hackathons, tech clubs, and mentored fellow students. These experiences shaped me into a problem-solver who values continuous learning and knowledge sharing.
                </p>
              </div>

              {/* Developer Story */}
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-white flex items-center gap-2">
                  <span className="text-2xl">💻</span> Developer Story
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  I started coding as a hobby and it became my passion. What started with simple Python scripts evolved into building full-stack applications. I've worked on diverse projects ranging from web applications to system optimizations. Every project teaches me something new about problem-solving and code craftsmanship.
                </p>
              </div>

              {/* Thinking & Philosophy */}
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-white flex items-center gap-2">
                  <span className="text-2xl">🧠</span> Deep Thinking
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  I believe in thinking deeply before acting. Whether it's debugging code or understanding complex systems, I take time to analyze, question assumptions, and explore multiple perspectives. This philosophical approach to problem-solving has helped me design elegant solutions to complex problems.
                </p>
              </div>

              {/* Hobbies & Interests */}
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-white flex items-center gap-2">
                  <span className="text-2xl">🎯</span> Beyond Code
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  When I'm not coding, you'll find me reading (philosophy, psychology, technology), writing about ideas that fascinate me, playing chess strategically, watching thought-provoking movies, or gaming. These hobbies help me stay creative and balanced while enriching my perspective on life.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Skills Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="rounded-2xl border border-white/20 bg-white/5 backdrop-blur-md p-8 md:p-12"
          >
            <h3 className="text-3xl font-bold text-white mb-8">Skills & Expertise</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Technical Specialties</h4>
                <p className="text-gray-400 text-sm mb-3">Beyond the typical tech stack, I excel in:</p>
                <div className="flex flex-wrap gap-3">
                  {ABOUT.otherSkills.map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.05 }}
                      className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white font-medium hover:border-white/50 hover:bg-white/20 transition-all text-sm"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>

              <div className="border-t border-white/10 pt-6">
                <h4 className="text-lg font-semibold text-white mb-4">What Drives Me</h4>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-white font-bold mt-1">→</span>
                    <span>Creating solutions that make a real impact in people's lives</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-white font-bold mt-1">→</span>
                    <span>Continuous learning and mastering new technologies</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-white font-bold mt-1">→</span>
                    <span>Collaborating with intelligent, creative minds</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-white font-bold mt-1">→</span>
                    <span>Writing clean, maintainable, and elegant code</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="rounded-2xl border border-white/20 bg-white/5 backdrop-blur-md p-8 md:p-12 text-center"
          >
            <h3 className="text-3xl font-bold text-white mb-4">Let's Connect</h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              I'm always interested in meeting new people, discussing interesting ideas, or collaborating on exciting projects. Feel free to reach out!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.a
                href={`mailto:${ABOUT.email}`}
                whileHover={{ scale: 1.05 }}
                className="px-8 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-100 transition-all"
              >
                Send Email
              </motion.a>
              <motion.a
                href={`tel:${ABOUT.phone}`}
                whileHover={{ scale: 1.05 }}
                className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-all"
              >
                Call Me
              </motion.a>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative bg-black border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* About Section */}
            <div>
              <h3 className="text-xl font-bold text-white mb-3">
                {ABOUT.name}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {ABOUT.tagline}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">Quick Links</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <Link href="/" className="hover:text-white transition">
                    {'>'} Home
                  </Link>
                </li>
                <li>
                  <Link href="#projects" className="hover:text-white transition">
                    {'>'} Projects
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="hover:text-white transition">
                    {'>'} Contact
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white transition">
                    {'>'} About
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">Get In Touch</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a
                    href={`mailto:${ABOUT.email}`}
                    className="hover:text-white transition"
                  >
                    {ABOUT.email}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${ABOUT.phone}`}
                    className="hover:text-white transition"
                  >
                    {ABOUT.phone}
                  </a>
                </li>
                <li className="text-gray-400">{ABOUT.location}</li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} {ABOUT.name}. All rights reserved.
            </p>
            <p className="text-gray-600 text-sm">
              Built with ❤️ using Next.js & Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}