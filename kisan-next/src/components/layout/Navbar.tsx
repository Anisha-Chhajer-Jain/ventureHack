"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { UserButton, useUser } from "@clerk/nextjs";
import { Home, Leaf, Calculator, CloudRain, ScanEye, User as UserIcon, Menu, X } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const t = useTranslations("Navigation");
  const { user, isLoaded } = useUser();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: t("home"), href: "/", icon: <Home className="w-5 h-5" /> },
    { name: t("diseases"), href: "/diseases", icon: <ScanEye className="w-5 h-5" /> },
    { name: t("calculator"), href: "/fertilizer-calculator", icon: <Calculator className="w-5 h-5" /> },
    { name: t("weather"), href: "/weather", icon: <CloudRain className="w-5 h-5" /> },
    { name: t("crops"), href: "/crops", icon: <Leaf className="w-5 h-5" /> },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-white/90 backdrop-blur-md shadow-sm h-16" 
          : "bg-transparent h-20"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-[#2e6b3b] rounded-xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110">
            <Leaf className="w-6 h-6" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-[#2e6b3b]">KisanDost</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-200",
                  isActive 
                    ? "text-[#2e6b3b] bg-[#2e6b3b]/10" 
                    : "text-muted-foreground hover:text-[#2e6b3b] hover:bg-[#2e6b3b]/5"
                )}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>
          
          <div className="h-8 w-[1px] bg-border mx-1 hidden sm:block" />
          
          {isLoaded && user ? (
            <div className="flex items-center gap-3">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-none mb-1">Active Farmer</span>
                <span className="text-sm font-black text-[#2e6b3b]">{user.firstName}</span>
              </div>
              <UserButton 
                appearance={{ 
                  elements: { 
                    avatarBox: "w-10 h-10 border-2 border-[#2e6b3b]/20 hover:border-[#2e6b3b]/50 transition-colors shadow-sm" 
                  } 
                }} 
              />
            </div>
          ) : (
            <Link href="/auth">
              <Button className="bg-[#2e6b3b] hover:bg-[#1b4332] text-white rounded-full px-6 font-bold text-sm h-10 shadow-lg shadow-green-900/20">
                Farmer Login
              </Button>
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 text-muted-foreground hover:text-[#2e6b3b]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-border animate-in slide-in-from-top duration-300 p-4 shadow-xl">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 p-4 rounded-2xl text-lg font-bold transition-all",
                  pathname === item.href 
                    ? "text-[#2e6b3b] bg-[#2e6b3b]/10" 
                    : "text-muted-foreground hover:bg-[#2e6b3b]/5"
                )}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
            <div className="pt-4 mt-2 border-t border-border flex items-center justify-between px-2">
              <span className="font-bold text-muted-foreground">Select Language:</span>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
