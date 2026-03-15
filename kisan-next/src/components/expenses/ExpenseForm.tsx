"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { 
  Plus, 
  Minus, 
  Calendar, 
  Tag, 
  IndianRupee, 
  CreditCard, 
  StickyNote,
  ChevronDown,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

interface ExpenseFormProps {
  onAdd: (entry: any) => void;
  onClose: () => void;
}

export function ExpenseForm({ onAdd, onClose }: ExpenseFormProps) {
  const t = useTranslations("Expenses");
  const [type, setType] = useState<"expense" | "income">("expense");
  const [category, setCategory] = useState("seeds");
  const [itemName, setItemName] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [season, setSeason] = useState<1 | 2 | 3>(1);
  const [notes, setNotes] = useState("");

  // Helper to auto-calculate the season from a date string (YYYY-MM-DD)
  // Season 1: Jan-Apr (Months 0-3)
  // Season 2: May-Aug (Months 4-7)
  // Season 3: Sep-Dec (Months 8-11)
  const calculateSeason = (dateString: string): 1 | 2 | 3 => {
    const d = new Date(dateString);
    const m = d.getMonth(); 
    if (m >= 0 && m <= 3) return 1;
    if (m >= 4 && m <= 7) return 2;
    return 3;
  };

  // Auto-update season when date changes
  useEffect(() => {
    setSeason(calculateSeason(date));
  }, [date]);

  const categories = [
    "seeds", "fertilizer", "pesticide", "irrigation", "labor", 
    "machinery", "transport", "electricity", "animal_feed", "miscellaneous"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemName || !amount) return;

    onAdd({
      type,
      category,
      itemName,
      amount: parseFloat(amount),
      paymentMethod,
      date,
      season,
      notes,
      id: Math.random().toString(36).substr(2, 9) // Mock ID
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <Card className="w-full max-w-lg rounded-t-[40px] sm:rounded-[40px] border-none shadow-2xl animate-in slide-in-from-bottom duration-300">
        <CardContent className="p-8 space-y-8">
          <div className="flex items-center justify-between pb-4 border-b">
            <h2 className="text-2xl font-black text-[#2e6b3b]">
              {type === 'expense' ? t("addExpense") : t("addIncome")}
            </h2>
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
              <X className="w-6 h-6" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Toggle Type */}
            <div className="flex p-1.5 bg-slate-100 rounded-2xl gap-2 text-xl font-bold">
              <button
                type="button"
                onClick={() => setType("expense")}
                className={cn(
                  "flex-1 py-4 rounded-xl transition-all flex items-center justify-center gap-2",
                  type === 'expense' ? "bg-white text-red-600 shadow-md" : "text-slate-500"
                )}
              >
                <Minus className="w-5 h-5" /> {t("kharcha")}
              </button>
              <button
                type="button"
                onClick={() => setType("income")}
                className={cn(
                  "flex-1 py-4 rounded-xl transition-all flex items-center justify-center gap-2",
                  type === 'income' ? "bg-white text-green-600 shadow-md" : "text-slate-500"
                )}
              >
                <Plus className="w-5 h-5" /> {t("aamdani")}
              </button>
            </div>

            {/* Amount Input - Huge and central */}
            <div className="relative">
              <IndianRupee className="absolute left-6 top-1/2 -translate-y-1/2 w-8 h-8 text-[#2e6b3b]" />
              <Input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="h-24 pl-16 text-4xl font-black rounded-3xl border-2 border-[#8bc34a]/20 focus:border-[#2e6b3b] focus:ring-4 focus:ring-[#2e6b3b]/10 bg-slate-50"
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              {/* Item Name */}
              <div className="relative">
                <Input
                  placeholder={t("itemName")}
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="h-16 px-6 text-lg font-bold rounded-2xl border-2 border-slate-100"
                  required
                />
              </div>

              {/* Category Dropdown/Grid */}
              <div className="space-y-2">
                <label className="text-sm font-black text-slate-400 uppercase tracking-widest px-2">{t("category")}</label>
                <div className="grid grid-cols-2 gap-2 overflow-y-auto max-h-48 p-1 scrollbar-hide">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={cn(
                        "py-3 px-4 rounded-xl text-sm font-black border-2 transition-all",
                        category === cat 
                          ? "bg-[#2e6b3b] border-[#2e6b3b] text-white" 
                          : "bg-white border-slate-100 text-slate-600 hover:border-[#8bc34a]"
                      )}
                    >
                      {t(`categories.${cat}`)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date, Season & Payment Method */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-black text-slate-400 uppercase tracking-widest px-2">{t("date")}</label>
                  <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="h-14 font-bold rounded-xl border-2 border-slate-100"
                  />
                </div>
                
                {/* Season Dropdown */}
                <div className="space-y-2">
                  <label className="text-sm font-black text-slate-400 uppercase tracking-widest px-2">Season</label>
                  <select
                    value={season}
                    onChange={(e) => setSeason(Number(e.target.value) as 1 | 2 | 3)}
                    className="w-full h-14 px-4 font-bold rounded-xl border-2 border-[#8bc34a] bg-green-50 focus:ring-2 focus:ring-[#2e6b3b] shadow-sm transition-all"
                  >
                    <option value={1}>Season 1 (Jan-Apr)</option>
                    <option value={2}>Season 2 (May-Aug)</option>
                    <option value={3}>Season 3 (Sep-Dec)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-black text-slate-400 uppercase tracking-widest px-2">{t("paymentMethod")}</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full h-14 px-4 font-bold rounded-xl border-2 border-slate-100 bg-white"
                  >
                    <option value="cash">{t("methods.cash")}</option>
                    <option value="digital">{t("methods.digital")}</option>
                    <option value="credit">{t("methods.credit")}</option>
                  </select>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full h-20 rounded-3xl bg-[#2e6b3b] hover:bg-[#1b4332] text-xl font-black shadow-xl transition-all active:scale-95">
              {t("save")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
