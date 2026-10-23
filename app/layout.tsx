import type { Metadata, Viewport } from "next";
import { Archivo_Narrow } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/providers/query-provider";
import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";

const archivo = Archivo_Narrow({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Fastlane Mini Bikes | Your 1 Stop Mini Bike Shop For Parts & Upgrades",
  description:
    "Est 2015 in Los Angeles Fast Lane Mini Bikes LLC is Your 1 Stop Mini Bike Shop For Parts & Upgrades. Shop roller kits, complete mini bikes, 212cc engines, custom seats, and racing exhausts.",
  keywords: [
    "mini bikes",
    "fastlane mini bikes",
    "roller kit",
    "212cc engine",
    "custom mini bikes",
    "mini bike parts",
    "predator 212",
    "PWK carburetor",
    "racing exhaust",
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://fastlaneminibikes.com"),
  openGraph: {
    title: "Fastlane Mini Bikes | Your 1 Stop Mini Bike Shop",
    description: "Est 2015 in Los Angeles Fast Lane Mini Bikes LLC. Parts, roller kits, complete mini bikes, and upgrades.",
    url: "https://fastlaneminibikes.com",
    siteName: "Fastlane Mini Bikes",
    images: [
      {
        url: "https://fastlaneminibikes.com/cdn/shop/files/FL_1_d39e2372-6212-4da8-a635-345ca33bc321.png?v=1685030855",
        width: 1200,
        height: 628,
        alt: "Fastlane Mini Bikes",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fastlane Mini Bikes",
    description: "Your 1 Stop Mini Bike Shop For Parts & Upgrades.",
    images: ["https://fastlaneminibikes.com/cdn/shop/files/FL_1_d39e2372-6212-4da8-a635-345ca33bc321.png?v=1685030855"],
  },
  icons: {
    icon: "https://fastlaneminibikes.com/cdn/shop/files/FAV_32x32.png?v=1682567918",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${archivo.variable} dark bg-black`}>
      <body className="min-h-screen bg-black text-white flex flex-col antialiased selection:bg-red-600 selection:text-white">
        <QueryProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <CartDrawer />
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
