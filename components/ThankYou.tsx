import React from 'react';
import { CheckCircle, MessageCircle } from 'lucide-react';

const ThankYou: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-beige flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 sm:p-12 text-center transform hover:scale-105 transition-transform duration-500 ease-in-out">
        <CheckCircle className="mx-auto text-brand-gold h-16 w-16 mb-6 animate-pulse" />
        <h1 className="font-serif text-4xl sm:text-5xl text-brand-dark mb-4">Obrigado por sua inscrição!</h1>
        <p className="font-sans text-gray-600 text-lg mb-8 leading-relaxed">
          Sua jornada de transformação começa agora. Você receberá um e-mail em breve com todos os detalhes de acesso.
        </p>

        <div className="bg-brand-lilac/10 border border-brand-lilac/30 rounded-2xl p-6 mb-8">
          <h2 className="font-sans font-bold text-xl text-brand-dark mb-3">Próximos Passos</h2>
          <ul className="text-left space-y-3 text-gray-700">
            <li className="flex items-start">
              <CheckCircle className="text-brand-lilac h-5 w-5 mr-3 mt-1 flex-shrink-0" />
              <span><strong>Verifique seu e-mail:</strong> Procure por uma mensagem de boas-vindas com o assunto "Seu Acesso à Mesa de Salomão".</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="text-brand-lilac h-5 w-5 mr-3 mt-1 flex-shrink-0" />
              <span><strong>Acesse nosso grupo:</strong> O link para o grupo exclusivo de alunos estará no seu e-mail.</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="text-brand-lilac h-5 w-5 mr-3 mt-1 flex-shrink-0" />
              <span><strong>Marque na agenda:</strong> O primeiro ciclo, "Quebra de Maldição", começa em <strong>23 de Dezembro</strong>.</span>
            </li>
          </ul>
        </div>

        <a
          href="https://chat.whatsapp.com/BWDy7XKArYBGuRvj51CqBf"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center justify-center gap-3 w-full bg-[#25D366] hover:bg-[#128C7E] hover:scale-105 transition-all duration-300 text-white font-sans font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl"
        >
          <MessageCircle className="w-6 h-6 group-hover:animate-bounce" />
          Entrar no Grupo Informativo do WhatsApp
        </a>
      </div>
    </div>
  );
};

export default ThankYou;
