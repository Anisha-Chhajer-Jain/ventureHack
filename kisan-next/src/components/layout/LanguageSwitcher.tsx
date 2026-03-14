"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { Languages, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const [mounted, setMounted] = useState(false);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLanguageChange = (newLocale: string | null) => {
    if (newLocale) {
      router.replace(pathname, { locale: newLocale });
    }
  };

  if (!mounted) {
    return <div className="w-[100px] h-8 bg-background/50 border border-primary/20 rounded-lg animate-pulse" />;
  }

  return (
    <Select value={locale} onValueChange={handleLanguageChange}>
      <SelectTrigger className="flex items-center gap-2 w-auto h-9 px-3 text-xs font-bold border-[#2e6b3b]/20 bg-[#2e6b3b]/5 text-[#2e6b3b] rounded-full hover:bg-[#2e6b3b]/10 hover:border-[#2e6b3b]/30 transition-all focus:ring-0 focus:ring-offset-0 ring-0">
        <Languages className="w-3.5 h-3.5 opacity-70" />
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent className="rounded-2xl border-border/50 shadow-xl p-1 min-w-[120px]">
        <SelectItem value="en" className="rounded-xl flex items-center gap-2 focus:bg-[#2e6b3b]/10 focus:text-[#2e6b3b] cursor-pointer">
          <span className="flex items-center gap-2">
            <span className="text-base">🇺🇸</span> English
          </span>
        </SelectItem>
        <SelectItem value="hi" className="rounded-xl flex items-center gap-2 focus:bg-[#2e6b3b]/10 focus:text-[#2e6b3b] cursor-pointer">
          <span className="flex items-center gap-2">
            <span className="text-base">🇮🇳</span> हिंदी
          </span>
        </SelectItem>
        <SelectItem value="gu" className="rounded-xl flex items-center gap-2 focus:bg-[#2e6b3b]/10 focus:text-[#2e6b3b] cursor-pointer">
          <span className="flex items-center gap-2">
            <span className="text-base">🇮🇳</span> ગુજરાતી
          </span>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
