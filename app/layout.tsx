import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/navbar";
import { Footer } from "@/components/Navbar/footer";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Home",
  description: "Online Booking Hotel",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={`${outfit.variable} antialiased`}>
        <SessionProvider session={session}>
          <Navbar />
          <main className="bg-white min-h-screen">{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
