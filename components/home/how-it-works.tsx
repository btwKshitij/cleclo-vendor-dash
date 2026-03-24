"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  UserPlus,
  Store,
  Package,
  Banknote,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: UserPlus,
      title: "Register as a Vendor",
      description:
        "Sign up with your business details and submit basic verification information. Our onboarding team reviews and activates your account, typically within 24 hours.",
      gradient: "from-blue-500 to-cyan-500",
      color: "text-blue-500",
    },
    {
      number: "02",
      icon: Store,
      title: "Configure Outlets & Services",
      description:
        "Set up your outlets, choose the services you offer (Dry Clean, Washing, Ironing, etc), defined pricing and configure service areas all from a simple dashboard.",
      gradient: "from-purple-500 to-pink-500",
      color: "text-purple-500",
    },
    {
      number: "03",
      icon: Package,
      title: "Start Receiving Orders",
      description:
        "Once approved, your outlets go live and begin receiving orders automatically. Cleclo intelligently routes orders based on location, capacity and service availability.",
      gradient: "from-orange-500 to-amber-500",
      color: "text-orange-500",
    },
    {
      number: "04",
      icon: Banknote,
      title: "Seamless Payouts & Settlements",
      description:
        "Track your earnings in real time and receive payouts directly to your bank account. Settlements are processed on a regular cycle with complete transparency.",
      gradient: "from-green-500 to-emerald-500",
      color: "text-green-500",
    },
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);
  // Show between Step 2 (~0.36) and Step 3 (~0.63)
  const badgeOpacity = useTransform(
    scrollYProgress,
    [0.35, 0.45, 0.55, 0.65],
    [0, 1, 1, 0],
  );
  const badgeScale = useTransform(
    scrollYProgress,
    [0.35, 0.45, 0.55, 0.65],
    [0.8, 1, 1, 0.8],
  );

  return (
    <section
      id="how"
      className="py-12 md:py-20 bg-card relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-secondary/5 rounded-full blur-[120px]" />
      </div>

      <div
        ref={containerRef}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
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
            Getting Started
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A streamlined process to onboard, operate and scale on Cleclo.
          </p>
        </motion.div>

        {/* Timeline container */}
        <div className="relative">
          {/* Vertical timeline line - Desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-border -translate-x-1/2">
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary via-secondary to-primary"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Dynamic Badge - Between Step 2 and 3 */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
            <motion.div
              style={{ opacity: badgeOpacity, scale: badgeScale }}
              className="bg-background/80 backdrop-blur-md border border-primary/20 shadow-2xl shadow-primary/10 px-6 py-3 rounded-2xl flex items-center gap-4 whitespace-nowrap"
            >
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="text-sm">
                <p className="font-bold text-foreground">Cleclo Intelligence</p>
                <p className="text-muted-foreground">
                  Handles order routing & notifications automatically.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Steps */}
          <div className="space-y-12 md:space-y-0">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  className={`relative flex flex-col md:flex-row items-center ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  animate={
                    isInView
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0, x: isEven ? -50 : 50 }
                  }
                  transition={{
                    duration: 0.6,
                    delay: index * 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {/* Content card */}
                  <div
                    className={`w-full md:w-5/12 ${isEven ? "md:pr-12" : "md:pl-12"} text-left`}
                  >
                    <motion.div
                      className="bg-background rounded-2xl p-8 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 group"
                      whileHover={{ y: -5 }}
                    >
                      {/* Mobile Header: Step Number & Icon */}
                      <div className="md:hidden flex items-center justify-between mb-6">
                        <div className={`flex items-center gap-2 ${step.color}`}>
                          <span className="text-xs font-bold uppercase tracking-wider">
                            Step
                          </span>
                          <span className="text-3xl font-bold leading-none">
                            {step.number}
                          </span>
                        </div>
                        <div
                          className={`flex items-center justify-center w-14 h-14 rounded-xl bg-linear-to-br ${step.gradient} shadow-lg group-hover:scale-110 transition-transform`}
                        >
                          <IconComponent className="w-7 h-7 text-white" />
                        </div>
                      </div>

                      {/* Desktop Icon (hidden on mobile) */}
                      <div
                        className={`hidden md:inline-flex items-center justify-center w-14 h-14 rounded-xl bg-linear-to-br ${step.gradient} mb-4 shadow-lg group-hover:scale-110 transition-transform`}
                      >
                        <IconComponent className="w-7 h-7 text-white" />
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Center circle with number */}
                  <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <motion.div
                      className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg`}
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : { scale: 0 }}
                      transition={{
                        delay: index * 0.15 + 0.3,
                        type: "spring",
                        bounce: 0.5,
                      }}
                    >
                      <span className="text-xl font-bold text-white">
                        {step.number}
                      </span>
                    </motion.div>
                  </div>

                  {/* Empty space for the other side */}
                  <div className="hidden md:block w-5/12" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-muted-foreground mb-4 text-lg">
            Ready to grow your laundry business?
          </p>
          <motion.a
            href="/signup"
            className="inline-flex items-center gap-2 text-lg text-primary font-semibold hover:gap-4 transition-all"
            whileHover={{ scale: 1.05 }}
          >
            Become a Vendor
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
