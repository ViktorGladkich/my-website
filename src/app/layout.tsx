import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "INVERTA | Digital Agency",
  description: "Premium Website Development and SMM Services in Germany",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-black text-white">{children}</body>
    </html>
  );
}
