// components/Modal.tsx
"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function Modal({ children }: { children: ReactNode }) {
  const router = useRouter();

  // Fechar modal ao pressionar ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        router.back();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return (
    <div className="fixed inset-0 z-50 bg-[#0f1111] bg-opacity-60 flex items-center justify-center">
      <div className="bg-[#0f1111] p-8 rounded-lg shadow-lg relative">
        <button
          className="absolute top-2 right-3 text-white text-xl"
          onClick={() => router.back()}
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
