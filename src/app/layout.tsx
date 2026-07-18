import type { Metadata } from "next";
import { Cinzel, Inter, Oswald } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
  weight: ["700"],
});


export const metadata: Metadata = {
  title: "Abhinav Tiwari — Systems Architect & Flutter Developer",
  description:
    "Portfolio of Abhinav Tiwari — EL'28 | Flutter Developer | Machine Learning | Cross-platform App Architecture | Hardware-Software Integration. Architecting end-to-end systems spanning IoT hardware-software co-design, real-time concurrent pipelines, and cloud-connected backends.",
  keywords: [
    "Abhinav Tiwari",
    "Flutter Developer",
    "Machine Learning",
    "IoT",
    "ESP32",
    "Full Stack Developer",
    "Portfolio",
  ],
  authors: [{ name: "Abhinav Tiwari" }],
  openGraph: {
    title: "Abhinav Tiwari — Systems Architect & Flutter Developer",
    description:
      "Architecting end-to-end systems spanning IoT hardware-software co-design, real-time concurrent pipelines, and cloud-connected backends.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${inter.variable} ${oswald.variable}`}>
      <body className="bg-obsidian text-ivory antialiased">
        {children}
      </body>
    </html>

  );
}
