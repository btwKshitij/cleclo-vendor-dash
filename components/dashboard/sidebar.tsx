"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/dashboard/sidebar-provider";
import {
  LayoutDashboard,
  ClipboardList,
  Truck,
  Wallet,
  Package,
  Headphones,
  Settings,
  X,
} from "lucide-react";

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Services",
    href: "/dashboard/services",
    icon: Package,
  },
  {
    title: "Order Onboard",
    href: "/dashboard/schedule",
    icon: Truck,
  },
  {
    title: "All Orders",
    href: "/dashboard/orders",
    icon: ClipboardList,
  },
  {
    title: "Earnings",
    href: "/dashboard/earnings",
    icon: Wallet,
  },
];

const bottomItems = [
  {
    title: "Support",
    href: "/dashboard/support",
    icon: Headphones,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

function SidebarContent({ onLinkClick }: { onLinkClick?: () => void }) {
  const pathname = usePathname();
  const { isCollapsed } = useSidebar();

  return (
    <div
      className={cn(
        "flex h-full flex-col justify-between border-r bg-card py-4 transition-all duration-300 relative z-40",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      <div className="space-y-4 px-3">
        <div className="py-2">
          <div
            className={cn(
              "flex items-center mb-8 h-12",
              isCollapsed ? "justify-center" : "gap-2",
            )}
          >
            {/* Logo Section */}
            {isCollapsed ? (
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <span className="text-primary font-bold">C</span>
              </div>
            ) : (
              <div className="flex flex-col gap-1 items-center w-full">
                <div className="h-12 flex items-center justify-center w-full">
                  <Image
                    src="/logo.png"
                    alt="Cleclo Logo"
                    width={140}
                    height={50}
                    className="h-10 w-auto object-contain"
                    priority
                  />
                </div>
                <span className="text-xs text-[#3E8940] font-bold tracking-wider uppercase text-center">
                  Vendor Portal
                </span>
              </div>
            )}
          </div>

          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onLinkClick}
                className={cn(
                  "flex items-center rounded-lg py-2 transition-all hover:text-primary group relative",
                  isCollapsed ? "justify-center px-2" : "gap-3 px-3",
                  pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground",
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {!isCollapsed && (
                  <span className="text-sm font-medium whitespace-nowrap">
                    {item.title}
                  </span>
                )}

                {/* Tooltip */}
                {isCollapsed && (
                  <div className="absolute left-full ml-4 rounded-md bg-primary px-2 py-1 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                    {item.title}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="px-3 py-2 space-y-1">
        {bottomItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onLinkClick}
            className={cn(
              "flex items-center rounded-lg py-2 transition-all hover:text-primary group relative",
              isCollapsed ? "justify-center px-2" : "gap-3 px-3",
              pathname === item.href
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground",
            )}
          >
            <item.icon className="h-5 w-5 shrink-0" />
            {!isCollapsed && (
              <span className="text-sm font-medium whitespace-nowrap">
                {item.title}
              </span>
            )}

            {/* Tooltip */}
            {isCollapsed && (
              <div className="absolute left-full ml-4 rounded-md bg-primary px-2 py-1 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                {item.title}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

// Desktop sidebar (unchanged behavior)
export function DashboardSidebar() {
  return <SidebarContent />;
}

// Mobile sidebar — slide-out overlay drawer
export function MobileSidebar() {
  const { isMobileOpen, closeMobileSidebar } = useSidebar();

  if (!isMobileOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 md:hidden"
        onClick={closeMobileSidebar}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 z-50 md:hidden flex">
        <div className="relative flex flex-col w-64 bg-card h-full shadow-xl">
          {/* Close button */}
          <button
            onClick={closeMobileSidebar}
            className="absolute top-3 right-3 p-1.5 rounded-lg text-muted-foreground hover:bg-muted transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          <SidebarContent onLinkClick={closeMobileSidebar} />
        </div>
      </div>
    </>
  );
}
