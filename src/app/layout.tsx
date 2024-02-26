import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import NavBar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NTU Mods",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="w-screen h-screen flex flex-col">
          <div className="fixed h-16 px-36 w-full bg-blue-100 shadow shadow-blue-100">
            <NavBar />
          </div>
            <main className="mt-16 px-36 p-12 w-full h-full">
              {children}
            </main>
        </div>
      </body>
    </html>
  );
}
