import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Row, Col, SectionHeader, Button, Card, CardGrid } from '@/components/DesignSystem';
import DNASequenceBackground from '@/components/DNASequenceBackground';
import DNABasicoGallerySection from './DNABasico/components/DNABasicoGallerySection';
import { Brain, Heart, Users, Check, Star, Award, Clock, Shield, BookOpen, Users as UsersIcon, Target, Sparkles, Zap, ArrowRight, Infinity as InfinityIcon, CalendarDays } from 'lucide-react';

const DNABasico: React.FC = () => {
  // === HERO SECTION ===
  const HeroSection = () => (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden">
      <DNASequenceBackground />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* LEFT — texto */}
        <div className="text-white">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            <Sparkles className="w-4 h-4 text-goddess-gold flex-shrink-0" />
            <span className="text-sm font-semibold tracking-widest uppercase">Formação Oficial ThetaHealing®</span>
          </div>

          {/* Headline */}
          <h1 className="font-heading font-bold leading-none mb-6">
            <span className="block text-white text-6xl md:text-8xl tracking-tight drop-shadow-xl">
              DNA
            </span>
            <span
              className="block text-5xl md:text-6xl tracking-[0.18em] uppercase"
              style={{
                background: 'linear-gradient(135deg, #D4AF37 0%, #F3E5AB 45%, #D4AF37 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 2px 8px rgba(212,175,55,0.35))',
              }}
            >
              BÁSICO
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/85 mb-6 leading-relaxed font-bold">
            Aprenda a acessar o estado Theta e reprogramar padrões inconscientes em seus relacionamentos, finanças e autoestima.
          </p>

          {/* Data do evento */}
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center gap-2 bg-goddess-gold/20 border border-goddess-gold/50 px-4 py-2.5 rounded-xl backdrop-blur-sm">
              <CalendarDays className="w-4 h-4 text-goddess-gold flex-shrink-0" />
              <span className="text-goddess-gold font-bold text-sm tracking-wide">12, 13 e 14 de Junho</span>
            </div>
            <span className="text-white/55 text-sm font-medium">Próxima turma</span>
          </div>

          {/* Course info pills */}
          <div className="flex flex-wrap gap-3 mb-10">
            <div className="flex items-center gap-2 text-white text-sm font-medium bg-black/25 px-4 py-2.5 rounded-xl backdrop-blur-sm border border-white/10">
              <Clock className="w-4 h-4 text-goddess-gold" />
              <span>3 dias de imersão</span>
            </div>
            <div className="flex items-center gap-2 text-white text-sm font-medium bg-black/25 px-4 py-2.5 rounded-xl backdrop-blur-sm border border-white/10">
              <Award className="w-4 h-4 text-goddess-gold" />
              <span>Certificação THInK®</span>
            </div>
          </div>

          {/* CTA */}
          <div className="mb-10">
            <Button variant="urgent" size="xl" pulse className="px-10 shadow-goddess-hover">
              QUERO GARANTIR MINHA VAGA
            </Button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-white/70 font-medium">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-goddess-gold" />
              <span>Pagamento Seguro</span>
            </div>
            <div className="flex items-center gap-2">
              <UsersIcon className="w-4 h-4 text-goddess-gold" />
              <span>Vagas Limitadas</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-goddess-gold" />
              <span>Garantia de 7 dias</span>
            </div>
          </div>
        </div>

        {/* RIGHT — imagem */}
        <div className="relative flex justify-center lg:justify-end">
          {/* Glow atrás da imagem */}
          <div className="absolute inset-0 bg-goddess-purple/30 rounded-3xl blur-2xl scale-95 pointer-events-none" />

          <div className="relative rounded-3xl overflow-hidden shadow-2xl w-full max-w-md aspect-[3/4]">
            <img
              src="/perfil-ariana-borges.webp"
              alt="Ariana Borges — facilitadora do DNA Básico ThetaHealing®"
              className="w-full h-full object-cover object-center"
              loading="eager"
            />
            {/* Gradiente sutil na base para texto sobreposto */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-dark/60 to-transparent" />

            {/* Tag flutuante */}
            <div className="absolute bottom-6 left-6 right-6 bg-black/40 backdrop-blur-md border border-white/15 rounded-2xl px-5 py-4">
              <p className="text-white font-heading font-semibold text-lg leading-tight">Ariana Borges</p>
              <p className="text-goddess-gold text-sm mt-0.5">Instrutora Master & Science de Thetahealing</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );

  // === PROBLEM SECTION ===
  const ProblemSection = () => (
    <Container type="content" background="white" withDecoration decorationType="bottom" className="relative">
      <SectionHeader
        title="Por que muitas pessoas continuam repetindo os mesmos padrões?"
        subtitle="O verdadeiro obstáculo não é a sua força de vontade, mas o seu subconsciente"
        size="lg"
      />

      <Row columns={2} gap="lg" verticalAlign="center">
        <div>
          <div className="space-y-6">
            <p className="text-xl text-gray-700 leading-relaxed">
              Você já percebeu que, por mais que tente mudar, acaba repetindo os mesmos cenários? Essa repetição é causada por <strong className="text-goddess-purpleDark font-bold">crenças limitantes</strong> enraizadas.
            </p>

            <div className="space-y-4 mt-8">
              {[
                { icon: Heart, text: "Relacionamentos que sempre terminam do mesmo jeito" },
                { icon: Target, text: "Trabalhar muito e o dinheiro nunca ser suficiente" },
                { icon: Shield, text: "Síndrome do impostor e medos paralisantes" },
                { icon: Brain, text: "Sensação constante de estar travado na vida" }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-5 items-center bg-goddess-moonlight/30 p-5 rounded-2xl border border-goddess-purple/10 hover:border-goddess-purple/30 transition-colors">
                  <div className="bg-white p-3 rounded-full text-goddess-purple shadow-sm">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <span className="text-gray-800 font-medium text-lg">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 p-8 bg-goddess-purple text-white rounded-3xl shadow-goddess relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Brain className="w-32 h-32" />
              </div>
              <p className="relative z-10 italic text-xl leading-relaxed font-light">
                "Cerca de 95% das nossas decisões diárias são tomadas pelo subconsciente. Se não mudarmos a raiz da crença, continuaremos no piloto automático."
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 md:mt-0">
          <Card variant="elevated" className="p-8 border-t-4 border-t-goddess-gold h-full bg-white">
            <h3 className="font-heading text-3xl font-bold text-goddess-purpleDark mb-8 text-center">Como as crenças operam</h3>

            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-goddess-purple before:via-goddess-purple/50 before:to-transparent">
              {[
                { num: 1, title: "Formação", desc: "Criadas na infância ou por traumas passados" },
                { num: 2, title: "Instalação", desc: "Operam no subconsciente como verdades absolutas" },
                { num: 3, title: "Repetição", desc: "Criam autossabotagem e moldam nossa realidade" },
                { num: 4, title: "A Solução", desc: "Acessar a onda Theta para reprogramar na raiz" }
              ].map((step, idx) => (
                <div key={step.num} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-goddess-purple text-white font-bold shadow-md shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    {step.num}
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-lg text-goddess-purpleDark">{step.title}</h4>
                    </div>
                    <p className="text-gray-600 leading-snug">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Row>
    </Container>
  );

  // === SOLUTION SECTION ===
  const SolutionSection = () => (
    <div className="relative overflow-hidden bg-brand-dark">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-40"
        >
          <source src="/dna-basico/video-theta-opt.mp4" type="video/mp4" />
        </video>
        {/* Adicional overlay de gradiente para garantir leitura */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/40 to-brand-dark/80" />
      </div>

      <Container type="content" background="transparent" className="relative z-10 !text-white">
        <Row columns={2} gap="lg" verticalAlign="center">
          <div className="order-2 md:order-1 mt-12 md:mt-0">
            <div className="relative p-4 max-w-lg mx-auto">
              <div className="w-full aspect-square bg-gradient-to-br from-goddess-purple/40 to-goddess-purpleDark/40 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl relative overflow-hidden border border-white/10">
                {/* Decorative rings */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3/4 h-3/4 rounded-full border border-white/20 animate-[spin_60s_linear_infinite]" />
                  <div className="absolute w-1/2 h-1/2 rounded-full border border-goddess-gold/40 animate-[spin_40s_linear_infinite_reverse]" />
                </div>

                <div className="text-center p-8 relative z-10">
                  <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto mb-4 border border-white/20">
                    <Brain className="w-10 h-10 text-goddess-gold" />
                  </div>
                  <h3 className="font-heading text-4xl font-bold text-white mb-2">Estado Theta</h3>
                  <p className="text-white/80 text-lg">
                    Frequência de 4-7 Hz
                  </p>
                </div>
              </div>

              <div className="absolute bottom-0 right-0 bg-white/10 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white/10 max-w-[250px]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-goddess-gold/20 p-2 rounded-full">
                    <Zap className="w-6 h-6 text-goddess-gold" />
                  </div>
                  <span className="font-bold text-white">Acesso Direto</span>
                </div>
                <p className="text-sm text-white/70 leading-relaxed">A mesma frequência atingida em meditação profunda, agora acessível conscientemente.</p>
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2 text-left">
            <div className="[&_h2]:!text-white [&_p]:!text-white/70">
              <SectionHeader
                title="O que é o ThetaHealing®?"
                subtitle="A tecnologia espiritual para cura e autoconhecimento"
                align="left"
                size="lg"
              />
            </div>

            <div className="space-y-6">
              <p className="text-lg text-white/90 leading-relaxed">
                Criada por Vianna Stibal, o ThetaHealing® é uma das técnicas de cura energética e desenvolvimento pessoal mais poderosas do mundo. Ela ensina como utilizar a intuição natural em conjunto com a energia de cocriação do universo.
              </p>

              <div className="space-y-5 mt-8">
                {[
                  { title: "Reprogramação na Raiz", desc: "Identifique exatamente onde a crença foi criada e substitua por sentimentos potencializadores." },
                  { title: "Resultados Imediatos", desc: "Ao acessar o subconsciente no estado Theta, as mudanças ocorrem de forma leve e rápida." },
                  { title: "Cura Emocional", desc: "Liberação de ressentimentos, rejeições e traumas passados que drenam sua energia vital." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="mt-1 bg-goddess-purple/20 p-2 rounded-full border border-white/10">
                      <Check className="w-5 h-5 text-goddess-gold font-bold" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white">{item.title}</h4>
                      <p className="text-white/70 mt-1 text-lg">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );

  // === BENEFITS SECTION ===
  const BenefitsSection = () => (
    <Container type="content" background="white" withDecoration decorationType="top">
      <SectionHeader
        title="O que você vai desenvolver"
        subtitle="Uma jornada de transformação profunda em todas as áreas"
        size="lg"
      />

      <CardGrid columns={3}>
        <Card variant="elevated" className="text-center h-full hover:-translate-y-2 transition-transform duration-300">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-goddess-purple/10 rounded-2xl flex items-center justify-center rotate-3">
              <Shield className="w-8 h-8 text-goddess-purple -rotate-3" />
            </div>
          </div>
          <h3 className="font-bold text-2xl mb-3 text-goddess-purpleDark">Fim da Autossabotagem</h3>
          <p className="text-gray-600 text-lg leading-relaxed">Compreenda seus mecanismos de defesa e pare de destruir as oportunidades que chegam até você.</p>
        </Card>

        <Card variant="elevated" className="text-center h-full hover:-translate-y-2 transition-transform duration-300">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-goddess-gold/20 rounded-2xl flex items-center justify-center -rotate-3">
              <Award className="w-8 h-8 text-goddess-earth rotate-3" />
            </div>
          </div>
          <h3 className="font-bold text-2xl mb-3 text-goddess-purpleDark">Prosperidade Real</h3>
          <p className="text-gray-600 text-lg leading-relaxed">Desbloqueie crenças de escassez, votos de pobreza e permita que a abundância flua em seus negócios.</p>
        </Card>

        <Card variant="elevated" className="text-center h-full hover:-translate-y-2 transition-transform duration-300">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-goddess-pink/30 rounded-2xl flex items-center justify-center rotate-3">
              <Heart className="w-8 h-8 text-goddess-purpleDark -rotate-3" />
            </div>
          </div>
          <h3 className="font-bold text-2xl mb-3 text-goddess-purpleDark">Relações Saudáveis</h3>
          <p className="text-gray-600 text-lg leading-relaxed">Cure feridas de rejeição e abandono para atrair e manter relacionamentos amorosos e parcerias elevadas.</p>
        </Card>

        <Card variant="elevated" className="text-center h-full hover:-translate-y-2 transition-transform duration-300">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-goddess-green/20 rounded-2xl flex items-center justify-center -rotate-3">
              <Users className="w-8 h-8 text-goddess-forest rotate-3" />
            </div>
          </div>
          <h3 className="font-bold text-2xl mb-3 text-goddess-purpleDark">Atuar como Terapeuta</h3>
          <p className="text-gray-600 text-lg leading-relaxed">Seja certificado internacionalmente para aplicar a técnica e ser remunerado ajudando outras pessoas.</p>
        </Card>

        <Card variant="elevated" className="text-center h-full hover:-translate-y-2 transition-transform duration-300">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center rotate-3">
              <Star className="w-8 h-8 text-blue-600 -rotate-3" />
            </div>
          </div>
          <h3 className="font-bold text-2xl mb-3 text-goddess-purpleDark">Intuição Aguçada</h3>
          <p className="text-gray-600 text-lg leading-relaxed">Desperte seus sentidos psíquicos e aprenda a confiar na sua sabedoria interior para tomar decisões.</p>
        </Card>

        <Card variant="elevated" className="text-center h-full hover:-translate-y-2 transition-transform duration-300">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center -rotate-3">
              <Target className="w-8 h-8 text-orange-600 rotate-3" />
            </div>
          </div>
          <h3 className="font-bold text-2xl mb-3 text-goddess-purpleDark">Manifestação</h3>
          <p className="text-gray-600 text-lg leading-relaxed">Aprenda a técnica oficial de cocriação do ThetaHealing para materializar metas e objetivos na sua vida.</p>
        </Card>
      </CardGrid>
    </Container>
  );

  // === DETAILS SECTION ===
  const CourseDetailsSection = () => (
    <Container type="content" background="light">
      <SectionHeader
        title="Estrutura da Formação"
        subtitle="O que você receberá ao participar desta imersão"
        size="lg"
      />

      <Row columns={2} gap="lg">
        <Card variant="default" className="bg-white border-none shadow-card h-full p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-goddess-moonlight p-4 rounded-2xl">
              <BookOpen className="w-8 h-8 text-goddess-purple" />
            </div>
            <h3 className="font-heading text-3xl font-bold text-goddess-purpleDark">Material Oficial</h3>
          </div>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            Kit completo para acompanhar seu desenvolvimento durante e após o curso, direto do instituto oficial (THInK).
          </p>
          <ul className="space-y-4">
            {[
              "Livro ThetaHealing® Básico (Físico)",
              "Apostila oficial (digital ou física)",
              "Certificado Internacional (praticante)",
              "Registro no site oficial ThetaHealing.com",
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <Check className="w-6 h-6 text-goddess-gold flex-shrink-0" />
                <span className="text-gray-800 font-medium text-lg">{item}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card variant="default" className="bg-white border-none shadow-card h-full p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-goddess-moonlight p-4 rounded-2xl">
              <Clock className="w-8 h-8 text-goddess-purple" />
            </div>
            <h3 className="font-heading text-3xl font-bold text-goddess-purpleDark">O Treinamento</h3>
          </div>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            Três dias de imersão profunda combinando conhecimentos teóricos e intensas práticas assistidas.
          </p>
          <ul className="space-y-4">
            {[
              "Leitura intuitiva e escaneamento do corpo",
              "Técnica de escavação (Digging) para achar a raiz",
              "Como mudar crenças genéticas e históricas",
              "Cura e contato com Anjos da Guarda",
              "Devolução de fragmentos de alma"
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <Check className="w-6 h-6 text-goddess-purple flex-shrink-0" />
                <span className="text-gray-800 font-medium text-lg">{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      </Row>
    </Container>
  );


  // === PRICING SECTION ===
  const PricingSection = () => (
    <Container type="content" background="white">
      <SectionHeader
        title="Sua Formação Oficial"
        subtitle="O investimento na ferramenta que você usará pelo resto da vida"
        size="lg"
      />

      <div className="max-w-md mx-auto">
        <Card variant="elevated" className="border-4 border-goddess-purple relative overflow-hidden flex flex-col h-full shadow-2xl p-0">
          <div className="bg-gradient-to-r from-goddess-purple to-goddess-purpleDark text-white text-center py-6">
            <h3 className="font-heading text-4xl font-bold mb-2">Turma Presencial</h3>
            <p className="text-white/80 text-lg">12, 13 e 14 de Junho</p>
          </div>

          <div className="p-8 text-center flex-grow bg-white">
            <div className="text-gray-500 line-through text-xl mb-1">De R$ 1.997</div>
            <div className="text-6xl font-bold text-gray-900 mb-2">
              <span className="text-3xl align-top mr-1">R$</span>1.297
            </div>
            <p className="text-goddess-purple font-semibold mb-8 text-lg">ou até 12x no cartão</p>

            <ul className="text-left mb-10 space-y-5">
              {[
                "3 dias de Formação Presencial",
                "Certificado Oficial de Praticante",
                "Livro Físico + Apostila Oficial",
                "BÔNUS: Grupo VIP com aulas mensais e acesso a gravações",
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <Check className="w-6 h-6 text-goddess-green flex-shrink-0" />
                  <span className="text-gray-700 text-lg">{item}</span>
                </li>
              ))}
            </ul>

            <Button variant="urgent" pulse fullWidth size="xl" className="py-5 text-lg shadow-goddess">
              GARANTIR MINHA VAGA
            </Button>
            <p className="mt-4 text-sm text-gray-500 font-medium">
              Compra 100% segura e certificada.
            </p>
          </div>
        </Card>
      </div>

      <div className="mt-16 max-w-3xl mx-auto p-8 bg-goddess-moonlight rounded-3xl border border-gray-200 text-center">
        <Shield className="w-16 h-16 text-goddess-gold mx-auto mb-6" />
        <h4 className="font-heading text-3xl font-bold text-gray-900 mb-4">Garantia Incondicional de 7 dias</h4>
        <p className="text-xl text-gray-700 leading-relaxed">
          Se até o final do primeiro dia de curso você não sentir que esta técnica é transformadora, basta solicitar e devolveremos 100% do seu dinheiro. Sem perguntas.
        </p>
      </div>
    </Container>
  );

  // === FAQ SECTION ===
  const FAQSection = () => (
    <Container type="content" background="light" withDecoration decorationType="both">
      <SectionHeader
        title="Dúvidas Frequentes"
        subtitle="Tudo o que você precisa saber antes de se inscrever"
        size="lg"
      />

      <div className="max-w-4xl mx-auto space-y-6">
        {[
          {
            q: "Preciso ter o dom da intuição ou ser médium?",
            a: "Não! A intuição é como um músculo que todos temos. O ThetaHealing® oferece uma metodologia estruturada passo a passo para acessar e treinar esse músculo de forma segura. Qualquer pessoa pode aprender."
          },
          {
            q: "A técnica tem ligação com alguma religião?",
            a: "O ThetaHealing® não é uma religião. É uma técnica de treinamento meditativo e filosofia espiritual. Pessoas de todas as religiões (ou sem religião) praticam e relatam que a técnica apenas fortaleceu sua própria fé pessoal."
          },
          {
            q: "O certificado me permite trabalhar como terapeuta?",
            a: "Sim. Ao final do DNA Básico, você assina o contrato com o THInK (ThetaHealing Institute of Knowledge) e se torna oficialmente um Praticante de ThetaHealing®, podendo atender a si mesmo, amigos ou clientes pagantes. Atenção: o aluno deverá realizar o cadastro no site oficial do THInK para receber o certificado internacional."
          },
          {
            q: "O que é o Grupo VIP incluído na formação?",
            a: "O Grupo VIP é o seu suporte contínuo após o curso. Nele você tira dúvidas com a instrutora, participa de aulas treino ao vivo uma vez por mês e tem acesso a aulas gravadas que ficam disponíveis para você assistir quando quiser — tudo online, no seu tempo."
          }
        ].map((item, idx) => (
          <div key={idx} className="p-8 rounded-3xl border border-gray-200 bg-white hover:border-goddess-purple/30 transition-colors shadow-sm">
            <div className="flex gap-5">
              <div className="text-goddess-purple bg-goddess-purple/10 p-3 rounded-xl flex-shrink-0 self-start">
                <InfinityIcon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-xl mb-3">{item.q}</h4>
                <p className="text-gray-600 text-lg leading-relaxed">{item.a}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );

  // === FINAL CTA ===
  const FinalCTASection = () => (
    <Container type="hero" background="gradient" className="text-center relative">
      <div className="absolute inset-0 bg-black/20 z-0" />
      <Row columns={1} className="justify-center relative z-10">
        <div className="w-full max-w-4xl mx-auto px-4">
          <div className="mb-10 inline-flex items-center justify-center p-5 bg-white/10 rounded-full backdrop-blur-md border border-white/20">
            <Sparkles className="w-12 h-12 text-goddess-gold" />
          </div>

          <h2 className="font-heading text-4xl md:text-6xl font-bold text-white mb-8 leading-tight drop-shadow-lg">
            Sua nova realidade está a uma decisão de distância
          </h2>

          <p className="text-2xl text-white/90 mb-12 font-light leading-relaxed">
            Dê o primeiro passo para assumir o controle do seu subconsciente e criar a vida que você merece.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button variant="urgent" size="xl" pulse className="px-12 py-6 text-xl shadow-2xl">
              <span className="flex items-center gap-3">GARANTIR MINHA VAGA <ArrowRight className="w-6 h-6" /></span>
            </Button>
          </div>
        </div>
      </Row>
    </Container>
  );

  return (
    <>
      <Helmet>
        <title>DNA Básico ThetaHealing® | Formação Oficial com Ariana Borges</title>
        <meta name="description" content="Aprenda a acessar o estado Theta e reprogramar crenças limitantes. Formação oficial ThetaHealing® DNA Básico com certificação internacional THInK®." />
        <link rel="canonical" href="https://arianaborges.com/dna-basico" />
        <meta name="robots" content="index, follow" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://arianaborges.com/dna-basico" />
        <meta property="og:title" content="DNA Básico ThetaHealing® | Formação Oficial com Ariana Borges" />
        <meta property="og:description" content="Imersão de 3 dias para liberar crenças que bloqueiam sua vida. Certificação internacional THInK®. Reprograme padrões inconscientes em relacionamentos, finanças e autoestima." />
        <meta property="og:image" content="https://arianaborges.com/og-dna-basico.png" />
        <meta property="og:image:secure_url" content="https://arianaborges.com/og-dna-basico.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Instituto Ariana Borges" />
        <meta property="og:locale" content="pt_BR" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://arianaborges.com/dna-basico" />
        <meta name="twitter:title" content="DNA Básico ThetaHealing® | Formação Oficial com Ariana Borges" />
        <meta name="twitter:description" content="Imersão de 3 dias para liberar crenças que bloqueiam sua vida. Certificação internacional THInK®." />
        <meta name="twitter:image" content="https://arianaborges.com/og-dna-basico.png" />
      </Helmet>

      <>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <BenefitsSection />
        <CourseDetailsSection />
        <DNABasicoGallerySection />
        <PricingSection />
        <FAQSection />
        <FinalCTASection />
      </>
    </>
  );
};

export default DNABasico;