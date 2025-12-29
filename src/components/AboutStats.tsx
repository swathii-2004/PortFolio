"use client";

import { motion } from "framer-motion";

type Stat = { label: string; value: number | string };

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
    },
  },
};

export default function AboutStats({ stats }: { stats: Stat[] }) {
  return (
    <motion.section
      className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
      aria-label="About statistics"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          variants={itemVariants}
          whileHover={{ 
            y: -8,
            boxShadow: "0 0 30px rgba(255,255,255,0.3)"
          }}
          className="group relative"
        >
          {/* Glowing background effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-gray-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
          />
          
          {/* Main card */}
          <div className="relative rounded-2xl border border-white/20 bg-gradient-to-br from-gray-900/60 to-gray-900/30 backdrop-blur-xl p-6 md:p-8 text-center h-full flex flex-col justify-center overflow-hidden group-hover:border-white/40 transition-colors duration-300">
            {/* Animated background shine */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-gray-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Content */}
            <div className="relative z-10">
              {/* Stat Value */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="text-4xl md:text-5xl font-bold text-white mb-2"
              >
                {s.value}
              </motion.div>
              
              {/* Stat Label */}
              <motion.p
                className="text-gray-300 text-sm md:text-base font-medium"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                {s.label}
              </motion.p>
            </div>

            {/* Decorative border elements */}
            <motion.div
              className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/30 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            <motion.div
              className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/30 rounded-br-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        </motion.div>
      ))}
    </motion.section>
  );
}
