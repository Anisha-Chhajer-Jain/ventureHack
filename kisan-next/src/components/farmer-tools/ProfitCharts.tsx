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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
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
  );
}
