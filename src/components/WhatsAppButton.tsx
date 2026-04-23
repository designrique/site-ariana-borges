import React, { createContext, useContext, useState } from 'react';

const WA_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '5511999999999';
const WA_MESSAGE = 'Olá! Gostaria de saber mais sobre os serviços do Instituto Ariana Borges. 💫';

interface WhatsAppCtx {
    openPopup: () => void;
    isPopupOpen: boolean;
    closePopup: () => void;
}

const WhatsAppContext = createContext<WhatsAppCtx>({
    openPopup: () => {},
    isPopupOpen: false,
    closePopup: () => {},
});

export const useWhatsApp = () => useContext(WhatsAppContext);

// Provider — apenas estado, sem renderizar o widget
export const WhatsAppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    return (
        <WhatsAppContext.Provider value={{
            openPopup: () => setIsPopupOpen(true),
            isPopupOpen,
            closePopup: () => setIsPopupOpen(false),
        }}>
            {children}
        </WhatsAppContext.Provider>
    );
};

type FormStatus = 'idle' | 'submitting' | 'success';

// Widget — renderizado condicionalmente em MainContent (não em landing pages)
export const WhatsAppFloatingWidget: React.FC = () => {
    const { isPopupOpen, closePopup } = useWhatsApp();
    const [selfOpen, setSelfOpen] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<FormStatus>('idle');

    const isOpen = selfOpen || isPopupOpen;

    const handleOpen = () => setSelfOpen(true);

    const handleClose = () => {
        setSelfOpen(false);
        closePopup();
        if (status !== 'submitting') {
            setName('');
            setEmail('');
            setStatus('idle');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        // Salva no Brevo — nunca bloqueia o redirect se falhar
        try {
            await fetch('/api/brevo-optin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, source: 'whatsapp-button' }),
            });
        } catch {
            // Ignora silenciosamente — o fluxo do usuário não deve ser interrompido
        }

        setStatus('success');

        const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;
        window.open(url, '_blank');

        setTimeout(() => handleClose(), 1800);
    };

    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px]"
                    onClick={handleClose}
                />
            )}

            {/* Popup */}
            <div
                className={`fixed bottom-24 right-6 z-50 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 origin-bottom-right ${
                    isOpen
                        ? 'opacity-100 scale-100 translate-y-0'
                        : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
                }`}
            >
                {/* Header */}
                <div className="bg-brand-dark px-5 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-[#25D366] rounded-full flex items-center justify-center flex-shrink-0">
                            <WhatsAppIcon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-white font-sans font-bold text-sm leading-tight">
                                Instituto Ariana Borges
                            </p>
                            <p className="text-white/60 font-sans text-xs">
                                Normalmente responde em minutos
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleClose}
                        className="text-white/50 hover:text-white transition-colors ml-2"
                        aria-label="Fechar"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            className="w-4 h-4"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Body */}
                {status === 'success' ? (
                    <div className="p-6 flex flex-col items-center gap-2 text-center">
                        <span className="text-3xl">✨</span>
                        <p className="text-brand-dark font-sans font-semibold text-sm">
                            Abrindo o WhatsApp…
                        </p>
                        <p className="text-gray-400 font-sans text-xs">
                            Você será redirecionado agora.
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-3">
                        <p className="text-gray-500 font-sans text-xs leading-relaxed">
                            Preencha seus dados para continuar a conversa no WhatsApp:
                        </p>

                        <input
                            type="text"
                            placeholder="Seu nome completo"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            disabled={status === 'submitting'}
                            className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-sans text-brand-dark placeholder-gray-400 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30 transition-colors disabled:opacity-60"
                        />

                        <input
                            type="email"
                            placeholder="Seu melhor e-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={status === 'submitting'}
                            className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-sans text-brand-dark placeholder-gray-400 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30 transition-colors disabled:opacity-60"
                        />

                        <button
                            type="submit"
                            disabled={status === 'submitting'}
                            className="bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-lg py-2.5 text-sm font-sans font-bold transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-md"
                        >
                            {status === 'submitting' ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                    Aguarde…
                                </>
                            ) : (
                                <>
                                    <WhatsAppIcon className="w-4 h-4" />
                                    Iniciar Conversa
                                </>
                            )}
                        </button>

                        <p className="text-gray-400 font-sans text-[10px] text-center leading-relaxed">
                            Ao continuar, você concorda com nossa{' '}
                            <a
                                href="/privacidade"
                                className="underline hover:text-brand-gold transition-colors"
                            >
                                política de privacidade
                            </a>
                            .
                        </p>
                    </form>
                )}
            </div>

            {/* Floating Button */}
            <button
                onClick={handleOpen}
                className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#1ebe5d] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
                aria-label="Fale conosco no WhatsApp"
            >
                <WhatsAppIcon className="w-7 h-7 text-white" />
                <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 group-hover:opacity-0" />
            </button>
        </>
    );
};

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
);
