"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { assetUrl } from "@/lib/asset";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

type Project = {
  _id: string;
  title: string;
  description?: string;
  imageURL?: string;
  images?: string[];
  githubLink?: string;
  liveLink?: string;
  techStack: string[];
  category?: string;
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { isDark } = useTheme();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    async function fetchProject() {
      try {
        const res = await fetch(`/api/projects/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setProject(data);
        } else {
          setProject(null);
        }
      } catch (err) {
        console.error("Error fetching project:", err);
        setProject(null);
      } finally {
        setLoading(false);
      }
    }
    if (params.id) fetchProject();
  }, [params.id]);

  if (loading) {
    return (
      <div className={`min-h-screen ${isDark ? "bg-black" : "bg-white"} flex items-center justify-center`}>
        <div className={`${isDark ? "text-cyan-400" : "text-blue-600"} text-xl`}>Loading...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className={`min-h-screen ${isDark ? "bg-black" : "bg-white"} flex items-center justify-center`}>
        <div className="text-center">
          <h1 className={`text-2xl ${isDark ? "text-gray-400" : "text-gray-600"} mb-4`}>Project not found</h1>
          <Link href="/#projects" className={`${isDark ? "text-cyan-400 hover:text-cyan-300" : "text-blue-600 hover:text-blue-700"} underline`}>
            ← Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const allImages = project.images && project.images.length > 0 
    ? project.images 
    : project.imageURL 
    ? [project.imageURL] 
    : [];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? "bg-black text-gray-100" : "bg-white text-gray-900"}`}>
      {/* Header with Back Button */}
      <div className={`${isDark ? "bg-gray-950 border-gray-800" : "bg-gray-50 border-gray-200"} border-b sticky top-0 z-10`}>
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link 
            href="/#projects" 
            className={`inline-flex items-center transition-colors ${isDark ? "text-cyan-400 hover:text-cyan-300" : "text-blue-600 hover:text-blue-700"}`}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Portfolio
          </Link>
          <div className="flex gap-3">
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 font-medium px-4 py-2 rounded-lg transition-colors ${
                  isDark 
                    ? "bg-cyan-500 hover:bg-cyan-400 text-black" 
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Live Demo
              </a>
            )}
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors border ${
                  isDark
                    ? "border-gray-700 hover:border-cyan-500 text-gray-300 hover:text-cyan-400"
                    : "border-gray-400 hover:border-blue-600 text-gray-700 hover:text-blue-600"
                }`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                View Code
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Project Header */}
        <div className="mb-8">
          <h1 className={`text-4xl md:text-5xl font-bold ${isDark ? "text-white" : "text-gray-900"} mb-4`}>
            {project.title}
          </h1>
          {project.category && (
            <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium ${
              isDark ? "bg-cyan-500/20 text-cyan-400" : "bg-blue-200 text-blue-700"
            }`}>
              {project.category}
            </span>
          )}
        </div>

        {/* Image Gallery */}
        {allImages.length > 0 && (
          <div className="mb-12">
            <div className={`relative aspect-video rounded-2xl overflow-hidden border mb-4 ${
              isDark ? "bg-gray-950 border-gray-800" : "bg-gray-100 border-gray-300"
            }`}>
              <img
                src={assetUrl(allImages[currentImageIndex])}
                alt={`${project.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-contain"
              />
              
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className={`absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all hover:scale-110 ${
                      isDark ? "bg-black/70 hover:bg-black/90 text-white" : "bg-white/70 hover:bg-white/90 text-gray-900"
                    }`}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextImage}
                    className={`absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all hover:scale-110 ${
                      isDark ? "bg-black/70 hover:bg-black/90 text-white" : "bg-white/70 hover:bg-white/90 text-gray-900"
                    }`}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-sm font-medium ${
                    isDark ? "bg-black/70 text-white" : "bg-white/70 text-gray-900"
                  }`}>
                    {currentImageIndex + 1} / {allImages.length}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {allImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`flex-shrink-0 w-28 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      idx === currentImageIndex
                        ? isDark 
                          ? "border-cyan-400 scale-105 shadow-lg shadow-cyan-500/50"
                          : "border-blue-500 scale-105 shadow-lg shadow-blue-400/50"
                        : isDark
                          ? "border-gray-700 opacity-60 hover:opacity-100 hover:border-gray-500"
                          : "border-gray-400 opacity-60 hover:opacity-100 hover:border-gray-300"
                    }`}
                  >
                    <img 
                      src={assetUrl(img)} 
                      alt={`Thumbnail ${idx + 1}`} 
                      className="w-full h-full object-cover" 
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Project Info Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Description */}
          <div className={`rounded-xl p-6 border ${
            isDark ? "bg-gray-950 border-gray-800" : "bg-gray-100 border-gray-300"
          }`}>
            <h2 className={`text-xl font-semibold mb-4 flex items-center gap-2 ${
              isDark ? "text-cyan-400" : "text-blue-600"
            }`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              About This Project
            </h2>
            <p className={`leading-relaxed ${isDark ? "text-gray-300" : "text-gray-700"}`}>
              {project.description || "No description provided."}
            </p>
          </div>

          {/* Tech Stack */}
          <div className={`rounded-xl p-6 border ${
            isDark ? "bg-gray-950 border-gray-800" : "bg-gray-100 border-gray-300"
          }`}>
            <h2 className={`text-xl font-semibold mb-4 flex items-center gap-2 ${
              isDark ? "text-cyan-400" : "text-blue-600"
            }`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              Technologies Used
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack && project.techStack.length > 0 ? (
                project.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className={`px-4 py-2 rounded-lg text-sm border transition-colors ${
                      isDark 
                        ? "bg-gray-900 text-gray-200 border-gray-700 hover:border-cyan-500"
                        : "bg-white text-gray-700 border-gray-400 hover:border-blue-500"
                    }`}
                  >
                    {tech}
                  </span>
                ))
              ) : (
                <p className="text-gray-400">No technologies specified</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}