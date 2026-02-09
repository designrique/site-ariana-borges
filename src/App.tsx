import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from '@/pages/Home';
import Sobre from '@/pages/Sobre';
import TerapiaIndividual from '@/pages/TerapiaIndividual';
import FormacaoTerapeutas from '@/pages/FormacaoTerapeutas';
import AutoconhecimentoGrupo from '@/pages/AutoconhecimentoGrupo';
import ThetaHealing from '@/pages/ThetaHealing';
import BlogIndex from '@/pages/Blog/BlogIndex';
import BlogPost from '@/pages/Blog/BlogPost';
import ThankYou from '@/components/ThankYou';
import PaymentReturn from '@/pages/PaymentReturn';
import EncontroDeusas from '@/pages/EncontroDeusas';
import Footer from '@/components/Footer';

import SchedulingChat from '@/components/SchedulingChat';
import { SchedulingProvider, useScheduling } from '@/components/SchedulingContext';
import { Menu, X, ChevronDown } from 'lucide-react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

const NavBar = () => {
  const { openScheduling } = useScheduling();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [servicesOpen, setServicesOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 h-28 flex items-center transition-all duration-300 ${isScrolled ? 'shadow-md shadow-brand-lilac/10' : ''}`}>
      <div className="max-w-6xl mx-auto px-6 w-full flex justify-between items-center">
        <Link to="/" className="font-serif font-bold text-xl tracking-wider text-brand-dark hover:text-brand-gold transition-colors cursor-pointer">
          <img src="/ariana-borges-logo.png" alt="Instituto Ariana Borges" className="h-24 w-auto" />
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-brand-dark"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {/* Services Dropdown */}
          <div className="relative group">
            <button className="font-sans text-brand-dark hover:text-brand-gold transition-colors font-medium flex items-center gap-1">
              Serviços
              <ChevronDown size={16} className="group-hover:rotate-180 transition-transform duration-200" />
            </button>
            <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2 min-w-[220px]">
                <Link to="/terapia-individual" className="block px-4 py-2 font-sans text-brand-dark hover:bg-brand-lilac/10 hover:text-brand-gold transition-colors">
                  Terapia Individual
                </Link>
                <Link to="/formacao-de-terapeutas" className="block px-4 py-2 font-sans text-brand-dark hover:bg-brand-lilac/10 hover:text-brand-gold transition-colors">
                  Formação de Terapeutas
                </Link>
                <Link to="/autoconhecimento-em-grupo" className="block px-4 py-2 font-sans text-brand-dark hover:bg-brand-lilac/10 hover:text-brand-gold transition-colors">
                  Autoconhecimento em Grupo
                </Link>
                <Link to="/thetahealing" className="block px-4 py-2 font-sans text-brand-dark hover:bg-brand-lilac/10 hover:text-brand-gold transition-colors">
                  ThetaHealing®
                </Link>
              </div>
            </div>
          </div>
          <Link to="/sobre" className="font-sans text-brand-dark hover:text-brand-gold transition-colors font-medium">Sobre</Link>
          <Link to="/blog" className="font-sans text-brand-dark hover:text-brand-gold transition-colors font-medium">Blog</Link>
          <button
            onClick={openScheduling}
            className="bg-brand-dark text-white font-sans px-5 py-2 rounded-full text-xs font-bold hover:bg-brand-gold hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Marque um Atendimento
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/75 z-40 transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Menu Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-[280px] bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        style={{ backgroundColor: '#ffffff' }}
      >
        <div className="p-6 flex flex-col h-full bg-white relative z-[60] overflow-y-auto">
          <div className="flex justify-end items-center mb-8">
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-brand-gold transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="font-sans text-brand-dark hover:text-brand-gold font-medium text-lg border-b border-gray-100 pb-2"
            >
              Home
            </Link>

            {/* Mobile Services Accordion */}
            <div className="border-b border-gray-100 pb-2">
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="font-sans text-brand-dark hover:text-brand-gold font-medium text-lg flex items-center justify-between w-full"
              >
                Serviços
                <ChevronDown size={18} className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${servicesOpen ? 'max-h-60 mt-3' : 'max-h-0'}`}>
                <div className="flex flex-col gap-2 pl-4">
                  <Link
                    to="/terapia-individual"
                    onClick={() => setIsOpen(false)}
                    className="font-sans text-gray-600 hover:text-brand-gold text-sm py-1"
                  >
                    Terapia Individual
                  </Link>
                  <Link
                    to="/formacao-de-terapeutas"
                    onClick={() => setIsOpen(false)}
                    className="font-sans text-gray-600 hover:text-brand-gold text-sm py-1"
                  >
                    Formação de Terapeutas
                  </Link>
                  <Link
                    to="/autoconhecimento-em-grupo"
                    onClick={() => setIsOpen(false)}
                    className="font-sans text-gray-600 hover:text-brand-gold text-sm py-1"
                  >
                    Autoconhecimento em Grupo
                  </Link>
                  <Link
                    to="/thetahealing"
                    onClick={() => setIsOpen(false)}
                    className="font-sans text-gray-600 hover:text-brand-gold text-sm py-1"
                  >
                    ThetaHealing®
                  </Link>
                </div>
              </div>
            </div>

            <Link
              to="/sobre"
              onClick={() => setIsOpen(false)}
              className="font-sans text-brand-dark hover:text-brand-gold font-medium text-lg border-b border-gray-100 pb-2"
            >
              Sobre
            </Link>
            <Link
              to="/blog"
              onClick={() => setIsOpen(false)}
              className="font-sans text-brand-dark hover:text-brand-gold font-medium text-lg border-b border-gray-100 pb-2"
            >
              Blog
            </Link>

            <button
              onClick={() => {
                openScheduling();
                setIsOpen(false);
              }}
              className="mt-4 bg-brand-dark text-white font-sans px-5 py-3 rounded-full font-bold hover:bg-brand-gold transition-all duration-300 shadow-md text-center"
            >
              Marque um Atendimento
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const MainContent = () => {
  const location = window.location;
  const isLandingPage = location.pathname === '/' || location.pathname === '/encontro-das-deusas';

  return (
    <div className="min-h-screen bg-brand-beige overflow-x-hidden selection:bg-brand-lilac selection:text-brand-dark font-sans">
      {!isLandingPage && <NavBar />}
      <main className={isLandingPage ? "" : "pt-28"}>
        <Routes>
          <Route path="/" element={<EncontroDeusas />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/quem-sou" element={<Sobre />} />
          <Route path="/terapia-individual" element={<TerapiaIndividual />} />
          <Route path="/formacao-de-terapeutas" element={<FormacaoTerapeutas />} />
          <Route path="/autoconhecimento-em-grupo" element={<AutoconhecimentoGrupo />} />
          <Route path="/thetahealing" element={<ThetaHealing />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/obrigado" element={<ThankYou />} />
          <Route path="/payment-return" element={<PaymentReturn />} />
          <Route path="/encontro-das-deusas" element={<EncontroDeusas />} />
        </Routes>
      </main>
      <Footer />
      <SchedulingChat />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <SchedulingProvider>
          <Router>
            <MainContent />
          </Router>
        </SchedulingProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
};

export default App;
