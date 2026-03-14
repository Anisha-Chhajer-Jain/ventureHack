"use client";

import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter } from "@/i18n/routing";
import { CROPS, CropData, TranslationMap } from "@/data/crops";
import { Leaf, Activity, Droplets, ArrowRight, Calculator } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

function getLocalizedText(translationObj: TranslationMap, currentLocale: string): string {
  // @ts-ignore
  return translationObj[currentLocale] || translationObj.en;
}

export default function DashboardPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const t = useTranslations("Dashboard");
  const locale = useLocale();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/auth");
    }
  }, [isLoaded, isSignedIn, router]);

  const getHealthColor = (health: string) => {
    switch (health) {
      case "Healthy": return "text-[#4CAF50] border-[#4CAF50]/50 bg-[#4CAF50]/10";
      case "Moderate": return "text-[#FFCA28] border-[#FFCA28]/50 bg-[#FFCA28]/10";
      case "Stress": return "text-[#F44336] border-[#F44336]/50 bg-[#F44336]/10";
      default: return "";
    }
  };

  const ringStyle = {
    background: `conic-gradient(#4CAF50 78%, #e0e0e0 0)`
  };

  return (
    <div className="space-y-8 animate-in fade-in pb-12">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-primary/80 shadow-xl p-6 sm:p-10 text-white">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold flex items-center gap-3">
              <span className="text-white drop-shadow-sm">
                {t("greeting", { name: user?.firstName || "Farmer", health: t("healthStatus.healthy") })}
              </span>
              <img src="https://rupiya.app/wp-content/uploads/2025/03/Asset-16.png" className="w-12 h-12 inline animate-pulse" alt="namaste" />
            </h1>
            <p className="text-xl opacity-90 font-medium">Your current overall farm NDVI is 0.78 (Excellent).</p>
          </div>
          <div className="relative flex-shrink-0 w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center p-2" style={ringStyle}>
            <div className="w-full h-full bg-primary flex items-center justify-center rounded-full border-4 border-white/20 shadow-inner">
               <div className="text-center">
                 <div className="text-3xl font-bold">78%</div>
                 <div className="text-sm rounded hover:cursor-pointer hover:underline uppercase opacity-90 mx-auto w-[6rem] mt-2 bg-black py-1 px-4">NDVI</div>
               </div>
            </div>
          </div>
        </div>
        <img 
          src="https://rupiya.app/wp-content/uploads/2025/03/Farmer-Banner-2.jpg" 
          alt="Farmer background" 
          className="absolute inset-0 w-full h-full object-cover opacity-20 object-top mix-blend-overlay pointer-events-none"
        />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
          <Leaf className="w-6 h-6 text-primary" />
          {t("chooseCrop")}
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {CROPS.map((crop) => (
            <Dialog key={crop.id}>
              <DialogTrigger>
                <div className="group cursor-pointer bg-card rounded-2xl overflow-hidden border border-border/50 shadow-sm hover:shadow-xl hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1">
                  <div className="relative h-48 w-full overflow-hidden">
                    <img 
                      src={crop.image} 
                      alt={getLocalizedText(crop.name, locale)} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
                    
                    <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
                      <div className={`px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md ${getHealthColor(crop.health)}`}>
                        {/* @ts-ignore */}
                        {t(`healthStatus.${crop.health.toLowerCase()}`)}
                      </div>
                      <div className="px-3 py-1 rounded-full text-xs font-bold bg-black/60 text-white backdrop-blur-md border border-white/10 flex items-center gap-1">
                        <Activity className="w-3 h-3 text-primary" />
                        {crop.ndvi}
                      </div>
                    </div>

                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-2xl font-black text-white drop-shadow-md">
                        {getLocalizedText(crop.name, locale)}
                      </h3>
                    </div>
                  </div>
                  
                  <div className="p-4 flex items-center justify-between bg-card text-muted-foreground group-hover:text-primary transition-colors">
                    <span className="text-sm font-medium flex-1">View Details</span>
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-md w-[95%] rounded-3xl p-0 overflow-hidden border-border/50">
                <div className="relative h-56 w-full">
                  <img src={crop.image} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-6">
                    <h2 className="text-3xl font-black text-white">{getLocalizedText(crop.name, locale)}</h2>
                  </div>
                </div>
                <div className="p-6 space-y-6 bg-card -mt-4 relative rounded-t-3xl z-10 border-t border-border/10">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/50 p-3 rounded-xl border border-border/50 shadow-inner flex flex-col items-center text-center justify-center">
                      <Leaf className="w-5 h-5 text-primary mb-1" />
                      <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Season</span>
                      <span className="font-bold text-sm text-foreground">{getLocalizedText(crop.season, locale)}</span>
                    </div>
                    <div className="bg-muted/50 p-3 rounded-xl border border-border/50 shadow-inner flex flex-col items-center text-center justify-center">
                      <Droplets className="w-5 h-5 text-[#2196F3] mb-1" />
                      <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Water Need</span>
                      <span className="font-bold text-sm text-foreground">{getLocalizedText(crop.waterNeed, locale)}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">Soil Type</h4>
                      <div className="flex items-center gap-2">
                         <div className="w-3 h-3 rounded-full bg-[#8D6E63]" />
                         <span className="font-medium text-foreground">{getLocalizedText(crop.soilType, locale)}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">Common Diseases</h4>
                      <ul className="space-y-2">
                        {crop.diseases.map((d, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-foreground bg-accent/20 border border-primary/10 p-2 rounded-lg">
                            <span className="text-lg leading-none">{d.icon}</span>
                            <span className="font-medium">{getLocalizedText(d.name, locale)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">Precautions & Remedies</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed italic bg-muted/30 p-3 rounded-lg border-l-4 border-warning">
                        {getLocalizedText(crop.precautions, locale)}
                      </p>
                    </div>
                  </div>

                  <Button 
                    className="w-full h-14 text-lg font-bold shadow-lg rounded-2xl bg-gradient-to-r from-primary to-[#2E7D32] hover:opacity-90 active:scale-95 transition-all text-white"
                    onClick={() => router.push(`/fertilizer-calculator?crop=${crop.id}`)}
                  >
                    <Calculator className="w-5 h-5 mr-2" />
                    {t("calculateFertilizer")}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </div>
  );
}
