import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ClipboardText, ShieldTick } from 'iconsax-react';
import ScrollReveal from '@/components/ScrollReveal';

const sections = [
    'Aceitação dos Termos',
    'Descrição dos Serviços',
    'Natureza dos Serviços Terapêuticos',
    'Agendamentos e Pagamentos',
    'Propriedade Intelectual',
    'Conduta do Usuário',
    'Limitação de Responsabilidade',
    'Privacidade',
    'Alterações nos Termos',
    'Legislação Aplicável',
    'Contato',
];

const TermosDeUso: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Termos de Uso - Instituto Ariana Borges</title>
                <meta name="description" content="Termos de Uso do Instituto Ariana Borges. Conheça as condições de uso do nosso site e serviços terapêuticos." />
                <meta property="og:title" content="Termos de Uso - Instituto Ariana Borges" />
            </Helmet>

            {/* Hero */}
            <section className="relative py-20 bg-brand-beige overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/15 rounded-full blur-3xl -z-10" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-lilac/20 rounded-full blur-3xl -z-10" />

                <div className="max-w-3xl mx-auto px-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-brand-gold/20 text-brand-goldDark text-xs font-bold tracking-widest uppercase mb-6">
                        <ClipboardText size={14} variant="Linear" color="currentColor" /> Termos &amp; Condições
                    </div>
                    <h1 className="font-serif text-4xl md:text-5xl text-brand-dark mb-4 leading-tight">
                        Termos de Uso
                    </h1>
                    <p className="font-sans text-gray-500 text-sm mb-8">Última atualização: 21 de março de 2026</p>
                    <p className="font-sans text-gray-600 text-lg leading-relaxed">
                        Ao acessar e utilizar o site do Instituto Ariana Borges, você concorda com as condições descritas neste documento. Leia atentamente antes de utilizar nossos serviços.
                    </p>
                </div>
            </section>

            {/* Índice */}
            <ScrollReveal>
                <section className="py-10 bg-white border-b border-brand-lilac/20">
                    <div className="max-w-3xl mx-auto px-6">
                        <p className="font-sans text-xs font-bold uppercase tracking-widest text-brand-goldDark mb-4">Conteúdo desta página</p>
                        <ol className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {sections.map((s, i) => (
                                <li key={i} className="font-sans text-sm text-gray-600 flex items-start gap-2">
                                    <span className="text-brand-goldDark font-bold shrink-0">{i + 1}.</span>
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
                            <h2 className="font-serif text-2xl text-brand-dark mb-4">1. Aceitação dos Termos</h2>
                            <p>Ao acessar e utilizar o site do Instituto Ariana Borges (<strong>arianaborges.com</strong>), você concorda com estes Termos de Uso. Se não concordar com algum destes termos, solicitamos que não utilize o site.</p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal>
                        <div>
                            <h2 className="font-serif text-2xl text-brand-dark mb-4">2. Descrição dos Serviços</h2>
                            <p className="mb-3">O Instituto Ariana Borges oferece, por meio deste site:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Informações sobre terapias integrativas e ThetaHealing®.</li>
                                <li>Agendamento de sessões de terapia individual.</li>
                                <li>Inscrições em cursos, formações e eventos.</li>
                                <li>Conteúdo educativo por meio do blog.</li>
                                <li>Participação no Clube do Livro Mulher Maravilha e Encontro de Deusas.</li>
                            </ul>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal>
                        <div className="bg-brand-lilac/10 rounded-2xl p-6 border-l-4 border-brand-lilacDark">
                            <h2 className="font-serif text-2xl text-brand-dark mb-4">3. Natureza dos Serviços Terapêuticos</h2>
                            <p>Os serviços oferecidos pelo Instituto Ariana Borges são de natureza <strong>complementar e integrativa</strong>. Eles <strong>não substituem</strong> tratamento médico, psicológico ou psiquiátrico convencional. Recomendamos que você mantenha acompanhamento com profissionais de saúde devidamente registrados em seus conselhos de classe.</p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal>
                        <div>
                            <h2 className="font-serif text-2xl text-brand-dark mb-4">4. Agendamentos e Pagamentos</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Os agendamentos estão sujeitos à disponibilidade de horários.</li>
                                <li>Pagamentos são processados pela plataforma <strong>InfinitePay</strong> e estão sujeitos aos termos dessa plataforma.</li>
                                <li>Cancelamentos devem ser solicitados com no mínimo <strong>24 horas de antecedência</strong>. Cancelamentos fora deste prazo podem não ser reembolsados.</li>
                                <li>Em caso de desistência de cursos ou eventos, a política de reembolso será informada no momento da inscrição.</li>
                            </ul>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal>
                        <div>
                            <h2 className="font-serif text-2xl text-brand-dark mb-4">5. Propriedade Intelectual</h2>
                            <p>Todo o conteúdo do site — incluindo textos, imagens, logotipos, vídeos e design — é de propriedade do Instituto Ariana Borges e protegido pela legislação brasileira de direitos autorais (Lei 9.610/1998). É proibida a reprodução, distribuição ou modificação sem autorização prévia por escrito.</p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal>
                        <div>
                            <h2 className="font-serif text-2xl text-brand-dark mb-4">6. Conduta do Usuário</h2>
                            <p className="mb-3">Ao utilizar o site, você se compromete a:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Fornecer informações verdadeiras e atualizadas.</li>
                                <li>Não utilizar o site para fins ilegais ou não autorizados.</li>
                                <li>Não tentar acessar áreas restritas do site sem autorização.</li>
                                <li>Respeitar os demais usuários e profissionais do Instituto.</li>
                            </ul>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal>
                        <div>
                            <h2 className="font-serif text-2xl text-brand-dark mb-4">7. Limitação de Responsabilidade</h2>
                            <p className="mb-3">O Instituto Ariana Borges não se responsabiliza por:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Resultados individuais decorrentes das terapias, que podem variar de pessoa para pessoa.</li>
                                <li>Indisponibilidade temporária do site por razões técnicas.</li>
                                <li>Conteúdo de sites de terceiros acessados por meio de links no site.</li>
                                <li>Danos decorrentes do uso indevido do site pelo usuário.</li>
                            </ul>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal>
                        <div>
                            <h2 className="font-serif text-2xl text-brand-dark mb-4">8. Privacidade</h2>
                            <p>O tratamento de dados pessoais é regido pela nossa <Link to="/privacidade" className="text-brand-lilacDark hover:text-brand-gold transition-colors font-medium">Política de Privacidade</Link>, que faz parte integrante destes Termos de Uso.</p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal>
                        <div>
                            <h2 className="font-serif text-2xl text-brand-dark mb-4">9. Alterações nos Termos</h2>
                            <p>O Instituto Ariana Borges reserva-se o direito de modificar estes Termos de Uso a qualquer momento. Alterações significativas serão comunicadas por meio do site. O uso continuado do site após as alterações constitui aceitação dos novos termos.</p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal>
                        <div>
                            <h2 className="font-serif text-2xl text-brand-dark mb-4">10. Legislação Aplicável</h2>
                            <p>Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro da comarca de domicílio do Instituto Ariana Borges para dirimir quaisquer controvérsias decorrentes destes termos.</p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal>
                        <div className="bg-brand-beige rounded-2xl p-8">
                            <h2 className="font-serif text-2xl text-brand-dark mb-4">11. Contato</h2>
                            <p className="mb-4">Para dúvidas sobre estes Termos de Uso:</p>
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
                            <ShieldTick size={16} variant="Linear" color="currentColor" />
                            <Link to="/privacidade" className="hover:text-brand-lilacDark transition-colors">
                                Ver também: Política de Privacidade
                            </Link>
                        </div>
                    </div>
                </section>
            </ScrollReveal>
        </>
    );
};

export default TermosDeUso;
