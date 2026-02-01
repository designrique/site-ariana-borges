import React from 'react';
import { Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-beige py-12 md:py-16 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-serif text-xl md:text-2xl text-brand-dark mb-2">Instituto Ariana Borges</h3>
            <p className="font-sans text-gray-500 text-sm">
              Cura, transformação e despertar espiritual.
            </p>
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
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-serif text-lg text-brand-dark mb-4">Redes Sociais</h4>
            <div className="flex gap-4">
              <a href="https://instagram.com/institutoarianaborges" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-gold transition-colors">
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 text-center">
          <p className="font-sans text-gray-500 text-xs md:text-sm">
            © {new Date().getFullYear()} Instituto Ariana Borges. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;