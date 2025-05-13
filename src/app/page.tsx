import Link from 'next/link';

export default function Home() {
  return (
    <main className="bg-[#0f1111] text-white min-h-screen flex flex-col">

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24 bg-gradient-to-b from-[#0f1111] to-[#1a1d1d] ">
        <h1 className="text-4x1 md:text-6x1 font-bold max-w-3x1 leading-tight">        
         Análises de Criptomoedas feitas por IA.
        </h1>
        <p className="mt-6 text-lg text-gray-400 max-w-xl">
         Aprenda a investir em criptomoedas com a ajuda da Inteligência Artificial. Receba relatórios diários com previsões e insights do mercado, tudo em linguagem simples e direto ao ponto.
        </p>
        <Link href="#planos">
         <button className="mt-8 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-6 py-3 rouded-md transition">
           Ver Planos 
         </button> 
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg[#121414]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div>
            <h3 className="text-xl font-bold mb-3">Previsões por IA</h3>
            <p className="text-gray-400">Modelos treinados analisam o mercado diariamente e geram insights com base em indicadores técnicos.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-3">Relatórios Diários</h3>
            <p className="text-gray-400">Você recebe um resumo fácil de entender e alertas importantes.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-3">Sem Linguagem Técnica</h3>
            <p className="text-gray-400">Tudo traduzido para o português claro. Ideal para iniciantes e investidores ocupados.</p>
          </div>
        </div>
      </section>

      {/* Planos Section */}
      <section id="planos" className="py-20 px-6 bg-[#0f1111]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">Escolha seu Plano</h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="border border-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Mensal</h3>
              <p className="text-3xl font-bold mb-4">R$19,90</p>
              <ul className="text-gray-400 mb-6">
                <li>✔️ Relatórios diários</li>
                <li>✔️ Acesso web</li>
                <li>✔️ Previsões com IA</li>
              </ul>
              <button className="w-full bg-blue-600 hover:bg-blue-500 py-2 rounded text-white font-semibold transition">
                Assinar Mensal
              </button>
            </div>
            <div className="border border-yellow-400 rounded-lg p-6 bg-[#1a1d1d]">
              <h3 className="text-xl font-semibold mb-2">Anual</h3>
              <p className="text-3xl font-bold mb-4">R$180</p>
              <ul className="text-gray-400 mb-6">
                <li>✔️ Tudo do plano mensal</li>
                <li>✔️ Economia de R$58</li>
              </ul>
              <button className="w-full bg-yellow-400 hover:bg-yellow-300 py-2 rounded text-black font-semibold transition">
                Assinar Anual
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#121212] text-gray-400 text-center py-6 mt-auto">
        © {new Date().getFullYear()} xy.ai — Feito com IA, entregue com clareza.
      </footer>
    </main>
  ) 
}
