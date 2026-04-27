import React from 'react';
import { Instagram, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getSiteSettings } from '@/lib/cms';

const TikTokIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.8 1.52V6.74a4.85 4.85 0 0 1-1.03-.05Z" />
    </svg>
);

const ThreadsIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.754-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.74-1.755-.518-.593-1.295-.898-2.313-.905h-.075c-.762 0-2.058.202-2.945 1.32L7.3 9.282C8.514 7.75 10.168 6.95 12.123 6.95h.1c3.242.02 5.337 2.013 5.76 5.467.257.044.509.098.754.162 1.588.419 2.787 1.322 3.462 2.61.96 1.836.985 4.466-.8 6.21C19.6 23.051 17.334 23.98 12.186 24Zm-1.415-9.378c-.74.04-1.354.225-1.78.539-.375.28-.566.643-.541 1.022.031.568.351.997.869 1.31.614.378 1.436.521 2.29.476 1.088-.058 1.895-.435 2.399-1.12.334-.451.553-1.04.654-1.758a11.46 11.46 0 0 0-3.891-.469Z" />
    </svg>
);

const SubstackIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
    </svg>
);

const Footer: React.FC = () => {
  const { data: settings } = useQuery({ queryKey: ['siteSettings'], queryFn: getSiteSettings });

  const copyright = settings?.footer?.copyrightText || `© ${new Date().getFullYear()} Instituto Ariana Borges. Todos os direitos reservados.`;
  const instagramUrl = settings?.social?.instagram || "https://instagram.com/institutoarianaborges";
  const youtubeUrl = settings?.social?.youtube || "https://youtube.com/@institutoarianaborges520";
  const tiktokUrl = settings?.social?.tiktok || "https://tiktok.com/@instituto.ariana";
  const threadsUrl = settings?.social?.threads || "https://threads.net/@institutoarianaborges";
  const substackUrl = settings?.social?.substack || "https://arianaborges.substack.com";

  return (
    <>
    <footer className="bg-brand-beige py-12 md:py-16 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-serif text-xl md:text-2xl text-brand-dark mb-2">Instituto Ariana Borges</h3>
            <p className="font-sans text-gray-500 text-sm mb-3">
              Cura, transformação e despertar espiritual.
            </p>
            <div className="font-sans text-gray-500 text-xs leading-relaxed">
              <p className="font-semibold text-gray-600 mb-1">Localização</p>
              <p>Av. Rui Barbosa, 715, sala 403</p>
              <p>Empresaria Rui Barbosa</p>
              <p>Recife – PE</p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-serif text-lg text-brand-dark mb-4">Serviços</h4>
            <div className="flex flex-col gap-2 text-sm text-gray-600">
              <Link to="/terapia-individual" className="hover:text-brand-gold transition-colors">Terapia Individual</Link>
              <Link to="/formacao-de-terapeutas" className="hover:text-brand-gold transition-colors">Formação de Terapeutas</Link>
              <Link to="/autoconhecimento-em-grupo" className="hover:text-brand-gold transition-colors">Autoconhecimento em Grupo</Link>
              <Link to="/thetahealing" className="hover:text-brand-gold transition-colors">ThetaHealing®</Link>
            </div>
          </div>

          {/* Instituto */}
          <div>
            <h4 className="font-serif text-lg text-brand-dark mb-4">Instituto</h4>
            <div className="flex flex-col gap-2 text-sm text-gray-600">
              <Link to="/" className="hover:text-brand-gold transition-colors">Home</Link>
              <Link to="/sobre" className="hover:text-brand-gold transition-colors">Sobre</Link>
              <Link to="/blog" className="hover:text-brand-gold transition-colors">Blog</Link>
              <Link to="/privacidade" className="hover:text-brand-gold transition-colors">Política de Privacidade</Link>
              <Link to="/termos" className="hover:text-brand-gold transition-colors">Termos de Uso</Link>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-serif text-lg text-brand-dark mb-4">Redes Sociais</h4>
            <div className="flex gap-4 flex-wrap">
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-gold transition-colors" aria-label="Siga-nos no Instagram">
                <Instagram size={24} />
              </a>
              <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-gold transition-colors" aria-label="Inscreva-se no nosso canal do YouTube">
                <Youtube size={24} />
              </a>
              <a href={tiktokUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-gold transition-colors" aria-label="Siga-nos no TikTok">
                <TikTokIcon size={24} />
              </a>
              <a href={threadsUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-gold transition-colors" aria-label="Siga-nos no Threads">
                <ThreadsIcon size={24} />
              </a>
              <a href={substackUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-gold transition-colors" aria-label="Assine nossa newsletter no Substack">
                <SubstackIcon size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 text-center">
          <p className="font-sans text-gray-500 text-xs md:text-sm">
            {copyright}
          </p>
        </div>
      </div>
    </footer>

    {/* Mapa full-width */}
    <div className="w-full h-72 md:h-96">
      <iframe
        title="Localização Instituto Ariana Borges"
        src="https://maps.google.com/maps?q=Av.+Rui+Barbosa,+715,+Recife,+PE,+Brasil&output=embed&hl=pt-BR&z=17"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
    </>
  );
};

export default Footer;