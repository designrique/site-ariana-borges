import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ShieldTick, DocumentText } from 'iconsax-react';
import ScrollReveal from '@/components/ScrollReveal';

const sections = [
    'Informações que Coletamos',
    'Como Usamos suas Informações',
    'Cookies e Rastreamento',
    'Compartilhamento de Dados',
    'Segurança dos Dados',
    'Seus Direitos (LGPD)',
    'Retenção de Dados',
    'Alterações nesta Política',
    'Contato',
];

const PoliticaPrivacidade: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Política de Privacidade - Instituto Ariana Borges</title>
                <meta name="description" content="Política de Privacidade do Instituto Ariana Borges. Saiba como coletamos, usamos e protegemos seus dados pessoais conforme a LGPD." />
                <meta property="og:title" content="Política de Privacidade - Instituto Ariana Borges" />
            </Helmet>

            {/* Hero */}
            <section className="relative py-20 bg-brand-beige overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-lilac/20 rounded-full blur-3xl -z-10" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-gold/10 rounded-full blur-3xl -z-10" />

                <div className="max-w-3xl mx-auto px-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-brand-lilac/30 text-brand-lilacDark text-xs font-bold tracking-widest uppercase mb-6">
                        <ShieldTick size={14} variant="Linear" color="currentColor" /> Privacidade &amp; Proteção de Dados
                    </div>
                    <h1 className="font-serif text-4xl md:text-5xl text-brand-dark mb-4 leading-tight">
                        Política de Privacidade
                    </h1>
                    <p className="font-sans text-gray-500 text-sm mb-8">Última atualização: 21 de março de 2026</p>
                    <p className="font-sans text-gray-600 text-lg leading-relaxed">
                        O Instituto Ariana Borges respeita e protege a privacidade de todos os visitantes e clientes. Esta política descreve como coletamos, usamos e protegemos suas informações pessoais, em conformidade com a <strong>Lei Geral de Proteção de Dados (Lei 13.709/2018 – LGPD)</strong>.
                    </p>
                </div>
            </section>

            {/* Índice */}
            <ScrollReveal>
                <section className="py-10 bg-white border-b border-brand-lilac/20">
                    <div className="max-w-3xl mx-auto px-6">
                        <p className="font-sans text-xs font-bold uppercase tracking-widest text-brand-lilacDark mb-4">Conteúdo desta página</p>
                        <ol className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {sections.map((s, i) => (
                                <li key={i} className="font-sans text-sm text-gray-600 flex items-start gap-2">
                                    <span className="text-brand-lilacDark font-bold shrink-0">{i + 1}.</span>
                                    {s}
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>
            </ScrollReveal>

            {/* Conteúdo */}
            <section className="py-16 bg-white">
                <div className="max-w-3xl mx-auto px-6 space-y-12 font-sans text-gray-700 leading-relaxed">

                    <ScrollReveal>
                        <div>
                            <h2 className="font-serif text-2xl text-brand-dark mb-4">1. Informações que Coletamos</h2>
                            <p className="mb-3">O Instituto Ariana Borges coleta as seguintes informações quando você utiliza nosso site:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Dados de identificação:</strong> nome, e-mail e telefone, fornecidos voluntariamente ao agendar atendimentos ou entrar em contato.</li>
                                <li><strong>Dados de navegação:</strong> informações coletadas automaticamente como endereço IP, tipo de navegador, páginas visitadas e tempo de permanência.</li>
                                <li><strong>Dados de pagamento:</strong> processados diretamente pela plataforma InfinitePay. Não armazenamos dados de cartão de crédito.</li>
                            </ul>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal>
                        <div>
                            <h2 className="font-serif text-2xl text-brand-dark mb-4">2. Como Usamos suas Informações</h2>
                            <p className="mb-3">Utilizamos seus dados para:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Agendar e gerenciar seus atendimentos terapêuticos.</li>
                                <li>Enviar informações sobre cursos, formações e eventos do Instituto.</li>
                                <li>Melhorar a experiência de navegação no site.</li>
                                <li>Cumprir obrigações legais e regulatórias.</li>
                            </ul>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal>
                        <div>
                            <h2 className="font-serif text-2xl text-brand-dark mb-4">3. Cookies e Tecnologias de Rastreamento</h2>
                            <p>Utilizamos o <strong>Meta Pixel (Facebook Pixel)</strong> para mensurar a eficácia de campanhas publicitárias e entender como os visitantes interagem com o site. Você pode desativar cookies nas configurações do seu navegador a qualquer momento, sem prejuízo do acesso ao conteúdo.</p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal>
                        <div>
                            <h2 className="font-serif text-2xl text-brand-dark mb-4">4. Compartilhamento de Dados</h2>
                            <p className="mb-3">Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, exceto:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Processadores de pagamento:</strong> InfinitePay, para processar transações financeiras.</li>
                                <li><strong>Plataformas de análise:</strong> Meta (Facebook), para análise de campanhas publicitárias.</li>
                                <li><strong>Obrigações legais:</strong> quando exigido por lei ou ordem judicial.</li>
                            </ul>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal>
                        <div>
                            <h2 className="font-serif text-2xl text-brand-dark mb-4">5. Segurança dos Dados</h2>
                            <p>Adotamos medidas técnicas e organizacionais para proteger seus dados pessoais contra acesso não autorizado, perda, alteração ou destruição. O site utiliza conexão segura (HTTPS) para todas as comunicações.</p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal>
                        <div>
                            <h2 className="font-serif text-2xl text-brand-dark mb-4">6. Seus Direitos (LGPD)</h2>
                            <p className="mb-3">De acordo com a Lei Geral de Proteção de Dados (Lei 13.709/2018), você tem direito a:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Confirmar a existência de tratamento dos seus dados.</li>
                                <li>Acessar, corrigir ou excluir seus dados pessoais.</li>
                                <li>Revogar o consentimento a qualquer momento.</li>
                                <li>Solicitar a portabilidade dos seus dados.</li>
                            </ul>
                            <p className="mt-3">Para exercer seus direitos, entre em contato pelo e-mail: <a href="mailto:contato@arianaborges.com" className="text-brand-lilacDark hover:text-brand-gold transition-colors font-medium">contato@arianaborges.com</a></p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal>
                        <div>
                            <h2 className="font-serif text-2xl text-brand-dark mb-4">7. Retenção de Dados</h2>
                            <p>Seus dados pessoais são mantidos pelo tempo necessário para cumprir as finalidades descritas nesta política ou conforme exigido por lei. Dados de agendamento são mantidos por até 5 anos para fins de histórico terapêutico.</p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal>
                        <div>
                            <h2 className="font-serif text-2xl text-brand-dark mb-4">8. Alterações nesta Política</h2>
                            <p>Podemos atualizar esta Política de Privacidade periodicamente. Alterações significativas serão comunicadas por meio do site. Recomendamos que você revise esta página regularmente.</p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal>
                        <div className="bg-brand-beige rounded-2xl p-8">
                            <h2 className="font-serif text-2xl text-brand-dark mb-4">9. Contato</h2>
                            <p className="mb-4">Para dúvidas sobre esta Política de Privacidade ou sobre o tratamento dos seus dados pessoais:</p>
                            <p className="font-sans text-gray-700">
                                <strong>Instituto Ariana Borges</strong><br />
                                E-mail: <a href="mailto:contato@arianaborges.com" className="text-brand-lilacDark hover:text-brand-gold transition-colors font-medium">contato@arianaborges.com</a><br />
                                Instagram: <a href="https://instagram.com/institutoarianaborges" target="_blank" rel="noopener noreferrer" className="text-brand-lilacDark hover:text-brand-gold transition-colors font-medium">@institutoarianaborges</a>
                            </p>
                        </div>
                    </ScrollReveal>

                </div>
            </section>

            {/* Rodapé de navegação */}
            <ScrollReveal>
                <section className="py-12 bg-brand-beige border-t border-brand-lilac/20">
                    <div className="max-w-3xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <Link to="/" className="font-sans text-sm text-gray-500 hover:text-brand-lilacDark transition-colors flex items-center gap-2">
                            ← Voltar para o início
                        </Link>
                        <div className="flex items-center gap-2 font-sans text-sm text-gray-500">
                            <DocumentText size={16} variant="Linear" color="currentColor" />
                            <Link to="/termos" className="hover:text-brand-lilacDark transition-colors">
                                Ver também: Termos de Uso
                            </Link>
                        </div>
                    </div>
                </section>
            </ScrollReveal>
        </>
    );
};

export default PoliticaPrivacidade;
