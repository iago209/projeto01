"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { useRouter } from "next/navigation";

const professionalSchema = z.object({
  fullName: z.string().min(3, "Nome muito curto"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(14, "Telefone incompleto"),
  specialty: z.string().min(1, "Selecione uma especialidade"),
  subSpecialty: z.string().optional(),
  bio: z.string().max(500, "Máximo 500 caracteres"),
  experienceYears: z.number().min(0, "Valor inválido"),
  paymentMethods: z.array(z.string()).min(1, "Selecione ao menos uma forma"),
  acceptTerms: z.boolean().refine(val => val, "Aceite os termos")
});

type ProfessionalFormData = z.infer<typeof professionalSchema>;

const PROFESSIONAL_NICHES = {
  beauty: {
    label: "Beleza",
    specialties: [
      "Cabeleireiro(a)",
      "Maquiador(a)",
      "Esteticista",
      "Manicure/Pedicure",
      "Barbeiro"
    ]
  },
  health: {
    label: "Saúde",
    specialties: [
      "Massoterapeuta",
      "Nutricionista", 
      "Personal Trainer",
      "Fisioterapeuta",
      "Acupunturista"
    ]
  }
};

export default function ProfessionalRegister() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedNiche, setSelectedNiche] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<ProfessionalFormData>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleNicheSelect = (niche: string) => {
    setSelectedNiche(niche);
    setStep(2);
  };

  const handleStepChange = (newStep: number) => {
    if (newStep < step) {
      setStep(newStep as 1 | 2 | 3);
    }
  };

  const handleSubmit = async () => {
    try {
      const validatedData = professionalSchema.parse({
        ...formData,
        experienceYears: Number(formData.experienceYears) || 0,
        paymentMethods: formData.paymentMethods || [],
        acceptTerms: !!formData.acceptTerms
      });

      console.log("Dados validados:", validatedData);
      router.push("/dashboard");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(
          Object.fromEntries(
            Object.entries(fieldErrors).map(([key, value]) => [key, value?.join(", ") || ""])
          )
        );
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div 
        className="w-full max-w-2xl bg-white rounded-xl shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Cabeçalho de etapas */}
        <div className="flex border-b">
          {[1, 2, 3].map((stepNumber) => (
            <button
              key={stepNumber}
              onClick={() => handleStepChange(stepNumber)}
              className={`flex-1 py-4 text-center font-medium ${
                step === stepNumber
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : stepNumber < step
                    ? "text-indigo-400 cursor-pointer hover:text-indigo-600"
                    : "text-gray-400 cursor-default"
              }`}
              disabled={stepNumber > step}
            >
              Etapa {stepNumber}
            </button>
          ))}
        </div>

        <div className="p-8">
          {/* Etapa 1 */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-center text-gray-900">
                Qual sua área de atuação?
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(PROFESSIONAL_NICHES).map(([key, niche]) => (
                  <motion.button
                    key={key}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleNicheSelect(key)}
                    className="p-6 border border-gray-200 rounded-lg hover:border-indigo-300 transition-all bg-white text-left"
                  >
                    <h3 className="font-semibold text-lg text-gray-900">
                      {niche.label}
                    </h3>
                    <ul className="mt-2 text-sm text-gray-700">
                      {niche.specialties.slice(0, 3).map(s => (
                        <li key={s}>• {s}</li>
                      ))}
                      {niche.specialties.length > 3 && (
                        <li className="text-indigo-600">
                          + {niche.specialties.length - 3} outras
                        </li>
                      )}
                    </ul>
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Etapa 2 */}
          {step === 2 && selectedNiche && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {PROFESSIONAL_NICHES[selectedNiche as keyof typeof PROFESSIONAL_NICHES].label}
              </h2>

              <div>
                <label className="block mb-2 font-medium text-gray-900">
                  Especialidade principal *
                </label>
                <select
                  value={formData.specialty || ""}
                  onChange={(e) => setFormData({...formData, specialty: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                >
                  <option value="">Selecione...</option>
                  {PROFESSIONAL_NICHES[selectedNiche as keyof typeof PROFESSIONAL_NICHES].specialties.map((spec) => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
                {errors.specialty && (
                  <p className="text-red-500 text-sm mt-1">{errors.specialty}</p>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setStep(3)}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Continuar
                </button>
              </div>
            </div>
          )}

          {/* Etapa 3 */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Seus dados profissionais
              </h2>

              <div>
                <label className="block mb-2 font-medium text-gray-900">Nome completo *</label>
                <input
                  type="text"
                  value={formData.fullName || ""}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900"
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-900">E-mail *</label>
                <input
                  type="email"
                  value={formData.email || ""}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-900">Telefone *</label>
                <input
                  type="tel"
                  value={formData.phone || ""}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-900">Biografia (máx 500 caracteres)</label>
                <textarea
                  value={formData.bio || ""}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900"
                  rows={4}
                />
                {errors.bio && <p className="text-red-500 text-sm mt-1">{errors.bio}</p>}
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-900">Anos de experiência *</label>
                <input
                  type="number"
                  min={0}
                  value={formData.experienceYears || ""}
                  onChange={(e) => setFormData({ ...formData, experienceYears: parseInt(e.target.value) })}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900"
                />
                {errors.experienceYears && <p className="text-red-500 text-sm mt-1">{errors.experienceYears}</p>}
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-900">Formas de pagamento *</label>
                <div className="space-y-2">
                  {["Dinheiro", "Pix", "Cartão de Crédito", "Cartão de Débito"].map((method) => (
                    <div key={method} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.paymentMethods?.includes(method) || false}
                        onChange={(e) => {
                          const newMethods = new Set(formData.paymentMethods || []);
                          e.target.checked ? newMethods.add(method) : newMethods.delete(method);
                          setFormData({ ...formData, paymentMethods: Array.from(newMethods) });
                        }}
                      />
                      <label>{method}</label>
                    </div>
                  ))}
                </div>
                {errors.paymentMethods && <p className="text-red-500 text-sm mt-1">{errors.paymentMethods}</p>}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.acceptTerms || false}
                  onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                />
                <label className="text-sm text-gray-700">
                  Li e aceito os termos de uso *
                </label>
              </div>
              {errors.acceptTerms && <p className="text-red-500 text-sm">{errors.acceptTerms}</p>}

              <div className="pt-4 border-t border-gray-200">
                <button
                  onClick={handleSubmit}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                >
                  Completar Cadastro
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
