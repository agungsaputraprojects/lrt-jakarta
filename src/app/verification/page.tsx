"use client";

import { Header } from "@/components/ui/Header";
import { OtpInput } from "@/components/ui/OtpInput";
import { Timer } from "@/components/ui/Timer";
import { useRouter } from "next/navigation";

export default function VerificationPage() {
  const router = useRouter();
  const phoneNumber = "085839328544"; // Ini seharusnya dari state management atau URL params

  const handleBackClick = () => {
    router.back();
  };

  const handleOtpComplete = (otp: string) => {
    console.log("OTP Completed:", otp);
    // Handle OTP verification here
  };

  const handleResendCode = () => {
    console.log("Resending code...");
    router.push("/register");
    // Handle resend logic here
  };

  return (
    <main className="pt-14 pb-4">
      <Header title="Verifikasi Kode OTP" onBackClick={handleBackClick} />

      <div className="px-4 py-6">
        <p className="text-gray-600 text-sm">
          Masukkan 6 digit kode yang sudah dikirim ke nomor kamu dibawah ini ya!
        </p>
        <p className="text-red-500 text-sm mt-1">{phoneNumber}</p>

        <OtpInput length={6} onComplete={handleOtpComplete} />

        <div className="text-center">
          <p className="text-gray-600 text-sm">Tidak terima kode?</p>
          <div className="text-sm text-gray-600 mt-1">
            Kirim kode kembali dalam{" "}
            <Timer initialSeconds={10} onComplete={handleResendCode} />
          </div>
        </div>
      </div>
    </main>
  );
}
