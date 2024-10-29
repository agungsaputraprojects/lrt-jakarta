import React, { useRef, useState } from "react";

interface OtpInputProps {
  length?: number;
  onComplete?: (otp: string) => void;
}

export const OtpInput = ({ length = 6, onComplete }: OtpInputProps) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    const value = element.value;
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    // Allow only one input
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Move to next input if current field is filled
    if (element.value !== "") {
      if (index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
      const otpString = newOtp.join("");
      if (otpString.length === length && onComplete) {
        onComplete(otpString);
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (index > 0 && !otp[index]) {
        inputRefs.current[index - 1]?.focus();
      }
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  return (
    <div className="flex justify-between gap-2 my-8">
      {otp.map((_, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          maxLength={1}
          ref={(element) => {
            inputRefs.current[index] = element;
          }}
          value={otp[index]}
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="w-12 h-12 border-b-2 border-gray-300 text-center text-xl focus:border-red-500 focus:outline-none"
        />
      ))}
    </div>
  );
};
