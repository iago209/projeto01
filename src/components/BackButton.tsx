'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react'; 
import React from 'react';

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-2 text-indigo-600 hover:underline mb-4"
    >
      <ArrowLeft size={18} />
      Voltar
    </button>
  );
}
