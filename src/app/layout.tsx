"use client";

import "./globals.css";
import { Header } from "@/components/layout/Header";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { Footer } from "@/components/sections/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="dark">
      <head>
        <title>INVERTA | Digital Agency</title>
        <meta
          name="description"
          content="Premium Website Development and SMM Services in Germany"
        />
      </head>
      <body className="antialiased bg-black text-white">
        <CustomCursor />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
