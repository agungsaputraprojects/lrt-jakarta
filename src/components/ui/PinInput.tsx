import React, { useRef, useState, useEffect } from "react";

interface PinInputProps {
  length?: number;
  onComplete?: (pin: string) => void;
  value?: string;
}

export const PinInput = ({ length = 6, onComplete, value }: PinInputProps) => {
  const [pin, setPin] = useState<string[]>(new Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Reset pin when value prop changes
  useEffect(() => {
    if (value !== undefined) {
      setPin(value ? value.split("") : new Array(length).fill(""));
    }
  }, [value, length]);

  // Focus first input on mount
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
    <div className="flex justify-between gap-2">
      {pin.map((_, index) => (
        <input
          key={index}
          type="password"
          inputMode="numeric"
          maxLength={1}
          ref={(element) => {
            inputRefs.current[index] = element;
          }}
          value={pin[index]}
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="w-12 h-12 border border-red-500 rounded text-center text-xl focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-500"
        />
      ))}
    </div>
  );
};
