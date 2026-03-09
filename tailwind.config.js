/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta original do site - usada no EncontroDeusas e navbar
        brand: {
          beige: '#F9F7F2',
          gold: '#D4AF37',
          goldDark: '#8C6D1F',
          goldLight: '#F3E5AB',
          lilac: '#E6E6FA',
          lilacDark: '#6A4BB8',
          dark: '#2C2C2C',
          greenLight: '#E0F2F1',
        },
        // Paleta do Design System - harmonizada com brand para coerência visual
        goddess: {
          purple: '#6A4BB8',      // Roxo elegante - alinhado com brand-lilacDark
          purpleDark: '#3A2878',   // Roxo profundo - mistério, intuição
          earth: '#8C6D1F',        // Terroso dourado - alinhado com brand-goldDark
          gold: '#D4AF37',         // Dourado quente - alinhado com brand-gold
          pink: '#F3E5AB',         // Âmbar suave - alinhado com brand-goldLight
          green: '#2E8B57',        // Verde natureza - crescimento, cura
          forest: '#228B22',       // Verde floresta - abundância, vida
          beige: '#F9F7F2',        // Bege quente - alinhado com brand-beige
          moonlight: '#F0EDF8',    // Lavanda claro - derivado do brand-lilac
          sunset: '#C67C3A',       // Âmbar cobre - tom quente harmonioso
        },
        // Cores de Estado
        state: {
          success: '#28a745',      // Verde sucesso - confirmação
          warning: '#ffc107',      // Amarelo atenção - urgência
          error: '#dc3545',        // Vermelho erro - alerta
          disabled: '#6c757d',     // Cinza desabilitado
        },
        // Cores de Fundo
        background: {
          dark: '#1a1a2e',         // Fundo escuro para hero
          light: '#f8f9fa',        // Fundo claro para seções
          white: '#ffffff',        // Fundo branco puro
        }
      },
      fontFamily: {
        // Fontes Principais do design system
        heading: ['"Playfair Display"', 'serif'],      // Elegância, tradição
        body: ['"Inter"', 'sans-serif'],               // Legibilidade moderna
        accent: ['"Dancing Script"', 'cursive'],       // Toque feminino, orgânico
        // Fontes de fallback
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Lato"', 'sans-serif'],
      },
      // Escala Tipográfica - Mobile First
      fontSize: {
        'xs': '0.75rem',     // 12px - detalhes, labels
        'sm': '0.875rem',    // 14px - corpo pequeno
        'base': '1rem',      // 16px - corpo padrão
        'lg': '1.125rem',    // 18px - lead, destaques
        'xl': '1.25rem',     // 20px - subtítulos
        '2xl': '1.5rem',     // 24px - títulos seções
        '3xl': '1.875rem',   // 30px - títulos principais
        '4xl': '2.25rem',    // 36px - hero mobile
        '5xl': '3rem',       // 48px - hero desktop
        '6xl': '3.75rem',    // 60px - destaque especial
        '7xl': '4.5rem',     // 72px - hero grande
      },
      lineHeight: {
        // Espaçamento de Linha
        'tight': '1.2',      // Headings - compacto mas legível
        'normal': '1.5',     // Corpo padrão
        'relaxed': '1.6',    // Corpo - confortável para leitura longa
        'loose': '1.8',      // Lead/Introdução - respiração extra
      },
      // Espaçamento (Spacing Scale) - Escala 8px
      spacing: {
        '1': '0.25rem',   // 4px
        '2': '0.5rem',    // 8px
        '3': '0.75rem',   // 12px
        '4': '1rem',      // 16px
        '5': '1.25rem',   // 20px
        '6': '1.5rem',    // 24px
        '8': '2rem',      // 32px
        '10': '2.5rem',   // 40px
        '12': '3rem',     // 48px
        '16': '4rem',     // 64px
        '20': '5rem',     // 80px
        '24': '6rem',     // 96px
        '32': '8rem',     // 128px
        '40': '10rem',    // 160px
        '48': '12rem',    // 192px
        '56': '14rem',    // 224px
        '64': '16rem',    // 256px
      },
      // Container Sizes
      maxWidth: {
        'xs': '20rem',    // 320px
        'sm': '24rem',    // 384px
        'md': '28rem',    // 448px
        'lg': '32rem',    // 512px
        'xl': '36rem',    // 576px
        '2xl': '42rem',   // 672px
        '3xl': '48rem',   // 768px
        '4xl': '56rem',   // 896px
        '5xl': '64rem',   // 1024px
        '6xl': '72rem',   // 1152px
        '7xl': '80rem',   // 1280px
        'full': '100%',
      },
      // Border Radius
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        'DEFAULT': '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        'full': '9999px',
      },
      // Box Shadow
      boxShadow: {
        'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'DEFAULT': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        'inner': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
        'goddess': '0 4px 15px rgba(106, 75, 184, 0.3)',
        'goddess-hover': '0 6px 20px rgba(106, 75, 184, 0.4)',
        'card': '0 10px 30px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 15px 40px rgba(138, 43, 226, 0.15)',
      },
      // Animations
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'slide-down': 'slideDown 0.5s ease-out forwards',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      }
    }
  },
  plugins: [],
}
