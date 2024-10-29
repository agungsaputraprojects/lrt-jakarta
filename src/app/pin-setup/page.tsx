"use client";

import { useState } from "react";
import { Header } from "@/components/ui/Header";
import { PinInput } from "@/components/ui/PinInput";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ErrorPopup } from "@/components/ui/ErrorPopup";

export default function PinSetupPage() {
  const router = useRouter();
  const [pin, setPin] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmPin, setConfirmPin] = useState("");
  const [resetKey, setResetKey] = useState(0);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const handlePinComplete = (value: string) => {
    setPin(value);
    setShowConfirmation(true);
    setConfirmPin("");
    setResetKey((prev) => prev + 1);
  };

  const handleConfirmPinComplete = (value: string) => {
    setConfirmPin(value);
    if (value === pin) {
      router.push("/top-up");
    } else {
      setConfirmPin("");
      setResetKey((prev) => prev + 1);
      setShowErrorPopup(true);
    }
  };

  const handleCloseErrorPopup = () => {
    setShowErrorPopup(false);
  };

  const handleBackClick = () => {
    if (showConfirmation) {
      setShowConfirmation(false);
      setConfirmPin("");
      setResetKey((prev) => prev + 1);
    } else {
      router.back();
    }
  };

  return (
    <main className="pt-14 pb-4 min-h-screen bg-white">
      <Header title="LRT x JakOne Pay" onBackClick={handleBackClick} />

      {!showConfirmation ? (
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

          <h2 className="text-center text-xl mb-8">Buat PIN kamu!</h2>

          <PinInput length={6} onComplete={handlePinComplete} />

          <div className="mt-12 flex flex-col items-center">
            <Image
              src="/images/maskot.png"
              alt="Mascot"
              width={300}
              height={300}
              priority
            />
            <p className="text-center mt-4 text-gray-600">
              Seluruh informasi kamu terlindungi
            </p>
          </div>
        </div>
      ) : (
        <div className="px-4 py-6">
          <div className="flex justify-center mb-8">
            <Image
              src="/images/logo.png"
              alt="LRT Jakarta Logo"
              width={120}
              height={40}
              priority
            />
          </div>

          <h2 className="text-center text-xl mb-8">Konfirmasi PIN kamu!</h2>

          <PinInput
            key={resetKey}
            length={6}
            onComplete={handleConfirmPinComplete}
          />
        </div>
      )}

      <div className="fixed bottom-4 left-0 right-0 flex items-center justify-center text-sm text-gray-500 gap-2">
        <span>Powered by</span>
        <Image
          src="/images/logo_bdki.png"
          alt="Bank DKI Logo"
          width={120}
          height={40}
        />
      </div>

      <ErrorPopup isOpen={showErrorPopup} onClose={handleCloseErrorPopup} />
    </main>
  );
}
