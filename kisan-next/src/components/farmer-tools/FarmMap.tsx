"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Loader2, MapPin } from "lucide-react";
import { useWeather } from "@/context/WeatherContext";
import { useTranslations } from "next-intl";

// Fix for default marker icons in Next.js + Leaflet
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface FarmMapProps {
  onLocationSelect: (lat: number, lon: number) => void;
}

function LocationMarker({ onLocationSelect }: FarmMapProps) {
  const { weatherData } = useWeather();
  const [position, setPosition] = useState<[number, number] | null>(null);

  // Initialize marker to weather location if available
  useEffect(() => {
    if (weatherData?.location && !position) {
      setPosition([weatherData.location.lat, weatherData.location.lon]);
    }
  }, [weatherData, position]);

  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });

  return position === null ? null : <Marker position={position}></Marker>;
}

export function FarmMap({ onLocationSelect }: FarmMapProps) {
  const t = useTranslations("YieldPredictor");
  const { weatherData } = useWeather();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-[350px] flex items-center justify-center bg-muted/20 border rounded-2xl animate-pulse">
        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  // Default to India coordinates if no weather location yet
  const defaultCenter: [number, number] = weatherData?.location
    ? [weatherData.location.lat, weatherData.location.lon]
    : [20.5937, 78.9629]; // Central India

  return (
    <div className="w-full relative rounded-2xl overflow-hidden border-2 border-emerald-500/20 shadow-lg group z-0">
      <div className="absolute top-4 left-4 z-[400] bg-white/90 backdrop-blur-md dark:bg-zinc-900/90 text-sm font-semibold px-4 py-2 rounded-full shadow border flex items-center gap-2 pointer-events-none transition-transform group-hover:-translate-y-1">
        <MapPin className="w-4 h-4 text-emerald-600" />
        {t("mapInstruction", { default: "Click on your farm to auto-fetch weather & predict yield" })}
      </div>

      <MapContainer
        center={defaultCenter}
        zoom={weatherData ? 12 : 5}
        scrollWheelZoom={true}
        className="w-full h-[350px]"
      >
        {/* Google Maps Hybrid Satellite Tile Layer */}
        <TileLayer
          attribution='&copy; <a href="https://www.google.com/intl/en_US/help/terms_maps.html">Google Maps</a>'
          url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
          maxZoom={20}
        />
        <LocationMarker onLocationSelect={onLocationSelect} />
      </MapContainer>
    </div>
  );
}
