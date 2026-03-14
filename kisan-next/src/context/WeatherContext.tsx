"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";

export interface WeatherCondition {
  text: string;
  icon: string;
  code: number;
}

export interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    localtime: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    is_day: number;
    condition: WeatherCondition;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    vis_km: number;
    uv: number;
    gust_kph: number;
  };
}

interface WeatherContextValue {
  weatherData: WeatherData | null;
  loading: boolean;
  permissionDenied: boolean;
  locationError: string | null;
  lastUpdated: Date | null;
  refetch: () => void;
  fetchByQuery: (q: string) => Promise<WeatherData | null>;
}

const WeatherContext = createContext<WeatherContextValue | null>(null);

const REFRESH_INTERVAL_MS = 10 * 60 * 1000; // 10 minutes

export function WeatherProvider({ children }: { children: React.ReactNode }) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const queryRef = useRef<string | null>(null);

  const fetchWeather = useCallback(async (q: string) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/weather?q=${encodeURIComponent(q)}`);
      const json = await res.json();
      if (res.ok) {
        setWeatherData(json);
        setLastUpdated(new Date());
        setLocationError(null);
        queryRef.current = q;
      }
    } catch {
      // silently fail on background refresh
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchByQuery = useCallback(
    async (q: string): Promise<WeatherData | null> => {
      try {
        const res = await fetch(`/api/weather?q=${encodeURIComponent(q)}`);
        const json = await res.json();
        if (res.ok) {
          setWeatherData(json);
          setLastUpdated(new Date());
          queryRef.current = q;
          return json;
        }
        return null;
      } catch {
        return null;
      }
    },
    []
  );

  /** Fallback: fetch weather by IP when GPS is unavailable */
  const fetchByIp = useCallback(async () => {
    try {
      const res = await fetch(`/api/weather?q=auto:ip`);
      const json = await res.json();
      if (res.ok) {
        setWeatherData(json);
        setLastUpdated(new Date());
        setLocationError(null);
        queryRef.current = json.location.name;
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, []);

  const doGetPosition = useCallback(() => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const q = `${pos.coords.latitude},${pos.coords.longitude}`;
        fetchWeather(q);
      },
      async () => {
        // GPS denied or failed — fall back to IP-based location silently
        setPermissionDenied(true);
        await fetchByIp();
      },
      { timeout: 10000, maximumAge: 0 }
    );
  }, [fetchWeather, fetchByIp]);

  const detectLocation = useCallback(() => {
    if (!navigator.geolocation) {
      // No GPS support at all — just use IP
      fetchByIp();
      return;
    }

    setPermissionDenied(false);
    setLocationError(null);

    if (navigator.permissions) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((status) => {
          if (status.state === "denied") {
            // Already blocked — go straight to IP fallback
            setPermissionDenied(true);
            fetchByIp();
          } else {
            doGetPosition();
          }

          // Auto-fetch when user re-grants permission in browser settings
          status.onchange = () => {
            if (status.state === "granted") {
              setPermissionDenied(false);
              setLocationError(null);
              doGetPosition();
            } else if (status.state === "denied") {
              setPermissionDenied(true);
              fetchByIp();
            }
          };
        })
        .catch(() => doGetPosition());
    } else {
      doGetPosition();
    }
  }, [doGetPosition, fetchByIp]);

  // On mount
  useEffect(() => {
    if (!navigator.geolocation) {
      fetchByIp();
      return;
    }

    if (navigator.permissions) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then((status) => {
          if (status.state === "denied") {
            setPermissionDenied(true);
            fetchByIp();
          } else {
            doGetPosition();
          }

          status.onchange = () => {
            if (status.state === "granted") {
              setPermissionDenied(false);
              setLocationError(null);
              doGetPosition();
            } else if (status.state === "denied") {
              setPermissionDenied(true);
              fetchByIp();
            }
          };
        })
        .catch(() => doGetPosition());
    } else {
      doGetPosition();
    }
  }, [doGetPosition, fetchByIp]);

  // Auto-refresh every 10 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      if (queryRef.current) {
        fetchWeather(queryRef.current);
      }
    }, REFRESH_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [fetchWeather]);


  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        loading,
        permissionDenied,
        locationError,
        lastUpdated,
        refetch: detectLocation,
        fetchByQuery,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  const ctx = useContext(WeatherContext);
  if (!ctx) throw new Error("useWeather must be used within WeatherProvider");
  return ctx;
}
