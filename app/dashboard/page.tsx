"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Download,
  Plus,
  X,
  Bell,
  Package,
  Calendar as CalendarIcon,
  ChevronDown,
} from "lucide-react";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { RecentOrders } from "@/components/dashboard/recent-orders";
import { NewOrderModal } from "@/components/dashboard/new-order-modal";
import { cn } from "@/lib/utils";
import {
  format,
  isSameDay,
  subDays,
  isWithinInterval,
  startOfDay,
  endOfDay,
  differenceInDays,
} from "date-fns";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Static notification data
const STATIC_NOTIFICATION = {
  id: "ORD-8292",
  customer: "Mark Wilson",
  items: "2 Suits Dry Clean",
  earning: "₹280",
  time: "Just now",
};

// Mock data moved from recent-orders.tsx
const orders = [
  {
    id: "#ORD-8291",
    customer: "Alice Freeman",
    type: "Regular",
    avatar: "/avatars/alice.png",
    items: "5kg Wash & Fold",
    status: "Processing",
    dueDate: "Today, 5:00 PM",
    isoDate: "2026-02-07T17:00:00",
  },
  {
    id: "#ORD-8292",
    customer: "Mark Wilson",
    type: "New Customer",
    avatar: "/avatars/mark.png",
    items: "2 Suits Dry Clean",
    status: "Assigned",
    dueDate: "Tomorrow, 10:00 AM",
    isoDate: "2026-02-08T10:00:00",
  },
  {
    id: "#ORD-8288",
    customer: "Sarah Jenkins",
    type: "VIP",
    avatar: "/avatars/sarah.png",
    items: "10kg Mixed Load",
    status: "Ready",
    dueDate: "Yesterday",
    isoDate: "2026-02-06T12:00:00",
  },
  {
    id: "#ORD-8293",
    customer: "James Doe",
    type: "Regular",
    avatar: "/avatars/james.png",
    items: "Wedding Dress Clean",
    status: "Pending Pickup",
    dueDate: "Tomorrow, 2:00 PM",
    isoDate: "2026-02-08T14:00:00",
  },
  {
    id: "#ORD-8294",
    customer: "Emily Chen",
    type: "Regular",
    avatar: "/avatars/emily.png",
    items: "3 Curtains",
    status: "Assigned",
    dueDate: "Tomorrow, 2:00 PM",
    isoDate: "2026-02-08T14:00:00",
  },
  {
    id: "#ORD-8295",
    customer: "Michael Brown",
    type: "VIP",
    avatar: "/avatars/michael.png",
    items: "Premium Suit Clean",
    status: "Assigned",
    dueDate: "Today, 4:00 PM",
    isoDate: "2026-02-07T16:00:00",
  },
  {
    id: "#ORD-8296",
    customer: "Lisa Wang",
    type: "New Customer",
    avatar: "/avatars/lisa.png",
    items: "10kg Wash & Fold",
    status: "Processing",
    dueDate: "Today, 10:00 AM",
    isoDate: "2026-02-07T10:00:00",
  },
  {
    id: "#ORD-8297",
    customer: "David Miller",
    type: "Regular",
    avatar: "/avatars/david.png",
    items: "2 Winter Coats",
    status: "Processing",
    dueDate: "Tomorrow, 3:00 PM",
    isoDate: "2026-02-08T15:00:00",
  },
  {
    id: "#ORD-8298",
    customer: "Sophie Turner",
    type: "VIP",
    avatar: "/avatars/sophie.png",
    items: "Wedding Saree",
    status: "Ready",
    dueDate: "Today, 12:00 PM",
    isoDate: "2026-02-07T12:00:00",
  },
  // Additional Mock Data
  {
    id: "#ORD-8299",
    customer: "Robert Taylor",
    type: "Regular",
    avatar: "/avatars/robert.png",
    items: "Bedding Set x2",
    status: "Assigned",
    dueDate: "Feb 9, 9:00 AM",
    isoDate: "2026-02-09T09:00:00",
  },
  {
    id: "#ORD-8300",
    customer: "Jennifer Lopez",
    type: "VIP",
    avatar: "/avatars/jennifer.png",
    items: "Designer Dress",
    status: "Pending Pickup",
    dueDate: "today, 6:00 PM",
    isoDate: "2026-02-07T18:00:00",
  },
  {
    id: "#ORD-8301",
    customer: "William Anderson",
    type: "New Customer",
    avatar: "/avatars/william.png",
    items: "Shirts x5, Pants x3",
    status: "Processing",
    dueDate: "Feb 5, 5:00 PM",
    isoDate: "2026-02-05T17:00:00",
  },
  {
    id: "#ORD-8302",
    customer: "Jessica White",
    type: "Regular",
    avatar: "/avatars/jessica.png",
    items: "Comforter Cleaning",
    status: "Ready",
    dueDate: "Feb 4, 11:00 AM",
    isoDate: "2026-02-04T11:00:00",
  },
  {
    id: "#ORD-8303",
    customer: "Thomas Harris",
    type: "Regular",
    avatar: "/avatars/thomas.png",
    items: "Rug Cleaning",
    status: "Pending Pickup",
    dueDate: "Feb 8, 10:00 AM",
    isoDate: "2026-02-08T10:00:00",
  },
  {
    id: "#ORD-8304",
    customer: "Nancy Davis",
    type: "VIP",
    avatar: "/avatars/nancy.png",
    items: "Silk Blouse x2",
    status: "Processing",
    dueDate: "Feb 6, 2:00 PM",
    isoDate: "2026-02-06T14:00:00",
  },
];

