import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle, MessageCircle, Loader2, XCircle, AlertCircle } from 'lucide-react';

interface PaymentStatus {
  success: boolean;
  paid: boolean;
  amount: number;
  paid_amount: number;
  installments: number;
  capture_method: string;
}

const ThankYou: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'pending' | 'error' | 'none'>('none');
  const [paymentData, setPaymentData] = useState<PaymentStatus | null>(null);

  useEffect(() => {
    const slug = searchParams.get('slug');
    const transactionNsu = searchParams.get('transaction_nsu');
    const orderNsu = searchParams.get('order_nsu');

    if (slug && transactionNsu && orderNsu) {
      verifyPayment(slug, transactionNsu, orderNsu);
    }
  }, [searchParams]);

  const verifyPayment = async (slug: string, transactionNsu: string, orderNsu: string) => {
    setStatus('loading');
    try {
      const response = await fetch('/.netlify/functions/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, transaction_nsu: transactionNsu, order_nsu: orderNsu })
      });

      if (!response.ok) throw new Error('Verification failed');

      const data = await response.json();
      setPaymentData(data);

      if (data.paid) {
        setStatus('success');
      } else {
        setStatus('pending');
      }
    } catch (error) {
      console.error('Error verifying payment:', error);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-brand-beige flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 sm:p-12 text-center">

        {status === 'loading' && (
          <div className="py-12">
            <Loader2 className="mx-auto text-brand-gold h-16 w-16 mb-6 animate-spin" />
            <h1 className="font-serif text-3xl text-brand-dark mb-4">Verificando seu pagamento...</h1>
            <p className="text-gray-500">Aguarde um momento enquanto confirmamos sua inscrição.</p>
          </div>
        )}

        {(status === 'success' || (status === 'none' && !searchParams.get('slug'))) && (
          <>
            <CheckCircle className="mx-auto text-brand-gold h-16 w-16 mb-6 animate-pulse" />
            <h1 className="font-serif text-3xl sm:text-5xl text-brand-dark mb-4">
              {status === 'success' ? 'Pagamento Confirmado!' : 'Inscrição Realizada!'}
            </h1>
            <p className="font-sans text-gray-600 text-lg mb-8 leading-relaxed">
              Sua jornada de transformação começa agora.
              {paymentData && ` Recebemos seu pagamento via ${paymentData.capture_method.toUpperCase()}.`}
              Você receberá um e-mail em breve com todos os detalhes de acesso.
            </p>
          </>
        )}

        {status === 'pending' && (
          <>
            <AlertCircle className="mx-auto text-yellow-500 h-16 w-16 mb-6" />
            <h1 className="font-serif text-3xl text-brand-dark mb-4">Pagamento em Processamento</h1>
            <p className="font-sans text-gray-600 text-lg mb-8 leading-relaxed">
              Recebemos seu pedido, mas o pagamento ainda está sendo processado pela InfinitePay.
              Assim que for aprovado, liberaremos seu acesso por e-mail.
            </p>
          </>
        )}

        {status === 'error' && (
          <>
            <XCircle className="mx-auto text-red-500 h-16 w-16 mb-6" />
            <h1 className="font-serif text-3xl text-brand-dark mb-4">Ops! Algo deu errado</h1>
            <p className="font-sans text-gray-600 text-lg mb-8 leading-relaxed">
              Não conseguimos verificar o status do seu pagamento automaticamente.
              Se você concluiu a transação, não se preocupe, nosso sistema processará em breve.
            </p>
          </>
        )}

        <div className="bg-brand-lilac/10 border border-brand-lilac/30 rounded-2xl p-6 mb-8">
          <h2 className="font-sans font-bold text-xl text-brand-dark mb-3">Próximos Passos</h2>
          <ul className="text-left space-y-3 text-gray-700 text-sm sm:text-base">
            <li className="flex items-start">
              <CheckCircle className="text-brand-lilac h-5 w-5 mr-3 mt-1 flex-shrink-0" />
              <span><strong>Verifique seu e-mail:</strong> Procure por uma mensagem com o assunto "Seu Acesso à Mesa de Salomão".</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="text-brand-lilac h-5 w-5 mr-3 mt-1 flex-shrink-0" />
              <span><strong>Acesse nosso grupo:</strong> O link para o grupo exclusivo estará no seu e-mail.</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="text-brand-lilac h-5 w-5 mr-3 mt-1 flex-shrink-0" />
              <span><strong>Marque na agenda:</strong> O primeiro ciclo começa em <strong>23 de Dezembro</strong>.</span>
            </li>
          </ul>
        </div>

        <a
          href="https://chat.whatsapp.com/BWDy7XKArYBGuRvj51CqBf"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center justify-center gap-3 w-full bg-[#25D366] hover:bg-[#128C7E] hover:scale-101 transition-all duration-300 text-white font-sans font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl"
        >
          <MessageCircle className="w-6 h-6 group-hover:animate-bounce" />
          Ficou com alguma dúvida? Fale conosco
        </a>
      </div>
    </div>
  );
};

export default ThankYou;
