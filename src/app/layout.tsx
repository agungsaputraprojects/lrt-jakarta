import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${inter.className} min-h-screen bg-gray-50`}>
        <div className="max-w-md mx-auto bg-white min-h-screen relative">
          {children}
        </div>
      </body>
    </html>
  );
}
