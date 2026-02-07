"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Calendar as CalendarIcon,
  ChevronDown,
  ChevronRight,
  Filter,
  MapPin,
  Clock,
  Shirt,
  Package,
  Truck,
  CheckCircle2,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  format,
  isWithinInterval,
  subDays,
  startOfDay,
  endOfDay,
  differenceInDays,
  isSameDay,
} from "date-fns";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type OrderStatus = "new" | "accepted" | "processing" | "ready" | "completed";
type ServiceSpeed = "economy" | "fast" | "express";

interface Order {
  id: string;
  status: OrderStatus;
  serviceSpeed: ServiceSpeed;
  items: string;
  service: string;
  detergent: string;
  pickupTime: string;
  deliveryTime: string;
  address: string;
  distance: string;
  earning: string;
  customerName: string;
  isoDate: string;
}

const ORDERS: Order[] = [
  // New Orders
  {
    id: "ORD-4920",
    status: "new",
    serviceSpeed: "economy",
    items: "Shirt x3, Jeans x2, Silk Scarf x1",
    service: "Wash & Iron",
    detergent: "Standard detergent",
    pickupTime: "Today, 2:00 PM",
    deliveryTime: "Tomorrow, 10:00 AM",
    address: "123 Maple St, Downtown",
    distance: "1.2 km",
    earning: "₹140",
    customerName: "John Smith",
    isoDate: "2026-02-07T14:00:00",
  },
  {
    id: "ORD-4921",
    status: "new",
    serviceSpeed: "fast",
    items: "Bedsheet x1, Pillow Case x4",
    service: "Dry Clean",
    detergent: "Delicate items",
    pickupTime: "Today, 4:30 PM",
    deliveryTime: "Tomorrow, 12:00 PM",
    address: "456 Oak Ave, Uptown",
    distance: "3.5 km",
    earning: "₹220",
    customerName: "Sarah Johnson",
    isoDate: "2026-02-07T16:30:00",
  },
  {
    id: "ORD-4925",
    status: "new",
    serviceSpeed: "express",
    items: "Curtains x4, Sofa Covers x2",
    service: "Wash & Fold",
    detergent: "Heavy duty",
    pickupTime: "Today, 5:00 PM",
    deliveryTime: "Today, 9:00 PM",
    address: "789 Pine Ln, Suburbs",
    distance: "5.0 km",
    earning: "₹500",
    customerName: "Mike Chen",
    isoDate: "2026-02-07T17:00:00",
  },
  // Accepted Orders
  {
    id: "ORD-4918",
    status: "accepted",
    serviceSpeed: "economy",
    items: "Suit x1, Tie x2",
    service: "Dry Clean",
    detergent: "Premium care",
    pickupTime: "Today, 11:00 AM",
    deliveryTime: "Wed, 2:00 PM",
    address: "321 Cedar Rd",
    distance: "2.1 km",
    earning: "₹350",
    customerName: "David Wilson",
    isoDate: "2026-02-07T11:00:00",
  },
  {
    id: "ORD-4916",
    status: "accepted",
    serviceSpeed: "fast",
    items: "Dress x2, Blouse x3",
    service: "Wash & Iron",
    detergent: "Gentle care",
    pickupTime: "Today, 1:00 PM",
    deliveryTime: "Tomorrow, 3:00 PM",
    address: "555 Elm Street",
    distance: "1.8 km",
    earning: "₹280",
    customerName: "Emily Brown",
    isoDate: "2026-02-07T13:00:00",
  },
  // Processing Orders
  {
    id: "ORD-4912",
    status: "processing",
    serviceSpeed: "economy",
    items: "Jeans x5, T-Shirts x8",
    service: "Wash & Fold",
    detergent: "Standard",
    pickupTime: "Yesterday, 3:00 PM",
    deliveryTime: "Tomorrow, 11:00 AM",
    address: "888 Birch Ave",
    distance: "4.2 km",
    earning: "₹420",
    customerName: "Alex Turner",
    isoDate: "2026-02-06T15:00:00",
  },
  {
    id: "ORD-4910",
    status: "processing",
    serviceSpeed: "express",
    items: "Wedding Dress x1",
    service: "Premium Dry Clean",
    detergent: "Delicate fabrics",
    pickupTime: "Today, 9:00 AM",
    deliveryTime: "Today, 6:00 PM",
    address: "999 Willow Lane",
    distance: "2.5 km",
    earning: "₹800",
    customerName: "Lisa Anderson",
    isoDate: "2026-02-07T09:00:00",
  },
  {
    id: "ORD-4908",
    status: "processing",
    serviceSpeed: "fast",
    items: "Uniforms x10",
    service: "Wash & Iron",
    detergent: "Commercial grade",
    pickupTime: "Yesterday, 5:00 PM",
    deliveryTime: "Tomorrow, 9:00 AM",
    address: "444 Oak Street",
    distance: "3.0 km",
    earning: "₹600",
    customerName: "Corporate Client",
    isoDate: "2026-02-06T17:00:00",
  },
  {
    id: "ORD-4905",
    status: "processing",
    serviceSpeed: "economy",
    items: "Blankets x2, Comforter x1",
    service: "Heavy Wash",
    detergent: "Deep clean",
    pickupTime: "2 days ago",
    deliveryTime: "Tomorrow, 4:00 PM",
    address: "222 Pine Road",
    distance: "5.5 km",
    earning: "₹380",
    customerName: "Robert Kim",
    isoDate: "2026-02-05T14:00:00", // approx 2 PM
  },
  {
    id: "ORD-4902",
    status: "processing",
    serviceSpeed: "economy",
    items: "Shirts x6, Pants x4",
    service: "Wash & Iron",
    detergent: "Standard",
    pickupTime: "Yesterday, 2:00 PM",
    deliveryTime: "Tomorrow, 2:00 PM",
    address: "111 Maple Drive",
    distance: "1.9 km",
    earning: "₹320",
    customerName: "James Lee",
    isoDate: "2026-02-06T14:00:00",
  },
  // Ready Orders
  {
    id: "ORD-4900",
    status: "ready",
    serviceSpeed: "fast",
    items: "Jacket x2, Pants x2",
    service: "Dry Clean",
    detergent: "Premium",
    pickupTime: "2 days ago",
    deliveryTime: "Today, 12:00 PM",
    address: "777 Cherry St",
    distance: "2.8 km",
    earning: "₹450",
    customerName: "Tom Harris",
    isoDate: "2026-02-05T10:00:00",
  },
  {
    id: "ORD-4898",
    status: "ready",
    serviceSpeed: "economy",
    items: "Curtains x6",
    service: "Steam Clean",
    detergent: "Fabric refresh",
    pickupTime: "3 days ago",
    deliveryTime: "Today, 3:00 PM",
    address: "333 Walnut Ave",
    distance: "4.0 km",
    earning: "₹520",
    customerName: "Nancy White",
    isoDate: "2026-02-04T10:00:00",
  },
  // Completed Orders
  {
    id: "ORD-4895",
    status: "completed",
    serviceSpeed: "express",
    items: "Party Dress x1, Accessories",
    service: "Express Clean",
    detergent: "Delicate",
    pickupTime: "Yesterday",
    deliveryTime: "Yesterday, 8:00 PM",
    address: "666 Spruce Lane",
    distance: "3.2 km",
    earning: "₹650",
    customerName: "Jennifer Davis",
    isoDate: "2026-02-06T10:00:00",
  },
  {
    id: "ORD-4890",
    status: "completed",
    serviceSpeed: "economy",
    items: "Bedsheets x4, Towels x8",
    service: "Wash & Fold",
    detergent: "Fresh scent",
    pickupTime: "2 days ago",
    deliveryTime: "Yesterday, 10:00 AM",
    address: "123 Ash Road",
    distance: "2.0 km",
    earning: "₹300",
    customerName: "Chris Martin",
    isoDate: "2026-02-05T09:00:00",
  },
];

