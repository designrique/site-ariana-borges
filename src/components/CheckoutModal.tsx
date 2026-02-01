import React, { useEffect, useState } from 'react';
import { useCheckout } from './CheckoutContext';
import { X, Star, Shield, Clock, Sparkles, ArrowRight, Loader2, User, Mail, Phone } from 'lucide-react';

const CheckoutModal: React.FC = () => {
    const { isOpen, closeCheckout } = useCheckout();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });

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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleConfirm = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        if (!formData.name || !formData.email || !formData.phone) {
            alert('Por favor, preencha todos os campos para continuar.');
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch('/.netlify/functions/create-checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    customer: {
                        name: formData.name,
                        email: formData.email,
                        phone_number: formData.phone
                    }
                }),
            });

            if (!response.ok) {
                throw new Error('Falha ao gerar o link de pagamento');
            }

            const data = await response.json();
            if (data.checkout_url) {
                window.location.href = data.checkout_url;
            } else {
                throw new Error('URL de checkout não recebida');
            }
        } catch (error) {
            console.error('Checkout error:', error);
            alert('Desculpe, ocorreu um erro ao iniciar o pagamento. Por favor, tente novamente ou entre em contato com nosso suporte via WhatsApp.');
        } finally {
            setIsLoading(false);
        }
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
                <div className="bg-gradient-to-br from-brand-lilac/30 to-brand-gold/20 px-6 py-6 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/20 text-brand-gold text-[10px] font-semibold mb-2">
                        <Sparkles size={10} />
                        JORNADA DE 21 DIAS
                    </div>
                    <h2 className="font-serif text-xl md:text-2xl text-brand-dark mb-1">
                        Mesa de Salomão
                    </h2>
                    <p className="text-gray-600 text-xs">
                        Abra Seus Caminhos em 21 Dias
                    </p>
                </div>

                {/* Content */}
                <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">
                    {/* Price */}
                    <div className="text-center mb-4">
                        <span className="text-3xl font-serif font-bold text-brand-gold">R$ 555</span>
                        <span className="text-gray-500 text-sm ml-1">,00</span>
                    </div>

                    {/* Benefits (Simplified) */}
                    <div className="grid grid-cols-1 gap-2 mb-6">
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                            <Star className="w-3 h-3 text-brand-gold" />
                            <span>Acesso 21 dias + Gravações vitalícias</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                            <Shield className="w-3 h-3 text-brand-gold" />
                            <span>Grupo VIP de acompanhamento</span>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleConfirm} className="space-y-4 mb-6">
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-500 ml-1">Nome Completo</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Seu nome"
                                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold outline-none transition-all text-sm"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-500 ml-1">E-mail</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="seu@email.com"
                                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold outline-none transition-all text-sm"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-500 ml-1">WhatsApp</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="+55 (00) 00000-0000"
                                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-gold/20 focus:border-brand-gold outline-none transition-all text-sm"
                                    required
                                />
                            </div>
                        </div>

                        {/* Security badge and Submit Button */}
                        <div className="pt-2">
                            <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 mb-4">
                                <Shield className="w-3 h-3" />
                                <span>Pagamento 100% seguro via InfinitePay</span>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-brand-gold hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed text-sm"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Iniciando Pagamento...
                                    </>
                                ) : (
                                    <>
                                        Garantir Minha Vaga Agora
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    <button
                        onClick={closeCheckout}
                        disabled={isLoading}
                        className="w-full text-gray-400 hover:text-gray-600 font-medium py-1 text-xs transition-colors disabled:opacity-50"
                    >
                        Voltar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutModal;
