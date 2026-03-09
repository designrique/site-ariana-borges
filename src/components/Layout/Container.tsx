import React from 'react';

export interface ContainerProps {
  /**
   * Tipo de container
   * @default 'content'
   */
  type?: 'hero' | 'content' | 'full' | 'narrow';
  
  /**
   * Padding vertical
   * @default 'section'
   */
  verticalPadding?: 'tight' | 'normal' | 'section' | 'hero';
  
  /**
   * Background color
   * @default 'white'
   */
  background?: 'white' | 'light' | 'gradient' | 'transparent';
  
  /**
   * Adiciona decoração visual
   * @default false
   */
  withDecoration?: boolean;
  
  /**
   * Tipo de decoração
   */
  decorationType?: 'top' | 'bottom' | 'both' | 'corner';
  
  /**
   * Cor de decoração
   */
  decorationColor?: 'goddess-purple' | 'goddess-gold' | 'goddess-sunset';
  
  /**
   * Força largura 100%
   * @default false
   */
  fullWidth?: boolean;
  
  /**
   * ID para âncora
   */
  id?: string;
  
  /**
   * Classes customizadas
   */
  className?: string;
  
  /**
   * Conteúdo
   */
  children: React.ReactNode;
}

/**
 * Componente Container - Wrapper para seções com layout e decorações
 * 
 * Variantes:
 * - hero: Tela cheia otimizada para Hero section
 * - content: Conteúdo centrado com max-width
 * - full: Largura total com padding horizontal
 * - narrow: Conteúdo restrito para leitura
 * 
 * @component
 * @example
 * <Container type="hero" background="gradient">
 *   <h1>Instituto Ariana Borges</h1>
 * </Container>
 */
export const Container: React.FC<ContainerProps> = ({
  type = 'content',
  verticalPadding = 'section',
  background = 'white',
  withDecoration = false,
  decorationType = 'bottom',
  decorationColor = 'goddess-purple',
  fullWidth = false,
  id,
  className = '',
  children,
}) => {
  // Vertical padding (applies to the outer section — always full-width)
  const verticalPaddingStyles = {
    tight: 'py-4 sm:py-6',
    normal: 'py-8 sm:py-12',
    section: 'py-12 sm:py-16 lg:py-20',
    hero: 'py-20 sm:py-32 lg:py-40',
  };

  // Background styles (always full-width)
  const backgroundStyles = {
    white: 'bg-white',
    light: 'bg-gradient-to-b from-goddess-moonlight to-white',
    gradient: `bg-gradient-to-br from-brand-dark from-10%
               via-goddess-purpleDark via-50% to-goddess-purple to-90%`,
    transparent: 'bg-transparent',
  };

  // Text color based on background
  const textColorClass = background === 'gradient' ? 'text-white' : 'text-goddess-purpleDark';

  // Inner content wrapper — controls max-width and centering
  const innerStyles = {
    hero: 'min-h-screen flex items-center justify-center w-full',
    content: 'mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl',
    full: 'px-4 sm:px-6 lg:px-8',
    narrow: 'mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl',
  };

  // Outer section always spans full width
  const sectionClasses = `
    relative w-full transition-colors duration-300 ease-in-out
    ${verticalPaddingStyles[verticalPadding]}
    ${backgroundStyles[background]}
    ${textColorClass}
    ${className}
  `.trim();

  return (
    <section
      id={id}
      className={sectionClasses}
    >
      {/* Top Decoration */}
      {withDecoration && (decorationType === 'top' || decorationType === 'both') && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-goddess-purple to-transparent opacity-30" />
      )}

      {/* Corner Decoration (Top Right) */}
      {withDecoration && decorationType === 'corner' && (
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-5" />
      )}

      {/* Content — inner wrapper controls max-width */}
      <div className={`relative z-10 ${innerStyles[type]}`}>
        {children}
      </div>

      {/* Bottom Decoration */}
      {withDecoration && (decorationType === 'bottom' || decorationType === 'both') && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-goddess-gold to-transparent opacity-30" />
      )}

      {/* Corner Decoration (Bottom Left) */}
      {withDecoration && decorationType === 'corner' && (
        <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full opacity-5" />
      )}
    </section>
  );
};

export interface RowProps {
  /**
   * Número de colunas
   * @default 2
   */
  columns?: 1 | 2 | 3 | 4;
  