const TABS: { label: string; value: OrderStatus }[] = [
  { label: "New", value: "new" },
  { label: "Accepted", value: "accepted" },
  { label: "In Processing", value: "processing" },
  { label: "Ready", value: "ready" },
  { label: "Completed", value: "completed" },
];

const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case "new":
      return "bg-orange-100 text-orange-700";
    case "accepted":
      return "bg-blue-100 text-blue-700";
    case "processing":
      return "bg-purple-100 text-purple-700";
    case "ready":
      return "bg-green-100 text-green-700";
    case "completed":
      return "bg-slate-100 text-slate-700";
  }
};

const getSpeedColor = (speed: ServiceSpeed) => {
  switch (speed) {
    case "economy":
      return "text-[#3E8940] border-[#3E8940]/30 bg-[#3E8940]/5";
    case "fast":
      return "text-blue-600 border-blue-300 bg-blue-50";
    case "express":
      return "text-orange-600 border-orange-300 bg-orange-50";
  }
};

const getLeftBorderColor = (status: OrderStatus) => {
  switch (status) {
    case "new":
      return "bg-orange-500";
    case "accepted":
      return "bg-blue-500";
    case "processing":
      return "bg-purple-500";
    case "ready":
      return "bg-[#3E8940]";
    case "completed":
      return "bg-slate-400";
  }
};

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<OrderStatus>("new");
  const [serviceFilter, setServiceFilter] = useState<ServiceSpeed | "all">(
    "all",
  );
  const [liveUpdates, setLiveUpdates] = useState(true);
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  });
  const [isExporting, setIsExporting] = useState(false);

  const filteredOrders = ORDERS.filter((order) => {
    const matchesTab = order.status === activeTab;
    const matchesService =
      serviceFilter === "all" || order.serviceSpeed === serviceFilter;

    let matchesDate = true;
    if (date?.from && order.isoDate) {
      const orderDate = new Date(order.isoDate);
      matchesDate = isWithinInterval(orderDate, {
        start: startOfDay(date.from),
        end: endOfDay(date.to || date.from),
      });
    }

    return matchesTab && matchesService && matchesDate;
  });

  const getTabCount = (status: OrderStatus) => {
    return ORDERS.filter((o) => o.status === status).length;
  };

  const handleExport = () => {
    setIsExporting(true);
    // Simulate export delay
    setTimeout(() => {
      const csvContent =
        "data:text/csv;charset=utf-8," +
        "Order ID,Customer,Items,Service,Status,Earning,Date\n" +
        filteredOrders
          .map(
            (o) =>
              `${o.id},${o.customerName},"${o.items.replace(/,/g, " ")}",${o.service},${o.status},"${o.earning}",${o.isoDate}`,
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
    <div className="flex-1 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Orders Dashboard
          </h1>
          <p className="text-slate-500">
            Review, accept and manage laundry orders while tracking your
            earnings in real time.
          </p>
        </div>
        <button
          onClick={() => setLiveUpdates(!liveUpdates)}
          className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border shadow-sm hover:shadow-md transition-shadow cursor-pointer"
        >
          <div
            className={cn(
              "h-2.5 w-2.5 rounded-full transition-colors",
              liveUpdates ? "bg-[#3E8940] animate-pulse" : "bg-slate-300",
            )}
          />
          <span className="text-sm font-medium text-slate-700">
            Live Updates {liveUpdates ? "On" : "Off"}
          </span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b pb-1 overflow-x-auto">
        {TABS.map((tab) => {
          const count = getTabCount(tab.value);
          const isActive = activeTab === tab.value;
          return (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={cn(
                "flex items-center gap-2 pb-3 px-1 border-b-2 transition-all whitespace-nowrap",
                isActive
                  ? "border-[#3E8940] text-[#3E8940] font-bold"
                  : "border-transparent text-slate-500 font-medium hover:text-slate-700 hover:border-slate-300",
              )}
            >
              {tab.label}
              {count > 0 && (
                <span
                  className={cn(
                    "px-2 py-0.5 text-xs rounded-full",
                    isActive
                      ? "bg-[#3E8940] text-white"
                      : "bg-slate-200 text-slate-600",
                  )}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <Select defaultValue="delivery">
          <SelectTrigger className="w-[180px] bg-white border-slate-200 h-10 rounded-xl font-medium text-slate-700">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="delivery">Delivery Type</SelectItem>
            <SelectItem value="pickup">Pickup Type</SelectItem>
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="bg-white border-slate-200 h-10 rounded-xl font-medium text-slate-700 px-4"
            >
              <CalendarIcon className="w-4 h-4 mr-2" />
              {date?.from ? (
                date.to &&
                differenceInDays(date.to, date.from) === 7 &&
                isSameDay(date.to, new Date()) ? (
                  "Last 7 Days"
                ) : date.to ? (
                  <>
                    {format(date.from, "LLL dd")} - {format(date.to, "LLL dd")}
                  </>
                ) : (
                  format(date.from, "LLL dd")
                )
              ) : (
                "Pick a date"
              )}
              <ChevronDown className="w-4 h-4 ml-2 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
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
              onSelect={setDate as any}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>

        <Button
          variant="outline"
          className="bg-white border-slate-200 h-10 rounded-xl font-medium text-slate-700 px-4"
          onClick={handleExport}
          disabled={isExporting}
        >
          <Download className="h-4 w-4 mr-2" />
          {isExporting ? "Exporting..." : "Export Data"}
        </Button>

        <div className="h-8 w-px bg-slate-200 mx-1" />

        <div className="flex items-center bg-slate-100 p-1 rounded-xl">
          {(["all", "economy", "fast", "express"] as const).map((speed) => (
            <button
              key={speed}
              onClick={() => setServiceFilter(speed)}
              className={cn(
                "px-4 py-1.5 text-sm font-medium rounded-lg transition-colors capitalize",
                serviceFilter === speed
                  ? "bg-[#3E8940]/10 text-[#3E8940] font-bold shadow-sm"
                  : "text-slate-600 hover:bg-slate-200",
              )}
            >
              {speed === "all" ? "All" : speed}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 border border-slate-200 text-center">
            <Package className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-1">
              No orders found
            </h3>
            <p className="text-slate-500">
              {activeTab === "new"
                ? "No new orders at the moment. Check back soon!"
                : `No ${activeTab} orders matching your filters.`}
            </p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="group relative bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
            >
              {/* Left Border Line */}
              <div
                className={cn(
                  "absolute left-0 top-0 bottom-0 w-1.5 rounded-l-full",
                  getLeftBorderColor(order.status),
                )}
              />

              <div className="flex flex-col md:flex-row gap-5 pl-4">
                {/* Left Section: Info */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                      {order.id}
                    </h3>
                    <Badge
                      className={cn(
                        "border-none uppercase text-[10px] font-bold tracking-wider rounded-md px-2 py-0.5",
                        getStatusColor(order.status),
                      )}
                    >
                      {order.status === "processing"
                        ? "In Progress"
                        : order.status}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-[10px] font-bold gap-1 rounded-md px-2 py-0.5 uppercase",
                        getSpeedColor(order.serviceSpeed),
                      )}
                    >
                      <Clock className="w-3 h-3" />
                      {order.serviceSpeed}
                    </Badge>
                  </div>

                  <p className="text-sm font-medium text-slate-700">
                    {order.items}
                  </p>
                  <p className="text-xs text-slate-500">
                    Customer: {order.customerName}
                  </p>
                </div>

                {/* Right Section: Details & Status */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Detail Column 1 */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shrink-0">
                        <Shirt className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          {order.service}
                        </p>
                        <p className="text-xs text-slate-500">
                          {order.detergent}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-[#3E8940]/10 text-[#3E8940] rounded-lg shrink-0">
                        <Truck className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          Pickup: {order.pickupTime}
                        </p>
                        <p className="text-xs text-slate-500">
                          Delivery: {order.deliveryTime}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-slate-100 text-slate-600 rounded-lg shrink-0">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          {order.address}
                        </p>
                        <p className="text-xs text-slate-500">
                          {order.distance} away
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Detail Column 2 (Earning & Actions) */}
                  <div className="flex flex-col justify-between items-end text-right h-full py-1">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-1">
                        Your Earning
                      </p>
                      <p className="text-2xl font-black text-[#3E8940]">
                        {order.earning}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 items-end">
                      {order.status === "new" && (
                        <Button
                          size="sm"
                          className="bg-[#3E8940] hover:bg-[#3E8940]/90 h-8 text-xs"
                        >
                          Accept Order
                        </Button>
                      )}
                      {order.status === "accepted" && (
                        <Button
                          size="sm"
                          className="bg-purple-600 hover:bg-purple-700 h-8 text-xs"
                        >
                          Start Processing
                        </Button>
                      )}
                      {order.status === "processing" && (
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 h-8 text-xs"
                        >
                          Mark Ready
                        </Button>
                      )}
                      {order.status === "ready" && (
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 h-8 text-xs"
                        >
                          Complete Delivery
                        </Button>
                      )}
                      {order.status === "completed" && (
                        <Badge className="bg-green-100 text-green-700 border-none gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Completed
                        </Badge>
                      )}
                      <Link
                        href={`/dashboard/orders/${order.id}`}
                        className="flex items-center text-[#3E8940] text-xs font-bold cursor-pointer hover:underline"
                      >
                        View Details{" "}
                        <ChevronRight className="w-3.5 h-3.5 ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Summary */}
      {filteredOrders.length > 0 && (
        <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 flex items-center justify-between text-slate-600 text-sm">
          <span>
            Showing <strong>{filteredOrders.length}</strong> {activeTab} orders
            {serviceFilter !== "all" && ` • ${serviceFilter} service`}
          </span>
          <span className="font-semibold text-[#3E8940]">
            Total Earnings: ₹
            {filteredOrders.reduce(
              (sum, o) => sum + parseInt(o.earning.replace(/[₹,]/g, "")),
              0,
            )}
          </span>
        </div>
      )}
    </div>
  );
}
