"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

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
  const { isDark } = useTheme();

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
    <section id="skills" className={`relative py-24 px-6 md:px-12 overflow-hidden min-h-screen transition-colors duration-300 ${
      isDark ? "bg-black" : "bg-gradient-to-b from-white via-blue-50 to-indigo-50"
    }`}>
      {/* Animated gradient background - Dark Mode */}
      {isDark && (
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />
        </div>
      )}

      {/* Light Mode Background */}
      {!isDark && (
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-80 h-80 bg-indigo-300/20 rounded-full blur-3xl" />
        </div>
      )}

      {/* Grid animation - Dark Only */}
      {isDark && (
        <motion.div 
          className="absolute inset-0 -z-10 opacity-5"
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

      {/* Floating blobs - Dark Only */}
      {isDark && (
        <motion.div
          className="absolute -left-40 top-40 w-96 h-96 bg-gradient-to-br from-white to-gray-400 rounded-full blur-3xl opacity-5 -z-10"
          animate={{
            y: [0, -100, 0],
            x: [0, -50, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      {/* Section Title */}
      <motion.div 
        className="text-center mb-20"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className={`font-mono text-sm tracking-widest uppercase mb-4 ${isDark ? "text-gray-400" : "text-blue-600"}`}>
          <span className={isDark ? "text-gray-400" : "text-blue-600"}>{'>'} </span>Technical Arsenal
        </p>
        <h2 className={`text-5xl md:text-6xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
          Skills
        </h2>
        <p className={`max-w-2xl mx-auto ${isDark ? "text-gray-400" : "text-gray-700"}`}>
          Technologies and tools I've mastered through hands-on experience
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto space-y-20">
        {Object.entries(grouped).map(([category, items], categoryIdx) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: categoryIdx * 0.15 }}
          >
            {/* Category Title */}
            <motion.div
              className="mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: categoryIdx * 0.15 + 0.2 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className={`h-1 w-12 ${isDark ? "bg-white" : "bg-blue-600"}`} />
                <h3 className={`text-2xl md:text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                  {category}
                </h3>
                <div className={`h-1 flex-1 bg-gradient-to-l ${isDark ? "from-white/50 to-transparent" : "from-blue-400/50 to-transparent"}`} />
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6 md:gap-8">
                {items.map((skill, skillIdx) => {
                  const imageUrl = getImageUrl(skill.imageURL);
                  
                  return (
                    <motion.div
                      key={skill._id}
                      initial={{ opacity: 0, scale: 0.3, y: 30 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: categoryIdx * 0.15 + skillIdx * 0.03,
                        type: "spring",
                        stiffness: 150,
                        damping: 25
                      }}
                      whileHover={{
                        scale: 1.15,
                        rotateZ: [0, -3, 3, -3, 0],
                        transition: { duration: 0.4 }
                      }}
                      className="group relative flex flex-col items-center"
                    >
                      {/* Skill Container */}
                      <div className="relative w-full aspect-square">
                        {/* Glowing background effect */}
                        <motion.div
                          className={`absolute inset-0 rounded-2xl blur-xl -z-10 ${
                            isDark
                              ? "bg-gradient-to-br from-white/20 to-gray-400/20"
                              : "bg-gradient-to-br from-blue-400/20 to-indigo-400/20"
                          }`}
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                        
                        {/* Main container */}
                        <motion.div
                          className={`relative w-full h-full rounded-2xl border flex items-center justify-center overflow-hidden transition-all duration-300 ${
                            isDark
                              ? "border-white/20 bg-gradient-to-br from-gray-900/60 to-gray-900/30 backdrop-blur-md group-hover:border-white/50"
                              : "border-blue-300/50 bg-gradient-to-br from-blue-100/40 to-indigo-50/40 backdrop-blur-sm group-hover:border-blue-400"
                          }`}
                          whileHover={{
                            background: isDark
                              ? "linear-gradient(to bottom right, rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.4))"
                              : "linear-gradient(to bottom right, rgba(219, 234, 254, 0.6), rgba(224, 242, 254, 0.4))"
                          }}
                        >
                          {/* Shine effect on hover */}
                          <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                            isDark
                              ? "bg-gradient-to-br from-white/10 via-transparent to-gray-400/10"
                              : "bg-gradient-to-br from-blue-200/10 via-transparent to-indigo-300/10"
                          }`} />

                          {/* Skill Content */}
                          {imageUrl ? (
                            <motion.img
                              src={imageUrl}
                              alt={skill.name}
                              className="w-1/2 h-1/2 object-contain relative z-10"
                              whileHover={{ rotate: 360, scale: 1.1 }}
                              transition={{ duration: 0.6 }}
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                              }}
                            />
                          ) : skill.icon ? (
                            <motion.span 
                              className="text-3xl md:text-4xl relative z-10"
                              whileHover={{ scale: 1.3 }}
                            >
                              {skill.icon}
                            </motion.span>
                          ) : (
                            <div className={`w-3/5 h-3/5 rounded-xl flex items-center justify-center text-lg md:text-xl font-bold relative z-10 ${
                              isDark
                                ? "bg-white text-black"
                                : "bg-blue-500 text-white"
                            }`}>
                              {skill.name.charAt(0).toUpperCase()}
                            </div>
                          )}

                          {/* Level badge */}
                          {skill.level && (
                            <motion.div
                              className={`absolute -top-3 -right-3 text-[10px] font-bold px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 whitespace-nowrap ${
                                isDark
                                  ? "bg-white text-black"
                                  : "bg-blue-500 text-white"
                              }`}
                              whileHover={{ scale: 1.1 }}
                            >
                              {skill.level}
                            </motion.div>
                          )}
                        </motion.div>
                      </div>

                      {/* Skill Name Tooltip */}
                      <motion.div
                        className="mt-4 text-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                        initial={{ y: -10 }}
                        whileHover={{ y: 0 }}
                      >
                        <p className={`font-semibold text-sm md:text-base ${isDark ? "text-white" : "text-gray-900"}`}>{skill.name}</p>
                        {skill.level && (
                          <p className={`text-xs mt-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>{skill.level}</p>
                        )}
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Floating particles background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-white/20 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
            }}
            animate={{
              y: [null, Math.random() * -800 - 200],
              opacity: [0.3, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 6 + 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </section>
  );
}