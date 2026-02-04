"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Headphones,
  Mail,
  Phone,
  MessageCircle,
  FileText,
  HelpCircle,
  ExternalLink,
  Send,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const FAQ_ITEMS = [
  {
    question: "How do I update my pickup availability?",
    answer:
      "Go to Settings > Availability to configure your working hours and days.",
  },
  {
    question: "When do I receive payments?",
    answer:
      "Payments are processed weekly on Fridays for all completed orders.",
  },
  {
    question: "How do I handle a customer complaint?",
    answer: "Contact support immediately and we'll help mediate the situation.",
  },
  {
    question: "Can I reject an order after accepting?",
    answer:
      "Contact support within 30 minutes of accepting to request cancellation.",
  },
];

export function SupportPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl text-black font-bold tracking-tight">
          Support Center
        </h1>
        <p className="text-primary mt-1">
          Get help with your account, orders, and more
        </p>
      </div>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
          <div className="h-10 w-10 rounded-lg bg-[#3E8940]/10 flex items-center justify-center shrink-0">
            <Phone className="h-5 w-5 text-[#3E8940]" />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-slate-900 text-sm">
              Phone Support
            </h3>
            <p className="text-sm font-semibold text-[#3E8940]">
              +1 (800) 123-4567
            </p>
            <p className="text-[10px] text-slate-400">Mon-Sat, 8AM - 8PM</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
          <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center shrink-0">
            <Mail className="h-5 w-5 text-purple-600" />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-slate-900 text-sm">
              Email Support
            </h3>
            <p className="text-sm font-semibold text-purple-600 truncate">
              vendor@cleclo.com
            </p>
            <p className="text-[10px] text-slate-400">Response: ~4 hours</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
          <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
            <MessageCircle className="h-5 w-5 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-900 text-sm">Live Chat</h3>
            <p className="text-[10px] text-slate-400 mb-1">Chat in real-time</p>
          </div>
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 h-8 text-xs shrink-0"
          >
            Start
            <ExternalLink className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </div>

      {/* Recent Tickets */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <h2 className="font-bold text-slate-900">Recent Support Tickets</h2>
        </div>
        <div className="divide-y divide-slate-100">
          <div className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-slate-900">
                  Payment not received for Order #284-9310
                </p>
                <p className="text-xs text-slate-500">
                  Ticket #SUP-1234 • Resolved 2 days ago
                </p>
              </div>
            </div>
            <span className="px-3 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
              Resolved
            </span>
          </div>
          <div className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="font-medium text-slate-900">
                  App crashing on order details page
                </p>
                <p className="text-xs text-slate-500">
                  Ticket #SUP-1235 • Opened 3 hours ago
                </p>
              </div>
            </div>
            <span className="px-3 py-1 text-xs font-semibold bg-orange-100 text-orange-700 rounded-full">
              In Progress
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Contact Form */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-[#3E8940]/10 flex items-center justify-center">
              <Headphones className="h-5 w-5 text-[#3E8940]" />
            </div>
            <div>
              <h2 className="font-semibold text-slate-900">
                Submit a Support Request.
              </h2>
              <p className="text-xs text-slate-500">
                Most issues are resolved within 24 hours.
              </p>
            </div>
          </div>
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </Label>
                <Input
                  id="subject"
                  placeholder="Issue description"
                  className="h-10"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="category" className="text-sm font-medium">
                  Category
                </Label>
                <select
                  id="category"
                  className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                >
                  <option value="">Select category</option>
                  <option value="orders">Orders & Pickup</option>
                  <option value="payments">Payments</option>
                  <option value="account">Account</option>
                  <option value="technical">Technical</option>
                </select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="message" className="text-sm font-medium">
                Message
              </Label>
              <Textarea
                id="message"
                placeholder="Describe your issue in detail..."
                className="min-h-[100px] resize-none"
              />
            </div>
            <Button className="w-full h-10 bg-[#3E8940] hover:bg-[#3E8940]/90">
              <Send className="h-4 w-4 mr-2" />
              Submit Request
            </Button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center">
              <HelpCircle className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <h2 className="font-semibold text-slate-900">
                Frequently Asked Questions
              </h2>
              <p className="text-xs text-slate-500">
                Quick answers to common questions
              </p>
            </div>
          </div>
          <div className="divide-y divide-slate-100">
            {FAQ_ITEMS.map((faq, index) => (
              <div
                key={index}
                className="px-5 py-3.5 hover:bg-slate-50/50 transition-colors"
              >
                <h4 className="font-medium text-slate-900 text-sm mb-1">
                  {faq.question}
                </h4>
                <p className="text-sm text-slate-500">{faq.answer}</p>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-slate-100 bg-slate-50/50">
            <Button variant="outline" className="w-full gap-2 h-10">
              <FileText className="h-4 w-4" />
              Visit Help Center
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
