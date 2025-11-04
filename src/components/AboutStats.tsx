"use client";

import { motion } from "framer-motion";

type Stat = { label: string; value: number | string };

export default function AboutStats({ stats }: { stats: Stat[] }) {
  return (
    <section
      className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
      aria-label="About statistics"
    >
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, delay: 0.06 * i }}
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 text-center"
        >
          <div className="text-3xl font-poppins text-accent">{s.value}</div>
          <div className="text-gray-300 text-sm mt-1 font-inter">{s.label}</div>
        </motion.div>
      ))}
    </section>
  );
}
