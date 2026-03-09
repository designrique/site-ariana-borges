import React from 'react';

export interface CardProps {
  /**
   * Variante visual do card
   * @default 'default'
   */
  variant?: 'default' | 'benefit' | 'testimonial' | 'feature' | 'elevated';
  
  /**
   * Tema de cores
   * @default 'light'
   */
  theme?: 'light' | 'dark';
  
  /**
   * Adiciona efeito hover elevado
   * @default true
   */
  elevated?: boolean;
  
  /**
   * Força largura 100%
   * @default false
   */
  fullWidth?: boolean;
  
  /**
   * Ícone decorativo
   */
  icon?: React.ReactNode;
  
  /**
   * Título do card
   */
  title?: string;
  
  /**
   * Subtítulo ou descrição
   */
  subtitle?: string;
  
  /**
   * Conteúdo principal
   */
  children: React.ReactNode;
  
  /**
   * Rodapé do card (geralmente botão)
   */
  footer?: React.ReactNode;
  
  /**
   * Imagem de destaque
   */
  image?: string;
  
  /**
   * Posição da imagem
   * @default 'top'
   */
  imagePosition?: 'top' | 'background';
  
  /**
   * Classes customizadas
   */
  className?: string;
  
  /**
   * Callback ao clicar no card
   */
  onClick?: () => void;
}

/**
 * Componente Card - Contêiner visual para conteúdo
 * 
 * Múltiplas variantes para diferentes contextos:
 * - default: card simples com border
 * - benefit: destaque de benefício com ícone
 * - testimonial: depoimento com styling próprio
 * - feature: feature destaque com imagem
 * - elevated: card flutuante com sombra
 * 
 * @component
 * @example
 * // Card padrão
 * <Card title="Encontro das Deusas">
 *   <p>Reunião transformadora para mulheres</p>
 * </Card>
 * 
 * @example
 * // Card de benefício
 * <Card variant="benefit" title="Conexão" icon={<HeartIcon />}>
 *   Conecte-se com outras mulheres em jornada similiar
 * </Card>
 */
export const Card: React.FC<CardProps> = ({
  variant = 'default',
  theme = 'light',
  elevated = true,
  fullWidth = false,
  icon,
  title,
  subtitle,
  children,
  footer,
  image,
  imagePosition = 'top',
  className = '',
  onClick,
}) => {
  // Base styles
  const baseStyles = 'rounded-lg transition-all duration-300 ease-in-out overflow-hidden';
  
  // Theme styles
  const themeStyles = {
    light: 'bg-white text-goddess-purpleDark',
    dark: 'bg-goddess-purpleDark bg-opacity-10 text-goddess-purpleDark',
  };
  
  // Variant specific styles
  const variantStyles = {
    default: 'border border-goddess-purple border-opacity-20 shadow-md',
    
    benefit: `border-2 border-goddess-gold bg-goddess-gold bg-opacity-5 
              shadow-md hover:shadow-lg hover:-translate-y-1`,
    
    testimonial: `border-l-4 border-goddess-purple bg-gradient-to-r 
                  from-goddess-moonlight to-transparent shadow-sm`,
    
    feature: 'shadow-goddess hover:shadow-goddess-hover',
    
    elevated: `shadow-goddess hover:shadow-goddess-hover 
               hover:-translate-y-2 cursor-pointer`,
  };
  
  // Elevated effect
  const elevatedClass = elevated && variant !== 'elevated' 
    ? 'hover:shadow-lg hover:-translate-y-1' 
    : '';
  
  // Width
  const widthClass = fullWidth ? 'w-full' : '';
  
  // Interactive
  const interactiveClass = onClick ? 'cursor-pointer' : '';
  
  // Combine styles
  const containerClasses = `
    ${baseStyles}
    ${themeStyles[theme]}
    ${variantStyles[variant]}
    ${elevatedClass}
    ${widthClass}
    ${interactiveClass}
    ${className}
  `.trim();
  
  // Padding based on variant
  const paddingClass = variant === 'testimonial' ? 'p-4' : 'p-6';
  
  return (
    <div
      className={containerClasses}
      onClick={onClick}
      role={onClick ? 'button' : 'article'}
      tabIndex={onClick ? 0 : -1}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Background Image */}
      {image && imagePosition === 'background' && (
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )}
      
      {/* Top Image */}
      {image && imagePosition === 'top' && (
        <div className="h-48 -m-6 mb-4 overflow-hidden rounded-t-lg">
          <img
            src={image}
            alt={title || 'Card image'}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      {/* Icon */}
      {icon && (
        <div className="mb-4 text-3xl">
          {icon}
        </div>
      )}
      
      {/* Content */}
      <div className={paddingClass}>
        {/* Title */}
        {title && (
          <h3 className="text-xl font-heading font-bold mb-2 text-goddess-purple">
            {title}
          </h3>
        )}
        
        {/* Subtitle */}
        {subtitle && (
          <p className="text-sm text-goddess-purple text-opacity-70 mb-3">
            {subtitle}
          </p>
        )}
        
        {/* Body */}
        <div className="text-base leading-relaxed mb-4">
          {children}
        </div>
        
        {/* Footer/CTA */}
        {footer && (
          <div className="mt-6 pt-4 border-t border-goddess-purple border-opacity-10">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Coleção de Cards para lista
 */
export interface CardGridProps {
  /**
   * Número de colunas
   * @default 3
   */
  columns?: 1 | 2 | 3 | 4;
  
  /**
   * Gap entre cards
   * @default 'md'
   */
  gap?: 'sm' | 'md' | 'lg';
  
  /**
   * Cards para exibir
   */
  children: React.ReactNode;
  
  /**
   * Classes customizadas
   */
  className?: string;
}

/**
 * Grid responsivo para Cards
 * 
 * @example
 * <CardGrid columns={3} gap="lg">
 *   <Card>...</Card>
 *   <Card>...</Card>
 *   <Card>...</Card>
 * </CardGrid>
 */
export const CardGrid: React.FC<CardGridProps> = ({
  columns = 3,
  gap = 'md',
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
  
  return (
    <div
      className={`grid ${columnClasses[columns]} ${gapClasses[gap]} ${className}`.trim()}
    >
      {children}
    </div>
  );
};

export default Card;
