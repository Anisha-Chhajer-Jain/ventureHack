"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";

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
      <SelectTrigger className="w-[100px] h-8 text-xs font-medium border-primary/20 bg-background/50">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="hi">हिंदी</SelectItem>
        <SelectItem value="gu">ગુજરાતી</SelectItem>
      </SelectContent>
    </Select>
  );
}
