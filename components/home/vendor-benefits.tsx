"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Package,
  MapPin,
  TrendingUp,
  Shield,
  Zap,
  DollarSign,
  BarChart3,
  Clock,
} from "lucide-react";

export default function VendorBenefits() {
  const benefits = [
    {
      icon: Package,
      title: "Multi-Outlet Management",
      description:
        "Manage all your laundry outlets from one centralized dashboard with real-time sync",
      size: "large",
      gradient: "from-blue-500 via-cyan-500 to-teal-500",
      delay: 0,
    },
    {
      icon: MapPin,
      title: "Smart Order Assignment",
      description: "Orders automatically assigned to nearest outlet",
      size: "small",
      gradient: "from-purple-500 to-pink-500",
      delay: 0.1,
    },
    {
      icon: TrendingUp,
      title: "Growth Analytics",
      description: "Real-time insights to track business growth",
      size: "small",
      gradient: "from-green-500 to-emerald-500",
      delay: 0.2,
    },
    {
      icon: Shield,
      title: "Verification System",
      description:
        "Built-in rider and vendor verification for quality assurance and trust building",
      size: "medium",
      gradient: "from-orange-500 to-amber-500",
      delay: 0.3,
    },
    {
      icon: BarChart3,
      title: "Revenue Dashboard",
      description: "Track earnings, payouts, and financial metrics",
      size: "medium",
      gradient: "from-indigo-500 to-purple-500",
      delay: 0.4,
    },
    {
      icon: Zap,
      title: "Express Delivery",
      description: "Offer Standard & Express delivery options",
      size: "small",
      gradient: "from-yellow-500 to-orange-500",
      delay: 0.5,
    },
    {
      icon: DollarSign,
      title: "Transparent Pricing",
      description: "Clear pricing with automatic GST support",
      size: "small",
      gradient: "from-teal-500 to-cyan-500",
      delay: 0.6,
    },
    {
      icon: Clock,
      title: "24/7 Operations",
      description:
        "Round-the-clock order management and customer support to keep your business running",
      size: "large",
      gradient: "from-rose-500 via-pink-500 to-purple-500",
      delay: 0.7,
    },
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const getGridClass = (size: string, index: number) => {
    switch (size) {
      case "large":
        return index === 0 ? "md:col-span-2 md:row-span-2" : "md:col-span-4";
      case "medium":
        return "md:col-span-1 md:row-span-2";
      default:
        return "md:col-span-1";
    }
  };

  return (
    <section
      id="features"
      className="py-12 md:py-20 bg-background relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-40 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]" />
      </div>

      <div
        ref={containerRef}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
            }
            transition={{ delay: 0.2 }}
          >
            Why Choose Us
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-foreground mb-4">
            Everything You Need to{" "}
            <span className="gradient-text">Succeed</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to help you manage and grow your laundry
            business effortlessly
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px]">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <motion.div
                key={index}
                className={`group relative ${getGridClass(benefit.size, index)}`}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 40, scale: 0.95 }
                }
                transition={{
                  duration: 0.5,
                  delay: benefit.delay,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="h-full bg-card rounded-2xl p-6 md:p-8 border border-border hover:border-primary/30 transition-all duration-500 relative group-hover:shadow-xl group-hover:shadow-primary/5">
                  {/* Gradient overlay on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />

                  {/* Animated border gradient */}
                  <div
                    className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  >
                    <div
                      className={`absolute inset-[1px] rounded-2xl bg-card`}
                    />
                    <div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${benefit.gradient} opacity-20`}
                    />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col">
                    {/* Icon */}
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${benefit.gradient} mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className="w-6 h-10 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold font-heading text-foreground mb-2 group-hover:text-primary transition-colors">
                      {benefit.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed flex-1">
                      {benefit.description}
                    </p>

                    {/* Decorative element */}
                    <motion.div
                      className={`absolute bottom-4 right-4 w-24 h-24 bg-gradient-to-br ${benefit.gradient} rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl`}
                    />
                  </div>

                  {/* Corner accent */}
                  <div
                    className={`absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br ${benefit.gradient} opacity-[0.08] rounded-full group-hover:scale-150 transition-transform duration-700`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
