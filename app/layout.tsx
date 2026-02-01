import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Adaline - The single platform to iterate, evaluate, deploy, and monitor AI agents",
  description: "Adaline is the end-to-end platform for world-class product and engineering teams building AI-powered applications.",
  icons: {
    icon: [
      { url: "/favicon-light-mode.png", media: "(prefers-color-scheme: light)" },
      { url: "/favicon-dark-mode.png", media: "(prefers-color-scheme: dark)" },
    ],
    apple: "/favicon-light-mode.png",
  },
  openGraph: {
    title: "Adaline - The single platform to iterate, evaluate, deploy, and monitor AI agents",
    description: "Adaline is the end-to-end platform for world-class product and engineering teams building AI-powered applications.",
    url: "https://adaline.ai",
    siteName: "Adaline",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adaline - The single platform to iterate, evaluate, deploy, and monitor AI agents",
    description: "Adaline is the end-to-end platform for world-class product and engineering teams building AI-powered applications.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
