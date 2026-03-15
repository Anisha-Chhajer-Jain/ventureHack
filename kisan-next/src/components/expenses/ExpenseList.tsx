"use client";

import { useTranslations } from "next-intl";
import { 
  TrendingDown, 
  TrendingUp, 
  Clock, 
  Tag as TagIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Expense {
  id: string;
  itemName: string;
  amount: number;
  category: string;
  date: string;
  type: "expense" | "income";
  season: number;
}

export function ExpenseList({ 
  expenses, 
  viewFormat = "list" 
}: { 
  expenses: Expense[];
  viewFormat?: "list" | "grid";
}) {
  const t = useTranslations("Expenses");

  if (expenses.length === 0) {
    return (
      <div className="text-center py-20 px-8 border-4 border-dashed border-slate-100 rounded-[50px] space-y-6">
        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-200">
          <Clock className="w-12 h-12" />
        </div>
        <p className="text-xl font-black text-slate-300 uppercase">{t("noEntries")}</p>
      </div>
    );
  }

  return (
    <div className={cn(
      "gap-4",
      viewFormat === "grid" 
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
        : "flex flex-col space-y-4"
    )}>
      {expenses.map((ex) => (
        <div 
          key={ex.id}
          className={cn(
            "bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group",
            viewFormat === "list" 
              ? "flex items-center justify-between" 
              : "flex flex-col gap-6"
          )}
        >
          <div className={cn(
            "flex items-center gap-6",
            viewFormat === "grid" && "w-full"
          )}>
            <div className={cn(
              "w-16 h-16 rounded-2xl flex items-center justify-center transition-all group-hover:rotate-6",
              ex.type === 'income' ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
            )}>
              {ex.type === 'income' ? <TrendingUp className="w-8 h-8" /> : <TrendingDown className="w-8 h-8" />}
            </div>
            <div className="space-y-1">
              <h4 className="text-xl font-black text-slate-800">{ex.itemName}</h4>
              <div className="flex items-center gap-3 text-sm font-bold text-slate-400 uppercase tracking-tight">
                <TagIcon className="w-3.5 h-3.5" />
                <span>{t(`categories.${ex.category}`)}</span>
                <span>•</span>
                <Clock className="w-3.5 h-3.5" />
                <span>{new Date(ex.date).toLocaleDateString()}</span>
                {viewFormat === "grid" && (
                  <>
                    <span>•</span>
                    <span className="text-xs">S{ex.season}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className={cn(
            "text-right",
            viewFormat === "grid" && "flex justify-between items-end w-full border-t border-slate-50 pt-4"
          )}>
            {viewFormat === "grid" && (
              <div className="text-left">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Total</p>
                <p className="text-sm font-bold text-slate-600">Season {ex.season}</p>
              </div>
            )}
            <p className={cn(
              "text-2xl font-black tracking-tight",
              ex.type === 'income' ? "text-green-600" : "text-red-600"
            )}>
              {ex.type === 'income' ? '+' : '-'}₹{ex.amount.toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
