import React, { useEffect, useRef, useState } from "react";

interface OtpInputProps {
  length?: number;
  onComplete?: (otp: string) => void;
  value?: string;
}

export const OtpInput = ({ length = 6, onComplete, value }: OtpInputProps) => {
  const [pin, setPin] = useState<string[]>(new Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (element: HTMLInputElement, index: number) => {
    const value = element.value;
    if (isNaN(Number(value))) return;

    const newPin = [...pin];
    newPin[index] = value.substring(value.length - 1);
    setPin(newPin);

    if (element.value !== "") {
      if (index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
      const pinString = newPin.join("");
      if (pinString.length === length && onComplete) {
        onComplete(pinString);
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (index > 0 && !pin[index]) {
        inputRefs.current[index - 1]?.focus();
      }
      const newPin = [...pin];
      newPin[index] = "";
      setPin(newPin);
    }
  };

  return (
    <div className="flex justify-between gap-2 my-8">
      {pin.map((_, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          ref={(element) => {
            inputRefs.current[index] = element;
          }}
          value={pin[index]}
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="w-12 text-black h-12 border-b-2 border-gray-300 text-center text-xl focus:border-red-500 focus:outline-none"
        />
      ))}
    </div>
  );
};
