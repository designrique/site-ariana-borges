import React from 'react';
import { PlayCircle, CheckCircle2 } from 'lucide-react';

const Experience: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-brand-lilac/20 to-white">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row gap-12 items-center">
        <div className="flex-1 space-y-8">
          <h2 className="font-serif text-4xl text-brand-dark leading-tight">
            Uma Experiência Única de <br/>
            <span className="text-brand-lilacDark">Acompanhamento Diário</span>
          </h2>
          
          <p className="font-sans text-gray-600 text-lg">
            Sabemos que a consistência é a chave para a mudança energética. Por isso, você não estará sozinho(a).
          </p>

          <ul className="space-y-4">
            {[
              "Gravação exclusiva da sintonização enviada diariamente",
              "Mantém sua vibração elevada durante as 24h",
              "Reforço do processo de quebra de crenças",
              "Acesso vitalício ao conteúdo dos ciclos"
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="text-brand-gold shrink-0 mt-1" size={20} />
                <span className="font-sans text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 w-full relative group cursor-pointer">
            <div className="absolute inset-0 bg-brand-gold/30 rounded-2xl transform rotate-3 transition-transform group-hover:rotate-6"></div>
            <div className="relative bg-gray-900 rounded-2xl overflow-hidden aspect-video shadow-2xl flex items-center justify-center">
                <img 
                    src="https://picsum.photos/800/600?grayscale" 
                    alt="Preview Aula" 
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity"
                />
                <PlayCircle className="text-white w-20 h-20 opacity-90 group-hover:scale-110 transition-transform relative z-10" />
            </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;