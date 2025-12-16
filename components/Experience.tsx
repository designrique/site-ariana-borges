import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const Experience: React.FC = () => {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-brand-lilac/20 to-white">
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <div className="space-y-6 md:space-y-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-brand-dark leading-tight">
            Uma Experiência Única de <br />
            <span className="text-brand-lilacDark">Acompanhamento Diário</span>
          </h2>

          <p className="font-sans text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Sabemos que a consistência é a chave para a mudança energética. Por isso, você não estará sozinho(a).
          </p>

          <ul className="space-y-3 md:space-y-4 max-w-xl mx-auto text-left">
            {[
              "Gravação exclusiva da sintonização enviada diariamente",
              "Mantém sua vibração elevada durante as 24h",
              "Reforço do processo de quebra de crenças",
              "Acesso vitalício ao conteúdo dos ciclos"
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 md:gap-3">
                <CheckCircle2 className="text-brand-gold shrink-0 mt-1 w-4 h-4 md:w-5 md:h-5" />
                <span className="font-sans text-gray-700 text-sm md:text-base">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Experience;