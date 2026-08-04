import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
  display: "swap",
});

const somar = localFont({
  src: "../../public/font/Somar.otf",
  variable: "--font-somar",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "ملكة الأزياء - غرفة القياس الذكية",
  description: "جربي ملابسك افتراضياً واعرفي مقاسك المناسب",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png" },
      { url: "/logo.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/logo.png",
  },
  openGraph: {
    title: "ملكة الأزياء - غرفة القياس الذكية",
    description: "جربي ملابسك افتراضياً واعرفي مقاسك المناسب",
    images: [
      {
        url: "/logo-horizontal.png",
        width: 2048,
        height: 1286,
        alt: "Malikat Al Azya",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ملكة الأزياء - غرفة القياس الذكية",
    description: "جربي ملابسك افتراضياً واعرفي مقاسك المناسب",
    images: ["/logo-horizontal.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${cairo.variable} ${somar.variable} antialiased font-sans bg-gray-50`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
