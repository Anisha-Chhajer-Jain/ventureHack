"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, TrendingUp, IndianRupee, Sprout } from "lucide-react";
import { toast } from "sonner";

interface ProfitPredictorFormProps {
  onPredict: (data: any) => void;
}

export function ProfitPredictorForm({ onPredict }: ProfitPredictorFormProps) {
  const t = useTranslations("ProfitPredictor");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    cropType: "Wheat",
    landArea: 1,
    soilNitrogen: 50,
    soilPhosphorus: 25,
    soilPotassium: 20,
    rainfall: 120,
    fertilizerCost: 5000,
    pesticideCost: 2000,
    irrigationCost: 1000,
  });

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/predict-yield", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.details || data.error || t("predictionError"));
        }
        onPredict(data);
        toast.success(t("predictionSuccess"));
      } else {
        const text = await res.text();
        console.error("Non-JSON response received:", text);
        throw new Error(`Server returned HTML instead of JSON. Check console for details.`);
      }
    } catch (error: any) {
      console.error("Prediction Error:", error);
      toast.error(error.message || t("predictionError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg border-2 border-primary/10">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Sprout className="w-6 h-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl">{t("title")}</CardTitle>
            <CardDescription>{t("description")}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handlePredict} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="cropType">{t("cropType")}</Label>
            <Select 
              value={formData.cropType} 
              onValueChange={(val: string | null) => {
                if (val) setFormData({ ...formData, cropType: val });
              }}
            >
              <SelectTrigger id="cropType">
                <SelectValue placeholder={t("selectCrop")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Wheat">Wheat</SelectItem>
                <SelectItem value="Rice">Rice</SelectItem>
                <SelectItem value="Maize">Maize</SelectItem>
                <SelectItem value="Cotton">Cotton</SelectItem>
                <SelectItem value="Sugarcane">Sugarcane</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="landArea">{t("landArea")} (Acres)</Label>
            <div className="relative">
              <Input
                id="landArea"
                type="number"
                value={formData.landArea}
                onChange={(e) => setFormData({ ...formData, landArea: Number(e.target.value) })}
                className="pl-8"
              />
              <TrendingUp className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fertilizerCost">Fertilizer Cost (₹)</Label>
            <div className="relative">
              <Input
                id="fertilizerCost"
                type="number"
                value={formData.fertilizerCost}
                onChange={(e) => setFormData({ ...formData, fertilizerCost: Number(e.target.value) })}
                className="pl-8"
              />
              <IndianRupee className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pesticideCost">Pesticide Cost (₹)</Label>
            <div className="relative">
              <Input
                id="pesticideCost"
                type="number"
                value={formData.pesticideCost}
                onChange={(e) => setFormData({ ...formData, pesticideCost: Number(e.target.value) })}
                className="pl-8"
              />
              <IndianRupee className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="irrigationCost">Irrigation Cost (₹)</Label>
            <div className="relative">
              <Input
                id="irrigationCost"
                type="number"
                value={formData.irrigationCost}
                onChange={(e) => setFormData({ ...formData, irrigationCost: Number(e.target.value) })}
                className="pl-8"
              />
              <IndianRupee className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="soilNitrogen">Soil Nitrogen (N)</Label>
            <Input
              id="soilNitrogen"
              type="number"
              value={formData.soilNitrogen}
              onChange={(e) => setFormData({ ...formData, soilNitrogen: Number(e.target.value) })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="soilPhosphorus">Soil Phosphorus (P)</Label>
            <Input
              id="soilPhosphorus"
              type="number"
              value={formData.soilPhosphorus}
              onChange={(e) => setFormData({ ...formData, soilPhosphorus: Number(e.target.value) })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="soilPotassium">Soil Potassium (K)</Label>
            <Input
              id="soilPotassium"
              type="number"
              value={formData.soilPotassium}
              onChange={(e) => setFormData({ ...formData, soilPotassium: Number(e.target.value) })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="rainfall">Rainfall (mm)</Label>
            <Input
              id="rainfall"
              type="number"
              value={formData.rainfall}
              onChange={(e) => setFormData({ ...formData, rainfall: Number(e.target.value) })}
            />
          </div>

          <Button type="submit" className="md:col-span-2 h-12 text-lg font-bold" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                {t("predicting")}
              </>
            ) : (
              t("predictButton")
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
