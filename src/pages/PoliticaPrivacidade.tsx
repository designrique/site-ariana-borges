import React from 'react';
import { Helmet } from 'react-helmet-async';
import ScrollReveal from '@/components/ScrollReveal';

const PoliticaPrivacidade: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Política de Privacidade - Instituto Ariana Borges</title>
        <meta name="description" content="Política de Privacidade do Instituto Ariana Borges. Saiba como coletamos, usamos e protegemos seus dados pessoais." />
      </Helmet>

      <section className="py-20 bg-brand-beige">
        <div className="max-w-3xl mx-auto px-6">
          <ScrollReveal>
            <h1 className="font-serif text-4xl md:text-5xl text-brand-dark mb-4">Política de Privacidade</h1>
            <p className="text-gray-500 text-sm mb-12">Última atualização: 21 de março de 2026</p>
          </ScrollReveal>

          <div className="prose prose-gray max-w-none space-y-8 font-sans text-gray-700 leading-relaxed">
            <ScrollReveal>
              <h2 className="font-serif text-2xl text-brand-dark mt-0">1. Informações que Coletamos</h2>
              <p>O Instituto Ariana Borges coleta as seguintes informações quando você utiliza nosso site:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Dados de identificação:</strong> nome, e-mail e telefone, fornecidos voluntariamente ao agendar atendimentos ou entrar em contato.</li>
                <li><strong>Dados de navegação:</strong> informações coletadas automaticamente como endereço IP, tipo de navegador, páginas visitadas e tempo de permanência.</li>
                <li><strong>Dados de pagamento:</strong> processados diretamente pela plataforma InfinitePay. Não armazenamos dados de cartão de crédito.</li>
              </ul>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="font-serif text-2xl text-brand-dark">2. Como Usamos suas Informações</h2>
              <p>Utilizamos seus dados para:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Agendar e gerenciar seus atendimentos terapêuticos.</li>
                <li>Enviar informações sobre cursos, formações e eventos do Instituto.</li>
                <li>Melhorar a experiência de navegação no site.</li>
                <li>Cumprir obrigações legais e regulatórias.</li>
              </ul>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="font-serif text-2xl text-brand-dark">3. Cookies e Tecnologias de Rastreamento</h2>
              <p>Utilizamos o <strong>Meta Pixel (Facebook Pixel)</strong> para mensurar a eficácia de campanhas publicitárias e entender como os visitantes interagem com o site. Você pode desativar cookies nas configurações do seu navegador.</p>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="font-serif text-2xl text-brand-dark">4. Compartilhamento de Dados</h2>
              <p>Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, exceto:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Processadores de pagamento:</strong> InfinitePay, para processar transações financeiras.</li>
                <li><strong>Plataformas de análise:</strong> Meta (Facebook), para análise de campanhas.</li>
                <li><strong>Obrigações legais:</strong> quando exigido por lei ou ordem judicial.</li>
              </ul>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="font-serif text-2xl text-brand-dark">5. Segurança dos Dados</h2>
              <p>Adotamos medidas técnicas e organizacionais para proteger seus dados pessoais contra acesso não autorizado, perda, alteração ou destruição. O site utiliza conexão segura (HTTPS) para todas as comunicações.</p>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="font-serif text-2xl text-brand-dark">6. Seus Direitos (LGPD)</h2>
              <p>De acordo com a Lei Geral de Proteção de Dados (Lei 13.709/2018), você tem direito a:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Confirmar a existência de tratamento de seus dados.</li>
                <li>Acessar, corrigir ou excluir seus dados pessoais.</li>
                <li>Revogar o consentimento a qualquer momento.</li>
                <li>Solicitar a portabilidade dos seus dados.</li>
              </ul>
              <p>Para exercer seus direitos, entre em contato pelo e-mail: <a href="mailto:contato@arianaborges.com" className="text-brand-gold hover:underline">contato@arianaborges.com</a></p>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="font-serif text-2xl text-brand-dark">7. Retenção de Dados</h2>
              <p>Seus dados pessoais são mantidos pelo tempo necessário para cumprir as finalidades descritas nesta política ou conforme exigido por lei. Dados de agendamento são mantidos por até 5 anos para fins de histórico terapêutico.</p>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="font-serif text-2xl text-brand-dark">8. Alterações nesta Política</h2>
              <p>Podemos atualizar esta Política de Privacidade periodicamente. Alterações significativas serão comunicadas por meio do site. Recomendamos que você revise esta página regularmente.</p>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="font-serif text-2xl text-brand-dark">9. Contato</h2>
              <p>Para dúvidas sobre esta Política de Privacidade ou sobre o tratamento dos seus dados pessoais:</p>
              <p>
                <strong>Instituto Ariana Borges</strong><br />
                E-mail: <a href="mailto:contato@arianaborges.com" className="text-brand-gold hover:underline">contato@arianaborges.com</a><br />
                Instagram: <a href="https://instagram.com/institutoarianaborges" target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:underline">@institutoarianaborges</a>
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
};

export default PoliticaPrivacidade;
