"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import {
  Sprout,
  ExternalLink,
  Play,
  ChevronDown,
  Calendar,
  Rocket,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const VIDEOS = [
  { id: "fuE750JhA2U", title: "PM Kisan Scheme - Farmer Benefits", date: "2 days ago" },
  { id: "0ZTcuWp0eXA", title: "How to Check PM Kisan Status Online", date: "1 week ago" },
  { id: "flBkER1gsQI", title: "PM Kisan 12th Installment Release", date: "2 weeks ago" },
  { id: "fuE750JhA2U", title: "PM Kisan Scheme - Complete Guide", date: "3 weeks ago" },
  { id: "0ZTcuWp0eXA", title: "Farmers Welfare Schemes 2024", date: "1 month ago" },
  { id: "flBkER1gsQI", title: "PM Kisan Helpline Numbers", date: "1 month ago" },
  { id: "fuE750JhA2U", title: "Direct Benefit Transfer (DBT) Explained", date: "2 months ago" },
  { id: "0ZTcuWp0eXA", title: "E-KYC Registration Tutorial", date: "2 months ago" },
  { id: "flBkER1gsQI", title: "PMAY and PM Kisan Synergy", date: "3 months ago" },
  { id: "fuE750JhA2U", title: "Annual Farmer Convention Highlights", date: "3 months ago" },
  { id: "0ZTcuWp0eXA", title: "New Crop Insurance via PM Kisan", date: "4 months ago" },
  { id: "flBkER1gsQI", title: "Fertilizer Subsidy Updates", date: "4 months ago" },
  { id: "fuE750JhA2U", title: "Organic Farming Initiative 2024", date: "5 months ago" },
  { id: "0ZTcuWp0eXA", title: "Success Stories: Small Scale Farmers", date: "5 months ago" },
  { id: "flBkER1gsQI", title: "Technology in Indian Agriculture", date: "6 months ago" },
];

export default function CommunitiesPage() {
  const t = useTranslations("Navigation");
  const [showAllVideos, setShowAllVideos] = useState(false);

  const visibleVideos = showAllVideos ? VIDEOS : VIDEOS.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12 animate-in fade-in duration-700">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-black text-[#2e6b3b] tracking-tighter uppercase">
          {t("communities")}
        </h1>
        <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
          Connecting farmers with government initiatives and peer knowledge.
        </p>
      </div>

      {/* PM Kisan Section */}
      <section className="space-y-8">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🌾</span>
          <h2 className="text-3xl font-black text-[#2e6b3b] tracking-tight">
            PM Kisan Samman Nidhi Yojana
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Featured Content Area */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-[40px] p-8 md:p-12 border border-slate-100 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:rotate-12 transition-transform duration-1000">
                <Sprout className="w-64 h-64 text-[#2e6b3b]" />
              </div>

              <div className="relative z-10 space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2e6b3b]/10 text-[#2e6b3b] text-sm font-bold">
                  <Rocket className="w-4 h-4" />
                  Official Government Initiative
                </div>

                <h3 className="text-4xl font-black leading-none text-slate-800">
                  Official YouTube Channel
                </h3>

                <p className="text-lg font-medium text-slate-600 leading-relaxed bg-[#e8f0fe]/50 p-6 rounded-3xl border-l-[6px] border-orange-400 italic">
                  &quot;Launched on 24th February 2019 by Hon&apos;ble Prime Minister, Shri Narendra Modi.
                  Became operational on 1st December 2018. Provides income support to eligible farmer families.&quot;
                </p>

                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-50 border border-slate-100 text-slate-600 font-bold text-sm">
                    <Calendar className="w-4 h-4 text-orange-400" />
                    Operational: 01 Dec 2018
                  </div>
                  <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-50 border border-slate-100 text-slate-600 font-bold text-sm">
                    <Rocket className="w-4 h-4 text-[#2e6b3b]" />
                    Launch: 24 Feb 2019
                  </div>
                  <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-50 border border-slate-100 text-slate-600 font-bold text-sm">
                    <Users className="w-4 h-4 text-blue-500" />
                    Beneficiaries: Crores of farmers
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Icon/Brand Area */}
          <div className="lg:col-span-4 flex items-center justify-center">
            <div className="w-64 h-64 bg-gradient-to-br from-[#2d5a2d] to-[#1e3f1e] rounded-[60px] shadow-2xl flex items-center justify-center text-8xl transform hover:rotate-6 transition-transform duration-500 border-8 border-white">
              🌾
            </div>
          </div>
        </div>

        {/* Video Grid */}
        <div className="space-y-8 pt-12">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3">
              <Play className="w-6 h-6 text-[#2e6b3b]" />
              LATEST VIDEOS
            </h3>
            <a
              href="https://www.youtube.com/@pmkisanofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-[#2e6b3b] font-black text-sm hover:underline"
            >
              Visit Channel <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleVideos.map((video, idx) => (
              <div
                key={idx}
                className="bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 group"
              >
                <div className="aspect-video relative bg-slate-100">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}`}
                    className="absolute inset-0 w-full h-full"
                    allowFullScreen
                    title={video.title}
                  />
                </div>
                <div className="p-6 space-y-3">
                  <h4 className="text-lg font-black text-slate-800 group-hover:text-[#2e6b3b] transition-colors line-clamp-2">
                    {video.title}
                  </h4>
                  <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-wider">
                    <Calendar className="w-3.5 h-3.5" />
                    {video.date}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {!showAllVideos && (
            <div className="text-center pt-8">
              <Button
                onClick={() => setShowAllVideos(true)}
                className="h-14 px-12 rounded-full bg-white border-2 border-[#2e6b3b] text-[#2e6b3b] hover:bg-[#2e6b3b] hover:text-white font-black transition-all group shadow-lg active:scale-95"
              >
                Load More Videos
                <ChevronDown className="ml-2 w-5 h-5 transition-transform group-hover:translate-y-1" />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Footer Info */}
      <div className="text-center pt-12">
        <p className="text-sm font-medium text-slate-400">
          * Information based on official PM Kisan YouTube channel and government sources.
        </p>
      </div>
    </div>
  );
}
