import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { TickCircle, RefreshCircle, CloseCircle, InfoCircle, ArrowRight2, Sms } from 'iconsax-react';

interface PaymentStatus {
    success: boolean;
    paid: boolean;
    amount: number;
    paid_amount: number;
    installments: number;
    capture_method: string;
}

declare global {
    interface Window {
        fbq?: (...args: unknown[]) => void;
    }
}

const WHATSAPP_GROUP_LINK = 'https://chat.whatsapp.com/CMeZf3iVA0QHWHlmBOBBNz';
const PORTAL_PRICE = 198;

const ThankYouPortal5_5: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState<'loading' | 'success' | 'pending' | 'error' | 'none'>('none');
    const [paymentData, setPaymentData] = useState<PaymentStatus | null>(null);
    const [pixelFired, setPixelFired] = useState(false);

    useEffect(() => {
        const slug = searchParams.get('slug');
        const transactionNsu = searchParams.get('transaction_nsu');
        const orderNsu = searchParams.get('order_nsu');

        if (slug && transactionNsu && orderNsu) {
            verifyPayment(slug, transactionNsu, orderNsu);
        }
    }, [searchParams]);

    useEffect(() => {
        const noParams = !searchParams.get('slug');
        if ((status === 'success' || (status === 'none' && noParams)) && !pixelFired) {
            if (typeof window.fbq === 'function') {
                window.fbq('track', 'Purchase', {
                    value: paymentData ? paymentData.paid_amount / 100 : PORTAL_PRICE,
                    currency: 'BRL',
                    content_name: 'Portal 5/5 — Mesa de Salomão + Kundalini',
                    content_category: 'energy_portal',
                });
                setPixelFired(true);
            }
        }
    }, [status, paymentData, pixelFired, searchParams]);

    const verifyPayment = async (slug: string, transactionNsu: string, orderNsu: string) => {
        setStatus('loading');
        try {
            const response = await fetch('/api/verify-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ slug, transaction_nsu: transactionNsu, order_nsu: orderNsu }),
            });
            if (!response.ok) throw new Error('Verification failed');
            const data = await response.json();
            setPaymentData(data);
            setStatus(data.paid ? 'success' : 'pending');
        } catch (error) {
            console.error('Error verifying payment:', error);
            setStatus('error');
        }
    };

    const noParams = !searchParams.get('slug');
    const showSuccess = status === 'success' || (status === 'none' && noParams);

    return (
        <div className="font-sans antialiased min-h-screen bg-brand-dark text-brand-beige relative overflow-hidden flex items-center justify-center px-4 py-16">
            <Helmet>
                <title>Pagamento Confirmado — Portal 5/5 | Ariana Borges</title>
                <meta name="robots" content="noindex,nofollow" />
            </Helmet>

            {/* Cosmic background animation (same vibe as Hero) */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div
                    className="absolute inset-0 opacity-90"
                    style={{
                        background:
                            'radial-gradient(circle at 50% 30%, rgba(212,175,55,0.30) 0%, rgba(102,51,153,0.40) 35%, rgba(20,8,40,0.95) 75%, #0a0420 100%)',
                    }}
                />
                <div
                    className="absolute inset-0 mix-blend-screen opacity-50"
                    style={{
                        background:
                            'conic-gradient(from 90deg at 50% 50%, rgba(212,175,55,0.15), rgba(180,140,255,0.15), rgba(212,175,55,0.15))',
                        animation: 'spin 60s linear infinite',
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-dark" />
            </div>

            <div className="relative z-10 max-w-2xl w-full">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl shadow-2xl p-8 sm:p-12 text-center">
                    {status === 'loading' && (
                        <>
                            <RefreshCircle size={64} variant="Linear" color="#D4AF37" className="mx-auto mb-6 animate-spin" />
                            <h1 className="font-serif text-3xl text-white mb-3">Verificando seu pagamento…</h1>
                            <p className="text-gray-300">Aguarde um instante.</p>
                        </>
                    )}

                    {showSuccess && (
                        <>
                            <span className="inline-block py-1 px-4 rounded-full bg-purple-950/70 text-white border border-brand-gold/40 text-xs font-sans tracking-[0.25em] uppercase mb-6 backdrop-blur-sm">
                                5 de Maio • 20h • Online
                            </span>

                            <TickCircle size={72} variant="Bulk" color="#D4AF37" className="mx-auto mb-6" />

                            <h1 className="font-serif text-3xl sm:text-5xl text-white mb-3 leading-tight">
                                Pagamento confirmado
                            </h1>
                            <p className="font-serif italic font-bold text-brand-gold text-lg sm:text-xl mb-8">
                                Sua entrada no Portal 5/5 está garantida.
                            </p>

                            <p className="font-sans text-gray-300 text-base sm:text-lg leading-relaxed mb-8 max-w-lg mx-auto">
                                {paymentData && `Recebemos seu pagamento via ${paymentData.capture_method?.toUpperCase()}. `}
                                Acesse o grupo exclusivo no botão abaixo — todos os detalhes do encontro chegarão lá.
                            </p>

                            <a
                                href={WHATSAPP_GROUP_LINK}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center justify-center gap-3 w-full sm:w-auto bg-[#25D366] hover:bg-[#1ebe5d] transition-all duration-300 transform hover:-translate-y-1 text-white font-sans font-bold py-4 px-8 sm:px-12 rounded-full shadow-lg hover:shadow-[#25D366]/40 text-base sm:text-lg"
                            >
                                Entrar no grupo do WhatsApp
                                <ArrowRight2 size={22} variant="Linear" color="currentColor" className="group-hover:translate-x-1 transition-transform" />
                            </a>

                            <p className="text-gray-400 text-xs mt-4 break-all max-w-md mx-auto">
                                ou copie o link: <span className="text-brand-gold/80">{WHATSAPP_GROUP_LINK}</span>
                            </p>
                        </>
                    )}

                    {status === 'pending' && (
                        <>
                            <InfoCircle size={64} variant="Linear" color="#fbbf24" className="mx-auto mb-6" />
                            <h1 className="font-serif text-3xl text-white mb-3">Pagamento em processamento</h1>
                            <p className="font-sans text-gray-300 leading-relaxed mb-6">
                                Recebemos seu pedido, mas o pagamento ainda está sendo processado pela InfinitePay.
                                Assim que aprovar, você receberá um e-mail com o link do grupo do WhatsApp.
                            </p>
                            <p className="text-sm text-gray-400">
                                Costuma levar de 1 a 5 minutos. Você pode fechar esta página.
                            </p>
                        </>
                    )}

                    {status === 'error' && (
                        <>
                            <CloseCircle size={64} variant="Linear" color="#ef4444" className="mx-auto mb-6" />
                            <h1 className="font-serif text-3xl text-white mb-3">Não conseguimos verificar agora</h1>
                            <p className="font-sans text-gray-300 leading-relaxed mb-6">
                                Se o pagamento foi concluído, nosso sistema vai processar em instantes e você receberá o link do grupo por e-mail.
                            </p>
                            <a
                                href={WHATSAPP_GROUP_LINK}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 text-brand-gold hover:text-brand-goldDark font-sans font-bold underline"
                            >
                                Acessar grupo do WhatsApp
                            </a>
                        </>
                    )}

                    {showSuccess && (
                        <div className="mt-10 pt-8 border-t border-white/10 text-left">
                            <div className="flex items-center gap-2 mb-4 justify-center sm:justify-start">
                                <Sms size={18} variant="Linear" color="#D4AF37" />
                                <span className="text-xs uppercase tracking-[0.25em] text-brand-gold font-bold">
                                    Próximos passos
                                </span>
                            </div>
                            <ul className="space-y-3 text-gray-300 text-sm sm:text-base">
                                <li className="flex items-start gap-3">
                                    <span className="text-brand-gold mt-1 flex-shrink-0">1.</span>
                                    <span><strong className="text-white">Verifique seu e-mail</strong> — enviamos uma confirmação com o link do grupo (cheque também o spam/promoções).</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-brand-gold mt-1 flex-shrink-0">2.</span>
                                    <span><strong className="text-white">Entre no grupo agora</strong> usando o botão acima — combinaremos o link da transmissão por lá.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-brand-gold mt-1 flex-shrink-0">3.</span>
                                    <span><strong className="text-white">Marque na agenda</strong> — encontro online no dia <strong className="text-white">5 de Maio às 20h</strong>.</span>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ThankYouPortal5_5;
