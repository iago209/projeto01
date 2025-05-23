import Navbar from '@/components/Navbar';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactNode } from 'react'

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body>
        <Navbar />
        {children}
        {modal}
      </body>
    </html>
  )
}


