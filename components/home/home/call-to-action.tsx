"use client";

import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Sparkles, Rocket, Phone } from "lucide-react";
import Link from "next/link";

export default function CallToAction() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628] via-[#1a2744] to-[#0f1d32]">
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/30 rounded-full blur-[150px]"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/30 rounded-full blur-[130px]"
          animate={{
            x: [0, -40, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Floating shapes */}
      <motion.div
        className="absolute top-20 left-10 w-4 h-4 bg-primary rounded-full"
        animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-40 right-20 w-6 h-6 bg-secondary rounded-full"
        animate={{ y: [0, -30, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
      />
      <motion.div
        className="absolute bottom-40 left-1/4 w-3 h-3 bg-purple-400 rounded-full"
        animate={{ y: [0, -15, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
      />

      <div
        ref={containerRef}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <Sparkles className="w-4 h-4 text-secondary" />
          Limited Time: Zero Commission for First 3 Months
        </motion.div>

        {/* Headline */}
        <motion.h2
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Ready to{" "}
          <span className="relative inline-block">
            <span className="relative z-10 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              Scale
            </span>
          </span>{" "}
          Your Business Faster?
        </motion.h2>

        {/* Subheadline */}
        <motion.p
          className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Join Cleclo and start receiving orders through a structured, automated
          platform built to help laundry vendors scale without operational
          complexity.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Button
            asChild
            size="lg"
            className="relative overflow-hidden bg-white text-[#0A1628] hover:bg-white/90 px-8 py-7 text-lg font-bold shadow-xl shadow-white/20 group"
          >
            <Link href="/signup">
              <span className="relative z-10 flex items-center gap-2">
                <Rocket className="w-5 h-5" />
                Become a Cleclo Vendor
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
            </Link>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 bg-transparent px-8 py-7 text-lg backdrop-blur-sm group"
          >
            <Phone className="w-5 h-5 mr-2" />
            Talk to Sales
          </Button>
        </motion.div>

        {/* Trust elements */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-8 text-white/60 text-sm"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {[
            "No Credit Card Required",
            "Free Forever Plan",
            "Setup in Minutes",
            "Cancel Anytime",
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-secondary"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              {item}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
