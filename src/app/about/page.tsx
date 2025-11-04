"use client";

import { motion } from "framer-motion";
import Link from "next/link";

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

const BACKGROUND_URL =
  "https://img.freepik.com/premium-photo/high-quality-desktop-wallpaper_941097-71826.jpg?semt=ais_hybrid&w=1600&q=80";

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
  const age = calcAge(ABOUT.dobISO);

  const socialItems = Object.entries(ABOUT.socials)
    .filter(([, v]) => !!v)
    .map(([k, v]) => ({ key: k, href: v as string }));

  return (
    <>
      <main className="relative min-h-screen pt-24 pb-20 px-4 sm:px-6 md:px-8 text-white overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${BACKGROUND_URL}')`,
          }}
        />

        {/* Advanced Back Button */}
        <div className="max-w-6xl mx-auto mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/"
              className="group inline-flex items-center gap-3 px-5 py-2.5 rounded-xl bg-black/40 backdrop-blur-md border border-cyan-400/30 hover:border-cyan-400 hover:bg-cyan-400/10 transition-all duration-300"
            >
              <motion.span
                className="text-cyan-400 text-lg"
                animate={{ x: [0, -4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ←
              </motion.span>
              <span className="text-cyan-400 font-mono text-sm italic tracking-wide">
                {'<'} Back to Home {'/>'}
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Advanced Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="max-w-6xl mx-auto text-center mb-12"
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold italic tracking-wide mb-4"
            animate={{
              textShadow: [
                "0 0 20px rgba(0, 255, 255, 0.5)",
                "0 0 30px rgba(0, 255, 255, 0.7)",
                "0 0 20px rgba(0, 255, 255, 0.5)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-500">
              {'<'} About 
            </span>
            <span className="text-cyan-400 mx-2">Me</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-cyan-400 to-cyan-300">
              {'/>'}
            </span>
          </motion.h1>
          
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-0.5 w-32 mx-auto bg-gradient-to-r from-transparent via-cyan-400 to-transparent mb-6"
          />
          
          <p className="text-gray-300 mt-3 max-w-2xl mx-auto leading-relaxed font-mono text-sm italic">
            <span className="text-cyan-400">{'// '}</span>
            Learn more about my journey, hobbies, and passions — what makes me tick as a developer and thinker.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Left: Profile Card */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className={`${glass} p-6 lg:col-span-1`}
          >
            <div className="flex flex-col items-center text-center">
              {/* Profile Image */}
              <div className="relative w-full h-56 mb-6 overflow-hidden rounded-xl border-2 border-cyan-400/30">
                <img
                  src={ABOUT.profileImage}
                  alt={ABOUT.name}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              <h2 className="text-2xl font-semibold italic text-cyan-400">{ABOUT.name}</h2>
              <p className="text-cyan-300 font-medium mt-1 font-mono text-sm">{'<'} {ABOUT.tagline} {'/>'}</p>

              <div className="mt-4 space-y-1 text-sm text-gray-300">
                <p className="font-mono">
                  <span className="text-cyan-400">Age:</span> <span className="text-white">{age}</span>
                </p>
                <p className="font-mono">
                  <span className="text-cyan-400">Location:</span> <span className="text-white">{ABOUT.location}</span>
                </p>
                <p className="font-mono">
                  <span className="text-cyan-400">Company:</span> <span className="text-white">{ABOUT.company}</span>
                </p>
                <p className="font-mono">
                  <span className="text-cyan-400">Email:</span>{" "}
                  <a
                    href={`mailto:${ABOUT.email}`}
                    className="text-cyan-300 underline hover:text-cyan-400 transition"
                  >
                    {ABOUT.email}
                  </a>
                </p>
                {ABOUT.phone && (
                  <p className="font-mono">
                    <span className="text-cyan-400">Phone:</span>{" "}
                    <a
                      href={`tel:${ABOUT.phone}`}
                      className="text-cyan-300 underline hover:text-cyan-400 transition"
                    >
                      {ABOUT.phone}
                    </a>
                  </p>
                )}
              </div>

              {/* Social Links with Icons */}
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                {socialItems.map((s) => (
                  <motion.a
                    key={s.key}
                    href={s.href}
                    target={s.key === "email" ? "_self" : "_blank"}
                    rel="noreferrer"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-xl bg-black/40 backdrop-blur-md border border-cyan-400/30 hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300 flex items-center justify-center text-cyan-400"
                  >
                    {SocialIcons[s.key as keyof typeof SocialIcons]}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Right: Bio + Skills + Hobbies */}
          <div className="space-y-6 lg:col-span-2">
            {/* Bio */}
            <motion.section
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`${glass} p-6`}
            >
              <h3 className="text-xl font-bold mb-3 text-cyan-400 italic font-mono">{'<'} Who I Am {'/>'}</h3>
              <p className="text-gray-200 leading-relaxed tracking-wide whitespace-pre-line">
                {ABOUT.bio}
              </p>
            </motion.section>

            {/* Skills */}
            <motion.section
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`${glass} p-6`}
            >
              <h3 className="text-xl font-bold mb-3 text-cyan-400 italic font-mono">{'<'} Skills {'/>'}</h3>
              <div className="flex flex-wrap gap-3">
                {ABOUT.otherSkills.map((s) => (
                  <motion.span
                    key={s}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="rounded-full px-4 py-2 text-sm font-mono italic border border-cyan-400/30 bg-white/5 hover:bg-cyan-400/10 hover:border-cyan-400 transition"
                  >
                    {s}
                  </motion.span>
                ))}
              </div>
            </motion.section>

            {/* Hobbies */}
            <motion.section
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: "easeOut" }}
              className={`${glass} p-6`}
            >
              <h3 className="text-xl font-bold mb-5 text-cyan-400 italic font-mono">
                {'<'} Hobbies & Interests {'/>'}
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {ABOUT.hobbies.map((h) => (
                  <motion.div
                    key={h.name}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="relative overflow-hidden rounded-xl group cursor-pointer bg-black/30 border border-gray-700 hover:border-cyan-400/50"
                  >
                    <div className="w-full h-24 flex items-center justify-center p-4">
                      <img
                        src={h.img}
                        alt={h.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <div className="bg-black/60 p-3 text-center border-t border-gray-700">
                      <p className="text-cyan-400 text-sm font-mono italic">{h.name}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative bg-black/80 backdrop-blur-md border-t border-cyan-400/20 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* About Section */}
            <div>
              <h3 className="text-xl font-bold text-cyan-400 mb-3 italic font-mono">
                {ABOUT.name}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed font-mono italic">
                {ABOUT.tagline}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-cyan-400 mb-3 italic font-mono">Quick Links</h4>
              <ul className="space-y-2 text-gray-400 text-sm font-mono">
                <li>
                  <Link href="/" className="hover:text-cyan-400 transition italic">
                    {'>'} Home
                  </Link>
                </li>
                <li>
                  <Link href="#projects" className="hover:text-cyan-400 transition italic">
                    {'>'} Projects
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="hover:text-cyan-400 transition italic">
                    {'>'} Contact
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-cyan-400 transition italic">
                    {'>'} About
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold text-cyan-400 mb-3 italic font-mono">Get In Touch</h4>
              <ul className="space-y-2 text-gray-400 text-sm font-mono">
                <li>
                  <a
                    href={`mailto:${ABOUT.email}`}
                    className="hover:text-cyan-400 transition italic"
                  >
                    {ABOUT.email}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${ABOUT.phone}`}
                    className="hover:text-cyan-400 transition italic"
                  >
                    {ABOUT.phone}
                  </a>
                </li>
                <li className="text-gray-400 italic">{ABOUT.location}</li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-cyan-400/20 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm font-mono italic">
              <span className="text-cyan-400">{'// '}</span>
              © {new Date().getFullYear()} {ABOUT.name}. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm font-mono italic">
              <span className="text-cyan-400">{'<'}</span> Built with ❤️ using Next.js & Tailwind CSS <span className="text-cyan-400">{'/>'}</span>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}