import React, { useEffect } from 'react';
import { useCheckout } from './CheckoutContext';
import { X, Star, Shield, Clock, Sparkles, ArrowRight } from 'lucide-react';

const CHECKOUT_URL = 'https://checkout.infinitepay.io/institutoarianaborges?items=[{"name":"Mesa+de+Salomão+-++++Abra+Seus+Caminhos+em+21+Dias","price":55500,"quantity":1}]&redirect_url=https://mesa-salomao.netlify.app/';

const CheckoutModal: React.FC = () => {
    const { isOpen, closeCheckout } = useCheckout();

    // Close modal on Escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeCheckout();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, closeCheckout]);

    const handleConfirm = () => {
        window.location.href = CHECKOUT_URL;
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={closeCheckout}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Modal */}
            <div
                className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-fade-in"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button
                    onClick={closeCheckout}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
                    aria-label="Fechar"
                >
                    <X className="w-5 h-5 text-gray-500" />
                </button>

                {/* Header */}
                <div className="bg-gradient-to-br from-brand-lilac/30 to-brand-gold/20 px-6 py-8 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/20 text-brand-gold text-xs font-semibold mb-4">
                        <Sparkles size={12} />
                        JORNADA DE 21 DIAS
                    </div>
                    <h2 className="font-serif text-2xl md:text-3xl text-brand-dark mb-2">
                        Mesa de Salomão
                    </h2>
                    <p className="text-gray-600 text-sm">
                        Abra Seus Caminhos em 21 Dias
                    </p>
                </div>

                {/* Content */}
                <div className="px-6 py-6">
                    {/* Price */}
                    <div className="text-center mb-6">
                        <span className="text-4xl font-serif font-bold text-brand-gold">R$ 555</span>
                        <span className="text-gray-500 text-sm ml-1">,00</span>
                        <p className="text-xs text-gray-400 mt-1">Pagamento único</p>
                    </div>

                    {/* Benefits */}
                    <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <Star className="w-4 h-4 text-brand-gold flex-shrink-0" />
                            <span>Acesso aos 21 dias completos</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <Clock className="w-4 h-4 text-brand-gold flex-shrink-0" />
                            <span>Gravações vitalícias</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <Shield className="w-4 h-4 text-brand-gold flex-shrink-0" />
                            <span>Grupo VIP de acompanhamento</span>
                        </div>
                    </div>

                    {/* Security badge */}
                    <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mb-6">
                        <Shield className="w-3 h-3" />
                        <span>Pagamento 100% seguro via InfinitePay</span>
                    </div>

                    {/* Buttons */}
                    <div className="space-y-3">
                        <button
                            onClick={handleConfirm}
                            className="w-full bg-brand-gold hover:bg-yellow-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.02]"
                        >
                            Ir para Pagamento Seguro
                            <ArrowRight className="w-4 h-4" />
                        </button>
                        <button
                            onClick={closeCheckout}
                            className="w-full text-gray-500 hover:text-gray-700 font-medium py-2 text-sm transition-colors"
                        >
                            Voltar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutModal;
