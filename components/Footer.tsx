import React from 'react';
import { Instagram, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-beige py-12 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <h3 className="font-serif text-2xl text-brand-dark mb-2">Mesa de Salomão</h3>
          <p className="font-sans text-gray-500 text-sm">
            © {new Date().getFullYear()} Ariana Borges. Todos os direitos reservados.
          </p>
        </div>

        <div className="flex gap-6">
          <a href="#" className="text-gray-400 hover:text-brand-gold transition-colors">
            <Instagram size={24} />
          </a>
          <a href="#" className="text-gray-400 hover:text-brand-gold transition-colors">
            <Mail size={24} />
          </a>
          <a href="#" className="text-gray-400 hover:text-brand-gold transition-colors">
            <Phone size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;