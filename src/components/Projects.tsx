"use client";

import { useEffect, useState } from "react";
import { assetUrl } from "@/lib/asset";
import Link from "next/link";

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
      className="relative py-16 px-6 md:px-12 overflow-hidden min-h-screen"
    >
      {/* Background image - NO dark overlay */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/premium-photo/high-quality-desktop-wallpaper_941097-71826.jpg?semt=ais_hybrid&w=1600&q=80')",
        }}
      />

      <h2 className="text-4xl font-bold text-center text-cyan-400 mb-10 drop-shadow-lg">
        Projects
      </h2>

      {projects.length === 0 ? (
        <p className="text-center text-gray-300">Loading projects...</p>
      ) : (
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <article
              key={p._id}
              className="rounded-2xl border border-gray-700 bg-black/50 backdrop-blur-md shadow-lg hover:border-cyan-400 hover:scale-[1.02] transition-all duration-300 overflow-hidden"
            >
              <Link href={`/projects/${p._id}`} className="block">
                {(p.images?.[0] || p.imageURL) && (
                  <div className="relative overflow-hidden group">
                    <img
                      src={assetUrl(p.images?.[0] || p.imageURL || "")}
                      alt={p.title}
                      className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {p.images && p.images.length > 1 && (
                      <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        📷 {p.images.length} images
                      </div>
                    )}
                  </div>
                )}
              </Link>

              <div className="p-5">
                <Link href={`/projects/${p._id}`}>
                  <h3 className="text-xl font-semibold text-white hover:text-cyan-400 transition-colors">
                    {p.title}
                  </h3>
                </Link>

                {p.description && (
                  <p className="mt-2 text-gray-300 text-sm line-clamp-2">
                    {p.description}
                  </p>
                )}

                {p.techStack && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.techStack.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-gray-800/60 px-3 py-1 text-xs text-gray-300 border border-gray-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href={`/projects/${p._id}`}
                    className="rounded bg-cyan-500 px-4 py-2 text-black font-medium hover:bg-cyan-400 transition-colors"
                  >
                    View Details
                  </Link>
                  {p.liveLink && (
                    <a
                      href={p.liveLink}
                      target="_blank"
                      onClick={(e) => e.stopPropagation()}
                      className="rounded border border-cyan-400 px-4 py-2 text-cyan-300 hover:bg-cyan-500/20 transition-colors"
                    >
                      Live Demo
                    </a>
                  )}
                  {p.githubLink && (
                    <a
                      href={p.githubLink}
                      target="_blank"
                      onClick={(e) => e.stopPropagation()}
                      className="rounded border border-gray-600 px-4 py-2 text-gray-300 hover:bg-gray-800 transition-colors"
                    >
                      Code
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}