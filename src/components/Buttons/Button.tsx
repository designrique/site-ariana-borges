import React from 'react';

export interface ButtonProps {
  /**
   * Variante visual do botão
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'urgent' | 'ghost' | 'outline';
  
  /**
   * Tamanho do botão
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  
  /**
   * Estado desabilitado
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Estado carregando com ícone
   * @default false
   */
  isLoading?: boolean;
  
  /**
   * Força a largura total (100%)
   * @default false
   */
  fullWidth?: boolean;
  
  /**
   * Ícone opcional
   */
  icon?: React.ReactNode;
  
  /**
   * Posição do ícone
   * @default 'left'
   */
  iconPosition?: 'left' | 'right';
  
  /**
   * Adiciona animação de pulsação
   * @default false
   */
  pulse?: boolean;
  
  /**
   * Callback ao clicar
   */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  
  /**
   * Texto do botão
   */
  children: React.ReactNode;
  
  /**
   * Tipo HTML do botão
   * @default 'button'
   */
  type?: 'button' | 'submit' | 'reset';
  
  /**
   * Classes CSS customizadas
   */
  className?: string;
}

/**
 * Componente Button - CTA principal de interação
 * 
 * Estilos baseados no design system da Deusa com múltiplas variantes
 * para diferentes contextos de call-to-action.
 * 
 * @component
 * @example
 * // Botão primário
 * <Button onClick={() => {}}>Agende Agora</Button>
 * 
 * @example
 * // Botão urgência com pulsação
 * <Button variant="urgent" pulse>Últimas Vagas!</Button>
 * 
 * @example
 * // Botão secundário com ícone
 * <Button variant="secondary" icon={<CheckIcon />} iconPosition="left">
 *   Confirmar
 * </Button>
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  isLoading = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  pulse = false,
  onClick,
  children,
  type = 'button',
  className = '',
}) => {
  // Base styles
  const baseStyles = 'font-semibold rounded-full transition-all duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';
  
  // Size variants
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  };
  
  // Variant styles
  const variantStyles = {
    primary: 'bg-goddess-purple text-white focus-visible:ring-goddess-purple shadow-goddess hover:bg-goddess-purpleDark hover:shadow-goddess-hover hover:-translate-y-0.5 active:shadow-goddess active:translate-y-0',
    
    secondary: 'bg-transparent text-goddess-purple border-2 border-goddess-purple focus-visible:ring-goddess-purple hover:bg-goddess-purple hover:text-white active:bg-goddess-purpleDark -translate-y-0.5 active:translate-y-0',
    
    tertiary: 'bg-goddess-gold bg-opacity-20 text-goddess-purpleDark border border-goddess-gold focus-visible:ring-goddess-gold hover:bg-opacity-30 hover:shadow-md active:bg-opacity-10',
    
    urgent: 'bg-gradient-to-r from-goddess-earth to-goddess-gold text-brand-dark font-bold focus-visible:ring-goddess-gold shadow-md hover:shadow-lg hover:brightness-105 hover:-translate-y-1 active:translate-y-0',
    
    ghost: 'bg-transparent text-goddess-purple hover:bg-goddess-purple hover:bg-opacity-10 focus-visible:ring-goddess-purple',
    
    outline: 'bg-transparent text-goddess-purple border-2 border-current focus-visible:ring-goddess-purple hover:bg-goddess-purple hover:text-white hover:border-goddess-purple',
  };
  
  // Width
  const widthStyles = fullWidth ? 'w-full' : '';
  
  // Disabled styles
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '';
  
  // Loading pulse
  const loadingStyles = isLoading ? 'animate-pulse-slow' : '';
  
  // Pulse animation
  const pulseStyles = pulse && variant === 'urgent' ? 'animate-pulse' : '';
  
  // Combine all styles
  const combinedStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyles} ${disabledStyles} ${loadingStyles} ${pulseStyles} ${className}`.trim();
  
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={combinedStyles}
    >
      <span className="flex items-center justify-center gap-2">
        {icon && iconPosition === 'left' && (
          <span className="flex-shrink-0">
            {isLoading ? <LoadingSpinner /> : icon}
          </span>
        )}
        
        {children}
        
        {icon && iconPosition === 'right' && (
          <span className="flex-shrink-0">
            {isLoading ? <LoadingSpinner /> : icon}
          </span>
        )}
      </span>
    </button>
  );
};

/**
 * Componente spinner de carregamento
 */
const LoadingSpinner: React.FC = () => (
  <svg
    className="inline-block h-4 w-4 animate-spin"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

export default Button;
