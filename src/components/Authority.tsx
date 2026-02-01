import React from 'react';

const Authority: React.FC = () => {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="relative order-2 md:order-1">
          <div className="absolute -inset-4 bg-brand-gold/20 rounded-full blur-xl"></div>
          <img
            src="/Ariana-Borges-profile-photo.jpeg"
            alt="Ariana Borges"
            className="relative rounded-t-[100px] rounded-b-2xl shadow-2xl w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto grayscale hover:grayscale-0 transition-all duration-700"
          />
        </div>

        <div className="order-1 md:order-2 space-y-4 md:space-y-6 text-center md:text-left">
          <h2 className="font-serif text-3xl md:text-4xl text-brand-dark">
            Quem guia sua <span className="text-brand-gold">Jornada</span>?
          </h2>
          <h3 className="font-sans text-lg md:text-xl font-semibold text-brand-lilacDark">
            Ariana Borges
          </h3>
          <p className="font-sans text-gray-600 leading-relaxed text-sm md:text-base">
            Referência em espiritualidade e cura energética, Ariana tem dedicado sua vida a guiar pessoas em jornadas de libertação e expansão. Ela conduz movimentos de transformação profunda, utilizando a sabedoria ancestral da Mesa de Salomão para desbloquear potenciais adormecidos.
          </p>
          <div className="pt-4 border-l-4 border-brand-gold pl-4 md:pl-6 italic font-serif text-lg md:text-xl text-gray-500 text-left">
            "Minha promessa é guiar você em uma jornada única de libertação, onde cada dia é um passo em direção à sua verdadeira essência."
          </div>
        </div>
      </div>
    </section>
  );
};

export default Authority;