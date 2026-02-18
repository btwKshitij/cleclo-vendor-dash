"use client";

import React, { useState } from "react";
import { Plus, Trash2, CheckCircle2, ShieldCheck, Lock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const STEPS = [
  {
    id: 1,
    title: "Account Details",
    description:
      "Provide your primary business and login information to set up your vendor account.",
  },
  {
    id: 2,
    title: "Business Setup",
    description: "Services, outlets & location",
  },
  {
    id: 3,
    title: "Payment & Capacity Details",
    description:
      "Provide your processing capacity and bank details for order allocation and weekly payouts.",
  },
  {
    id: 4,
    title: "Verification Documents",
    description:
      "Upload required identity and business registration documents for account verification.",
  },
  { id: 5, title: "Confirm", description: "Review & submit application" },
];

export type Outlet = {
  id: string;
  name: string;
  city: string;
  address: string;
  state: string;
  pincode: string;
  openingTime: string;
  closingTime: string;
};

export function VendorSignupForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [outlets, setOutlets] = useState<Outlet[]>([
    {
      id: "1",
      name: "",
      city: "",
      address: "",
      state: "",
      pincode: "",
      openingTime: "",
      closingTime: "",
    },
  ]);

  const addOutlet = () => {
    setOutlets([
      ...outlets,
      {
        id: Math.random().toString(36).substr(2, 9),
        name: "",
        city: "",
        address: "",
        state: "",
        pincode: "",
        openingTime: "",
        closingTime: "",
      },
    ]);
  };

  const removeOutlet = (id: string) => {
    if (outlets.length > 1) {
      setOutlets(outlets.filter((outlet) => outlet.id !== id));
    }
  };

  const updateOutlet = (id: string, field: keyof Outlet, value: string) => {
    setOutlets((prev) =>
      prev.map((outlet) =>
        outlet.id === id ? { ...outlet, [field]: value } : outlet,
      ),
    );
  };

  const handlePincodeChange = async (id: string, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    // Limit to 6 digits
    if (value.length > 6) return;

    updateOutlet(id, "pincode", value);

    if (value.length === 6) {
      try {
        const response = await fetch(
          `https://api.postalpincode.in/pincode/${value}`,
        );
        const data = await response.json();

        if (data[0].Status === "Success" && data[0].PostOffice.length > 0) {
          const { District, State } = data[0].PostOffice[0];
          updateOutlet(id, "city", District);
          updateOutlet(id, "state", State);
        }
      } catch (error) {
        console.error("Error fetching pincode details:", error);
      }
    }
  };

  // OTP Verification State
  const [mobileNumber, setMobileNumber] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [gstRegistered, setGstRegistered] = useState("Select option");

  const handleVerifyOtp = () => {
    if (otp === "1234") {
      setIsVerified(true);
      setShowOtpModal(false);
      setOtp("");
    } else {
      // In a real app, you would show an error message
      alert("Invalid OTP. Please enter 1234");
    }
  };

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <div className="w-full">
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {STEPS.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-start group ${index === STEPS.length - 1 ? "flex-none" : "flex-1"}`}
              >
                {/* Step Circle */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 relative z-10 ${
                      step.id < currentStep
                        ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                        : step.id === currentStep
                          ? "bg-white text-emerald-600 ring-2 ring-emerald-500 ring-offset-4 shadow-lg shadow-emerald-500/20 font-bold"
                          : "bg-slate-200 text-slate-500"
                    }`}
                  >
                    {step.id < currentStep ? (
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      step.id
                    )}
                  </div>
                  <p
                    className={`text-xs font-semibold mt-3 text-center w-20 transition-colors duration-300 ${
                      step.id <= currentStep
                        ? "text-slate-900"
                        : "text-slate-500"
                    }`}
                  >
                    {step.title}
                  </p>
                </div>

                {/* Connector Line */}
                {index < STEPS.length - 1 && (
                  <div
                    className={`h-1 flex-1 mx-2 mt-[22px] transition-all duration-300 ${
                      step.id < currentStep
                        ? "bg-emerald-500 shadow-emerald-500/30 shadow-sm"
                        : "bg-slate-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-0">
          {/* Header Section */}
          <div className="mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              {STEPS[currentStep - 1].title}
            </h2>
            <p className="text-slate-600 mt-2 text-base font-medium">
              {STEPS[currentStep - 1].description}
            </p>
          </div>

          <div className="space-y-8">
            {currentStep === 1 && (
              <div className="space-y-7">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-sm font-semibold text-slate-900 mb-3">
                      Business Name
                    </label>
                    <input
                      type="text"
                      placeholder="Registered Business Name (As per Legal Documents)"
                      className="w-full px-5 py-3 rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 font-medium transition-all duration-200 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:shadow-lg focus:shadow-emerald-500/10"
                    />
                  </div>
                  <div className="group">
                    <label className="block text-sm font-semibold text-slate-900 mb-3">
                      Owner Name
                    </label>
                    <input
                      type="text"
                      placeholder="Full Name of Authorized Signatory"
                      className="w-full px-5 py-3 rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 font-medium transition-all duration-200 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:shadow-lg focus:shadow-emerald-500/10"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="group">
                    <label className="block text-sm font-semibold text-slate-900 mb-3">
                      Mobile Number
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="tel"
                        value={mobileNumber}
                        onChange={(e) => {
                          setMobileNumber(e.target.value);
                          if (isVerified) setIsVerified(false);
                        }}
                        placeholder="OTP Verification Required for Account Activation"
                        className={`w-full px-5 py-3 rounded-xl border-2 ${
                          isVerified
                            ? "border-emerald-500 bg-emerald-50/10"
                            : "border-slate-200 bg-slate-50"
                        } text-slate-900 placeholder-slate-400 placeholder:text-sm font-medium transition-all duration-200 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:shadow-lg focus:shadow-emerald-500/10`}
                      />
                      {!isVerified ? (
                        <button
                          type="button"
                          onClick={() => setShowOtpModal(true)}
                          disabled={!mobileNumber || mobileNumber.length < 10}
                          className="px-6 py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap transition-all duration-200 text-sm shadow-lg shadow-slate-900/10"
                        >
                          Verify Number
                        </button>
                      ) : (
                        <div className="px-6 py-3 bg-emerald-100 text-emerald-700 font-semibold rounded-xl flex items-center gap-2 border-2 border-emerald-200 whitespace-nowrap">
                          <CheckCircle2 className="w-5 h-5" />
                          <span>Verified</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="group">
                    <label className="block text-sm font-semibold text-slate-900 mb-3">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="Used for Login Access, Payment Notifications and Operational Updates."
                      className="w-full px-5 py-3 rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 placeholder:text-sm font-medium transition-all duration-200 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:shadow-lg focus:shadow-emerald-500/10"
                    />
                    <p className="text-sm text-slate-600 font-medium mt-2 ml-2">
                      Used for account access and important updates
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="group">
                    <label className="block text-sm font-semibold text-slate-900 mb-3">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="Minimum 8 characters, including at least one letter and one number."
                      className="w-full px-5 py-3 rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 placeholder:text-sm font-medium transition-all duration-200 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:shadow-lg focus:shadow-emerald-500/10"
                    />
                  </div>
                  <div className="group">
                    <label className="block text-sm font-semibold text-slate-900 mb-3">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      placeholder="Re-enter password"
                      className="w-full px-5 py-3 rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 placeholder:text-sm font-medium transition-all duration-200 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:shadow-lg focus:shadow-emerald-500/10"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-7">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-sm font-semibold text-slate-900 mb-3">
                      GST Registered?
                    </label>
                    <select
                      value={gstRegistered}
                      onChange={(e) => setGstRegistered(e.target.value)}
                      className="w-full px-5 py-3 rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-900 font-medium transition-all duration-200 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:shadow-lg focus:shadow-emerald-500/10"
                    >
                      <option value="Select option">Select option</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>

                  {gstRegistered === "Yes" && (
                    <div className="group">
                      <label className="block text-sm font-semibold text-slate-900 mb-3">
                        GST Number
                      </label>
                      <input
                        type="text"
                        placeholder="Enter 15-digit GSTIN"
                        className="w-full px-5 py-3 rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 font-medium transition-all duration-200 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:shadow-lg focus:shadow-emerald-500/10"
                      />
                    </div>
                  )}

                  <div className="group">
                    <label className="block text-sm font-semibold text-slate-900 mb-3">
                      Business Type
                    </label>
                    <select className="w-full px-5 py-3 rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-900 font-medium transition-all duration-200 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:shadow-lg focus:shadow-emerald-500/10">
                      <option>Sole Proprietorship</option>
                      <option>Partnership Firm</option>
                      <option>Limited Liability Partnership (LLP)</option>
                      <option>Private Limited Company</option>
                      <option>One Person Company (OPC)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-4">
                    Services Offered
                  </label>
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      "Dry Cleaning",
                      "Washing",
                      "Steam Iron",
                      "Darning/Repair",
                    ].map((service) => (
                      <label
                        key={service}
                        className="flex items-center gap-4 p-4 rounded-xl border-2 border-slate-200 bg-slate-50 hover:border-emerald-300 hover:bg-emerald-50/30 cursor-pointer transition-all duration-200"
                      >
                        <input
                          type="checkbox"
                          className="w-5 h-5 rounded-md border-2 border-slate-300 text-emerald-500 focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
                        />
                        <span className="text-base font-medium text-slate-900">
                          {service}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="border-t-2 border-slate-200 pt-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-slate-900">
                      Outlet Details
                    </h3>
                    <button
                      onClick={addOutlet}
                      className="flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add Another Outlet
                    </button>
                  </div>

                  <div className="space-y-8">
                    {outlets.map((outlet, index) => (
                      <div
                        key={outlet.id}
                        className="relative bg-slate-50/50 p-6 rounded-2xl border border-slate-200"
                      >
                        {outlets.length > 1 && (
                          <div className="absolute -top-3 -right-3">
                            <button
                              onClick={() => removeOutlet(outlet.id)}
                              className="p-2 bg-white text-red-500 rounded-full shadow-md border border-slate-100 hover:bg-red-50 transition-colors"
                              title="Remove outlet"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}

                        {outlets.length > 1 && (
                          <div className="mb-4 text-sm font-semibold text-slate-500 uppercase tracking-wider">
                            Outlet #{index + 1}
                          </div>
                        )}

                        <div className="space-y-6">
                          <div className="group">
                            <label className="block text-sm font-semibold text-slate-900 mb-3">
                              Outlet Name
                            </label>
                            <div className="text-xs text-slate-500 mb-2">
                              This name will be visible to Admin
                            </div>
                            <input
                              type="text"
                              value={outlet.name}
                              onChange={(e) =>
                                updateOutlet(outlet.id, "name", e.target.value)
                              }
                              placeholder="Name of your outlet"
                              className="w-full px-5 py-3 rounded-xl border-2 border-slate-200 bg-white text-slate-900 placeholder-slate-400 font-medium transition-all duration-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:shadow-lg focus:shadow-emerald-500/10"
                            />
                          </div>

                          <div className="grid sm:grid-cols-2 gap-6">
                            <div className="group">
                              <label className="block text-sm font-semibold text-slate-900 mb-3">
                                Street Address
                              </label>
                              <input
                                type="text"
                                value={outlet.address}
                                onChange={(e) =>
                                  updateOutlet(
                                    outlet.id,
                                    "address",
                                    e.target.value,
                                  )
                                }
                                placeholder="Enter complete address"
                                className="w-full px-5 py-3 rounded-xl border-2 border-slate-200 bg-white text-slate-900 placeholder-slate-400 font-medium transition-all duration-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:shadow-lg focus:shadow-emerald-500/10"
                              />
                            </div>
                            <div className="group">
                              <label className="block text-sm font-semibold text-slate-900 mb-3">
                                State
                              </label>
                              <input
                                type="text"
                                value={outlet.state}
                                onChange={(e) =>
                                  updateOutlet(
                                    outlet.id,
                                    "state",
                                    e.target.value,
                                  )
                                }
                                placeholder="State"
                                className="w-full px-5 py-3 rounded-xl border-2 border-slate-200 bg-white text-slate-900 placeholder-slate-400 font-medium transition-all duration-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:shadow-lg focus:shadow-emerald-500/10"
                              />
                            </div>
                          </div>

                          <div className="grid sm:grid-cols-2 gap-6">
                            <div className="group">
                              <label className="block text-sm font-semibold text-slate-900 mb-3">
                                City
                              </label>
                              <input
                                type="text"
                                value={outlet.city}
                                onChange={(e) =>
                                  updateOutlet(
                                    outlet.id,
                                    "city",
                                    e.target.value,
                                  )
                                }
                                placeholder="City name"
                                className="w-full px-5 py-3 rounded-xl border-2 border-slate-200 bg-white text-slate-900 placeholder-slate-400 font-medium transition-all duration-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:shadow-lg focus:shadow-emerald-500/10"
                              />
                            </div>
                            <div className="group">
                              <label className="block text-sm font-semibold text-slate-900 mb-3">
                                Pincode
                              </label>
                              <input
                                type="text"
                                value={outlet.pincode}
                                onChange={(e) =>
                                  handlePincodeChange(outlet.id, e.target.value)
                                }
                                placeholder="6-digit code"
                                maxLength={6}
                                className="w-full px-5 py-3 rounded-xl border-2 border-slate-200 bg-white text-slate-900 placeholder-slate-400 font-medium transition-all duration-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:shadow-lg focus:shadow-emerald-500/10"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="mt-6">
                          <label className="block text-sm font-semibold text-slate-900 mb-2">
                            Store Timings
                          </label>
                          <p className="text-xs text-slate-500 mb-3">
                            Used to schedule pickups and deliveries
                          </p>
                          <div className="grid sm:grid-cols-2 gap-6">
                            <div className="group">
                              <label className="block text-sm font-semibold text-slate-900 mb-3">
                                Opening Time
                              </label>
                              <input
                                type="time"
                                value={outlet.openingTime}
                                onChange={(e) =>
                                  updateOutlet(
                                    outlet.id,
                                    "openingTime",
                                    e.target.value,
                                  )
                                }
                                className="w-full px-5 py-3 rounded-xl border-2 border-slate-200 bg-white text-slate-900 font-medium transition-all duration-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:shadow-lg focus:shadow-emerald-500/10"
                              />
                            </div>
                            <div className="group">
                              <label className="block text-sm font-semibold text-slate-900 mb-3">
                                Closing Time
                              </label>
                              <input
                                type="time"
                                value={outlet.closingTime}
                                onChange={(e) =>
                                  updateOutlet(
                                    outlet.id,
                                    "closingTime",
                                    e.target.value,
                                  )
                                }
                                className="w-full px-5 py-3 rounded-xl border-2 border-slate-200 bg-white text-slate-900 font-medium transition-all duration-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:shadow-lg focus:shadow-emerald-500/10"
                              />
                            </div>
                          </div>
                          <p className="text-center text-sm mt-4 text-slate-500 ">
                            You can edit services, timings and outlets later
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {outlets.length > 0 && (
                    <div className="mt-6 flex justify-center">
                      <button
                        onClick={addOutlet}
                        className="w-full py-4 border-2 border-dashed border-slate-300 rounded-xl text-slate-600 font-semibold hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50/30 transition-all duration-200 flex flex-col items-center justify-center gap-1 h-auto"
                      >
                        <div className="flex items-center gap-2">
                          <Plus className="w-5 h-5" />
                          <span>Add Another Outlet</span>
                        </div>
                        <span className="font-normal text-slate-400 text-xs">
                          You can add more outlets later from your dashboard.
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-7">
                <div className="group">
                  <label className="block text-sm font-semibold text-slate-900 mb-3">
                    Daily Processing Capacity
                  </label>
                  <input
                    type="number"
                    placeholder="Enter maximum garments/items you can process per day."
                    className="w-full px-5 py-3 rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 font-medium transition-all duration-200 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:shadow-lg focus:shadow-emerald-500/10"
                  />
                  <p className="text-sm mt-4 text-slate-500 ">
                    Used to allocate orders based on your operational limits.
                  </p>
                </div>

                <div className="border-t-2 border-slate-200 pt-8">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Bank Account Details
                  </h3>
                  <div className="flex items-center gap-2 mb-6 text-slate-500">
                    <p className="text-sm">
                      🔒 Your bank details are securely encrypted and used only
                      for payout processing.
                    </p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-sm font-semibold text-slate-900 mb-3">
                        Account Holder Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Exactly as per Bank Records"
                        className="w-full px-5 py-3 rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 font-medium transition-all duration-200 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:shadow-lg focus:shadow-emerald-500/10"
                      />
                    </div>
                    <div className="group">
                      <label className="block text-sm font-semibold text-slate-900 mb-3">
                        Bank Name
                      </label>
                      <input
                        type="text"
                        placeholder="Your bank name"
                        className="w-full px-5 py-3 rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 font-medium transition-all duration-200 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:shadow-lg focus:shadow-emerald-500/10"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6 mt-6">
                    <div className="group">
                      <label className="block text-sm font-semibold text-slate-900 mb-3">
                        Account Number
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Bank Account Number (no spaces)"
                        className="w-full px-5 py-3 rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 font-medium transition-all duration-200 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:shadow-lg focus:shadow-emerald-500/10"
                      />
                    </div>
                    <div className="group">
                      <label className="block text-sm font-semibold text-slate-900 mb-3">
                        Confirm Account Number
                      </label>
                      <input
                        type="text"
                        placeholder="Re-enter Bank Account Number"
                        className="w-full px-5 py-3 rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 font-medium transition-all duration-200 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:shadow-lg focus:shadow-emerald-500/10"
                      />
                    </div>
                    <div className="group">
                      <label className="block text-sm font-semibold text-slate-900 mb-3">
                        IFSC Code
                      </label>
                      <input
                        type="text"
                        placeholder="11-character IFSC Code"
                        className="w-full px-5 py-3 rounded-xl border-2 border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 font-medium transition-all duration-200 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:shadow-lg focus:shadow-emerald-500/10"
                      />
                    </div>
                  </div>
                  <div className="mt-8 bg-emerald-50/50 rounded-xl p-5 border border-emerald-100">
                    <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Payouts
                    </h4>
                    <ul className="space-y-2 text-sm text-slate-600 ml-6 list-disc marker:text-emerald-500">
                      <li>Processed every Friday.</li>
                      <li>Covers completed orders.</li>
                      <li>Credited within 1-2 working days.</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-8">
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Aadhaar Card (Authorized Signatory)",
                      desc: "Upload clear front and back copies.",
                    },
                    {
                      title: "PAN Card (Business PAN)",
                      desc: "Upload a clear scanned copy.",
                    },
                    { title: "Passport", desc: "First and Last Page" },
                    {
                      title: "GST Registration Certificate (If Applicable)",
                      desc: "Required only if GST registered.",
                    },
                    {
                      title: "Business Registration Certificate",
                      desc: "(Udyam/Shop Act/Partnership Deed/Incorporation Certificate)",
                    },
                  ].map((doc, index) => (
                    <div
                      key={index}
                      className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-emerald-400 hover:bg-emerald-50/30 transition-all duration-200 group"
                    >
                      <div className="w-12 h-12 mx-auto mb-3 bg-slate-100 group-hover:bg-emerald-100 rounded-full flex items-center justify-center transition-colors duration-200">
                        <svg
                          className="w-6 h-6 text-slate-600 group-hover:text-emerald-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm">
                        {doc.title}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 mb-3">
                        {doc.desc}
                      </p>
                      <button className="px-4 py-2 bg-emerald-500 text-white text-xs font-semibold rounded-lg hover:bg-emerald-600 transition-all duration-200 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/40">
                        Choose File
                      </button>
                    </div>
                  ))}
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center space-y-2">
                  <p className="text-sm font-semibold text-slate-900">
                    Accepted Formats: PDF, JPG, PNG • Max 5MB per file
                  </p>
                  <p className="text-sm text-slate-600 font-medium">
                    Verification typically takes 24–48 business hours.
                  </p>
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="bg-linear-to-br from-slate-50 to-slate-100 rounded-xl p-6 border-2 border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-5 text-base">
                    Application Summary
                  </h3>
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between items-center py-3 border-b border-slate-200">
                      <span className="text-slate-600 font-medium">
                        Business Name
                      </span>
                      <span className="font-semibold text-slate-900">
                        Sample Laundry
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-slate-200">
                      <span className="text-slate-600 font-medium">Email</span>
                      <span className="font-semibold text-slate-900">
                        vendor@laundry.com
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-slate-200">
                      <span className="text-slate-600 font-medium">Mobile</span>
                      <span className="font-semibold text-slate-900">
                        +91 98765 43210
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-slate-600 font-medium">
                        Location
                      </span>
                      <span className="font-semibold text-slate-900">
                        Mumbai, Maharashtra
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="flex items-start gap-4 p-4 rounded-xl border-2 border-slate-200 bg-slate-50 hover:border-emerald-300 hover:bg-emerald-50/30 cursor-pointer transition-all duration-200 group">
                    <input
                      type="checkbox"
                      className="w-5 h-5 mt-1 rounded-md border-2 border-slate-300 text-emerald-500 focus:ring-2 focus:ring-emerald-500/20 cursor-pointer shrink-0"
                    />
                    <span className="text-sm text-slate-700 font-medium">
                      I accept the{" "}
                      <span className="font-bold text-slate-900">
                        Terms and Conditions
                      </span>{" "}
                      for vendor onboarding
                    </span>
                  </label>
                  <label className="flex items-start gap-4 p-4 rounded-xl border-2 border-slate-200 bg-slate-50 hover:border-emerald-300 hover:bg-emerald-50/30 cursor-pointer transition-all duration-200 group">
                    <input
                      type="checkbox"
                      className="w-5 h-5 mt-1 rounded-md border-2 border-slate-300 text-emerald-500 focus:ring-2 focus:ring-emerald-500/20 cursor-pointer shrink-0"
                    />
                    <span className="text-sm text-slate-700 font-medium">
                      I agree with the{" "}
                      <span className="font-bold text-slate-900">
                        Service Level Agreement
                      </span>{" "}
                      and commission structure
                    </span>
                  </label>
                  <label className="flex items-start gap-4 p-4 rounded-xl border-2 border-slate-200 bg-slate-50 hover:border-emerald-300 hover:bg-emerald-50/30 cursor-pointer transition-all duration-200 group">
                    <input
                      type="checkbox"
                      className="w-5 h-5 mt-1 rounded-md border-2 border-slate-300 text-emerald-500 focus:ring-2 focus:ring-emerald-500/20 cursor-pointer shrink-0"
                    />
                    <span className="text-sm text-slate-700 font-medium">
                      I confirm all information is{" "}
                      <span className="font-bold text-slate-900">
                        correct and accurate
                      </span>
                      , and I authorize final submission
                    </span>
                  </label>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between gap-4 mt-10 pt-8 border-t-2 border-slate-200">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="px-6 sm:px-8 py-3.5 border-2 border-slate-300 text-slate-900 font-semibold rounded-xl hover:bg-slate-100 hover:border-slate-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 text-base"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className={`px-6 sm:px-8 py-3.5 rounded-xl text-base font-semibold transition-all duration-200 ${
                currentStep === STEPS.length
                  ? "bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/40"
                  : "bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/40"
              }`}
            >
              {currentStep === STEPS.length
                ? "Submit for Verification"
                : "Save & Proceed"}
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-slate-600 font-medium">
            🔒 Your data is secure and encrypted. We never share your
            information.
          </p>
        </div>
      </div>
      <Dialog open={showOtpModal} onOpenChange={setShowOtpModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-500" />
              Verify Mobile Number
            </DialogTitle>
            <DialogDescription className="text-base text-slate-600">
              We've sent a verification code to{" "}
              <span className="font-bold text-slate-900">{mobileNumber}</span>.
              Please enter it below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-6">
            <div className="grid gap-3">
              <Label
                htmlFor="otp"
                className="text-sm font-semibold text-slate-700"
              >
                Enter Verification Code
              </Label>
              <Input
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="0000"
                className="text-center text-3xl font-bold tracking-[1em] h-16 border-2 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-xl"
                maxLength={4}
              />
              <p className="text-xs text-center text-slate-500 mt-2">
                Use code{" "}
                <span className="font-mono font-bold text-slate-700">1234</span>{" "}
                for testing
              </p>
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setShowOtpModal(false)}
              className="rounded-xl font-semibold border-slate-200 h-12"
            >
              Cancel
            </Button>
            <Button
              onClick={handleVerifyOtp}
              disabled={otp.length !== 4}
              className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold h-12 shadow-lg shadow-emerald-500/20"
            >
              Verify Code
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