export default function DashboardPage() {
  const [showNewOrder, setShowNewOrder] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });
  const [isExporting, setIsExporting] = useState(false);

  // Show notification on page load (but NOT the popup)
  useEffect(() => {
    const notifTimer = setTimeout(() => {
      setShowNotification(true);
    }, 500);

    return () => clearTimeout(notifTimer);
  }, []);

  // Auto-hide notification after 2 minutes
  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 20000); // 2 minutes
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  // ... existing imports

  const filteredOrders = date?.from
    ? orders.filter((order) => {
        const orderDate = new Date(order.isoDate);
        return isWithinInterval(orderDate, {
          start: startOfDay(date.from!),
          end: endOfDay(date.to || date.from!),
        });
      })
    : orders;

  const handleExport = () => {
    setIsExporting(true);
    // Simulate export delay
    setTimeout(() => {
      const csvContent =
        "data:text/csv;charset=utf-8," +
        "Order ID,Customer,Items,Status,Due Date\n" +
        filteredOrders
          .map(
            (e) =>
              `${e.id},${e.customer},${e.items.replace(/,/g, "")},${e.status},${e.dueDate}`,
          )
          .join("\n");

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      const rangeStr = date?.from
        ? `${format(date.from, "yyyy-MM-dd")}_to_${date.to ? format(date.to, "yyyy-MM-dd") : format(date.from, "yyyy-MM-dd")}`
        : "all_time";
      link.setAttribute("download", `orders_report_${rangeStr}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setIsExporting(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-8 relative">
      {/* ... Notification code ... */}

      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl text-black font-bold tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-primary mt-1">
            Welcome back, here&apos;s what&apos;s happening today.
          </p>
        </div>
      </div>

      {/* Toolbar and Data Period Label */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        {/* Data Period Label */}
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-bold text-slate-800">
            {date?.from &&
            date.to &&
            differenceInDays(date.to, date.from) === 7 &&
            isSameDay(date.to, new Date())
              ? "Last 7 Days Overview"
              : date?.from
                ? `Overview: ${format(date.from, "MMM dd")} - ${date.to ? format(date.to, "MMM dd, yyyy") : format(date.from, "MMM dd, yyyy")}`
                : "Overview"}
          </h3>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="gap-2 text-slate-700 bg-white border-slate-200 h-10 rounded-xl font-medium min-w-[240px] justify-start text-left"
              >
                <Download className="h-4 w-4 mr-2" />
                <span className="font-medium">Export Orders Data</span>
                {date?.from && (
                  <>
                    <span className="mx-2 h-4 w-px bg-slate-300" />
                    <span className="text-slate-600 font-normal">
                      {date.to &&
                      differenceInDays(date.to, date.from) === 7 &&
                      isSameDay(date.to, new Date()) ? (
                        "Last 7 Days"
                      ) : date.to ? (
                        <>
                          {format(date.from, "LLL dd")} -{" "}
                          {format(date.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(date.from, "LLL dd, y")
                      )}
                    </span>
                  </>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <div className="flex gap-2 p-3 border-b border-slate-100">
                <div className="flex-1">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                    From
                  </span>
                  <div className="text-xs font-semibold text-slate-800 border border-slate-200 rounded-md px-2 py-1.5 mt-1 bg-slate-50">
                    {date?.from
                      ? format(date.from, "MMM dd, yyyy")
                      : "Select date"}
                  </div>
                </div>
                <div className="flex-1">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                    To
                  </span>
                  <div className="text-xs font-semibold text-slate-800 border border-slate-200 rounded-md px-2 py-1.5 mt-1 bg-slate-50">
                    {date?.to ? format(date.to, "MMM dd, yyyy") : "-"}
                  </div>
                </div>
              </div>
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
              <div className="p-3 border-t">
                <Button
                  className="w-full bg-[#3E8940] hover:bg-[#3E8940]/90"
                  onClick={handleExport}
                  disabled={!date?.from || isExporting}
                >
                  {isExporting ? "Exporting..." : "Export Data"}
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <StatsCards
        orders={filteredOrders}
        selectedFilter={filterStatus}
        onFilterChange={setFilterStatus}
      />

      <RecentOrders
        orders={filteredOrders}
        onOrderClick={() => setShowNewOrder(true)}
        filterStatus={filterStatus}
      />

      <NewOrderModal open={showNewOrder} onOpenChange={setShowNewOrder} />
    </div>
  );
}
