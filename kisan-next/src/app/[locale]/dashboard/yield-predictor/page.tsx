"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { YieldPredictorForm } from "@/components/farmer-tools/YieldPredictorForm";
import { YieldComparisonChart } from "@/components/farmer-tools/YieldComparisonChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sprout, TrendingUp, BarChart3, Loader2 } from "lucide-react";
import { useWeather } from "@/context/WeatherContext";
import { toast } from "sonner";

// Leaflet requires window, so we must dynamically import without SSR
const FarmMap = dynamic(
  () => import("@/components/farmer-tools/FarmMap").then((mod) => mod.FarmMap),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-[350px] flex items-center justify-center bg-muted/20 border rounded-2xl animate-pulse">
        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
      </div>
    )
  }
);

interface PredictionResult {
  predicted_yield: number;
  average_regional_yield: number;
}

export default function YieldPredictorPage() {
  const t = useTranslations("YieldPredictor");
  const { fetchByQuery } = useWeather();
  const [result, setResult] = useState<PredictionResult | null>(null);

  const yieldDiff = result
    ? (
        ((result.predicted_yield - result.average_regional_yield) /
          result.average_regional_yield) *
        100
      ).toFixed(1)
    : null;

  const isAboveAverage = result
    ? result.predicted_yield >= result.average_regional_yield
    : false;

  const handleLocationSelect = async (lat: number, lon: number) => {
    try {
      toast.loading("Fetching weather for selected location...", { id: "weather-fetch" });
      await fetchByQuery(`${lat},${lon}`);
      toast.success("Weather & location data synced successfully!", { id: "weather-fetch" });
    } catch (error) {
       toast.error("Failed to fetch location weather", { id: "weather-fetch" });
    }
  };

  return (
    <div className="container mx-auto pt-28 pb-8 px-4 space-y-8">
      {/* Page Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-[#2e6b3b]">
          {t("pageTitle")}
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          {t("pageDescription")}
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Left: Map & Form */}
        <div className="xl:col-span-6 space-y-6">
          <FarmMap onLocationSelect={handleLocationSelect} />
          <YieldPredictorForm onPredict={setResult} />
        </div>

        {/* Right: Results */}
        <div className="xl:col-span-6 space-y-6">
          {result ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
              {/* Result Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Predicted Yield */}
                <Card className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 border-emerald-200 dark:border-emerald-800 shadow-lg">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                      <Sprout className="w-4 h-4" />
                      {t("predictedYield")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-black text-emerald-700 dark:text-emerald-300">
                      {result.predicted_yield.toFixed(2)}
                    </div>
                    <p className="text-sm text-emerald-600/80 dark:text-emerald-400/80 font-medium mt-1">
                      {t("tonsPerHectare")}
                    </p>
                    <Badge
                      variant="secondary"
                      className={`mt-3 ${
                        isAboveAverage
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300"
                          : "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300"
                      }`}
                    >
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {isAboveAverage ? "+" : ""}
                      {yieldDiff}% {t("vsAverage")}
                    </Badge>
                  </CardContent>
                </Card>

                {/* Regional Average */}
                <Card className="bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/30 dark:to-violet-950/30 border-indigo-200 dark:border-indigo-800 shadow-lg">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-indigo-700 dark:text-indigo-300 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      {t("averageRegional")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-black text-indigo-700 dark:text-indigo-300">
                      {result.average_regional_yield.toFixed(2)}
                    </div>
                    <p className="text-sm text-indigo-600/80 dark:text-indigo-400/80 font-medium mt-1">
                      {t("tonsPerHectare")}
                    </p>
                    <Badge
                      variant="secondary"
                      className="mt-3 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300"
                    >
                      {t("regionBaseline")}
                    </Badge>
                  </CardContent>
                </Card>
              </div>

              {/* Comparison Chart */}
              <YieldComparisonChart
                predictedYield={result.predicted_yield}
                averageRegionalYield={result.average_regional_yield}
              />
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-12 text-center border-2 border-dashed rounded-3xl bg-muted/30 min-h-[400px]">
              <div className="p-4 bg-background rounded-full shadow-sm mb-4">
                <Sprout className="w-12 h-12 text-muted-foreground/40" />
              </div>
              <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                {t("readyTitle")}
              </h3>
              <p className="text-muted-foreground max-w-sm">
                {t("readyDescription")}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
