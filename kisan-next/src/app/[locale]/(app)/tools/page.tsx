"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "@/i18n/routing";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CloudRain, ScanEye, TrendingUp, Sprout, Bot, Send, Loader2 } from "lucide-react";

export default function ToolsPage() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [diseaseQuery, setDiseaseQuery] = useState("");
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/auth");
    }
  }, [isLoaded, isSignedIn, router]);

  const handleAiScan = () => {
    if (!diseaseQuery) return;
    setIsScanning(true);
    // Mock AI delay
    setTimeout(() => {
      setAiResponse(`Based on your description "${diseaseQuery}", it appears to be a mild case of Powdery Mildew or early Aphid infestation. \n\nRecommendation: Spray 5% Neem Seed Kernel Extract (NSKE) or a mild sulfur-based fungicide. Ensure proper sunlight and airflow.`);
      setIsScanning(false);
    }, 1500);
  };

  const marketPrices = [
    { crop: "Wheat", price: "₹2,400 / Quintal", trend: "up" },
    { crop: "Cotton", price: "₹7,200 / Quintal", trend: "down" },
    { crop: "Groundnut", price: "₹6,500 / Quintal", trend: "up" },
    { crop: "Onion", price: "₹1,800 / Quintal", trend: "stable" }
  ];

  return (
    <div className="space-y-6 animate-in fade-in pb-12">
      <div>
        <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Farmer Tools</h1>
        <p className="text-muted-foreground mt-1">Smart utilities to help your daily farming.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Weather Widget (Placeholder) */}
        <Card className="bg-gradient-to-br from-[#2196F3] to-[#1976D2] text-white border-none shadow-md overflow-hidden relative">
          <CloudRain className="absolute -right-4 -top-4 w-32 h-32 opacity-20 text-white" />
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <CloudRain className="w-6 h-6" /> Local Weather
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-90">Ahmedabad, Gujarat</p>
                <h2 className="text-4xl font-black mt-1">28°C</h2>
                <p className="text-lg font-medium opacity-90 mt-1 capitalize">Light Rain</p>
              </div>
              <div className="text-right space-y-1 opacity-90 text-sm">
                <p>Humidity: 65%</p>
                <p>Wind: 12 km/h</p>
                <p>Monsoon: Active</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Disease Identifier */}
        <Card className="border-border shadow-sm flex flex-col">
          <CardHeader className="bg-muted/30 pb-4">
            <CardTitle className="text-xl flex items-center gap-2 text-primary">
              <ScanEye className="w-6 h-6 text-primary" /> AI Disease Identifier
            </CardTitle>
            <CardDescription>Describe your plant's symptoms or upload a picture (mock)</CardDescription>
          </CardHeader>
          <CardContent className="pt-4 flex-1 flex flex-col gap-4">
             {!aiResponse ? (
               <div className="space-y-3">
                 <Textarea 
                   placeholder="E.g., My cotton leaves have white powdery spots on the back..." 
                   className="resize-none h-24 bg-muted/50 rounded-xl border-primary/20"
                   value={diseaseQuery}
                   onChange={(e: any) => setDiseaseQuery(e.target.value)}
                 />
                 <Button onClick={handleAiScan} className="w-full rounded-xl bg-primary hover:bg-primary/90 text-white" disabled={isScanning}>
                   {isScanning ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <ScanEye className="w-4 h-4 mr-2" />}
                   {isScanning ? "Scanning..." : "Identify Disease"}
                 </Button>
               </div>
             ) : (
               <div className="space-y-4 animate-in slide-in-from-bottom-2">
                 <div className="p-4 bg-muted/50 border border-primary/20 rounded-xl relative">
                   <div className="absolute -top-3 -left-3 bg-primary text-white p-1.5 rounded-full shadow-sm">
                     <Bot className="w-4 h-4" />
                   </div>
                   <p className="text-sm leading-relaxed text-foreground whitespace-pre-wrap">{aiResponse}</p>
                 </div>
                 <Button variant="outline" onClick={() => {setAiResponse(null); setDiseaseQuery("")}} className="w-full text-xs">
                   Ask Another Question
                 </Button>
               </div>
             )}
          </CardContent>
        </Card>

        {/* Market Prices */}
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-amber-500" /> Mandi Prices (Gujarat)
            </CardTitle>
            <CardDescription>Live APMC rates (Mock Data)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {marketPrices.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 rounded-xl bg-muted/40 hover:bg-muted/80 transition-colors">
                  <span className="font-semibold text-foreground">{item.crop}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-bold">{item.price}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                      item.trend === 'up' ? 'text-green-600 bg-green-100' :
                      item.trend === 'down' ? 'text-red-500 bg-red-100' : 'text-gray-500 bg-gray-100'
                    }`}>
                      {item.trend === 'up' ? '▲' : item.trend === 'down' ? '▼' : '▬'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Soil Health Tips */}
        <Card className="border-border shadow-sm bg-gradient-to-br from-card to-card/50">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <Sprout className="w-6 h-6 text-[#8D6E63]" /> Soil Health Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <p className="text-sm text-muted-foreground"><span className="font-bold text-foreground">Crop Rotation:</span> Rotate legumes like chickpea with cereals to naturally restore soil nitrogen.</p>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <p className="text-sm text-muted-foreground"><span className="font-bold text-foreground">Organic Matter:</span> Add Farm Yard Manure (FYM) before monsoon to improve water retention in sandy soils.</p>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <p className="text-sm text-muted-foreground"><span className="font-bold text-foreground">Avoid Over-Tilling:</span> Deep ploughing every year breaks soil structure. Practice minimum tillage.</p>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
