import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { InfoCircle, TickCircle, RefreshCircle, Message, CloseCircle, Calendar, Location } from 'iconsax-react';
import { trackDNABasicoPurchase } from '@/lib/metaTracking';

interface PaymentStatus {
    paid: boolean;
    paid_amount?: number;
    capture_method?: string;
    capi_sent?: boolean;
    email_sent?: boolean;
    email_to?: string;
}

const ThankYouDNABasico: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState<'loading' | 'success' | 'pending' | 'error' | 'none'>('loading');
    const [paymentData, setPaymentData] = useState<PaymentStatus | null>(null);
    const [pixelFired, setPixelFired] = useState(false);

    useEffect(() => {
        const slug = searchParams.get('slug');
        const transactionNsu = searchParams.get('transaction_nsu');
        const orderNsu = searchParams.get('order_nsu');
        const isTestRoute = searchParams.get('_testDNA') === '1';

        if (isTestRoute) {
            setStatus('success');
            return;
        }

        if (!slug || !transactionNsu || !orderNsu) {
            setStatus('none');
            return;
        }

        // /api/dna-basico-confirm verifica + dispara CAPI + envia email num call so
        const confirmPayment = async () => {
            try {
                const response = await fetch('/api/dna-basico-confirm', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        slug,
                        transaction_nsu: transactionNsu,
                        order_nsu: orderNsu,
                    }),
                });

                if (!response.ok) throw new Error('Confirmation failed');

                const data = await response.json() as PaymentStatus;
                setPaymentData(data);
                setStatus(data.paid ? 'success' : 'pending');
            } catch (error) {
                console.error('Error confirming DNA Basico payment:', error);
                setStatus('error');
            }
        };

        void confirmPayment();
    }, [searchParams]);

    useEffect(() => {
        if (status !== 'success' || pixelFired) return;
        if (searchParams.get('_testDNA') === '1') return;

        trackDNABasicoPurchase(
            searchParams.get('order_nsu'),
            searchParams.get('transaction_nsu'),
            paymentData?.paid_amount,
        );
        setPixelFired(true);
    }, [paymentData?.paid_amount, pixelFired, searchParams, status]);

    return (
        <div className="min-h-screen bg-[#0b0916] flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="max-w-xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-b from-[#12102b] to-[#0b0916] px-8 pt-10 pb-8 text-center border-b border-[#D4AF37]/30">
                    <p className="font-sans text-[#D4AF37] text-xs uppercase tracking-widest mb-3">
                        Instituto Ariana Borges
                    </p>
                    {status === 'loading' && <RefreshCircle size={56} variant="Linear" color="currentColor" className="mx-auto text-[#D4AF37] mb-4 animate-spin" />}
                    {status === 'success' && <TickCircle size={56} variant="Linear" color="currentColor" className="mx-auto text-[#D4AF37] mb-4" />}
                    {status === 'pending' && <InfoCircle size={56} variant="Linear" color="currentColor" className="mx-auto text-yellow-400 mb-4" />}
                    {(status === 'error' || status === 'none') && <CloseCircle size={56} variant="Linear" color="currentColor" className="mx-auto text-red-400 mb-4" />}
                    <h1 className="font-serif text-3xl sm:text-4xl text-white mb-3">
                        {status === 'loading' && 'Verificando pagamento...'}
                        {status === 'success' && 'Pagamento confirmado!'}
                        {status === 'pending' && 'Pagamento em processamento'}
                        {(status === 'error' || status === 'none') && 'Não foi possível confirmar o pagamento'}
                    </h1>
                    <p className="font-sans text-gray-300 text-base leading-relaxed">
                        {status === 'loading' && 'Aguarde um instante enquanto validamos sua compra com a InfinitePay.'}
                        {status === 'success' && (
                            <>
                                Bem-vinda ao <strong>DNA Básico ThetaHealing®</strong><br />
                                <em>11, 13 e 14 de Junho · Online ao vivo</em>
                            </>
                        )}
                        {status === 'pending' && 'Recebemos seu pedido, mas a InfinitePay ainda não confirmou o pagamento.'}
                        {(status === 'error' || status === 'none') && 'Abra o link do seu checkout novamente ou aguarde alguns instantes antes de tentar outra vez.'}
                    </p>
                </div>

                {/* Body */}
                <div className="px-8 py-8">
                    {status === 'success' && (
                        <>
                            <p className="font-sans text-gray-700 text-base leading-relaxed mb-6 text-center">
                                Um e-mail de confirmação com todos os detalhes da imersão foi enviado para você. Verifique também a caixa de spam.
                                {paymentData?.capture_method && ` Pagamento via ${paymentData.capture_method.toUpperCase()}.`}
                            </p>

                            {/* Detalhes da turma */}
                            <div className="bg-gradient-to-br from-[#0b0916] to-[#12102b] rounded-2xl p-6 mb-6 border border-[#D4AF37]/30">
                                <h2 className="font-serif text-lg text-[#D4AF37] mb-4 text-center">Sua turma</h2>
                                <div className="space-y-3 text-white">
                                    <div className="flex items-center gap-3">
                                        <Calendar size={20} variant="Linear" color="currentColor" className="text-[#D4AF37]" />
                                        <span className="font-sans text-sm">11, 13 e 14 de Junho · 2026</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Location size={20} variant="Linear" color="currentColor" className="text-[#D4AF37]" />
                                        <span className="font-sans text-sm">100% Online ao Vivo</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#f5f0eb] rounded-2xl p-6 mb-8">
                                <h2 className="font-serif text-lg text-[#0b0916] mb-4">Próximos passos</h2>
                                <ul className="space-y-3">
                                    {[
                                        'Verifique seu e-mail com todos os detalhes (local exato, horários, o que levar)',
                                        'Bloqueie a agenda: Qui 11/06 19h-21h · Sáb 13/06 9h-19h · Dom 14/06 8h-13h',
                                        'Em breve você receberá o link do grupo exclusivo no WhatsApp',
                                        'Prepare-se para 3 dias de transformação profunda',
                                    ].map((step, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <TickCircle size={20} variant="Linear" color="currentColor" className="text-[#D4AF37] mt-0.5 shrink-0" />
                                            <span className="font-sans text-gray-700 text-sm">{step}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <a
                                href="https://wa.me/551153041409?text=Acabei%20de%20me%20inscrever%20no%20DNA%20B%C3%A1sico%21"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-3 w-full bg-[#25D366] hover:bg-[#128C7E] transition-colors duration-300 text-white font-sans font-bold py-4 px-8 rounded-xl shadow-lg"
                            >
                                <Message size={20} variant="Linear" color="currentColor" />
                                Falar com a equipe pelo WhatsApp
                            </a>
                        </>
                    )}

                    {status === 'pending' && (
                        <p className="font-sans text-gray-600 text-base leading-relaxed text-center">
                            Assim que a InfinitePay aprovar a transação, você receberá um e-mail com todos os detalhes da imersão.
                        </p>
                    )}

                    {(status === 'error' || status === 'none') && (
                        <p className="font-sans text-gray-600 text-base leading-relaxed text-center">
                            Se você já concluiu o pagamento, aguarde alguns instantes e recarregue esta página usando o link recebido no checkout.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ThankYouDNABasico;
