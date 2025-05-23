'use client'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const router = useRouter()

  const onSubmit = async (data: any) => {
    // 1. Cria usuário no Supabase Auth
    const { data: authUser, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.senha
    })

    if (authError) {
      alert(authError.message)
      return
    }

    // 2. Cadastra dados adicionais na tabela users
    const { error: dbError } = await supabase.from('users').insert({
      id: authUser.user?.id,
      nome: data.nome,
      email: data.email,
      telefone: data.telefone,
      cpf: data.cpf || null
    })

    if (dbError) {
      alert(dbError.message)
      return
    }

    alert('Conta criada com sucesso!')
    router.push('/login')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-800 p-8 rounded shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-yellow-400 text-center">Criar Conta</h2>

        <input
          type="text"
          placeholder="Nome completo"
          {...register('nome', { required: true })}
          className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
        />

        <input
          type="email"
          placeholder="Email"
          {...register('email', { required: true })}
          className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
        />

        <input
          type="text"
          placeholder="Telefone (somente números)"
          {...register('telefone', { required: true })}
          className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
        />

        <input
          type="text"
          placeholder="CPF (opcional)"
          {...register('cpf')}
          className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
        />

        <input
          type="password"
          placeholder="Senha segura"
          {...register('senha', { required: true })}
          className="w-full p-2 mb-6 rounded bg-gray-700 text-white"
        />

        <button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 rounded"
        >
          Cadastrar
        </button>
      </form>
    </div>
  )
}
