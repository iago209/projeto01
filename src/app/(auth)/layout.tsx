'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col items-center justify-center p-4">
      <button
        onClick={() => router.back()}
        className="self-start mb-4 text-indigo-600 hover:underline flex items-center gap-1"
      >
        <ArrowLeft size={18} />
        Voltar
      </button>

      {children}
    </div>
  );
}
