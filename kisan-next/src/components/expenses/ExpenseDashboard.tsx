"use client";

import { useTranslations } from "next-intl";
import { 
  TrendingDown, 
  TrendingUp, 
  Wallet,
  CalendarDays,
  LayoutDashboard
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ExpenseProps {
  id: string;
  itemName: string;
  amount: number;
  date: string;
  type: "expense" | "income";
  season?: number;
  month?: number;
  year?: number;
}

interface DashboardProps {
  expenses: ExpenseProps[];
}

type Timeframe = "monthly" | "seasonal" | "yearly" | "allTime";

export function ExpenseDashboard({ expenses }: DashboardProps) {
  const t = useTranslations("Expenses");
  const [timeframe, setTimeframe] = useState<Timeframe>("monthly");

  // Determine current active bounds
  const now = new Date();
  const currentMonth = now.getMonth() + 1; // 1-12
  const currentYear = now.getFullYear();

  // Manual Selection State
  const [selectedMonth, setSelectedMonth] = useState<number>(currentMonth);
  const [selectedSeason, setSelectedSeason] = useState<number>(
    currentMonth >= 1 && currentMonth <= 4 ? 1 :
    currentMonth >= 5 && currentMonth <= 8 ? 2 : 3
  );
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);

  // Generate year options based on the data (or fallback to recent years)
  const yearsInData = Array.from(new Set(expenses.map(ex => {
    return ex.year || new Date(ex.date).getFullYear();
  }))).sort((a, b) => b - a); // Descending

  const yearOptions = yearsInData.length > 0 ? yearsInData : [currentYear, currentYear - 1, currentYear - 2];

  const getFilteredExpenses = () => {
    return expenses.filter(ex => {
      const exDate = new Date(ex.date);
      const m = ex.month || (exDate.getMonth() + 1);
      const y = ex.year || exDate.getFullYear();
      const s = ex.season || (
        m >= 1 && m <= 4 ? 1 :
        m >= 5 && m <= 8 ? 2 : 3
      );

      switch (timeframe) {
        case "monthly":
          return m === selectedMonth && y === selectedYear;
        case "seasonal":
          return s === selectedSeason && y === selectedYear;
        case "yearly":
          return y === selectedYear;
        case "allTime":
        default:
          return true;
      }
    });
  };

  const activeExpenses = getFilteredExpenses();

  const totals = activeExpenses.reduce((acc, curr) => {
    if (curr.type === "expense") acc.expense += curr.amount;
    else acc.income += curr.amount;
    return acc;
  }, { expense: 0, income: 0 });

  const profit = totals.income - totals.expense;
  const isProfit = profit >= 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Timeframe Toggle */}
        <div className="flex p-1 bg-slate-100/80 rounded-2xl w-full md:w-auto overflow-x-auto no-scrollbar shadow-inner">
          {(["monthly", "seasonal", "yearly", "allTime"] as Timeframe[]).map((f) => (
            <button
              key={f}
              onClick={() => setTimeframe(f)}
              className={cn(
                "flex-1 px-4 py-2.5 min-w-[100px] rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap",
                timeframe === f ? "bg-white text-[#2e6b3b] shadow-md border-b-2 border-[#2e6b3b]" : "text-slate-400 hover:text-slate-600"
              )}
            >
              {t(`timeframes.${f}`)}
            </button>
          ))}
        </div>

        {/* Manual Selectors */}
        {timeframe !== "allTime" && (
          <div className="flex gap-2">
            {timeframe === "monthly" && (
              <select 
                value={selectedMonth} 
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
                className="h-12 px-4 rounded-xl border-2 border-slate-100 font-bold bg-white text-slate-700 outline-none focus:border-[#8bc34a]"
              >
                {Array.from({ length: 12 }).map((_, i) => {
                  const d = new Date(); d.setMonth(i);
                  return <option key={i+1} value={i+1}>{d.toLocaleString('default', { month: 'short' })}</option>
                })}
              </select>
            )}

            {timeframe === "seasonal" && (
              <select 
                value={selectedSeason} 
                onChange={(e) => setSelectedSeason(Number(e.target.value))}
                className="h-12 px-4 rounded-xl border-2 border-slate-100 font-bold bg-white text-slate-700 outline-none focus:border-[#8bc34a]"
              >
                <option value={1}>Season 1 (Jan-Apr)</option>
                <option value={2}>Season 2 (May-Aug)</option>
                <option value={3}>Season 3 (Sep-Dec)</option>
              </select>
            )}

            <select 
              value={selectedYear} 
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="h-12 px-4 rounded-xl border-2 border-slate-100 font-bold bg-white text-slate-700 outline-none focus:border-[#8bc34a]"
            >
              {yearOptions.map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="rounded-[30px] sm:rounded-[40px] border-none bg-red-50/80 shadow-xl overflow-hidden group hover:-translate-y-1 transition-transform">
          <CardContent className="p-6 sm:p-8 relative">
            <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 opacity-10 group-hover:scale-110 transition-transform duration-700">
              <TrendingDown className="w-24 h-24 sm:w-32 sm:h-32 text-red-600" />
            </div>
            <p className="text-[10px] font-black text-red-900/60 uppercase tracking-widest mb-1 sm:mb-2">{t("totalExpense")}</p>
            <p className="text-3xl sm:text-4xl font-black text-red-600">₹{totals.expense.toLocaleString()}</p>
            <div className="mt-3 sm:mt-4 flex items-center gap-2 text-red-900/40 font-bold">
              <span className="text-[10px] uppercase tracking-wider">{t(`timeframes.${timeframe}`)}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[30px] sm:rounded-[40px] border-none bg-emerald-50/80 shadow-xl overflow-hidden group hover:-translate-y-1 transition-transform">
          <CardContent className="p-6 sm:p-8 relative">
            <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 opacity-10 group-hover:scale-110 transition-transform duration-700">
              <TrendingUp className="w-24 h-24 sm:w-32 sm:h-32 text-emerald-600" />
            </div>
            <p className="text-[10px] font-black text-emerald-900/60 uppercase tracking-widest mb-1 sm:mb-2">{t("totalIncome")}</p>
            <p className="text-3xl sm:text-4xl font-black text-emerald-600">₹{totals.income.toLocaleString()}</p>
            <div className="mt-3 sm:mt-4 flex items-center gap-2 text-emerald-900/40 font-bold">
              <span className="text-[10px] uppercase tracking-wider">{t(`timeframes.${timeframe}`)}</span>
            </div>
          </CardContent>
        </Card>

        <Card className={cn(
          "rounded-[30px] sm:rounded-[40px] border-none shadow-2xl overflow-hidden group hover:-translate-y-1 transition-transform",
          isProfit ? "bg-green-600" : "bg-red-500"
        )}>
          <CardContent className="p-6 sm:p-8 relative">
            <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 opacity-10 group-hover:rotate-12 transition-transform duration-700">
              <Wallet className="w-24 h-24 sm:w-32 sm:h-32 text-white" />
            </div>
            <p className="text-[10px] font-black text-white/80 uppercase tracking-widest mb-1 sm:mb-2">
              {isProfit ? t("profit") : t("loss")}
            </p>
            <p className="text-3xl sm:text-4xl font-black text-white">
              {isProfit ? '+' : '-'}₹{Math.abs(profit).toLocaleString()}
            </p>
            <div className="mt-3 sm:mt-4 flex items-center gap-2 text-white/50 font-bold">
              <LayoutDashboard className="w-4 h-4" />
              <span className="text-[10px] uppercase tracking-wider">{t('netResult')}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

