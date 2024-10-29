"use client";

import { Header } from "@/components/ui/Header";
import { TopUpMethodItem } from "@/components/ui/TopUpMethodItem";
import { useRouter } from "next/navigation";
import { Smartphone, Landmark, Building2, CreditCard } from "lucide-react";

export default function TopUpPage() {
  const router = useRouter();

  const topUpMethods = [
    {
      icon: <Smartphone className="text-white w-6 h-6" />,
      title: "JakOne Mobile",
      description: "No administration fees via the JakOne Mobile Mobile App",
      path: "/top-up/amount?method=jakone-mobile",
    },
    {
      icon: <Landmark className="text-white w-6 h-6" />,
      title: "ATM Bank DKI",
      description: "Top up Martipay from nearest Bank DKI ATM",
      path: "/top-up/amount?method=atm-bank-dki",
    },
    {
      icon: <Building2 className="text-white w-6 h-6" />,
      title: "Other Bank",
      description: "Transfer anytime from your favourite Indonesia bank",
      path: "/top-up/amount?method=other-bank",
    },
    {
      icon: <CreditCard className="text-white w-6 h-6" />,
      title: "Debit Card",
      description: "Top up online using your debit card",
      path: "/top-up/amount?method=debit-card",
    },
  ];

  const handleMethodClick = (path: string) => {
    router.push(path);
  };

  return (
    <main className="min-h-screen bg-white">
      <Header title="Top Up LRTJPay" onBackClick={() => router.back()} />

      <div className="pt-20 px-4">
        <div className="bg-gray-50 rounded-xl p-4 mb-6 flex items-center gap-4">
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <CreditCard className="text-red-500 w-5 h-5" />
          </div>
          <h2 className="text-lg font-medium">Top Up Methods</h2>
        </div>

        <div className="divide-y">
          {topUpMethods.map((method, index) => (
            <TopUpMethodItem
              key={index}
              icon={method.icon}
              title={method.title}
              description={method.description}
              onClick={() => handleMethodClick(method.path)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
