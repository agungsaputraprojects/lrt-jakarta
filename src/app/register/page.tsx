"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Header } from "@/components/ui/Header";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

interface FormData {
  phone: string;
  name: string;
  birthDate: string;
  birthPlace: string;
  email: string;
}

interface FormErrors {
  phone?: string;
  name?: string;
  birthDate?: string;
  birthPlace?: string;
  email?: string;
}

interface TouchedFields {
  phone: boolean;
  name: boolean;
  birthDate: boolean;
  birthPlace: boolean;
  email: boolean;
}

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    phone: "",
    name: "",
    birthDate: "",
    birthPlace: "",
    email: "",
  });

  const [touched, setTouched] = useState<TouchedFields>({
    phone: false,
    name: false,
    birthDate: false,
    birthPlace: false,
    email: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (showAllErrors = false) => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Validasi nomor telepon
    if (!formData.phone.trim()) {
      newErrors.phone = "Nomor telepon wajib diisi";
      isValid = false;
    } else if (!/^\d+$/.test(formData.phone)) {
      newErrors.phone = "Nomor telepon hanya boleh berisi angka";
      isValid = false;
    }

    // Validasi nama
    if (!formData.name.trim()) {
      newErrors.name = "Nama wajib diisi";
      isValid = false;
    }

    // Validasi tanggal lahir
    if (!formData.birthDate) {
      newErrors.birthDate = "Tanggal lahir wajib diisi";
      isValid = false;
    }

    // Validasi tempat lahir
    if (!formData.birthPlace.trim()) {
      newErrors.birthPlace = "Tempat lahir wajib diisi";
      isValid = false;
    }

    // Validasi email
    if (!formData.email.trim()) {
      newErrors.email = "Email wajib diisi";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
      isValid = false;
    }

    // Hanya tampilkan error jika field sudah disentuh atau showAllErrors true
    if (!showAllErrors) {
      Object.keys(newErrors).forEach((key) => {
        if (!touched[key as keyof TouchedFields]) {
          delete newErrors[key as keyof FormErrors];
        }
      });
    }

    setErrors(newErrors);
    setIsFormValid(isValid);
    return { isValid, errors: newErrors };
  };

  useEffect(() => {
    if (isSubmitted) {
      validateForm(true);
    } else {
      validateForm(false);
    }
  }, [formData, isSubmitted]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBlur = (fieldName: keyof TouchedFields) => {
    setTouched((prev) => ({
      ...prev,
      [fieldName]: true,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    // Validasi semua field dan tampilkan semua error
    const { isValid } = validateForm(true);

    // Set semua field sebagai touched
    setTouched({
      phone: true,
      name: true,
      birthDate: true,
      birthPlace: true,
      email: true,
    });

    if (!isValid) {
      return;
    }

    console.log("Form submitted:", formData);
    router.push("/pin-setup");
  };

  return (
    <main className="min-h-screen bg-white">
      <Header title="LRT x JakOne Pay" />

      <div className="px-4 py-6 pt-20">
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
            name="phone"
            type="tel"
            placeholder="Nomor telepon/handphone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={() => handleBlur("phone")}
            error={errors.phone}
            className="bg-gray-50 border-0 h-12"
          />

          <Input
            name="name"
            type="text"
            placeholder="Nama"
            value={formData.name}
            onChange={handleChange}
            onBlur={() => handleBlur("name")}
            error={errors.name}
            className="bg-gray-50 border-0 h-12"
          />

          <Input
            name="birthDate"
            type="date"
            placeholder="dd/mm/yyyy"
            value={formData.birthDate}
            onChange={handleChange}
            onBlur={() => handleBlur("birthDate")}
            error={errors.birthDate}
            className="bg-gray-50 border-0 h-12 text-gray-500"
          />

          <Input
            name="birthPlace"
            type="text"
            placeholder="Tempat Lahir"
            value={formData.birthPlace}
            onChange={handleChange}
            onBlur={() => handleBlur("birthPlace")}
            error={errors.birthPlace}
            className="bg-gray-50 border-0 h-12"
          />

          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            onBlur={() => handleBlur("email")}
            error={errors.email}
            className="bg-gray-50 border-0 h-12"
          />

          <Button
            type="submit"
            variant="primary"
            fullWidth
            className="mt-6 h-12"
            disabled={isSubmitted && !isFormValid}
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
