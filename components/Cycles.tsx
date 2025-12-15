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
    <section id="estrutura" className="py-24 bg-brand-beige">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl text-brand-dark mb-4">A Estrutura da Transformação</h2>
          <p className="font-sans text-gray-600 max-w-2xl mx-auto">
            A Mesa de Salomão é um ritual profundo dividido em dois momentos cruciais, totalizando 21 dias de imersão espiritual.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {cycles.map((cycle, index) => (
            <div 
              key={index} 
              className={`relative bg-white p-10 rounded-3xl shadow-lg border-t-4 transition-transform hover:-translate-y-2 ${index === 0 ? 'border-gray-400' : 'border-brand-gold'}`}
            >
              <div className="absolute top-6 right-6 text-brand-gold/20">
                {cycle.icon === 'shield' ? <Shield size={80} /> : <Sun size={80} />}
              </div>
              
              <div className="relative z-10">
                <div className="inline-block p-3 rounded-full bg-brand-beige mb-6 text-brand-dark">
                  {cycle.icon === 'shield' ? <Shield size={24} /> : <Sun size={24} />}
                </div>
                
                <h3 className="font-serif text-3xl mb-2 text-brand-dark">{cycle.name}</h3>
                <div className="flex items-center gap-2 text-brand-lilacDark font-bold font-sans mb-4 uppercase tracking-wide text-sm">
                  <Calendar size={14} />
                  {cycle.duration} • Início: {cycle.startDate}
                </div>
                
                <p className="font-sans text-gray-600 text-lg">
                  {cycle.objective}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
           <div className="inline-flex flex-col items-center">
              <span className="font-serif text-5xl text-brand-gold mb-2">21</span>
              <span className="font-sans text-gray-500 uppercase tracking-widest text-sm">Dias Totais</span>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Cycles;