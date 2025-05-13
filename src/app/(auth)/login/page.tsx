'use client'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f1111] text-white px-4">
      <div className="w-full max-w-md bg-[#1a1d1d] rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Entrar na sua conta</h2>
        
        <form className="space-y-5">
          <div>
            <label htmlFor="email" className="block mb-1 text-sm">E-mail</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 rounded bg-[#2b2f2f] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 text-sm">Senha</label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 rounded bg-[#2b2f2f] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2 px-4 rounded transition"
          >
            Entrar
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Não tem conta?{' '}
          <Link href="/cadastro" className="text-yellow-400 hover:underline">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  )
}
