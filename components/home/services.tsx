"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Shirt, Droplets, Wind, Sparkles, Clock, Check } from "lucide-react";

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const services = [
    {
      icon: Shirt,
      title: "Dry Clean",
      description:
        "Enable professional dry-cleaning workflows for delicate garments, formal wear and specialty fabrics.",
      features: [
        "Configurable stain treatment workflows.",
        "Fabric specific handling options.",
        "Premium finishing standards.",
      ],
      gradient: "from-violet-500 to-purple-600",
      lightGradient: "from-violet-100 to-purple-100",
      accentColor: "text-violet-500",
      dotColor: "bg-violet-500",
    },
    {
      icon: Droplets,
      title: "Washing",
      description:
        "Enable standardized washing workflows for everyday garments with configurable processes across fabric types.",
      features: [
        "Fabric-wise and color-based wash segregation.",
        "Detergent, water level and cycle configuration.",
        "Quality checks and freshness controls.",
      ],
      gradient: "from-cyan-500 to-blue-500",
      lightGradient: "from-cyan-100 to-blue-100",
      accentColor: "text-cyan-500",
      dotColor: "bg-cyan-500",
    },
    {
      icon: Wind,
      title: "Steam Iron",
      description:
        "Provide professional pressing and finishing services with controlled turnaround times.",
      features: [
        "Consistent finishing quality.",
        "Fabric-safe temperature controls.",
        "Priority processing options.",
      ],
      gradient: "from-orange-400 to-amber-500",
      lightGradient: "from-orange-100 to-amber-100",
      accentColor: "text-orange-500",
      dotColor: "bg-orange-500",
    },
    {
      icon: Sparkles,
      title: "Premium Care",
      description:
        "Enable premium-care workflows for luxury garments, designer wear and high-value items.",
      features: [
        "Specialized handling protocols.",
        "Optional value-protection coverage.",
        "Controlled handover and packaging.",
      ],
      gradient: "from-rose-400 to-pink-500",
      lightGradient: "from-rose-100 to-pink-100",
      accentColor: "text-rose-500",
      dotColor: "bg-rose-500",
    },
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50/50 to-white relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div
        ref={containerRef}
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
            }
            transition={{ delay: 0.2 }}
          >
            Our Services
          </motion.span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3">
            Services You Can <span className="gradient-text">Offer</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Cleclo enables vendors to configure, manage and deliver multiple
            service categories through a single integrated platform.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                key={index}
                className="group"
                initial={{ opacity: 0, y: 40 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
                }
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <motion.div
                  className="h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-slate-200"
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* Icon section with soft gradient background */}
                  <div
                    className={`relative h-32 flex items-center justify-center bg-gradient-to-br ${service.lightGradient} overflow-hidden`}
                  >
                    {/* Floating accent shapes */}
                    <motion.div
                      className={`absolute top-3 right-3 w-16 h-16 rounded-full bg-gradient-to-br ${service.gradient} opacity-10 blur-xl`}
                      animate={
                        isHovered
                          ? { scale: 1.5, opacity: 0.2 }
                          : { scale: 1, opacity: 0.1 }
                      }
                      transition={{ duration: 0.4 }}
                    />
                    <motion.div
                      className={`absolute bottom-3 left-3 w-12 h-12 rounded-full bg-gradient-to-br ${service.gradient} opacity-10 blur-lg`}
                      animate={
                        isHovered
                          ? { scale: 1.3, opacity: 0.15 }
                          : { scale: 1, opacity: 0.1 }
                      }
                      transition={{ duration: 0.4, delay: 0.1 }}
                    />

                    {/* Icon container */}
                    <motion.div
                      className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg`}
                      animate={
                        isHovered
                          ? { scale: 1.1, rotate: 3, y: -2 }
                          : { scale: 1, rotate: 0, y: 0 }
                      }
                      transition={{
                        duration: 0.3,
                        type: "spring",
                        stiffness: 300,
                      }}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </motion.div>
                  </div>

                  {/* Text content */}
                  <div className="p-5">
                    <h3
                      className={`text-lg font-bold text-slate-800 mb-1.5 group-hover:${service.accentColor} transition-colors`}
                    >
                      {service.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-4">
                      {service.description}
                    </p>

                    {/* Features with colored dots */}
                    <div className="space-y-2">
                      {service.features.map((feature, i) => (
                        <motion.div
                          key={i}
                          className="flex items-center gap-2.5"
                          initial={{ opacity: 0.6 }}
                          animate={
                            isHovered
                              ? { opacity: 1, x: 2 }
                              : { opacity: 0.6, x: 0 }
                          }
                          transition={{ delay: i * 0.03, duration: 0.2 }}
                        >
                          <div
                            className={`w-1.5 h-1.5 rounded-full ${service.dotColor}`}
                          />
                          <span className="text-xs text-slate-600">
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom info badge */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-lg text-muted-foreground">
              Priority turnaround options can be configured across all service
              categories.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
