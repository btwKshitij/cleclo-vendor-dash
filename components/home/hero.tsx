"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Play,
  TrendingUp,
  Package,
  Truck,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

// Floating bubble component
const FloatingBubble = ({
  delay,
  size,
  left,
  duration,
}: {
  delay: number;
  size: number;
  left: string;
  duration: number;
}) => (
  <motion.div
    className="absolute rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-sm"
    style={{
      width: size,
      height: size,
      left: left,
      bottom: "-10%",
    }}
    animate={{
      y: [0, -800],
      opacity: [0, 0.6, 0],
      scale: [0.5, 1, 0.8],
    }}
    transition={{
      duration: duration,
      delay: delay,
      repeat: Infinity,
      ease: "easeOut",
    }}
  />
);

// Dashboard mockup component
const DashboardMockup = () => (
  <motion.div
    className="relative"
    initial={{ opacity: 0, y: 50, rotateX: 15 }}
    animate={{ opacity: 1, y: 0, rotateX: 0 }}
    transition={{ duration: 0.8, delay: 0.5 }}
  >
    {/* Glow effect behind dashboard */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/20 to-transparent rounded-3xl blur-3xl scale-110" />

    {/* Main dashboard card */}
    <motion.div
      className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Dashboard header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 h-6 bg-white/10 rounded-full" />
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          {
            icon: TrendingUp,
            value: "₹2.5L",
            label: "Monthly Revenue",
            color: "from-green-400 to-emerald-500",
          },
          {
            icon: Package,
            value: "156",
            label: "Today’s Orders",
            color: "from-blue-400 to-cyan-500",
          },
          {
            icon: Truck,
            value: "12",
            label: "Active Deliveries",
            color: "from-purple-400 to-pink-500",
          },
        ].map((stat, i) => (
          <motion.div
            key={i}
            className="bg-white/5 rounded-xl p-4 text-center border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + i * 0.1 }}
          >
            <div
              className={`w-8 h-8 mx-auto mb-2 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}
            >
              <stat.icon className="w-4 h-4 text-white" />
            </div>
            <div className="text-lg font-bold text-white">{stat.value}</div>
            <div className="text-xs text-white/60">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Order list preview */}
      <div className="space-y-3">
        {[
          { id: "#1234", status: "Pickup", time: "2 min" },
          { id: "#1235", status: "Processing", time: "30 min" },
        ].map((order, i) => (
          <motion.div
            key={i}
            className="flex items-center justify-between bg-white/5 rounded-lg p-3 border border-white/10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 + i * 0.1 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="text-white/80 text-sm font-medium">
                {order.id}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-white/60 bg-white/10 px-2 py-1 rounded">
                {order.status}
              </span>
              <span className="text-xs text-white/40">{order.time}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>

    {/* Who It's For Section */}
    <div className="mt-8">
      <h3 className="text-white/90 font-semibold mb-4 pl-1">Who It's For</h3>
      <div className="grid grid-cols-2 gap-3">
        {[
          "Independent Laundry Owners",
          "Multi Outlet Operators",
          "Backend Vendor Partners",
          "Franchise Owners",
        ].map((item, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.8 + i * 0.1 }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(var(--secondary),0.8)] shrink-0" />
            <span className="text-xs sm:text-sm font-medium text-white/90">
              {item}
            </span>
          </motion.div>
        ))}
      </div>
    </div>

    {/* Floating notification card */}
    <motion.div
      className="absolute -top-4 -right-4 bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 shadow-xl"
      initial={{ opacity: 0, scale: 0.8, x: 20 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ delay: 1.5, duration: 0.5 }}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center">
          <CheckCircle className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="text-sm font-semibold text-white">New Order!</div>
          <div className="text-xs text-white/60">₹450 • 3 items</div>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-[#0A1628] via-[#1a2744] to-[#0f1d32]"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/20 rounded-full blur-[100px] animate-pulse" />

        {/* Floating bubbles */}
        <FloatingBubble delay={0} size={40} left="10%" duration={8} />
        <FloatingBubble delay={2} size={25} left="20%" duration={10} />
        <FloatingBubble delay={1} size={35} left="40%" duration={9} />
        <FloatingBubble delay={3} size={20} left="60%" duration={11} />
        <FloatingBubble delay={1.5} size={30} left="80%" duration={8} />
        <FloatingBubble delay={4} size={45} left="90%" duration={12} />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm text-white/90">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                #1 Laundry Vendor Platform
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-3xl md:text-5xl font-bold text-white leading-tight"
            >
              Transform Your Laundry Business Into a{" "}
              <span className="relative">
                <span className="gradient-text">Scalable Profit Machine</span>
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                />
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-white/70 leading-relaxed max-w-xl"
            >
              Automate orders, track operations in real time and manage
              deliveries and payments from one unified platform.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                asChild
                size="lg"
                className="relative overflow-hidden bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white border-0 px-8 py-6 text-lg font-semibold shadow-lg shadow-primary/30 group"
              >
                <Link href="/signup">
                  <span className="relative z-10 flex items-center gap-2">
                    <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    See How Cleclo Works
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 bg-transparent px-8 py-6 text-lg backdrop-blur-sm group"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>

            <div className="flex items-center">
              <p className="text-sm text-white/60">
                Powering leading laundry partners in Delhi NCR & Tier-1 cities
              </p>
            </div>

            {/* Trust indicators */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-8 pt-4"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary border-2 border-[#0A1628]"
                    />
                  ))}
                </div>
                <span className="text-sm text-white/60">5000+ Vendors</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-white/60">
                  4.9/5 Average Vendor Rating
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right content - Dashboard mockup */}
          <div className="hidden lg:block">
            <DashboardMockup />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <motion.div
            className="w-1 h-2 rounded-full bg-white/60"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
