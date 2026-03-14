"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { useEffect } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, ShieldCheck, Globe, Sprout } from "lucide-react";

export default function AuthPage() {
  const t = useTranslations("Index");
  const { isLoaded, isSignedIn } = useUser();
  const { openSignIn } = useClerk();
  const router = useRouter();

  useEffect(() => {
    // If already signed in, go straight to dashboard — no onboarding detour
    if (isLoaded && isSignedIn) {
      router.push("/dashboard");
    }
  }, [isLoaded, isSignedIn, router]);

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden bg-[#F7FDF9]">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#FFCA28]/5 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-[440px]"
      >
        <Card className="border-none shadow-[0_20px_50px_rgba(46,107,59,0.12)] bg-white/80 backdrop-blur-xl rounded-[32px] overflow-hidden">
          <div className="h-2 w-full bg-gradient-to-r from-primary via-[#4CAF50] to-[#FFCA28]" />
          
          <CardHeader className="text-center pt-10 pb-6">
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mb-6 shadow-inner"
            >
              <Sprout className="w-12 h-12 text-primary" />
            </motion.div>
            
            <CardTitle className="text-4xl font-black text-[#1B4332] tracking-tight mb-2">
              KisanDost
            </CardTitle>
            <CardDescription className="text-base font-medium text-muted-foreground px-4">
              {t("subtitle")}
            </CardDescription>
          </CardHeader>

          <CardContent className="px-8 pb-10 space-y-8">
            <div className="space-y-4">
              <Button
                size="lg"
                onClick={() => openSignIn()}
                className="group w-full h-16 text-lg bg-[#2e6b3b] hover:bg-[#1b4332] text-white font-bold rounded-2xl shadow-xl shadow-green-900/10 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3 shadow-sm group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </div>
                {t("login")}
              </Button>

              <div className="flex items-center justify-center gap-6 pt-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full border border-border/50">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                  Secure Login
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full border border-border/50">
                  <Globe className="w-3.5 h-3.5 text-primary" />
                  Free Access
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-dashed border-border flex flex-col items-center gap-4">
              <p className="text-xs font-black text-muted-foreground/60 uppercase tracking-[0.2em]">Trusted by 10k+ Farmers</p>
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-muted shadow-sm flex items-center justify-center overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Farmer" className="w-full h-full object-cover" />
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-white bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary shadow-sm">
                  +10k
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-8 text-sm font-medium text-muted-foreground/60"
        >
          Designed with ❤️ for the Indian Farmer
        </motion.p>
      </motion.div>
    </div>
  );
}
