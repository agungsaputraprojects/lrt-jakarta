"use client";

import { useState } from "react";
import { Header } from "@/components/ui/Header";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertCircle } from "lucide-react";

const AMOUNTS = [
  { value: 50000, display: "50.000" },
  { value: 100000, display: "100.000" },
  { value: 150000, display: "150.000" },
  { value: 200000, display: "200.000" },
  { value: 250000, display: "250.000" },
  { value: 300000, display: "300.000" },
];

export default function TopUpAmountClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const method = searchParams.get("method");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [error, setError] = useState("");

  const formatTitle = (method: string | null) => {
    if (!method) return "";
    return (
      "Via " +
      method
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    );
  };

  const handleAmountClick = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount(amount.toString());
    setError("");
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setCustomAmount(value);
    setSelectedAmount(null);

    if (value && parseInt(value) < 20000) {
      setError("Minimum top up amount Rp 20.000");
    } else {
      setError("");
    }
  };

  const handleNext = () => {
    const finalAmount = customAmount ? parseInt(customAmount) : 0;

    if (finalAmount < 20000) {
      setError("Minimum top up amount Rp 20.000");
      return;
    }

    console.log("Processing amount:", finalAmount);
  };

  const isValidAmount = customAmount && parseInt(customAmount) >= 20000;

  return (
    <main className="min-h-screen bg-white pb-6">
      <Header title="Top Up LRTPay" onBackClick={() => router.back()} />

      <div className="px-4 pt-20">
        {/* Title with Icon */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6 text-red-500"
              fill="currentColor"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z" />
            </svg>
          </div>
          <span className="text-lg font-medium">{formatTitle(method)}</span>
        </div>

        {/* Top Up Information */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <div className="flex gap-2">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <div>
              <p className="font-medium text-red-500">Top Up Information</p>
              <p className="text-sm text-gray-600 mt-1">
                You can save up to Rp 2.000.000 with maximum transactions of Rp
                20.000.000 per month
              </p>
            </div>
          </div>
        </div>

        {/* Amount Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {AMOUNTS.map((amount) => (
            <button
              key={amount.value}
              onClick={() => handleAmountClick(amount.value)}
              className={`p-4 rounded-xl flex items-center gap-3 ${
                selectedAmount === amount.value
                  ? "bg-white border border-red-500"
                  : "bg-gray-50"
              }`}
            >
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 text-red-500"
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z" />
                </svg>
              </div>
              <span className="font-medium">Rp{amount.display}</span>
            </button>
          ))}
        </div>

        {/* Custom Amount Input */}
        <div className="space-y-2 mb-6">
          <p className="font-medium">Enter Another Amount</p>
          <div className="bg-gray-50 rounded-xl px-4 py-3">
            <div className="flex items-center">
              <span className="text-gray-400 mr-2 text-lg">Rp</span>
              <input
                type="text"
                value={customAmount}
                onChange={handleCustomAmountChange}
                className="flex-1 bg-transparent text-lg focus:outline-none"
                placeholder="0"
              />
            </div>
          </div>
          <div className="flex items-center gap-1 text-gray-500">
            <AlertCircle className="w-4 h-4" />
            <span
              className={`text-sm ${error ? "text-red-500" : "text-gray-500"}`}
            >
              {error || "Minimum top up amount Rp 20.000"}
            </span>
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className={`w-full py-4 rounded-xl text-center transition-colors ${
            isValidAmount
              ? "bg-red-500 text-white"
              : "bg-gray-100 text-gray-400"
          }`}
          disabled={!isValidAmount}
        >
          Next
        </button>
      </div>
    </main>
  );
}
