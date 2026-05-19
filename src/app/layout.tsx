import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ملكة الأزياء - غرفة القياس الذكية",
  description: "جربي ملابسك افتراضياً واعرفي مقاسك المناسب",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${cairo.variable} antialiased font-sans bg-gray-50`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
