import type { Metadata } from "next";
import { Gowun_Dodum } from "next/font/google";
import { landing } from "@/content/landing";
import "./globals.css";

const gowunDodum = Gowun_Dodum({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-gowun",
});

export const metadata: Metadata = {
  title: landing.metadata.title,
  description: landing.metadata.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={gowunDodum.variable}>
      <body className="font-gowun antialiased text-text-primary bg-surface-base">
        {children}
      </body>
    </html>
  );
}
