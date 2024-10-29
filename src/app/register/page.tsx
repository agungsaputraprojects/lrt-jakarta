"use client";

import { Header } from "@/components/ui/Header";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <main className="pt-14 pb-4 min-h-screen bg-white">
      <Header title="LRT x JakOne Pay" onBackClick={() => router.back()} />

      <div className="px-4 py-6">
        <div className="flex justify-center mb-8">
          <Image
            src="/images/logo.png"
            alt="LRT Jakarta Logo"
            width={240}
            height={40}
            priority
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Nomor telepon/handphone"
            type="tel"
            className="bg-gray-50 border-0 h-12"
          />

          <Input
            placeholder="Nama"
            type="text"
            className="bg-gray-50 border-0 h-12"
          />

          <Input
            placeholder="Tanggal Lahir"
            type="date"
            className="bg-gray-50 border-0 h-12 text-gray-500"
          />

          <Input
            placeholder="Tempat Lahir"
            type="text"
            className="bg-gray-50 border-0 h-12"
          />

          <Input
            placeholder="Email"
            type="email"
            className="bg-gray-50 border-0 h-12"
          />

          <Button
            type="submit"
            variant="primary"
            fullWidth
            className="mt-6 bg-red-600 h-12"
            onClick={() => router.push("/pin-setup")}
          >
            Daftar
          </Button>
        </form>

        <div className="fixed bottom-4 left-0 right-0 flex items-center justify-center text-sm text-gray-500 gap-2">
          <span>Powered by</span>
          <Image
            src="/images/logo_bdki.png"
            alt="Bank DKI Logo"
            width={120}
            height={40}
          />
        </div>
      </div>
    </main>
  );
}
