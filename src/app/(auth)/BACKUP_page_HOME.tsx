'use client';

import Link from 'next/link';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';


export default function Home() {
  return (
    <main className="bg-[#0f1111] text-white min-h-screen flex flex-col">

      {/* Hero Section */}
      <section className="w-full h-[600px] md:h-[450px] bg-gradient-to-b from-[#0f1111] to-[#1a1d1d]">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          loop={true}
          className="w-full h-full">

          {/* Slide 1 */}
          <SwiperSlide>
            <div className="flex flex-col items-center justify-center h-full text-center px-6">
              <h1 className="text-4xl md:text-6xl font-bold max-w-3xl leading-tight">
                Você não precisa ser trader pra entender o mercado cripto
              </h1>
              <p className="mt-6 text-lg text-gray-400 max-w-xl">
                A IA traduz o mercado para você. Conteúdo diário, claro e direto.
              </p>
              <Link href="#planos">
                <button className="mt-8 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-6 py-3 rounded-md transition">
                  Ver Planos
                </button>
              </Link>
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <div className="flex flex-col items-center justify-center h-full text-center px-6">
              <h1 className="text-4xl md:text-6xl font-bold max-w-3xl leading-tight">
                Pesque as melhores oportunidades do mercado cripto.
              </h1>
              <p className="mt-6 text-lg text-gray-400 max-w-xl">
                🎯 A IA te mostra onde vale a pena prestar atenção.
              </p>
            </div>
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide>
            <div className="flex flex-col items-center justify-center h-full text-center px-6">
              <h1 className="text-4xl md:text-6xl font-bold max-w-3xl leading-tight">
                Pegue a onda certa antes dela subir.
              </h1>
              <p className="mt-6 text-lg text-gray-400 max-w-xl">
                🌊 Descubra quando é a hora de comprar e aproveitar a alta.
              </p>
            </div>
          </SwiperSlide>
        
          {/* Slide 4 */}
          <SwiperSlide>
            <div className="flex flex-col items-center justify-center h-full text-center px-6">
              <h1 className="text-4xl md:text-6xl font-bold max-w-3xl leading-tight">
                Não afunde quando o mercado virar.
              </h1>
              <p className="mt-6 text-lg text-gray-400 max-w-xl">
                🛟 A gente te avisa quando é melhor segurar ou sair.
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 md:px-10 bg-[#121414]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-center">
          <div>
            <h3 className="text-xl font-bold mb-3">Previsões por IA</h3>
            <p className="text-gray-400">Invista com mais confiança — a IA te mostra o que importa no mercado cripto.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-3">Relatórios Diários</h3>
            <p className="text-gray-400">Pare de depender de achismos — a IA analisa, você entende.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-3">Sem Linguagem Técnica</h3>
            <p className="text-gray-400">Tudo traduzido para o português claro. Ideal para iniciantes e investidores ocupados.</p>
          </div>
        </div>
      </section>

      {/* Planos Section */}
      <section id="planos" className="px-4 sm:px-6 md:px-10 py-24 bg-[#1a1d1d]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-10">Escolha seu Plano</h2>

          <div className="overflow-x-auto mt-10 rounded-lg shadow-lg">
            <table className="min-w-[640px] w-full text-white bg-[#1c1c1c]">
              <thead className="bg-[#2a2a2a]">
                <tr className="divide-x divide-gray-700/40">
                  <th className="text-left text-gray-300 p-4">Plano</th>
                  <th className="text-cyan-400 text-xl p-4">Sardinha</th>
                  <th className="text-green-400 text-xl p-4">Golfinho</th>
                  <th className="text-yellow-400 text-xl p-4">Tubarão</th>
                  <th className="text-red-400 text-xl p-4">Megalodon</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/30 text-center">
                <tr>
                  <td className="text-left p-4 text-gray-300">Preço</td>
                  <td className="p-4">Gratuito</td>
                  <td className="p-4">R$ 19,90</td>
                  <td className="p-4">R$ 24,90</td>
                  <td className="p-4">R$ 180,00</td>
                </tr>
                <tr>
                  <td className="text-left p-4 text-gray-300">Acesso Web</td>
                  <td className="p-4 text-purple-400">✔️</td>
                  <td className="p-4 text-purple-400">✔️</td>
                  <td className="p-4 text-purple-400">✔️</td>
                  <td className="p-4 text-purple-400">✔️</td>
                </tr>
                <tr>
                  <td className="text-left p-4 text-gray-300">Acesso por 30 dias</td>
                  <td className="p-4 text-purple-400">✔️</td>
                  <td className="p-4 text-purple-400">✔️</td>
                  <td className="p-4 text-purple-400">✔️</td>
                  <td className="p-4 text-purple-400">✔️</td>
                </tr>
                <tr>
                  <td className="text-left p-4 text-gray-300">Acesso por 1 ano</td>
                  <td className="p-4 text-purple-400">❌</td>
                  <td className="p-4 text-purple-400">❌</td>
                  <td className="p-4 text-purple-400">❌</td>
                  <td className="p-4 text-purple-400">✔️</td>
                </tr>
                <tr>
                  <td className="text-left p-4 text-gray-300">Acesso ao painel de notícias</td>
                  <td className="p-4 text-purple-400">❌</td>
                  <td className="p-4 text-purple-400">✔️</td>
                  <td className="p-4 text-purple-400">✔️</td>
                  <td className="p-4 text-purple-400">✔️</td>
                </tr>
                 <tr>
                  <td className="text-left p-4 text-gray-300">Acesso a IA no WhatsApp</td>
                  <td className="p-4 text-purple-400">❌</td>
                  <td className="p-4 text-purple-400">❌</td>
                  <td className="p-4 text-purple-400">✔️</td>
                  <td className="p-4 text-purple-400">✔️</td>
                </tr>
                <tr /*className="divide-x divide-gray-700/40"*/>
                  <td className="py-8"></td>
                  <td>
                    <button className="bg-cyan-400 hover:bg-cyan-300 text-black font-semibold py-2 px-4 rounded">
                      Increver-se
                    </button>
                  </td>
                  <td>
                    <button className="bg-green-400 hover:bg-green-300 text-black font-semibold py-2 px-4 rounded">
                      Assinar 
                    </button>
                  </td>
                  <td>
                    <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 px-4 rounded">
                      Assinar  
                    </button>
                  </td>
                  <td>
                    <button className="bg-red-400 hover:bg-red-300 text-black font-semibold py-2 px-4 rounded">
                      Assinar 
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#121212] text-gray-400 text-center py-6 mt-auto">
        © {new Date().getFullYear()} SharkCrypto.ai — Feito com IA, entregue com clareza.
      </footer>
    </main>
  ) 
}
