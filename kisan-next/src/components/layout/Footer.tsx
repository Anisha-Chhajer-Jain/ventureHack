"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { 
  Leaf, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  ArrowRight,
  Sprout,
  ShieldCheck,
  LifeBuoy
} from "lucide-react";
import { DualText } from "@/components/ui/DualText";

export function Footer() {
  const t = useTranslations("Navigation");
  
  const sections = [
    {
      title: "Quick Links",
      links: [
        { name: t("ai"), en: "AI Profit", href: "/dashboard/profit-predictor" },
        { name: t("yieldAi"), en: "Yield AI", href: "/dashboard/yield-predictor" },
        { name: t("products"), en: "Marketplace", href: "/products" },
        { name: t("communities"), en: "Farmer Community", href: "/communities" },
      ]
    },
    {
      title: "Farmer Tools",
      links: [
        { name: "Weather Updates", en: "Weather Updates", href: "/weather" },
        { name: "Fertilizer Calc", en: "Fertilizer Calc", href: "/fertilizer-calculator" },
        { name: "Disease Detection", en: "Disease Detection", href: "/diseases" },
        { name: "Expense Tracker", en: "Expense Tracker", href: "/expenses" },
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", en: "Help Center", href: "#" },
        { name: "Privacy Policy", en: "Privacy Policy", href: "#" },
        { name: "Terms of Use", en: "Terms of Use", href: "#" },
        { name: "Contact Us", en: "Contact Us", href: "#" },
      ]
    }
  ];

  return (
    <footer className="bg-white border-t border-slate-100 pt-20 pb-10 overflow-hidden relative">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 p-20 opacity-[0.03] pointer-events-none">
        <Sprout className="w-96 h-96 text-[#2e6b3b] rotate-12" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand Identity */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="w-10 h-10 bg-[#2e6b3b] rounded-xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110">
                <Leaf className="w-6 h-6" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-[#2e6b3b]">
                KisanDost
              </span>
            </Link>
            
            <p className="text-slate-500 font-medium leading-relaxed max-w-sm">
              Empowering Indian farmers with cutting-edge AI tools, real-time weather insights, and a supportive community for a prosperous future.
            </p>

            <div className="flex items-center gap-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-[#2e6b3b] hover:text-white transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-5 grid grid-cols-2 md:grid-cols-3 gap-8">
            {sections.map((section, idx) => (
              <div key={idx} className="space-y-6">
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">
                  {section.title}
                </h4>
                <ul className="space-y-4">
                  {section.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <Link 
                        href={link.href} 
                        className="text-slate-500 hover:text-[#2e6b3b] font-bold text-sm transition-colors flex items-center gap-1 group"
                      >
                        <ArrowRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                        <DualText native={link.name} english={link.en} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3 bg-slate-50 rounded-[40px] p-8 space-y-6 border border-slate-100">
            <h4 className="text-lg font-black text-slate-900 leading-tight">
              Get in Touch
            </h4>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-600">
                <Phone className="w-5 h-5 text-[#2e6b3b]" />
                <span className="font-bold text-sm">+91 9512628557</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <Mail className="w-5 h-5 text-[#2e6b3b]" />
                <span className="font-bold text-sm">support@kisandost.com</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <MapPin className="w-5 h-5 text-[#2e6b3b]" />
                <span className="font-bold text-sm leading-tight">Krishi Bhawan, New Delhi, India</span>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-2">
              <div className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-tighter flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                Verified Platform
              </div>
              <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-black uppercase tracking-tighter flex items-center gap-1">
                <LifeBuoy className="w-3 h-3" />
                24/7 Support
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-slate-400 text-xs font-bold">
            © 2026 KisanDost. All rights reserved. Made with ❤️ for Indian Farmers.
          </p>
          
          <div className="flex items-center gap-6">
            <span className="text-slate-400 text-xs font-bold lowercase">v1.2.0-stable</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-slate-900 text-xs font-black uppercase tracking-widest">Systems Operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
