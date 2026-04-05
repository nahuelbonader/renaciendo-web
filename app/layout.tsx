import type { Metadata } from "next";
import { Gowun_Dodum } from "next/font/google";
import { landing } from "@/content/landing";
import Navbar from "@/components/Navbar";
import "./globals.css";

const gowunDodum = Gowun_Dodum({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-gowun",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://renaciendoensolmayor.com.ar"),
  title: landing.metadata.title,
  description: landing.metadata.description,
  openGraph: {
    title: landing.metadata.title,
    description: landing.metadata.description,
    url: "https://renaciendoensolmayor.com.ar",
    siteName: landing.metadata.title,
    images: [
      {
        url: "/images/logo-sun.png",
        alt: landing.metadata.title,
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: landing.metadata.title,
    description: landing.metadata.description,
    images: ["/images/logo-sun.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={gowunDodum.variable}>
      <body className="font-gowun antialiased text-text-primary bg-surface-base">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
