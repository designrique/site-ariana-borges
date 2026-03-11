import React from 'react';
import { Helmet } from 'react-helmet-async';
import { BookOpen, Star, Users, Calendar, ArrowRight, Check } from 'lucide-react';

const ClubeLivroMulherMaravilha: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Clube do Livro Mulher Maravilha - Instituto Ariana Borges</title>
                <meta
                    name="description"
                    content="Grupo de leitura feminino baseado no livro A Psicologia da Mulher-Maravilha. Encontros mensais online para mulheres que desejam se reconectar com seu sagrado feminino."
                />
                <meta property="og:title" content="Clube do Livro Mulher Maravilha - Instituto Ariana Borges" />
                <meta property="og:description" content="Grupo de leitura feminino baseado no livro A Psicologia da Mulher-Maravilha." />
                <meta property="og:image" content="/clube-mulher-maravilha/capa-livro-mulher-maravilha.webp" />
            </Helmet>

            {/* Hero */}
            <section className="relative min-h-[70vh] bg-gradient-to-br from-[#3d1a4f] via-[#6b2f8a] to-[#b06abf] flex items-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(212,175,55,0.15)_0%,_transparent_60%)]" />
                <div className="relative max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-bold tracking-widest uppercase mb-6">
                            <BookOpen size={13} /> Clube do Livro
                        </div>
                        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
                            Clube do Livro<br />
                            <span className="italic text-[#D4AF37]">Mulher Maravilha</span>
                        </h1>
                        <p className="text-white/80 text-lg leading-relaxed mb-4">
                            Um espaço mensal de leitura, reflexão e reconexão com o sagrado feminino — com mulheres que, como você, buscam crescer, curar e se redescobrir.
                        </p>
                        <p className="text-white/70 text-base leading-relaxed mb-8">
                            Baseado no livro <span className="text-[#D4AF37] font-semibold italic">A Psicologia da Mulher‑Maravilha.</span>
                        </p>

                        {/* Book cover */}
                        <div className="flex justify-center md:justify-start">
                            <div className="relative w-40 md:w-48">
                                <div className="absolute inset-0 bg-[#D4AF37]/20 rounded-xl blur-xl scale-110" />
                                <img
                                    src="/clube-mulher-maravilha/capa-livro-mulher-maravilha.webp"
                                    alt="Capa do livro A Psicologia da Mulher-Maravilha"
                                    className="relative rounded-xl shadow-2xl w-full"
                                    loading="eager"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="hidden md:flex justify-center">
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 max-w-sm w-full">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={16} className="text-[#D4AF37] fill-[#D4AF37]" />
                                    ))}
                                </div>
                                <span className="text-white/70 text-sm">Próxima turma</span>
                            </div>
                            <h3 className="font-serif text-white text-xl mb-4">Reserve sua vaga</h3>
                            <ul className="space-y-3 mb-6">
                                {['Encontros mensais online', 'Material de apoio incluso', 'Comunidade exclusiva', 'Dinâmicas de grupo'].map((item) => (
                                    <li key={item} className="flex items-center gap-2 text-white/80 text-sm">
                                        <Check size={14} className="text-[#D4AF37] flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <a
                                href="https://wa.me/5511999999999"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 w-full bg-[#D4AF37] hover:bg-[#b8941e] text-white font-bold py-3 px-6 rounded-xl transition-colors duration-200"
                            >
                                Quero participar <ArrowRight size={16} />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sobre o livro */}
            <section className="py-20 bg-white">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="flex justify-center">
                            <div className="relative w-56 md:w-64">
                                <div className="absolute inset-0 bg-[#6b2f8a]/10 rounded-2xl blur-2xl scale-110" />
                                <img
                                    src="/clube-mulher-maravilha/capa-livro-mulher-maravilha.webp"
                                    alt="Capa do livro A Psicologia da Mulher-Maravilha"
                                    className="relative rounded-2xl shadow-xl w-full"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                        <div>
                            <p className="text-[#6b2f8a] text-sm font-bold uppercase tracking-widest mb-3">Sobre o livro</p>
                            <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-4">
                                A Psicologia da<br />
                                <span className="text-[#6b2f8a] italic">Mulher‑Maravilha</span>
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Baseado no livro <em className="font-semibold">A Psicologia da Mulher‑Maravilha</em>, o clube propõe uma jornada profunda de autoconhecimento a partir dos arquétipos femininos explorados na obra.
                            </p>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                A cada encontro, exploramos um capítulo com reflexões guiadas, dinâmicas práticas e trocas genuínas entre mulheres que caminham juntas rumo à sua versão mais autêntica.
                            </p>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Os encontros são conduzidos por <strong>Ariana Borges</strong>, Instrutora Master & Science de ThetaHealing, terapeuta e facilitadora de círculos femininos.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* O que você vai encontrar */}
            <section className="py-20 bg-[#faf5ff]">
                <div className="max-w-5xl mx-auto px-6 text-center">
                    <p className="text-[#6b2f8a] text-sm font-bold uppercase tracking-widest mb-3">O que você vai encontrar</p>
                    <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-12">
                        Uma experiência de cura em comunidade
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { icon: <BookOpen size={28} />, title: 'Leitura com profundidade', desc: 'Cada capítulo é explorado com cuidado, reflexão e contexto terapêutico.' },
                            { icon: <Users size={28} />, title: 'Comunidade feminina', desc: 'Espaço seguro e acolhedor para compartilhar vivências e crescer em grupo.' },
                            { icon: <Calendar size={28} />, title: 'Encontros mensais online', desc: 'Dinâmicas ao vivo com facilitação especializada e material de apoio.' },
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-purple-50 flex flex-col items-center text-center">
                                <div className="text-[#6b2f8a] mb-4">{item.icon}</div>
                                <h3 className="font-serif text-lg text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Mobile (aparece só em mobile, já que o sidebar fica no hero em desktop) */}
            <section className="py-16 bg-gradient-to-br from-[#3d1a4f] to-[#6b2f8a] md:hidden">
                <div className="max-w-sm mx-auto px-6 text-center">
                    <h2 className="font-serif text-2xl text-white mb-4">Reserve sua vaga</h2>
                    <ul className="space-y-2 mb-6 text-left">
                        {['Encontros mensais online', 'Material de apoio incluso', 'Comunidade exclusiva', 'Dinâmicas de grupo'].map((item) => (
                            <li key={item} className="flex items-center gap-2 text-white/80 text-sm">
                                <Check size={14} className="text-[#D4AF37] flex-shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>
                    <a
                        href="https://wa.me/5511999999999"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full bg-[#D4AF37] hover:bg-[#b8941e] text-white font-bold py-3 px-6 rounded-xl transition-colors duration-200"
                    >
                        Quero participar <ArrowRight size={16} />
                    </a>
                </div>
            </section>
        </>
    );
};

export default ClubeLivroMulherMaravilha;
