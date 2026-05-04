import type { Metadata } from "next";
import { Inter, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import CustomCursor from "@/components/CustomCursor";
import ConnectPopup from "@/components/ConnectPopup";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Javad | Full Stack Developer",
  description:
    "Full-stack developer focused on solving real problems through clean architecture, systems thinking, and modern web technologies.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${inter.variable} ${outfit.variable} ${jetbrains.variable} antialiased font-body bg-background cursor-active`}
      >
        <CustomCursor />
        <ConnectPopup />
        <NavBar />
        <main className="relative z-[2]">{children}</main>
      </body>
    </html>
  );
}
