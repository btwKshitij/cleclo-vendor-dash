"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Send,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const footerLinks = {
    Product: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "How It Works", href: "#how" },
      { label: "Demo", href: "#demo" },
    ],
    Company: [
      { label: "About Us", href: "#about" },
      { label: "Careers", href: "#careers" },
      { label: "Blog", href: "#blog" },
      { label: "Press Kit", href: "#press" },
    ],
    Support: [
      { label: "Help Center", href: "#help" },
      { label: "Contact Us", href: "#contact" },
      { label: "Status", href: "#status" },
      { label: "API Docs", href: "#docs" },
    ],
    Legal: [
      { label: "Terms of Service", href: "#terms" },
      { label: "Privacy Policy", href: "#privacy" },
      { label: "Cookie Policy", href: "#cookies" },
      { label: "Refund Policy", href: "#refund" },
      { label: "Data Protection Policy", href: "#data-protection" },
      { label: "Vendor Agreement", href: "#vendor-agreement" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer
      className="relative bg-[#0A1628] text-white overflow-hidden"
      ref={containerRef}
    >
      {/* Background pattern */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[150px]" />
      </div>

      {/* Newsletter section */}
      <div className="relative border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            className="flex flex-col md:flex-row items-center justify-between gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                Insights for Growing Laundry Businesses with{" "}
                <span className="gradient-text">Cleclo.</span>
              </h3>
              <p className="text-white/60">
                Platform updates, industry insights and growth tips-delivered
                occasionally. No spam.
              </p>
            </div>

            <div className="flex flex-col gap-3 w-full md:w-auto">
              <form onSubmit={handleSubscribe} className="flex gap-3">
                <div className="relative flex-1 md:w-80">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all"
                  />
                </div>
                <motion.button
                  type="submit"
                  className="px-6 py-4 bg-gradient-to-r from-primary to-secondary rounded-xl font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-primary/30 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubscribed ? (
                    <>Subscribed!</>
                  ) : (
                    <>
                      Subscribe
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </form>
              <div className="flex items-center gap-2 text-sm text-white/60">
                We respect your privacy. Unsubscribe anytime.
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 md:gap-12">
          {/* Brand column */}
          <motion.div
            className="col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.1 }}
          >
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/logo.svg"
                alt="Cleclo Logo"
                width={140}
                height={46}
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-white/60 mb-6 leading-relaxed">
              Empowering laundry vendors with smart technology to scale their
              business efficiently.
            </p>

            {/* Contact info */}
            <div className="space-y-3 text-sm text-white/60">
              <a
                href="mailto:support@cleclo.com"
                className="flex items-center gap-3 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-primary" />
                support@cleclo.com
              </a>
              <a
                href="tel:+91987654321"
                className="flex items-center gap-3 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-primary" />
                +91 98XXX XXXXX
              </a>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <span>New Delhi</span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-primary hover:border-primary transition-all"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={
                      isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                    }
                    transition={{ delay: 0.2 + index * 0.05 }}
                    aria-label={social.label}
                  >
                    <IconComponent className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links], columnIndex) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.15 + columnIndex * 0.05 }}
            >
              <h4 className="font-bold text-white mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/60 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            className="flex flex-col md:flex-row justify-between items-center gap-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-white/40 text-sm">
              © {new Date().getFullYear()} Cleclo. All rights reserved.
            </p>

            <div className="flex items-center gap-6 text-sm text-white/40">
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Cookies
              </a>
            </div>

            {/* Made with love badge */}
            <div className="flex items-center gap-2 text-xs text-white/40">
              <Link href="https://gohypemedia.com">Made by Go Hype Media.</Link>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
