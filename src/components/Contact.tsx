// Contact.tsx - Modern Dark & White Redesign
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

export default function Contact() {
  const { isDark } = useTheme();
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
      className={`relative py-32 px-6 md:px-12 overflow-hidden min-h-screen flex items-center justify-center transition-colors duration-300 ${
        isDark ? "bg-black" : "bg-gradient-to-b from-white via-blue-50 to-indigo-50"
      }`}
    >
      {/* Subtle animated background - Dark */}
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

      {/* Floating particles effect - Dark Only */}
      {isDark && (
        <>
          <motion.div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-white rounded-full blur-3xl opacity-5 -z-10"
            animate={{
              y: [0, 150, 0],
              x: [0, 80, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 bg-white rounded-full blur-3xl opacity-5 -z-10"
            animate={{
              y: [0, -150, 0],
              x: [0, -80, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </>
      )}

      <div className="w-full max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className={`font-mono text-sm tracking-widest uppercase mb-4 letter-spacing ${isDark ? "text-gray-400" : "text-blue-600"}`}>
            <span className={isDark ? "text-gray-400" : "text-blue-600"}>{'>'} </span>Get In Touch
          </p>
          <h2 className={`text-6xl md:text-7xl font-black mb-6 leading-tight ${isDark ? "text-white" : "text-gray-900"}`}>
            Let's Create Something <br /> Amazing Together
          </h2>
          <p className={`text-lg max-w-3xl mx-auto ${isDark ? "text-gray-400" : "text-gray-700"}`}>
            Have an idea? Let's discuss it. I'm always excited to collaborate on innovative projects.
          </p>
        </motion.div>

        {/* Main Contact Container */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Form - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name Input */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <label className={`block text-sm font-semibold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className={`w-full px-5 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none ${isDark ? "bg-gray-900/50 border-white/10 text-white placeholder:text-gray-500 focus:border-white/50 hover:border-white/20" : "bg-white/50 border-blue-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 hover:border-blue-400"}`}
                  />
                </motion.div>

                {/* Email Input */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <label className={`block text-sm font-semibold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className={`w-full px-5 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none ${isDark ? "bg-gray-900/50 border-white/10 text-white placeholder:text-gray-500 focus:border-white/50 hover:border-white/20" : "bg-white/50 border-blue-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 hover:border-blue-400"}`}
                  />
                </motion.div>
              </div>

              {/* Phone Input */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label className={`block text-sm font-semibold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                  Phone (Optional)
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+1 (555) 123-4567"
                  value={form.phone}
                  onChange={handleChange}
                  className={`w-full px-5 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none ${isDark ? "bg-gray-900/50 border-white/10 text-white placeholder:text-gray-500 focus:border-white/50 hover:border-white/20" : "bg-white/50 border-blue-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 hover:border-blue-400"}`}
                />
              </motion.div>

              {/* Message Textarea */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <label className={`block text-sm font-semibold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>
                  Your Message
                </label>
                <textarea
                  name="message"
                  placeholder="Tell me about your project, ideas, or just say hi..."
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className={`w-full px-5 py-3 rounded-lg border-2 resize-none transition-all duration-300 focus:outline-none ${isDark ? "bg-gray-900/50 border-white/10 text-white placeholder:text-gray-500 focus:border-white/50 hover:border-white/20" : "bg-white/50 border-blue-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 hover:border-blue-400"}`}
                ></textarea>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02, boxShadow: isDark ? "0 0 40px rgba(255,255,255,0.3)" : "0 0 40px rgba(37,99,235,0.3)" }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={`w-full py-4 px-6 rounded-lg font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-xl ${isDark ? "bg-white text-black hover:bg-gray-100" : "bg-blue-600 text-white hover:bg-blue-700"}`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.div
                      className={`w-5 h-5 border-2 border-transparent rounded-full ${isDark ? "border-t-black" : "border-t-white"}`}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                    Sending...
                  </span>
                ) : (
                  "Send Message"
                )}
              </motion.button>

              {/* Success Message */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: success ? 1 : 0,
                  y: success ? 0 : 10
                }}
                transition={{ duration: 0.3 }}
              >
                {success && (
                  <div className={`p-4 rounded-lg text-center font-semibold transition-colors ${
                    success.includes('✅')
                      ? isDark ? 'bg-green-500/20 text-green-300 border border-green-400/30' : 'bg-green-100 text-green-700 border border-green-300'
                      : isDark ? 'bg-red-500/20 text-red-300 border border-red-400/30' : 'bg-red-100 text-red-700 border border-red-300'
                  }`}>
                    {success}
                  </div>
                )}
              </motion.div>
            </form>
          </motion.div>

          {/* Contact Info Cards - Right Side */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Skills Overview */}
            <motion.div
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className={`absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 ${isDark ? "bg-white/5" : "bg-blue-400/10"}`} />
              <div className={`relative rounded-2xl border-2 backdrop-blur-md p-8 transition-all duration-300 ${isDark ? "border-white/10 bg-gradient-to-br from-gray-900/80 to-black group-hover:border-white/30" : "border-blue-300/50 bg-gradient-to-br from-blue-100/40 to-indigo-50/40 group-hover:border-blue-400"}`}>
                <h3 className={`text-lg font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>Let's Connect</h3>
                <p className={`text-sm mb-4 ${isDark ? "text-gray-400" : "text-gray-700"}`}>Feel free to reach out. I'm always open to new opportunities and interesting conversations.</p>
                <div className="flex gap-3">
                  <motion.a
                    href="mailto:poojaryswathi0209@gmail.com"
                    whileHover={{ scale: 1.05 }}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm ${isDark ? "bg-white text-black hover:bg-gray-200" : "bg-blue-600 text-white hover:bg-blue-700"}`}
                  >
                    Email Me
                  </motion.a>
                  <motion.a
                    href="linkedin.com/in/swathi-poojary-90891b3a1"
                    target="_blank"
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 border border-white/30 text-white rounded-lg font-semibold hover:border-white/70 transition-all text-sm"
                  >
                    LinkedIn
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );

}
