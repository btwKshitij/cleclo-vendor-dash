"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  User,
  Truck,
  Store,
  CheckCircle,
  Camera,
  Package,
  Shield,
  ArrowRight,
} from "lucide-react";

export default function VerificationSystem() {
  const steps = [
    {
      icon: User,
      badge: Camera,
      title: "Customer Confirmation",
      description:
        "Order details and item condition are digitally recorded at initiation, creating a reference point for the entire service lifecycle.",
      gradient: "from-blue-500 to-cyan-500",
      lightGradient: "from-blue-50 to-cyan-50",
      dotColor: "bg-blue-500",
    },
    {
      icon: Truck,
      badge: Package,
      title: "Pickup Verification",
      description:
        "Items are verified at pickup to ensure consistency with recorded order details, establishing a secure handover.",
      gradient: "from-orange-400 to-amber-500",
      lightGradient: "from-orange-50 to-amber-50",
      dotColor: "bg-orange-500",
    },
    {
      icon: Store,
      badge: CheckCircle,
      title: "Vendor Intake Verification",
      description:
        "Items are validated at the processing stage to confirm condition, service scope and handling requirements before execution.",
      gradient: "from-green-500 to-emerald-500",
      lightGradient: "from-green-50 to-emerald-50",
      dotColor: "bg-green-500",
    },
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-50/50 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-green-100/40 rounded-full blur-3xl" />
      </div>

      <div
        ref={containerRef}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
            }
            transition={{ delay: 0.2 }}
          >
            <Shield className="w-4 h-4" />
            Trust & Safety
          </motion.div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3">
            3-Step{" "}
            <span className="gradient-text">Order Verification System</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            A built-in verification framework that ensures accountability,
            reduces disputes and maintains service quality across every order.
          </p>
        </motion.div>

        {/* Step cards with arrows */}
        <div className="relative">
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              const BadgeIcon = step.badge;

              return (
                <motion.div
                  key={index}
                  className="relative group h-full"
                  initial={{ opacity: 0, y: 40 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
                  }
                  transition={{
                    duration: 0.5,
                    delay: index * 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {/* Arrow connector (between cards) */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:flex absolute top-1/2 -right-5 z-20 -translate-y-1/2">
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={
                          isInView
                            ? { opacity: 1, x: 0 }
                            : { opacity: 0, x: -10 }
                        }
                        transition={{ delay: index * 0.15 + 0.4 }}
                      >
                        <ArrowRight className="w-4 h-4 text-slate-300" />
                      </motion.div>
                    </div>
                  )}

                  <motion.div
                    className="bg-white rounded-2xl p-6 border border-slate-100 hover:border-slate-200 transition-all duration-300 text-left relative overflow-hidden shadow-sm hover:shadow-lg h-full flex flex-col"
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ duration: 0.25 }}
                  >
                    {/* Step number watermark */}
                    <div className="absolute top-3 right-4 text-5xl font-bold text-slate-100 select-none">
                      {index + 1}
                    </div>

                    {/* Icon with badge */}
                    <div className="relative inline-flex mb-5 self-start">
                      <motion.div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg`}
                        whileHover={{ scale: 1.08, rotate: 3 }}
                        transition={{
                          duration: 0.3,
                          type: "spring",
                          stiffness: 300,
                        }}
                      >
                        <IconComponent className="w-7 h-7 text-white" />
                      </motion.div>

                      {/* Small badge icon */}
                      <motion.div
                        className="absolute -bottom-1 -right-1 w-7 h-7 rounded-lg bg-white shadow-md border border-slate-100 flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : { scale: 0 }}
                        transition={{
                          delay: index * 0.15 + 0.4,
                          type: "spring",
                          stiffness: 400,
                        }}
                      >
                        <BadgeIcon
                          className={`w-3.5 h-3.5 ${step.dotColor.replace("bg-", "text-")}`}
                        />
                      </motion.div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-slate-800 mb-2">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Trust message */}
        <motion.div
          className="mt-10 max-w-1xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.7 }}
        >
          <div className="bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5  rounded-xl p-5 border border-primary/10 text-center">
            <div className="flex items-center justify-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-primary" />
              </div>
              <p className="text-lg text-slate-600">
                Helps reduce order disputes by up to{" "}
                <strong className="text-slate-800">
                  90% through transparent and
                </strong>{" "}
                <strong className="text-slate-800">auditable workflows.</strong>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
