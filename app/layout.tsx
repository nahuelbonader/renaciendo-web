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
  keywords: landing.metadata.keywords,
  alternates: {
    canonical: "https://renaciendoensolmayor.com.ar",
  },
  openGraph: {
    title: landing.metadata.title,
    description: landing.metadata.description,
    url: "https://renaciendoensolmayor.com.ar",
    siteName: landing.metadata.shortTitle,
    images: [
      {
        url: "/images/logo-sun.png",
        alt: landing.metadata.shortTitle,
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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Renaciendo en Sol Mayor",
      url: "https://renaciendoensolmayor.com.ar",
      logo: "https://renaciendoensolmayor.com.ar/images/logo-sun.png",
      description: landing.metadata.description,
      founder: {
        "@type": "Person",
        name: "Sol María Comas",
      },
      sameAs: [landing.footer.instagramUrl],
    },
    {
      "@type": "WebSite",
      name: "Renaciendo en Sol Mayor",
      url: "https://renaciendoensolmayor.com.ar",
      inLanguage: "es-AR",
    },
    ...landing.products.items.map((product) => ({
      "@type": "Product",
      name: product.title,
      description: product.description,
      brand: {
        "@type": "Brand",
        name: "Renaciendo en Sol Mayor",
      },
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/PreOrder",
        priceCurrency: "ARS",
      },
    })),
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={gowunDodum.variable}>
      <body className="font-gowun antialiased text-text-primary bg-surface-base">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
