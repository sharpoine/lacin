import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import AdminLayoutWrapper from "@/components/layout/Admin/AdminLayoutWrapper";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "Admin Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Toaster richColors position="top-right" />
        <div className="min-h-screen bg-[#f7f4ee] text-slate-900">
          <AdminLayoutWrapper>
            {children}
          </AdminLayoutWrapper>
        </div>
      </body>
    </html>
  );
}
