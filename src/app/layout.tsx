import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export const metadata: Metadata = {
  title: "QuickConvo",
  description: "Convert Word to PDF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gradient-to-br from-blue-200 via-white to-purple-200">
        <Navbar />
        <div className="flex-grow max-w-[1440px] mx-auto pt-12">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
