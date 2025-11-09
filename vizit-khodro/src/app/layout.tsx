import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazirmatn",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "ویزیت خودرو | خدمات و تعمیرات تخصصی خودرو در مشهد",
    template: "%s | ویزیت خودرو",
  },
  description:
    "ویزیت خودرو با تیم متخصص، تعمیرات و نگهداری خودرو را در مشهد با استانداردهای بین‌المللی، ضمانت کتبی و پشتیبانی ۲۴ ساعته ارائه می‌دهد.",
  keywords: [
    "تعمیر خودرو مشهد",
    "خدمات خودرو در محل",
    "تعمیرگاه تخصصی مشهد",
    "بازدید دوره‌ای خودرو",
    "کاور سرامیک و دیتیلینگ",
  ],
  metadataBase: new URL("https://agentic-1f08aef6.vercel.app"),
  alternates: {
    canonical: "https://agentic-1f08aef6.vercel.app",
  },
  openGraph: {
    title: "ویزیت خودرو | تعمیرات و خدمات کامل خودرو در مشهد",
    description:
      "همراه شما در تعمیرات حرفه‌ای، سرویس‌های دوره‌ای، کارشناسی قبل از خرید و خدمات در محل با پشتیبانی ۲۴ ساعته.",
    url: "https://agentic-1f08aef6.vercel.app",
    siteName: "ویزیت خودرو",
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ویزیت خودرو",
    description:
      "تعمیرات و خدمات تخصصی خودرو در مشهد با ضمانت کتبی و اعزام تکنسین در محل.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className={`${vazirmatn.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
