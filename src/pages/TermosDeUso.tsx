import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import ScrollReveal from '@/components/ScrollReveal';

const TermosDeUso: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Termos de Uso - Instituto Ariana Borges</title>
        <meta name="description" content="Termos de Uso do Instituto Ariana Borges. Conheça as condições de uso do nosso site e serviços." />
      </Helmet>

      <section className="py-20 bg-brand-beige">
        <div className="max-w-3xl mx-auto px-6">
          <ScrollReveal>
            <h1 className="font-serif text-4xl md:text-5xl text-brand-dark mb-4">Termos de Uso</h1>
            <p className="text-gray-500 text-sm mb-12">Última atualização: 21 de março de 2026</p>
          </ScrollReveal>

          <div className="prose prose-gray max-w-none space-y-8 font-sans text-gray-700 leading-relaxed">
            <ScrollReveal>
              <h2 className="font-serif text-2xl text-brand-dark mt-0">1. Aceitação dos Termos</h2>
              <p>Ao acessar e utilizar o site do Instituto Ariana Borges (<strong>arianaborges.com</strong>), você concorda com estes Termos de Uso. Se não concordar com algum destes termos, solicitamos que não utilize o site.</p>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="font-serif text-2xl text-brand-dark">2. Descrição dos Serviços</h2>
              <p>O Instituto Ariana Borges oferece, por meio deste site:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Informações sobre terapias integrativas e ThetaHealing®.</li>
                <li>Agendamento de sessões de terapia individual.</li>
                <li>Inscrições em cursos, formações e eventos.</li>
                <li>Conteúdo educativo por meio do blog.</li>
                <li>Participação no Clube do Livro Mulher Maravilha e Encontro de Deusas.</li>
              </ul>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="font-serif text-2xl text-brand-dark">3. Natureza dos Serviços Terapêuticos</h2>
              <p>Os serviços oferecidos pelo Instituto Ariana Borges são de natureza <strong>complementar e integrativa</strong>. Eles não substituem tratamento médico, psicológico ou psiquiátrico convencional. Recomendamos que você mantenha acompanhamento com profissionais de saúde devidamente registrados em seus conselhos de classe.</p>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="font-serif text-2xl text-brand-dark">4. Agendamentos e Pagamentos</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Os agendamentos estão sujeitos à disponibilidade de horários.</li>
                <li>Pagamentos são processados pela plataforma <strong>InfinitePay</strong> e estão sujeitos aos termos dessa plataforma.</li>
                <li>Cancelamentos devem ser solicitados com no mínimo <strong>24 horas de antecedência</strong>. Cancelamentos fora deste prazo podem não ser reembolsados.</li>
                <li>Em caso de desistência de cursos ou eventos, a política de reembolso será informada no momento da inscrição.</li>
              </ul>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="font-serif text-2xl text-brand-dark">5. Propriedade Intelectual</h2>
              <p>Todo o conteúdo do site — incluindo textos, imagens, logotipos, vídeos e design — é de propriedade do Instituto Ariana Borges e protegido pela legislação brasileira de direitos autorais (Lei 9.610/1998). É proibida a reprodução, distribuição ou modificação sem autorização prévia por escrito.</p>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="font-serif text-2xl text-brand-dark">6. Conduta do Usuário</h2>
              <p>Ao utilizar o site, você se compromete a:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Fornecer informações verdadeiras e atualizadas.</li>
                <li>Não utilizar o site para fins ilegais ou não autorizados.</li>
                <li>Não tentar acessar áreas restritas do site sem autorização.</li>
                <li>Respeitar os demais usuários e profissionais do Instituto.</li>
              </ul>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="font-serif text-2xl text-brand-dark">7. Limitação de Responsabilidade</h2>
              <p>O Instituto Ariana Borges não se responsabiliza por:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Resultados individuais decorrentes das terapias, que podem variar de pessoa para pessoa.</li>
                <li>Indisponibilidade temporária do site por razões técnicas.</li>
                <li>Conteúdo de sites de terceiros acessados por meio de links no site.</li>
                <li>Danos decorrentes do uso indevido do site pelo usuário.</li>
              </ul>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="font-serif text-2xl text-brand-dark">8. Privacidade</h2>
              <p>O tratamento de dados pessoais é regido pela nossa <Link to="/privacidade" className="text-brand-gold hover:underline">Política de Privacidade</Link>, que faz parte integrante destes Termos de Uso.</p>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="font-serif text-2xl text-brand-dark">9. Alterações nos Termos</h2>
              <p>O Instituto Ariana Borges reserva-se o direito de modificar estes Termos de Uso a qualquer momento. Alterações significativas serão comunicadas por meio do site. O uso continuado do site após as alterações constitui aceitação dos novos termos.</p>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="font-serif text-2xl text-brand-dark">10. Legislação Aplicável</h2>
              <p>Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro da comarca de domicílio do Instituto Ariana Borges para dirimir quaisquer controvérsias decorrentes destes termos.</p>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="font-serif text-2xl text-brand-dark">11. Contato</h2>
              <p>Para dúvidas sobre estes Termos de Uso:</p>
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

export default TermosDeUso;
