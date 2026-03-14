import { NextRequest, NextResponse } from "next/server";

const WEATHER_API_BASE = "https://api.weatherapi.com/v1/current.json";

export async function GET(req: NextRequest) {
  const key = process.env.WEATHER_API_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "Weather API key not configured" },
      { status: 500 }
    );
  }

  const q = req.nextUrl.searchParams.get("q");
  if (!q || typeof q !== "string" || !q.trim()) {
    return NextResponse.json(
      { error: "Missing or invalid query (q). Use city name, 'city,country', or lat,lon" },
      { status: 400 }
    );
  }

  try {
    const url = new URL(WEATHER_API_BASE);
    url.searchParams.set("key", key);
    url.searchParams.set("q", q.trim());

    const res = await fetch(url.toString(), { next: { revalidate: 300 } });
    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: data?.error?.message || "Weather API error" },
        { status: res.status }
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("Weather API error:", err);
    return NextResponse.json(
      { error: "Failed to fetch weather" },
      { status: 500 }
    );
  }
}
