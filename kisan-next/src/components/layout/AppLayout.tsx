"use client";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#F7FDF9]">
      <main className="flex-1 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {children}
        </div>
      </main>
    </div>
  );
}
