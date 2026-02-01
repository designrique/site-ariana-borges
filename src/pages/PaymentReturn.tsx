import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Calendar, Home, Loader2, AlertCircle } from 'lucide-react';
import { useScheduling } from '../components/SchedulingContext';
import { checkPaymentStatus } from '../services/infinityPayService';

const PaymentReturn: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { openScheduling } = useScheduling();

    const [status, setStatus] = React.useState<'loading' | 'success' | 'error'>('loading');

    useEffect(() => {
        const verifyPayment = async () => {
            const orderNsu = searchParams.get('order_nsu');
            const transactionNsu = searchParams.get('transaction_nsu');
            const slug = searchParams.get('slug');

            if (!orderNsu || !transactionNsu || !slug) {
                setStatus('error');
                return;
            }

            const isPaid = await checkPaymentStatus(orderNsu, transactionNsu, slug);
            setStatus(isPaid ? 'success' : 'error');
        };

        verifyPayment();
    }, [searchParams]);

    const handleScheduleNow = () => {
        const orderNsu = searchParams.get('order_nsu');
        navigate('/');
        setTimeout(() => {
            openScheduling({
                skipTo: 'timeframe',
                paymentData: {
                    orderNsu: orderNsu,
                    status: 'paid'
                }
            });
        }, 100);
    };

    return (
        <div className="min-h-screen bg-brand-beige flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-xl p-8 max-w-lg w-full text-center">

                {status === 'loading' && (
                    <div className="flex flex-col items-center justify-center py-12">
                        <Loader2 size={48} className="text-brand-lilac animate-spin mb-4" />
                        <h2 className="font-serif text-xl text-brand-dark">Verificando pagamento...</h2>
                    </div>
                )}

                {status === 'error' && (
                    <div className="flex flex-col items-center justify-center">
                        <div className="bg-red-100 p-4 rounded-full mb-6">
                            <AlertCircle size={48} className="text-red-600" />
                        </div>
                        <h1 className="font-serif text-2xl font-bold text-brand-dark mb-4">
                            Pagamento não confirmado
                        </h1>
                        <p className="font-sans text-gray-600 mb-8">
                            Ainda não identificamos o pagamento. Se você já pagou, aguarde alguns instantes e recarregue a página.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-brand-dark text-white font-sans font-bold py-3 px-6 rounded-xl hover:bg-brand-gold transition-all"
                        >
                            Verificar Novamente
                        </button>
                    </div>
                )}

                {status === 'success' && (
                    <>
                        <div className="flex justify-center mb-6">
                            <div className="bg-green-100 p-4 rounded-full">
                                <CheckCircle size={48} className="text-green-600" />
                            </div>
                        </div>

                        <h1 className="font-serif text-3xl font-bold text-brand-dark mb-4">
                            Pagamento Confirmado!
                        </h1>


                        <p className="font-sans text-gray-600 mb-8 leading-relaxed">
                            Gratidão! ✨<br />
                            Recebemos a confirmação do seu pagamento.<br />
                            Agora só falta escolher o melhor dia e horário para o seu atendimento.
                        </p>

                        <div className="flex flex-col gap-3">
                            <button
                                onClick={handleScheduleNow}
                                className="w-full bg-brand-gold hover:bg-brand-goldDark text-white font-sans font-bold py-4 px-6 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                            >
                                <Calendar size={20} />
                                Agendar Agora
                            </button>

                            <button
                                onClick={() => navigate('/')}
                                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-sans font-medium py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
                            >
                                <Home size={20} />
                                Voltar para o Início
                            </button>
                        </div>

                        <p className="mt-8 text-xs text-gray-400">
                            Você também recebeu um e-mail com os detalhes do pagamento.
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default PaymentReturn;

