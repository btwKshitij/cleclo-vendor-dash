import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardSidebar, MobileSidebar } from "@/components/dashboard/sidebar";
import { SidebarProvider } from "@/components/dashboard/sidebar-provider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-50/50 overflow-hidden">
        {/* Desktop sidebar — unchanged */}
        <div className="hidden md:block">
          <DashboardSidebar />
        </div>

        {/* Mobile sidebar overlay — only visible on small screens */}
        <MobileSidebar />

        <div className="flex flex-1 flex-col overflow-hidden">
          <DashboardHeader />
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 pt-4 md:pt-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
