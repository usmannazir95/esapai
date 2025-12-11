import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ProductMenuProvider } from "@/components/layout/product-menu-context";
import { ServiceMenuProvider } from "@/components/layout/service-menu-context";
import { WebVitalsProvider } from "@/components/providers/web-vitals-provider";
import { CookieConsentProvider } from "@/components/providers/cookie-consent-context";
import { CookieConsentBanner } from "@/components/ui/cookie-consent-banner";
import { GoogleAnalyticsProvider } from "@/components/providers/google-analytics-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ESAP AI",
  description: "Security AI Platform to Protect the Entire Enterprise.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <CookieConsentProvider>
          <WebVitalsProvider>
            <ProductMenuProvider>
              <ServiceMenuProvider>
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
                <CookieConsentBanner />
              </ServiceMenuProvider>
            </ProductMenuProvider>
          </WebVitalsProvider>
          <GoogleAnalyticsProvider gaId={gaId} />
        </CookieConsentProvider>
      </body>
    </html>
  );
}

