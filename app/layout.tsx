import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { ToastProvider, ToastViewport } from "@/components/ui/toast";
import { Toaster } from "sonner";
import { getBusinessDetails } from "@/lib/db-utils";
import { defaultSeoDescription, getSiteUrl, siteName } from "@/lib/seo";
import { buildSitewideJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${siteName} | Study Abroad & Education Consulting`,
    template: `%s | ${siteName}`,
  },
  description: defaultSeoDescription,
  applicationName: siteName,
  generator: siteName,
  openGraph: {
    title: `${siteName} | Study Abroad & Education Consulting`,
    description: defaultSeoDescription,
    url: getSiteUrl(),
    siteName,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/banner.jpeg",
        width: 1200,
        height: 630,
        alt: `${siteName} study abroad consulting`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Study Abroad & Education Consulting`,
    description: defaultSeoDescription,
    images: ["/banner.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let structuredData = buildSitewideJsonLd()

  try {
    const businessDetails = await getBusinessDetails()
    structuredData = buildSitewideJsonLd(businessDetails)
  } catch (error) {
    console.error("Failed to load business details for structured data:", error)
  }

  return (
    <html lang="en">

      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {structuredData.map((entry, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
          />
        ))}
        <ToastProvider>
          {children}
          <ToastViewport />
        </ToastProvider>
        <Toaster richColors position="top-right" />
        <Analytics />
      </body>
    </html>
  );
}
