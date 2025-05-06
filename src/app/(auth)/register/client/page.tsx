"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Cleave from 'cleave.js/react';
import 'cleave.js/dist/addons/cleave-phone.br'; // Importação específica para BR
import { z } from 'zod';

// Schema de validação com Zod
const userSchema = z.object({
  name: z.string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(100, "Nome muito longo"),
  email: z.string()
    .email("E-mail inválido")
    .max(100, "E-mail muito longo"),
  phone: z.string()
    .min(15, "Telefone incompleto")
    .max(15, "Telefone inválido"),
  password: z.string()
    .min(8, "Mínimo 8 caracteres")
    .regex(/[A-Z]/, "Precisa de 1 letra maiúscula")
    .regex(/[a-z]/, "Precisa de 1 letra minúscula")
    .regex(/\d/, "Precisa de 1 número")
    .regex(/[@$!%*?&]/, "Precisa de 1 caractere especial (@$!%*?&)"),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Senhas não coincidem",
  path: ["confirmPassword"]
});

type FormData = z.infer<typeof userSchema>;

export default function ClientRegister() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false); // Novo estado

  const sanitizeInput = (value: string) => {
    return value.replace(/<[^>]*>?/gm, '');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: name === 'phone' 
        ? value.replace(/\D/g, '') // Remove tudo que não for dígito
        : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      userSchema.parse(formData);
      setErrors({});
      setIsSubmitting(true);

      await new Promise(resolve => setTimeout(resolve, 1500));

      alert("Cadastro realizado com sucesso!\nRedirecionando...");
      // router.push('/dashboard');

    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.formErrors.fieldErrors;
        setErrors(
          Object.fromEntries(
            Object.entries(fieldErrors).map(([key, value]) => [key, value?.join(", ")])
          ) as Partial<Record<keyof FormData, string>>
        );
      } else {
        alert("Erro inesperado. Tente novamente.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-8"
      >
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6 text-center"
        >
          Cadastro de Cliente
        </motion.h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nome */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nome Completo
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full rounded-lg border ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              } shadow-sm p-3 bg-white text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500`}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && (
              <p id="name-error" className="mt-1 text-sm text-red-600">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full rounded-lg border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } shadow-sm p-3 bg-white text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500`}
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Telefone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Telefone
            </label>
            <Cleave
              id="phone"
              name="phone"
              placeholder="(99) 99999-9999"
              value={formData.phone}
              onChange={(e) => {
                const rawValue = e.target.rawValue; // Pega o valor sem máscara
                setFormData(prev => ({ ...prev, phone: rawValue }));
              }}
              options={{ 
                phone: true, 
                phoneRegionCode: 'BR',
                prefix: '',
                delimiter: ' ',
                blocks: [0, 2, 5, 4],
                delimiters: ['(', ') ', '-'],
                numericOnly: true
               }}
              className={`w-full rounded-lg border ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              } shadow-sm p-3 bg-white text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500`}
              aria-invalid={!!errors.phone}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>

          {/* Senha */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Senha
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full rounded-lg border ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                } shadow-sm p-3 bg-white text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500`}
                aria-invalid={!!errors.password}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 hover:text-indigo-600"
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {errors.password ? (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            ) : (
              <p className="mt-1 text-xs text-gray-500">
                Mínimo 8 caracteres com maiúscula, número e caractere especial
              </p>
            )}
          </div>

          {/* Confirmar Senha */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirmar Senha
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full rounded-lg border ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                } shadow-sm p-3 bg-white text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500`}                aria-invalid={!!errors.confirmPassword}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-gray-500 hover:text-indigo-600"
                aria-label={showConfirmPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Termos */}
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={termsAccepted}
                onChange={() => setTermsAccepted(!termsAccepted)}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="font-medium text-gray-700">
                Concordo com os{' '}
                <a href="#" className="text-indigo-600 hover:text-indigo-500">
                  Termos de Serviço
                </a>
              </label>
            </div>
          </div>

          {/* Botão de Submit */}
          <motion.button
            type="submit"
            disabled={isSubmitting || !termsAccepted}
            whileTap={{ scale: 0.98 }}
            className={`w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg transition-all ${
              (isSubmitting || !termsAccepted) ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8..."></path>
                </svg>
                Cadastrando...
              </span>
            ) : (
              "Cadastrar"
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
