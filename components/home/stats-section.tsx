"use client";

import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Users, IndianRupee, ThumbsUp, MapPin } from "lucide-react";

// Animated counter component
function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
}: {
  value: number;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Easing function for smooth animation
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplayValue(Math.floor(eased * value));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const stats = [
    {
      icon: IndianRupee,
      value: 5,
      suffix: "Cr+",
      prefix: "₹",
      label: "Revenue Processed",
      description: "Monthly Transactions",
      gradient: "from-green-500 to-emerald-400",
    },
    {
      icon: Users,
      value: 1000,
      suffix: "+",
      label: "Active Vendors",
      description: "Transacting Partners",
      gradient: "from-blue-500 to-cyan-400",
    },
    {
      icon: ThumbsUp,
      value: 98,
      suffix: "%",
      label: "Partner Satisfaction Score",
      description: "Happy Vendors",
      gradient: "from-purple-500 to-pink-400",
    },
    // {
    //   icon: MapPin,
    //   value: 20,
    //   suffix: "+",
    //   label: "Cities Covered",
    //   description: "Pan-India presence",
    //   gradient: "from-orange-500 to-amber-400",
    // },
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  return (
    <section className="relative py-16 md:py-20 bg-gradient-to-b from-[#0f1d32] to-background overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div
        ref={containerRef}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.9 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  },
                }}
                className="relative group"
              >
                <div className="relative bg-white/10 rounded-xl p-4 md:p-5 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/15 overflow-hidden">
                  {/* Gradient glow on hover */}
                  <div
                    className={`absolute inset-0 bg-linear-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl`}
                  />

                  {/* Icon */}
                  <div
                    className={`inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br ${stat.gradient} mb-3 shadow-lg`}
                  >
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>

                  {/* Value */}
                  <div className="text-2xl md:text-3xl font-bold text-white mb-0.5">
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      prefix={stat.prefix || ""}
                    />
                  </div>

                  {/* Label */}
                  <div className="text-sm md:text-base font-medium text-white/80 mb-0.5">
                    {stat.label}
                  </div>

                  {/* Description */}
                  <div className="text-xs text-white/50">
                    {stat.description}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom trust badges */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-6 md:gap-12 mt-12 pt-8 border-t border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {[
            "Secured Payments",
            "GSTIN Verified",
            "ISO Certified",
            "24/7 Vendor Support",
          ].map((badge, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-white/60 text-sm"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
              {badge}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
