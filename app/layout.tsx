import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google"; // Changed font
import "./globals.css";
import { Navbar } from "@/components/features/navigation/navbar";
import { Footer } from "@/components/features/navigation/footer";
import { ProductMenuProvider } from "@/components/features/navigation/menus/product-menu-context";
import { ServiceMenuProvider } from "@/components/features/navigation/menus/service-menu-context";
import { WebVitalsProvider } from "@/components/providers/web-vitals-provider";
import { CookieConsentProvider } from "@/components/providers/cookie-consent-context";
import { CookieConsentBanner } from "@/components/ui/cookie-consent-banner";
import { GoogleAnalyticsProvider } from "@/components/providers/google-analytics-provider";
import { ToastProvider } from "@/components/ui/toast";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { generateHomeMetadata } from "@/lib/seo/metadata";
import { generateOrganizationSchema, generateWebsiteSchema } from "@/lib/seo/structured-data";
import { StructuredDataComponent } from "@/components/seo/structured-data";
import { BackgroundLayout } from "@/components/ui/background/background-layout";

const jakarta = Plus_Jakarta_Sans({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  ...generateHomeMetadata(),
  icons: {
    icon: "/fav.svg",
    shortcut: "/fav.svg",
    apple: "/fav.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  // Generate structured data for Organization and Website
  const structuredData = [
    generateOrganizationSchema(),
    generateWebsiteSchema(),
  ];

  return (
    <html lang="en">
      <body
        className={`${jakarta.variable} font-jakarta antialiased flex flex-col min-h-screen`}
      >
        <BackgroundLayout />
        <StructuredDataComponent data={structuredData} />
        <ToastProvider>
          <CookieConsentProvider>
            <WebVitalsProvider>
              <SmoothScrollProvider>
                <ProductMenuProvider>
                  <ServiceMenuProvider>
                    <Navbar />
                    <main className="flex-1">{children}</main>
                    <Footer />
                    <CookieConsentBanner />
                  </ServiceMenuProvider>
                </ProductMenuProvider>
              </SmoothScrollProvider>
            </WebVitalsProvider>
            <GoogleAnalyticsProvider gaId={gaId} />
          </CookieConsentProvider>
        </ToastProvider>
      </body>
    </html>
  );
}

