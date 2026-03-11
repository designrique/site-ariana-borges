import React from 'react';
import { CheckCircle, MessageCircle } from 'lucide-react';

const WHATSAPP_GROUP = 'https://chat.whatsapp.com/EAEoS3N7tCWKMO81NY9Uv8';

const ThankYouClubeDoLivro: React.FC = () => {
    return (
        <div className="min-h-screen bg-brand-dark flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="max-w-xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-brand-dark px-8 pt-10 pb-8 text-center border-b border-brand-gold/20">
                    <p className="font-sans text-brand-gold text-xs uppercase tracking-widest mb-3">
                        Instituto Ariana Borges
                    </p>
                    <CheckCircle className="mx-auto text-brand-gold h-14 w-14 mb-4" />
                    <h1 className="font-serif text-3xl sm:text-4xl text-white mb-3">
                        Pagamento confirmado!
                    </h1>
                    <p className="font-sans text-gray-300 text-base leading-relaxed">
                        Bem-vinda ao Clube do Livro —<br />
                        <em>A Psicologia da Mulher‑Maravilha</em>
                    </p>
                </div>

                {/* Body */}
                <div className="px-8 py-8">
                    <p className="font-sans text-gray-600 text-base leading-relaxed mb-6 text-center">
                        Um e-mail de confirmação com o link de acesso ao grupo foi enviado para você. Verifique também a caixa de spam.
                    </p>

                    {/* Next steps */}
                    <div className="bg-brand-beige rounded-2xl p-6 mb-8">
                        <h2 className="font-serif text-lg text-brand-dark mb-4">Próximos passos</h2>
                        <ul className="space-y-3">
                            {[
                                'Verifique seu e-mail com o link de acesso ao grupo',
                                'Entre no grupo do WhatsApp pelo botão abaixo',
                                'Prepare-se para a sua jornada de transformação',
                            ].map((step, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <CheckCircle className="text-brand-gold h-5 w-5 mt-0.5 shrink-0" />
                                    <span className="font-sans text-gray-700 text-sm">{step}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* WhatsApp CTA */}
                    <a
                        href={WHATSAPP_GROUP}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 w-full bg-[#25D366] hover:bg-[#128C7E] transition-colors duration-300 text-white font-sans font-bold py-4 px-8 rounded-xl shadow-lg"
                    >
                        <MessageCircle className="w-5 h-5" />
                        Entrar no grupo do WhatsApp
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ThankYouClubeDoLivro;
