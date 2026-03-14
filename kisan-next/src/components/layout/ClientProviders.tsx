"use client";

import { WeatherProvider } from "@/context/WeatherContext";
import { Navbar } from "@/components/layout/Navbar";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <WeatherProvider>
      <Navbar />
      {children}
    </WeatherProvider>
  );
}
