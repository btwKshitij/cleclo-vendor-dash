"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how" },
    { label: "Pricing", href: "#pricing" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "py-2" : "py-4"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className={`flex justify-between items-center rounded-2xl px-6 transition-all duration-500 ${
              scrolled
                ? "bg-white/80 backdrop-blur-xl shadow-lg shadow-black/5 border border-white/50 py-3"
                : "bg-transparent py-2"
            }`}
            layout
          >
            {/* Logo */}
            <Link href="/" className="shrink-0">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Image
                  src="/logo.svg"
                  alt="Cleclo Logo"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                  priority
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    scrolled
                      ? "text-foreground hover:text-primary"
                      : "text-white/90 hover:text-white"
                  }`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {link.label}
                  <motion.span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${
                      scrolled ? "bg-primary" : "bg-white"
                    }`}
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                  />
                </motion.a>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Button
                asChild
                variant="ghost"
                className={`transition-colors ${
                  scrolled
                    ? "text-foreground hover:text-primary hover:bg-primary/10"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                <Link href="/login">Login</Link>
              </Button>
              <Button
                asChild
                className={`transition-all duration-300 ${
                  scrolled
                    ? "bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
                    : "bg-white text-[#0A1628] hover:bg-white/90"
                }`}
              >
                <Link href="/signup">Become a Cleclo Partner Vendor</Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                scrolled
                  ? "text-foreground hover:bg-muted"
                  : "text-white hover:bg-white/10"
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </div>
      </motion.header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Menu panel */}
            <motion.nav
              className="absolute top-20 left-4 right-4 bg-white rounded-2xl shadow-2xl p-6 overflow-hidden"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    className="px-4 py-3 rounded-xl text-foreground hover:text-primary hover:bg-primary/5 font-medium transition-colors"
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>

              <div className="border-t border-border mt-4 pt-4 flex flex-col gap-3">
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-center border-primary text-primary hover:bg-primary/10"
                  onClick={() => setIsOpen(false)}
                >
                  <Link href="/login">Login</Link>
                </Button>
                <Button
                  asChild
                  className="w-full justify-center bg-primary hover:bg-primary/90"
                  onClick={() => setIsOpen(false)}
                >
                  <Link href="/signup">Become a Vendor</Link>
                </Button>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
