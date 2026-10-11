"use client";

export default function NavBar() {


  const glassPillClass = "rounded-full bg-white/30 backdrop-blur-2xl border border-white/50 shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),0_4px_12px_rgba(0,0,0,0.05)]";

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] px-8 py-6 w-full flex justify-between items-center gap-4">
      <div className={`w-[180px] h-[40px] ${glassPillClass}`}></div>
      
      <div className="flex-1 flex justify-center gap-4">
        <div className={`w-[120px] h-[40px] ${glassPillClass}`}></div>
        <div className={`w-[120px] h-[40px] ${glassPillClass}`}></div>
      </div>

      <div className={`w-[280px] h-[40px] ${glassPillClass}`}></div>
    </header>
  );
}
