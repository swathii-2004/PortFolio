"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type SkillType = {
  _id: string;
  name: string;
  category: string;
  imageURL?: string;
  icon?: string;
  level?: string;
  featured?: boolean;
};

export default function Skills() {
  const [skills, setSkills] = useState<SkillType[]>([]);

  useEffect(() => {
    fetch("/api/skills")
      .then((res) => res.json())
      .then((data) => setSkills(data))
      .catch(() => {});
  }, []);

  if (!skills.length) return null;

  // Group skills by category
  const grouped = skills.reduce((acc: Record<string, SkillType[]>, skill) => {
    const cat = skill.category || "Other";
    acc[cat] = acc[cat] || [];
    acc[cat].push(skill);
    return acc;
  }, {});

  // Helper function to get correct image URL
  const getImageUrl = (imageURL?: string) => {
    if (!imageURL) return null;
    if (imageURL.startsWith('http')) return imageURL;
    return imageURL;
  };

  return (
    <section id="skills" className="relative py-20 px-6 overflow-hidden min-h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/premium-photo/high-quality-desktop-wallpaper_941097-71826.jpg?semt=ais_hybrid&w=1600&q=80')",
        }}
      />

      {/* Animated Grid Overlay */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-5xl md:text-6xl font-bold text-center mb-16 text-cyan-400 tracking-tight"
        style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
      >
        Skills
      </motion.h2>

      {/* Two Column Grid for Categories */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 gap-x-8 gap-y-16">
        {Object.entries(grouped).map(([category, items], idx) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
          >
            {/* Category Title - Smaller, Different Font */}
            <motion.h3
              className="text-sm font-light tracking-[0.3em] uppercase text-cyan-300/70 mb-8 text-center"
              style={{ fontFamily: 'Courier New, monospace' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: idx * 0.1 + 0.2 }}
            >
              {category}
            </motion.h3>

            {/* Skills Grid - Only Logos */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              {items.map((skill, skillIdx) => {
                const imageUrl = getImageUrl(skill.imageURL);
                
                return (
                  <motion.div
                    key={skill._id}
                    initial={{ opacity: 0, scale: 0.5, rotateY: -180 }}
                    whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: skillIdx * 0.05,
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{
                      scale: 1.2,
                      rotateZ: [0, -5, 5, -5, 0],
                      transition: { duration: 0.4 }
                    }}
                    className="group relative"
                  >
                    {/* Glowing Border Effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/50 via-blue-500/50 to-purple-500/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Logo Container */}
                    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-black/40 backdrop-blur-sm border border-cyan-400/30 flex items-center justify-center overflow-hidden group-hover:border-cyan-400 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                      {/* Animated Background on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {imageUrl ? (
                        <motion.img
                          src={imageUrl}
                          alt={skill.name}
                          className="w-12 h-12 md:w-14 md:h-14 object-contain relative z-10"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      ) : skill.icon ? (
                        <span className="text-4xl md:text-5xl relative z-10">
                          {skill.icon}
                        </span>
                      ) : (
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-xl md:text-2xl font-bold text-black relative z-10">
                          {skill.name.charAt(0).toUpperCase()}
                        </div>
                      )}

                      {/* Skill Level Badge */}
                      {skill.level && (
                        <div className="absolute -top-2 -right-2 bg-cyan-400 text-black text-[8px] font-bold px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                          {skill.level}
                        </div>
                      )}
                    </div>

                    {/* Tooltip - Skill Name on Hover */}
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black/90 text-cyan-300 text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none border border-cyan-400/30">
                      {skill.name}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Floating Particles Animation */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
            }}
            animate={{
              y: [null, Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080)],
              x: [null, Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920)],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
    </section>
  );
}