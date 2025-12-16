import React from 'react';
import { Shield, Sun, Calendar } from 'lucide-react';
import { Cycle } from '../types';

const cycles: Cycle[] = [
  {
    name: "Quebra de Maldição",
    duration: "9 dias",
    startDate: "23/12 à 31/12",
    objective: "Limpeza profunda de bloqueios, traumas e padrões ancestrais.",
    icon: 'shield'
  },
  {
    name: "Abre Caminho",
    duration: "12 dias",
    startDate: "01/01 à 12/01",
    objective: "Ativação de prosperidade, novas oportunidades e magnetismo.",
    icon: 'sun'
  }
];

const Cycles: React.FC = () => {
  return (
    <section id="estrutura" className="py-16 md:py-24 bg-brand-beige">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-brand-dark mb-3 md:mb-4">A Estrutura da Transformação</h2>
          <p className="font-sans text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            A Mesa de Salomão é um ritual profundo dividido em dois momentos cruciais, totalizando 21 dias de imersão espiritual.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-8">
          {cycles.map((cycle, index) => (
            <div
              key={index}
              className={`relative bg-white p-6 md:p-10 rounded-2xl md:rounded-3xl shadow-lg border-t-4 transition-transform hover:-translate-y-2 ${index === 0 ? 'border-gray-400' : 'border-brand-gold'}`}
            >
              <div className="absolute top-4 md:top-6 right-4 md:right-6 text-brand-gold/20">
                {cycle.icon === 'shield' ? <Shield size={60} className="md:w-20 md:h-20" /> : <Sun size={60} className="md:w-20 md:h-20" />}
              </div>

              <div className="relative z-10">
                <div className="inline-block p-2 md:p-3 rounded-full bg-brand-beige mb-4 md:mb-6 text-brand-dark">
                  {cycle.icon === 'shield' ? <Shield size={20} className="md:w-6 md:h-6" /> : <Sun size={20} className="md:w-6 md:h-6" />}
                </div>

                <h3 className="font-serif text-2xl md:text-3xl mb-2 text-brand-dark">{cycle.name}</h3>
                <div className="flex items-center gap-2 text-brand-lilacDark font-bold font-sans mb-3 md:mb-4 uppercase tracking-wide text-xs md:text-sm">
                  <Calendar size={12} className="md:w-3.5 md:h-3.5" />
                  {cycle.duration} • Início: {cycle.startDate}
                </div>

                <p className="font-sans text-gray-600 text-base md:text-lg">
                  {cycle.objective}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 md:mt-12 text-center">
          <div className="inline-flex flex-col items-center">
            <span className="font-serif text-4xl md:text-5xl text-brand-gold mb-2">21</span>
            <span className="font-sans text-gray-500 uppercase tracking-widest text-xs md:text-sm">Dias Totais</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cycles;