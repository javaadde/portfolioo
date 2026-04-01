import type { Metadata } from "next";
import { VT323 } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import CustomCursor from "@/components/CustomCursor";
import Win2000Taskbar from "@/components/Win2000Taskbar";

const vt323 = VT323({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-vt323",
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
        className={`${vt323.variable} antialiased win-desktop`}
        style={{ fontFamily: '"MS Sans Serif", "Tahoma", "Arial", sans-serif', fontSize: "11px" }}
      >
        <CustomCursor />
        <NavBar />
        <main className="relative z-[2] pb-8">{children}</main>
        <Win2000Taskbar />
      </body>
    </html>
  );
}
