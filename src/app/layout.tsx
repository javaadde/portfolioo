import type { Metadata } from "next";
import { Inter, Outfit, JetBrains_Mono, Playfair_Display, Space_Grotesk } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import GrainOverlay from "@/components/GrainOverlay";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-grotesk",
});

export const metadata: Metadata = {
  title: "JAVAD | Creative Technologist & Full-Stack Developer",
  description:
    "Building change-making web experiences for ambitious founders and brands who refuse to be underestimated. Powered by Next.js, GSAP & Lenis.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="lenis">
      <body
        suppressHydrationWarning={true}
        className={`${inter.variable} ${outfit.variable} ${jetbrains.variable} ${playfair.variable} ${spaceGrotesk.variable} antialiased font-body bg-[#f1f6ec] text-[#0d150e] overflow-x-hidden`}
      >
        <SmoothScrollProvider>
          <GrainOverlay />
          <NavBar />
          <main className="relative z-[2]">{children}</main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
