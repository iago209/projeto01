'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Head from 'next/head';

type UserType = 'client' | 'professional';

interface UserTypeButtonProps {
  type: UserType;
  selected: boolean;
  onClick: () => void;
  icon: string;
  title: string;
  subtitle: string;
  color: 'indigo' | 'purple';
}

function UserTypeButton({
  type,
  selected,
  onClick,
  icon,
  title,
  subtitle,
  color,
}: UserTypeButtonProps) {
  const colorClasses = {
    indigo: {
      bg: 'bg-indigo-100',
      border: 'border-indigo-300',
      icon: 'text-indigo-600',
      hover: 'hover:border-indigo-200',
    },
    purple: {
      bg: 'bg-purple-100',
      border: 'border-purple-300',
      icon: 'text-purple-600',
      hover: 'hover:border-purple-200',
    },
  }[color];

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full py-5 px-6 rounded-xl transition-all duration-300 flex items-center gap-4 ${
        selected
          ? `${colorClasses.bg} border-2 ${colorClasses.border} shadow-md`
          : `bg-white border-2 border-gray-100 ${colorClasses.hover} shadow-sm`
      } focus:outline-none focus:ring-2 focus:ring-${color}-400`}
      aria-label={`Selecionar tipo ${title}`}
    >
      <div className={`${colorClasses.bg} p-3 rounded-lg`}>
        <span className={`${colorClasses.icon} text-xl`}>{icon}</span>
      </div>
      <div className="text-left">
        <h2 className="font-semibold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
    </motion.button>
  );
}

export default function UserTypeSelector() {
  const [selectedType, setSelectedType] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSelect = (type: UserType) => {
    setSelectedType(type);
    setLoading(true);
    setTimeout(() => router.push(`/login?type=${type}`), 500);
  };  

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <Head>
        <title>Escolha seu tipo de usuário | Agendamento Pro</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col items-center justify-center p-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-white/20">
            <div className="p-8 text-center">
              <div className="mb-6">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  Bem-vindo ao Agendamento Pro
                </h1>
                <p className="text-gray-500">Como deseja continuar?</p>
              </div>

              <div className="space-y-4">
                <UserTypeButton
                  type="client"
                  selected={selectedType === 'client'}
                  onClick={() => handleSelect('client')}
                  icon="👤"
                  title="Sou Cliente"
                  subtitle="Agendar serviços profissionais"
                  color="indigo"
                />

                <UserTypeButton
                  type="professional"
                  selected={selectedType === 'professional'}
                  onClick={() => handleSelect('professional')}
                  icon="💼"
                  title="Sou Profissional"
                  subtitle="Gerenciar minha agenda"
                  color="purple"
                />
              </div>

              {loading && (
                <p className="text-sm text-gray-400 mt-4 animate-pulse">
                  Redirecionando...
                </p>
              )}

              <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="text-xs text-gray-400">
                  Sua escolha pode ser alterada a qualquer momento nas configurações
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
