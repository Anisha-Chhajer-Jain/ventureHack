"use client";

import { WeatherProvider } from "@/context/WeatherContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <WeatherProvider>
      <Navbar />
      {children}
      <Footer />
      <ChatWidget />
    </WeatherProvider>
  );
}
