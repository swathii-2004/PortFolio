"use client";

import { useEffect, useState } from "react";
import { assetUrl } from "@/lib/asset";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

type Project = {
  _id: string;
  title: string;
  description?: string;
  imageURL?: string;
  images?: string[];
  githubLink?: string;
  liveLink?: string;
  techStack?: string[];
  category?: string;
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const { isDark } = useTheme();

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/projects", { cache: "no-store" });
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    })();
  }, []);

  return (
    <section
      id="projects"
      className={`relative py-24 px-6 md:px-12 overflow-hidden min-h-screen transition-colors duration-300 ${
        isDark ? "bg-black" : "bg-gradient-to-b from-white via-blue-50 to-indigo-50"
      }`}
    >
      {/* Animated gradient background - Dark Mode */}
      {isDark && (
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
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

      {/* Floating blobs */}
      {isDark && (
        <motion.div
          className="absolute top-0 right-20 w-96 h-96 bg-gradient-to-br from-white to-gray-400 rounded-full blur-3xl opacity-5 -z-10"
          animate={{
            y: [0, 100, 0],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 15,
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
          <span className={isDark ? "text-gray-400" : "text-blue-600"}>{'>'} </span>Featured Projects
        </p>
        <h2 className={`text-5xl md:text-6xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>
          Showcase
        </h2>
        <p className={`max-w-2xl mx-auto ${isDark ? "text-gray-300" : "text-gray-700"}`}>
          Explore my latest work and projects that showcase my skills in modern web development
        </p>
      </motion.div>

      {projects.length === 0 ? (
        <motion.div 
          className="text-center py-20"
          animate={{ opacity: [0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <p className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"}`}>Loading projects...</p>
        </motion.div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {projects.map((p, idx) => (
            <motion.article
              key={p._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="group h-full"
            >
              <Link href={`/projects/${p._id}`} className="block h-full">
                {/* Glowing border effect */}
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-r blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 ${
                  isDark
                    ? "from-white/20 to-gray-500/20"
                    : "from-blue-400/20 to-indigo-400/20"
                }`} />
                
                <div className={`relative h-full rounded-xl border overflow-hidden group-hover:border-opacity-100 transition-all duration-300 shadow-lg flex flex-col ${
                  isDark
                    ? "border-white/20 bg-gradient-to-br from-gray-900 to-black backdrop-blur-md group-hover:border-white/40"
                    : "border-blue-300/50 bg-gradient-to-br from-white to-blue-50 backdrop-blur-sm group-hover:border-blue-400"
                }`}>
                  {/* Project Image */}
                  {(p.images?.[0] || p.imageURL) && (
                    <div className={`relative overflow-hidden h-48 ${isDark ? "bg-gradient-to-br from-gray-800 to-gray-900" : "bg-gradient-to-br from-blue-200 to-indigo-200"}`}>
                      <img
                        src={assetUrl(p.images?.[0] || p.imageURL || "")}
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      {/* Overlay gradient on hover */}
                      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                        isDark ? "bg-gradient-to-t from-black/60 to-transparent" : "bg-gradient-to-t from-blue-900/40 to-transparent"
                      }`} />

                      {/* Image count badge */}
                      {p.images && p.images.length > 1 && (
                        <motion.div 
                          className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full border backdrop-blur-sm ${
                            isDark
                              ? "bg-black/70 text-white border-white/30"
                              : "bg-white/70 text-blue-900 border-blue-300/50"
                          }`}
                          whileHover={{ scale: 1.1 }}
                        >
                          🖼️ {p.images.length}
                        </motion.div>
                      )}
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1 p-6 flex flex-col">
                    {/* Title */}
                    <h3 className={`text-xl font-bold transition-colors duration-300 mb-2 ${
                      isDark
                        ? "text-white group-hover:text-gray-200"
                        : "text-gray-900 group-hover:text-blue-600"
                    }`}>
                      {p.title}
                    </h3>

                    {/* Description */}
                    {p.description && (
                      <p className={`text-sm line-clamp-2 mb-4 flex-1 ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}>
                        {p.description}
                      </p>
                    )}

                    {/* Tech Stack */}
                    {p.techStack && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {p.techStack.slice(0, 3).map((t) => (
                          <motion.span
                            key={t}
                            whileHover={{ scale: 1.05 }}
                            className={`rounded-full px-3 py-1 text-xs border transition-colors ${
                              isDark
                                ? "bg-white/10 text-white border-white/20 hover:border-white/50"
                                : "bg-blue-100 text-blue-700 border-blue-300 hover:border-blue-500"
                            }`}
                          >
                            {t}
                          </motion.span>
                        ))}
                        {p.techStack.length > 3 && (
                          <span className={`rounded-full px-3 py-1 text-xs ${
                            isDark
                              ? "bg-gray-800/50 text-gray-400"
                              : "bg-gray-200 text-gray-600"
                          }`}>
                            +{p.techStack.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className={`flex flex-wrap gap-2 pt-4 border-t ${
                      isDark ? "border-gray-700/30" : "border-blue-200/50"
                    }`}>
                      <motion.button
                        onClick={(e) => {
                          e.preventDefault();
                          window.location.href = `/projects/${p._id}`;
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex-1 text-center rounded-lg font-semibold py-2 border-0 cursor-pointer transition-all duration-300 ${
                          isDark
                            ? "bg-white text-black hover:bg-gray-200"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                      >
                        Details
                      </motion.button>
                      
                      {p.liveLink && (
                        <motion.a
                          href={p.liveLink}
                          target="_blank"
                          onClick={(e) => e.stopPropagation()}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 ${
                            isDark
                              ? "border-white/30 text-white hover:bg-white/10 hover:border-white/50"
                              : "border-blue-400 text-blue-600 hover:bg-blue-100 hover:border-blue-500"
                          }`}
                        >
                          Live
                        </motion.a>
                      )}
                      
                      {p.githubLink && (
                        <motion.a
                          href={p.githubLink}
                          target="_blank"
                          onClick={(e) => e.stopPropagation()}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="rounded-lg border border-gray-600/50 px-3 py-2 text-gray-300 text-sm font-medium hover:bg-gray-700/30 hover:border-gray-400 transition-all duration-300"
                        >
                          Code
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      )}
    </section>
  );
}