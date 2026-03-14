"use client";

import { useTranslations } from "next-intl";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Cell, PieChart, Pie, Legend 
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProfitChartsProps {
  data: {
    predictedYield: number;
    pricePerQuintal: number;
    estimatedRevenue: number;
    fertilizerCost: number;
    netProfit: number;
  };
}

export function ProfitCharts({ data }: ProfitChartsProps) {
  const t = useTranslations("ProfitPredictor");

  const revenueData = [
    { name: t("netProfit"), value: data.netProfit, color: "#10b981" },
    { name: t("fertilizerCost"), value: data.fertilizerCost, color: "#f43f5e" },
  ];

  const barData = [
    { name: t("estimatedRevenue"), amount: data.estimatedRevenue },
    { name: t("netProfit"), amount: data.netProfit },
  ];

  // Mock regional data for benchmark comparison
  const regionalAverage = data.predictedYield * 0.85; // Assume user is doing 15% better than state avg
  const nationalAverage = data.predictedYield * 0.70; // Assume user is doing 30% better than national avg

  const benchmarkData = [
    { name: "Your Farm", yield: data.predictedYield, color: "#10b981" },
    { name: "State Avg", yield: regionalAverage, color: "#3b82f6" },
    { name: "National Avg", yield: nationalAverage, color: "#f59e0b" },
  ];

  return (
    <div className="space-y-6 mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">{t("profitBreakdown")}</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={revenueData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {revenueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => `₹${Number(value).toLocaleString()}`} />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">{t("revenueVsProfit")}</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(val: number) => `₹${val / 1000}k`} />
                <Tooltip formatter={(value: any) => `₹${Number(value).toLocaleString()}`} />
                <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                  {barData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? "#3b82f6" : "#10b981"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Yield Benchmark Comparison (Quintals)</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={benchmarkData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <Tooltip formatter={(value: any) => `${Number(value).toFixed(2)} quintals`} />
              <Bar dataKey="yield" radius={[0, 4, 4, 0]}>
                {benchmarkData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
