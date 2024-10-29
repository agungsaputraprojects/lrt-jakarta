"use client";

import Image from "next/image";
import { Header } from "@/components/ui/Header";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="pt-14 pb-4">
      <Header title="LRT x JakOne Pay" />
      <div className="px-4 py-6">
        <div className="flex justify-center mb-6">
          <Image
            src="/images/logo.png"
            alt="LRT Jakarta Logo"
            width={240}
            height={40}
            priority
          />
        </div>

        <h2 className="text-center text-xl mb-8">Selamat Datang</h2>

        <p className="text-sm text-gray-600 mb-4">
          Ekspresikan perjalananmu menggunakan LRT Pay
        </p>

        <div>
          <p className="text-sm font-medium mb-2">Nomor Telepon</p>
          <div className="space-y-4">
            <div className="relative">
              <input
                type="tel"
                placeholder="Nomor Telepon"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button
                onClick={() => router.push("/verification")}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-500 text-white px-4 py-1.5 rounded-lg text-sm"
              >
                Kirim OTP
              </button>
            </div>

            <p className="text-sm text-gray-600">
              Seluruh transaksi aman, dengan melanjutkan proses ini. Menu{" "}
              <span className="text-red-500">syarat & ketentuan</span> yang
              berlaku
            </p>
          </div>
        </div>

        <div className="fixed bottom-4 left-4 right-4 flex items-center justify-center text-sm text-gray-500">
          <span>Powered by</span>
          <Image
            src="/images/logo_bdki.png"
            alt="Bank DKI Logo"
            width={120}
            height={40}
            className="ml-2"
          />
        </div>
      </div>
    </main>
  );
}
