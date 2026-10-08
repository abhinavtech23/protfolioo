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
  title: "Abhinav Tiwari — Software Engineer & AI Systems Developer",
  description:
    "Portfolio of Abhinav Tiwari — Software Engineer specializing in AI/ML systems, cross-platform mobile applications (Flutter), and concurrent scalable backends.",
  keywords: [
    "Abhinav Tiwari",
    "Software Engineer",
    "AI Engineer",
    "Machine Learning",
    "Flutter Developer",
    "Full Stack Developer",
    "Systems Architect",
    "Portfolio",
  ],
  authors: [{ name: "Abhinav Tiwari" }],
  openGraph: {
    title: "Abhinav Tiwari — Software Engineer & AI Systems Developer",
    description:
      "Specializing in production AI/ML integration, cross-platform Flutter systems, and concurrent scalable backends.",
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
