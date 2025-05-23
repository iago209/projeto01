// app/login/layout.tsx
'use client'

import { ReactNode } from "react";
import Modal from "@/components/Modal";

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <Modal>
      {children}
    </Modal>
  );
}