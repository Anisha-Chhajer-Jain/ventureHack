import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KisanDost - Digital Companion for Farmers",
  description: "Crop health, fertilizer calculator, and NDVI tracking for farmers in India.",
  manifest: "/manifest.json"
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

import { ClientProviders } from "@/components/layout/ClientProviders";

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <ClerkProvider signInFallbackRedirectUrl={`/${locale}/`} signUpFallbackRedirectUrl={`/${locale}/`}>
      <html lang={locale} suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <NextIntlClientProvider messages={messages} locale={locale}>
            <ClientProviders>
              <main>{children}</main>
            </ClientProviders>
            <Toaster />
          </NextIntlClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
