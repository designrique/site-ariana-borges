import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { InfoCircle, TickCircle, RefreshCircle, Message, CloseCircle } from 'iconsax-react';
import { trackClubePurchase } from '@/lib/metaTracking';

const WHATSAPP_GROUP = 'https://chat.whatsapp.com/EAEoS3N7tCWKMO81NY9Uv8';

interface PaymentStatus {
    paid: boolean;
    paid_amount?: number;
    capture_method?: string;
}

const ThankYouClubeDoLivro: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState<'loading' | 'success' | 'pending' | 'error' | 'none'>('loading');
    const [paymentData, setPaymentData] = useState<PaymentStatus | null>(null);
    const [pixelFired, setPixelFired] = useState(false);

    useEffect(() => {
        const slug = searchParams.get('slug');
        const transactionNsu = searchParams.get('transaction_nsu');
        const orderNsu = searchParams.get('order_nsu');
        const isTestRoute = searchParams.get('_testClube') === '1';

        if (isTestRoute) {
            setStatus('success');
            return;
        }

        if (!slug || !transactionNsu || !orderNsu) {
            setStatus('none');
            return;
        }

        const verifyPayment = async () => {
            try {
                const response = await fetch('/api/verify-payment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        slug,
                        transaction_nsu: transactionNsu,
                        order_nsu: orderNsu,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Verification failed');
                }

                const data = await response.json() as PaymentStatus;
                setPaymentData(data);
                setStatus(data.paid ? 'success' : 'pending');
            } catch (error) {
                console.error('Error verifying Clube do Livro payment:', error);
                setStatus('error');
            }
        };

        void verifyPayment();
    }, [searchParams]);

    useEffect(() => {
        if (status !== 'success' || pixelFired) {
            return;
        }

        const isTestRoute = searchParams.get('_testClube') === '1';
        if (isTestRoute) {
            return;
        }

        trackClubePurchase(
            searchParams.get('order_nsu'),
            searchParams.get('transaction_nsu'),
            paymentData?.paid_amount,
        );
        setPixelFired(true);
    }, [paymentData?.paid_amount, pixelFired, searchParams, status]);

    return (
        <div className="min-h-screen bg-brand-dark flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="max-w-xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-brand-dark px-8 pt-10 pb-8 text-center border-b border-brand-gold/20">
                    <p className="font-sans text-brand-gold text-xs uppercase tracking-widest mb-3">
                        Instituto Ariana Borges
                    </p>
                    {status === 'loading' && <RefreshCircle size={56} variant="Linear" color="currentColor" className="mx-auto text-brand-gold mb-4 animate-spin" />}
                    {status === 'success' && <TickCircle size={56} variant="Linear" color="currentColor" className="mx-auto text-brand-gold mb-4" />}
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
                                Bem-vinda ao Clube do Livro —<br />
                                <em>A Psicologia da Mulher‑Maravilha</em>
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
                            <p className="font-sans text-gray-600 text-base leading-relaxed mb-6 text-center">
                                Um e-mail de confirmação com o link de acesso ao grupo foi enviado para você. Verifique também a caixa de spam.
                                {paymentData?.capture_method && ` Pagamento confirmado via ${paymentData.capture_method.toUpperCase()}.`}
                            </p>

                            <div className="bg-brand-beige rounded-2xl p-6 mb-8">
                                <h2 className="font-serif text-lg text-brand-dark mb-4">Próximos passos</h2>
                                <ul className="space-y-3">
                                    {[
                                        'Verifique seu e-mail com o link de acesso ao grupo',
                                        'Entre no grupo do WhatsApp pelo botão abaixo',
                                        'Prepare-se para a sua jornada de transformação',
                                    ].map((step, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <TickCircle size={20} variant="Linear" color="currentColor" className="text-brand-gold mt-0.5 shrink-0" />
                                            <span className="font-sans text-gray-700 text-sm">{step}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <a
                                href={WHATSAPP_GROUP}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-3 w-full bg-[#25D366] hover:bg-[#128C7E] transition-colors duration-300 text-white font-sans font-bold py-4 px-8 rounded-xl shadow-lg"
                            >
                                <Message size={20} variant="Linear" color="currentColor" />
                                Entrar no grupo do WhatsApp
                            </a>
                        </>
                    )}

                    {status === 'pending' && (
                        <p className="font-sans text-gray-600 text-base leading-relaxed text-center">
                            Assim que a InfinitePay aprovar a transação, você receberá um e-mail com o link de acesso ao grupo.
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

export default ThankYouClubeDoLivro;
