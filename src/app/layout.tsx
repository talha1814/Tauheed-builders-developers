import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tauheedbuilders.com"),
  title: {
    default: "Tauheed Builders & Developers | Premier Real Estate Developments in Karachi",
    template: "%s | Tauheed Builders & Developers",
  },
  description:
    "Explore landmark residential towers, corporate office suites, and luxury villas in Karachi by Tauheed Builders & Developers. Structural excellence and flexible payment plans.",
  keywords: [
    "Tauheed Builders",
    "Tauheed Developers",
    "Real Estate Karachi",
    "Luxury Apartments Karachi",
    "Commercial Offices Shahrah-e-Faisal",
    "Property Investment Pakistan",
    "Apartments on Installment Karachi",
  ],
  authors: [{ name: "Tauheed Builders & Developers" }],
  creator: "Tauheed Builders & Developers",
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "https://tauheedbuilders.com",
    title: "Tauheed Builders & Developers | Architectural Landmarks in Karachi",
    description: "Pioneering luxury living and corporate developments with uncompromising engineering standards.",
    siteName: "Tauheed Builders & Developers",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 800,
        alt: "Tauheed Builders & Developers Logo",
      },
    ],
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
      </head>
      <body className="min-h-screen flex flex-col bg-[#F7F6F2] text-[#202124] antialiased">
        {children}
      </body>
    </html>
  );
}
