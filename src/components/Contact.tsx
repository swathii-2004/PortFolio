
// Contact.tsx - Complete Contact Component File
"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const BACKGROUND_URL =
  "https://img.freepik.com/premium-photo/high-quality-desktop-wallpaper_941097-71826.jpg?semt=ais_hybrid&w=1600&q=80";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("✅ Message sent successfully!");
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        setSuccess(data.error || "❌ Something went wrong.");
      }
    } catch {
      setSuccess("❌ Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-16 px-6 md:px-12 overflow-hidden min-h-screen"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${BACKGROUND_URL}')`,
        }}
      />

      <h2 className="text-4xl font-bold text-center text-cyan-400 mb-10 drop-shadow-lg">
        Contact Me
      </h2>

      <motion.form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto rounded-2xl border border-gray-700 bg-black/50 backdrop-blur-md shadow-lg p-8 space-y-5"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name *"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-md bg-black/50 border border-gray-700 text-white placeholder:text-gray-400 focus:border-cyan-400 outline-none transition-colors"
        />
        
        <input
          type="email"
          name="email"
          placeholder="Your Email *"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-md bg-black/50 border border-gray-700 text-white placeholder:text-gray-400 focus:border-cyan-400 outline-none transition-colors"
        />
        
        <input
          type="tel"
          name="phone"
          placeholder="Your Phone (optional)"
          value={form.phone}
          onChange={handleChange}
          className="w-full p-3 rounded-md bg-black/50 border border-gray-700 text-white placeholder:text-gray-400 focus:border-cyan-400 outline-none transition-colors"
        />
        
        <textarea
          name="message"
          placeholder="Your Message *"
          value={form.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full p-3 rounded-md bg-black/50 border border-gray-700 text-white placeholder:text-gray-400 focus:border-cyan-400 outline-none resize-none transition-colors"
        ></textarea>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-cyan-500 text-black font-semibold rounded-md hover:bg-cyan-400 transition-colors disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>

        {success && (
          <p className="text-center text-sm text-cyan-300">{success}</p>
        )}
      </motion.form>
    </section>
  );
}