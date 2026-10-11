"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WorkPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/#work");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f1f6ec] font-mono text-xs uppercase tracking-widest text-black/40">
      Redirecting to work...
    </div>
  );
}