  /**
   * Gap entre colunas
   * @default 'md'
   */
  gap?: 'sm' | 'md' | 'lg';
  
  /**
   * Alinhamento vertical
   * @default 'center'
   */
  verticalAlign?: 'start' | 'center' | 'end';
  
  /**
   * Conteúdo
   */
  children: React.ReactNode;
  
  /**
   * Classes customizadas
   */
  className?: string;
}

/**
 * Layout em Row para usar dentro de Container
 * 
 * @example
 * <Container>
 *   <Row columns={2} gap="lg">
 *     <div>Coluna 1</div>
 *     <div>Coluna 2</div>
 *   </Row>
 * </Container>
 */
export const Row: React.FC<RowProps> = ({
  columns = 2,
  gap = 'md',
  verticalAlign = 'center',
  children,
  className = '',
}) => {
  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };
  
  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
  };
  
  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
  };
  
  return (
    <div
      className={`
        grid
        ${columnClasses[columns]}
        ${gapClasses[gap]}
        ${alignClasses[verticalAlign]}
        ${className}
      `.trim()}
    >
      {children}
    </div>
  );
};

export interface ColProps {
  /**
   * Largura da coluna (1-12 no grid de 12 colunas)
   */
  span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  
  /**
   * Alinhamento de conteúdo
   * @default 'start'
   */
  align?: 'start' | 'center' | 'end';
  
  /**
   * Classes customizadas
   */
  className?: string;
  
  /**
   * Conteúdo
   */
  children: React.ReactNode;
}

/**
 * Coluna individual para use flexible
 * 
 * @example
 * <Row>
 *   <Col span={4}>Sidebar</Col>
 *   <Col span={8}>Main</Col>
 * </Row>
 */
export const Col: React.FC<ColProps> = ({
  span = 6,
  align = 'start',
  className = '',
  children,
}) => {
  const spanClasses = {
    1: 'col-span-1',
    2: 'col-span-2',
    3: 'col-span-3',
    4: 'col-span-4',
    5: 'col-span-5',
    6: 'col-span-6',
    7: 'col-span-7',
    8: 'col-span-8',
    9: 'col-span-9',
    10: 'col-span-10',
    11: 'col-span-11',
    12: 'col-span-12',
  };
  
  const alignClasses = {
    start: 'text-left',
    center: 'text-center',
    end: 'text-right',
  };
  
  return (
    <div
      className={`
        ${spanClasses[span]}
        ${alignClasses[align]}
        ${className}
      `.trim()}
    >
      {children}
    </div>
  );
};

export interface SectionHeaderProps {
  /**
   * Título da seção
   */
  title: string;
  
  /**
   * Subtítulo/descrição
   */
  subtitle?: string;
  
  /**
   * Ícone
   */
  icon?: React.ReactNode;
  
  /**
   * Alinhamento
   * @default 'center'
   */
  align?: 'left' | 'center' | 'right';
  
  /**
   * Tamanho
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Header padrão para seções
 * 
 * @example
 * <Container>
 *   <SectionHeader
 *     title="Benefícios"
 *     subtitle="Conheça os benefícios dos encontros"
 *     icon={<HeartIcon />}
 *   />
 *   <CardGrid>...</CardGrid>
 * </Container>
 */
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  icon,
  align = 'center',
  size = 'md',
}) => {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };
  
  const sizeClasses = {
    sm: {
      title: 'text-2xl sm:text-3xl',
      subtitle: 'text-base',
      gap: 'mb-2',
    },
    md: {
      title: 'text-3xl sm:text-4xl',
      subtitle: 'text-lg',
      gap: 'mb-4',
    },
    lg: {
      title: 'text-4xl sm:text-5xl',
      subtitle: 'text-xl',
      gap: 'mb-6',
    },
  };
  
  return (
    <div className={`mb-12 ${alignClasses[align]}`}>
      {icon && (
        <div className="text-4xl sm:text-5xl mb-4 inline-block">
          {icon}
        </div>
      )}
      
      <h2 className={`
        font-heading font-bold text-goddess-purple
        ${sizeClasses[size].title}
        ${sizeClasses[size].gap}
      `}>
        {title}
      </h2>
      
      {subtitle && (
        <p className={`
          text-goddess-purple text-opacity-70
          ${sizeClasses[size].subtitle}
        `}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default Container;
