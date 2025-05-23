'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function LoginModal() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      setError('Email ou senha inválidos.')
    } else {
      router.push('/') // redireciona pra home
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative bg-[#111213] border border-gray-700/50 shadow-2xl px-8 py-10 rounded-2xl w-[90%] max-w-md text-white transition-all duration-300">
        <button
          onClick={() => router.back()} // volta à página anterior
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 text-xl"
          aria-label="Fechar"
        >
          ×
        </button>

        <h2 className="text-3xl font-bold mb-8 text-center text-yellow-400">Bem-vindo(a)</h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-md bg-[#1c1e1e] border border-gray-600 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Senha</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-md bg-[#1c1e1e] border border-gray-600 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 rounded-md transition duration-200"
          >
            Entrar
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-400">
          Não tem uma conta?{' '}
          <button
            onClick={() => router.push('/register')}
            className="text-yellow-400 hover:underline font-medium"
          >
            Criar conta
          </button>
        </p>
      </div>
    </div>
  )
}