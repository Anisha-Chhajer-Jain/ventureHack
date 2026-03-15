"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  ArrowLeft,
  LayoutGrid,
  List as ListIcon,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { ExpenseDashboard } from "@/components/expenses/ExpenseDashboard";
import { ExpenseList } from "@/components/expenses/ExpenseList";
import { ExpenseForm } from "@/components/expenses/ExpenseForm";
import { Input } from "@/components/ui/input";
import { DualText } from "@/components/ui/DualText";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

// Removed sample data in favor of API fetching

export default function ExpenseManagerPage() {
  const t = useTranslations("Expenses");
  const [expenses, setExpenses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "expense" | "income">("all");
  const [viewFormat, setViewFormat] = useState<"list" | "grid">("list");

  useEffect(() => {
    async function fetchExpenses() {
      try {
        const res = await fetch("/api/expenses");
        if (!res.ok) throw new Error("Failed to fetch expenses");
        const data = await res.json();
        setExpenses(data.expenses || []);
      } catch (err) {
        console.error(err);
        setError("Could not load expenses.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchExpenses();
  }, []);

  const filteredExpenses = expenses.filter(ex => {
    const matchesSearch = ex.itemName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "all" || ex.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const handleAdd = async (entry: any) => {
    try {
      const res = await fetch("/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      });
      if (!res.ok) throw new Error("Failed to save expense");
      const data = await res.json();
      setExpenses([data.expense, ...expenses]);
    } catch (err) {
      console.error(err);
      alert("Failed to save. Please try again.");
    }
  };

  const handleDownloadCSV = () => {
    if (!filteredExpenses.length) return alert("No expenses to export.");
    
    // Define CSV Headers
    const headers = ["Date", "Season", "Month", "Year", "Category", "Item Name", "Type", "Amount (INR)", "Payment Method", "Notes"];
    
    const rows = filteredExpenses.map(ex => {
      const d = new Date(ex.date).toLocaleDateString();
      return [
        d,
        `Season ${ex.season || 1}`,
        ex.month || new Date(ex.date).getMonth() + 1,
        ex.year || new Date(ex.date).getFullYear(),
        t(`categories.${ex.category}`),
        `"${ex.itemName.replace(/"/g, '""')}"`, // escape quotes
        ex.type === "income" ? t("aamdani") : t("kharcha"),
        `"₹${ex.amount}"`,
        t(`methods.${ex.paymentMethod || 'cash'}`),
        `"${(ex.notes || "").replace(/"/g, '""')}"`
      ].join(",");
    });

    const csvContent = "\uFEFF" + [headers.join(","), ...rows].join("\n"); // Prepend BOM for Excel UTF-8
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `KisanDost_HisabKitab_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="animate-spin w-12 h-12 border-4 border-[#2e6b3b] border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-[#2e6b3b] font-bold text-xl animate-pulse">Loading Kharcha Book...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 md:space-y-12 pb-32">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-slate-400 font-bold hover:text-[#2e6b3b] transition-colors">
            <ArrowLeft className="w-5 h-5" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-[#2e6b3b] tracking-tighter leading-none uppercase">
            <DualText native={t("title")} english="Farmer Expense Manager" />
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-medium">{t("subtitle")}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            onClick={handleDownloadCSV}
            variant="outline" 
            className="h-14 md:h-16 px-6 md:px-8 rounded-2xl border-2 border-slate-100 font-black text-slate-600 hover:bg-slate-50 transition-all hover:border-[#8bc34a] hover:text-[#2e6b3b]"
          >
            <Download className="w-5 h-5 mr-3" /> Report
          </Button>
          <Button 
            onClick={() => setIsFormOpen(true)}
            className="h-14 md:h-16 px-8 md:px-10 rounded-2xl bg-[#2e6b3b] hover:bg-[#1b4332] text-white shadow-2xl text-lg md:text-xl font-black transition-all hover:scale-105 active:scale-95 flex items-center gap-3"
          >
            <Plus className="w-7 h-7 md:w-8 md:h-8" /> {t("save")}
          </Button>
        </div>
      </div>

      {/* Dashboard */}
      <ExpenseDashboard expenses={expenses} />

      {/* Controls & List */}
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="relative w-full md:max-w-md group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-slate-400 group-focus-within:text-[#2e6b3b] transition-colors" />
            <Input 
              placeholder={t("search")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-14 md:h-16 pl-14 md:pl-16 pr-6 bg-white rounded-3xl border-2 border-slate-100 text-base md:text-lg font-bold shadow-sm focus:border-[#8bc34a] focus:ring-4 focus:ring-[#8bc34a]/10"
            />
          </div>

          <div className="flex p-1 bg-slate-100 rounded-2xl w-full md:w-auto h-14 md:h-16 self-stretch md:self-auto overflow-x-auto no-scrollbar">
            {(["all", "expense", "income"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={cn(
                  "flex-1 md:px-8 h-full rounded-xl text-sm font-black uppercase tracking-widest transition-all",
                  activeFilter === f ? "bg-white text-[#2e6b3b] shadow-md" : "text-slate-400 hover:text-slate-600"
                )}
              >
                {t(f === 'all' ? 'summary' : f === 'expense' ? 'kharcha' : 'aamdani')}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between px-4">
            <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">{t("history")}</h3>
            <div className="flex gap-2 p-1.5 bg-slate-100/80 rounded-2xl shadow-inner">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setViewFormat("list")}
                className={cn(
                  "rounded-xl transition-all",
                  viewFormat === "list" ? "bg-white text-[#2e6b3b] shadow-sm" : "text-slate-400 hover:text-slate-600"
                )}
              >
                <ListIcon className="w-5 h-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setViewFormat("grid")}
                className={cn(
                  "rounded-xl transition-all",
                  viewFormat === "grid" ? "bg-white text-[#2e6b3b] shadow-sm" : "text-slate-400 hover:text-slate-600"
                )}
              >
                <LayoutGrid className="w-5 h-5" />
              </Button>
            </div>
          </div>
          
          <ExpenseList expenses={filteredExpenses} viewFormat={viewFormat} />
        </div>
      </div>

      {isFormOpen && (
        <ExpenseForm 
          onAdd={handleAdd} 
          onClose={() => setIsFormOpen(false)} 
        />
      )}
    </div>
  );
}
