"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Category, CROP_DATA } from "@/data/crop-diseases";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Leaf, Info, ShieldAlert, AlertTriangle, ShieldCheck } from "lucide-react";

export default function DiseasesPage() {
  const t = useTranslations("DiseasesPage");
  const tCrop = useTranslations("Crops");
  const [selectedCrops, setSelectedCrops] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState<"all" | Category>("all");
  const [activeTabId, setActiveTabId] = useState<string | null>(null);

  const toggleCrop = (cropId: string) => {
    setSelectedCrops(prev => {
      if (prev.includes(cropId)) {
        const next = prev.filter(id => id !== cropId);
        if (activeTabId === cropId) setActiveTabId(next.length > 0 ? next[0] : null);
        return next;
      }
      if (prev.length >= 8) return prev;
      if (prev.length === 0) setActiveTabId(cropId);
      return [...prev, cropId];
    });
  };

  const filteredCrops = activeFilter === "all" 
    ? CROP_DATA 
    : CROP_DATA.filter(c => c.category === activeFilter);

  const selectedCropData = CROP_DATA.filter(c => selectedCrops.includes(c.id));
  const activeCropData = selectedCropData.find(c => c.id === activeTabId) || selectedCropData[0];

  return (
    <div className="space-y-8 animate-in fade-in pb-12 max-w-5xl mx-auto">
      {/* Header Area */}
      <div className="text-center space-y-4 py-8 bg-gradient-to-b from-green-500/10 to-transparent rounded-3xl border border-green-500/20">
        <div className="flex justify-center mb-2">
          <Leaf className="w-12 h-12 text-[#2e6b3b]" />
        </div>
        <h1 className="text-4xl lg:text-5xl font-extrabold text-[#2e6b3b] tracking-tight">{t("title")}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto px-4">{t("subtitle")}</p>
        
        <div className="inline-block mt-4 px-6 py-3 bg-[#2e6b3b]/10 text-[#2e6b3b] font-bold rounded-full text-sm">
          {t("selected", { count: selectedCrops.length })}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-center gap-2 px-4">
        {(["all", "fruits", "vegetables", "cereals", "cashCrops"] as const).map(filter => (
          <Button
            key={filter}
            variant={activeFilter === filter ? "default" : "outline"}
            className={`rounded-full ${activeFilter === filter ? "bg-amber-500 hover:bg-amber-600 text-white border-none shadow-md" : "bg-white text-muted-foreground hover:bg-muted"} transition-all`}
            onClick={() => setActiveFilter(filter)}
          >
            {t(`filters.${filter}`)}
          </Button>
        ))}
      </div>

      {/* Crop Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-4">
        <AnimatePresence>
          {filteredCrops.map(crop => {
            const isSelected = selectedCrops.includes(crop.id);
            return (
              <motion.div
                key={crop.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                onClick={() => toggleCrop(crop.id)}
                className={`relative cursor-pointer group rounded-2xl p-4 flex flex-col items-center gap-3 transition-all duration-300 ${isSelected ? "bg-white border-2 border-[#2e6b3b] shadow-lg scale-105" : "bg-white/50 border border-transparent hover:bg-white hover:shadow-md"}`}
              >
                <div className={`w-20 h-20 rounded-full overflow-hidden border-4 transition-colors ${isSelected ? "border-[#2e6b3b]" : "border-transparent group-hover:border-[#2e6b3b]/30"}`}>
                   <img src={crop.image} alt={crop.name} className="w-full h-full object-cover" />
                </div>
                <div className="text-center">
                  <h3 className={`font-bold ${isSelected ? "text-[#2e6b3b]" : "text-foreground"}`}>{crop.name}</h3>
                  <Badge variant="secondary" className="mt-1 font-normal text-[10px] uppercase tracking-wider">{t(`filters.${crop.category}`)}</Badge>
                </div>
                {isSelected && (
                  <div className="absolute top-2 right-2 bg-[#2e6b3b] text-white p-1 rounded-full shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Detailed Info Area */}
      {selectedCrops.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-4 bg-white rounded-3xl shadow-xl overflow-hidden border border-border"
        >
          {/* Tabs */}
          <div className="flex items-center gap-2 p-4 bg-muted/30 border-b overflow-x-auto hide-scrollbar">
            {selectedCropData.map(crop => (
              <Button
                key={crop.id}
                variant={activeTabId === crop.id ? "default" : "ghost"}
                onClick={() => setActiveTabId(crop.id)}
                className={`flex items-center gap-2 rounded-xl whitespace-nowrap ${activeTabId === crop.id ? "bg-[#2e6b3b] text-white shadow-md hover:bg-[#1b4332]" : "text-muted-foreground hover:bg-muted"}`}
              >
                <img src={crop.image} alt="" className="w-6 h-6 rounded-full object-cover" />
                {crop.name}
              </Button>
            ))}
            <div className="ml-auto pl-4">
               <Button onClick={() => setSelectedCrops([])} variant="outline" className="text-red-500 border-red-200 hover:bg-red-50 whitespace-nowrap">
                 {t("reset")}
               </Button>
            </div>
          </div>

          {/* Disease Content */}
          <div className="p-6 md:p-8 bg-gradient-to-br from-white to-green-50/30">
            {activeCropData && (
              <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-300">
                {activeCropData.diseases.map(disease => {
                  const diseaseKey = disease.id;
                  const cropKey = activeCropData.id;
                  
                  // Use translated text if available, fallback to the hardcoded ones to prevent crashing if a key is missed
                  const tDiseaseName = tCrop(`${cropKey}.diseases.${diseaseKey}.name`) !== `${cropKey}.diseases.${diseaseKey}.name` ? tCrop(`${cropKey}.diseases.${diseaseKey}.name`) : disease.name;
                  const tSymptoms = tCrop.raw(`${cropKey}.diseases.${diseaseKey}.symptoms`) || disease.symptoms;
                  const tFavorable = tCrop(`${cropKey}.diseases.${diseaseKey}.favorableConditions`) !== `${cropKey}.diseases.${diseaseKey}.favorableConditions` ? tCrop(`${cropKey}.diseases.${diseaseKey}.favorableConditions`) : disease.favorableConditions;
                  const tImpact = tCrop(`${cropKey}.diseases.${diseaseKey}.impact`) !== `${cropKey}.diseases.${diseaseKey}.impact` ? tCrop(`${cropKey}.diseases.${diseaseKey}.impact`) : disease.impact;
                  const tPrevention = tCrop.raw(`${cropKey}.diseases.${diseaseKey}.prevention`) || disease.prevention;

                  const symptomsText = Array.isArray(tSymptoms) ? tSymptoms.join(', ') : tSymptoms;
                  const preventionFirst = Array.isArray(tPrevention) && tPrevention.length > 0 ? tPrevention[0] : (typeof tPrevention === 'string' ? tPrevention : "Apply recommended treatment.");

                  return (
                  <div key={disease.id} className="bg-white rounded-[2.5rem] p-6 md:p-10 shadow-sm border border-slate-100 flex flex-col gap-8">
                     {/* Header */}
                     <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                       <div>
                         <h3 className="text-3xl md:text-4xl font-extrabold text-[#2e6b3b] uppercase tracking-wider">
                           {t("care", { crop: tCrop(`${cropKey}.name`) !== `${cropKey}.name` ? tCrop(`${cropKey}.name`).toUpperCase() : activeCropData.name.toUpperCase() })}
                         </h3>
                         <div className="flex items-center gap-2 text-[#7cb342] font-semibold mt-2 text-sm">
                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                           <span>{t("bestSeason")}</span>
                         </div>
                       </div>
                       <Badge className="bg-slate-50 text-[#2e6b3b] border-2 border-slate-100/50 shadow-sm text-sm px-5 py-2 rounded-full hover:bg-slate-100 transition-colors">
                         {tDiseaseName}
                       </Badge>
                     </div>

                     <div className="grid md:grid-cols-2 gap-6 mt-2">
                       {/* Left Column */}
                       <div className="space-y-6">
                         {/* Symptoms */}
                         <div className="bg-[#fffbf0] rounded-[2rem] p-8 relative overflow-hidden group hover:bg-[#fff8e6] transition-colors border border-amber-100/50 min-h-[220px] flex flex-col justify-center shadow-sm">
                           <Info className="absolute w-40 h-40 text-amber-900/5 -right-8 -bottom-8 transform rotate-12 group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
                           <div className="relative z-10">
                             <div className="flex items-center justify-center gap-2 text-amber-900 font-extrabold text-lg mb-6 tracking-wide">
                               <Info className="w-5 h-5 stroke-[2.5]" /> {t("symptoms")}
                             </div>
                             <div className="text-amber-800/80 italic text-center font-medium leading-relaxed max-w-sm mx-auto">
                               "{symptomsText}."
                             </div>
                           </div>
                         </div>

                         {/* Favorable Conditions */}
                         <div className="bg-[#f0f5ff] rounded-[2rem] p-8 relative overflow-hidden group hover:bg-[#e6f0ff] transition-colors border border-blue-100/50 min-h-[220px] flex flex-col justify-center shadow-sm">
                           <svg className="absolute w-40 h-40 text-blue-900/5 -right-8 -bottom-8 transform rotate-12 group-hover:scale-110 transition-transform duration-700 pointer-events-none" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/></svg>
                           <div className="relative z-10">
                             <div className="flex items-center justify-center gap-2 text-blue-900 font-extrabold text-lg mb-6 tracking-wide">
                               <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 stroke-[2.5]" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M16 14v6"/><path d="M8 14v6"/><path d="M12 16v6"/></svg>
                               {t("favorableConditions")}
                             </div>
                             <div className="text-blue-800/80 text-center font-medium leading-relaxed max-w-sm mx-auto">
                               {tFavorable}
                             </div>
                           </div>
                         </div>
                       </div>

                       {/* Right Column (Pest Control) */}
                       <div className="bg-[#2e6b3b] rounded-[2rem] p-8 md:p-10 text-white relative overflow-hidden flex flex-col h-full shadow-lg group">
                         <ShieldCheck className="absolute w-64 h-64 text-white/5 -right-16 -bottom-16 transform -rotate-12 group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
                         <div className="relative z-10 flex flex-col h-full">
                           <div className="flex items-center gap-3 font-extrabold text-xl mb-10 tracking-widest uppercase">
                             <ShieldCheck className="w-6 h-6 stroke-[2.5]" /> {t("pestControl")}
                           </div>

                           <div className="flex items-stretch gap-5 mb-auto">
                             <div className="w-1.5 bg-green-400 rounded-full shrink-0" />
                             <div className="text-2xl md:text-3xl font-bold leading-snug drop-shadow-sm">
                               {preventionFirst}
                             </div>
                           </div>

                           <div className="mt-12 space-y-3">
                             <div className="text-green-200/80 text-[11px] font-extrabold tracking-widest uppercase">
                               {t("generalPrecaution")}
                             </div>
                             <div className="text-green-50/90 italic text-sm font-medium leading-relaxed max-w-sm">
                               {tImpact}
                             </div>
                           </div>

                           <Button className="w-full bg-[#8bc34a] hover:bg-[#7cb342] text-[#2e6b3b] font-extrabold rounded-2xl py-7 mt-10 shadow-md hover:shadow-lg transition-all border-none text-lg">
                             {t("viewStoreProducts")}
                           </Button>
                         </div>
                       </div>
                     </div>
                  </div>
                )})}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
