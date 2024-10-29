"use client";

import { useState } from "react";
import { Header } from "@/components/ui/Header";
import { OtpInput } from "@/components/ui/OtpInput";
import { Timer } from "@/components/ui/Timer";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerificationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phoneNumber = searchParams.get("phone") || "";
  const [showResendButton, setShowResendButton] = useState(false);
  const [resetTimer, setResetTimer] = useState(0);

  const handleBackClick = () => {
    router.back();
  };

  const handleOtpComplete = (otp: string) => {
    console.log("OTP Completed:", otp);
    router.push("/register");
  };

  const handleTimerComplete = () => {
    setShowResendButton(true);
  };

  const handleResendCode = () => {
    // Reset timer dan hide tombol resend
    setShowResendButton(false);
    setResetTimer((prev) => prev + 1);
    console.log("Resending code...");
    // Di sini bisa tambahkan API call untuk mengirim ulang kode
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

        <div className="text-center space-y-1">
          <p className="text-gray-600 text-sm">Tidak terima kode?</p>
          <div className="text-sm text-gray-600">
            {showResendButton ? (
              <button
                onClick={handleResendCode}
                className="text-red-500 font-medium hover:text-red-600"
              >
                Kirim ulang
              </button>
            ) : (
              <div>
                Kirim kode kembali dalam{" "}
                <Timer
                  key={resetTimer}
                  initialSeconds={10}
                  onComplete={handleTimerComplete}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
