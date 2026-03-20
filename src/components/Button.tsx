interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  href?: string;
  size?: 'default' | 'large';
}

export function Button({ children, onClick, className = '', href, size = 'large' }: ButtonProps) {
  const baseStyles = `
    bg-gradient-to-r from-[#00D9FF] to-[#c10fff]
    text-[#0a0a0a]
    hover:from-[#33E3FF] hover:to-[#d645ff]
    transition-all duration-300
    inline-flex items-center justify-center
    shadow-lg shadow-[#00D9FF]/20 hover:shadow-xl hover:shadow-[#c10fff]/30
    hover:scale-105
  `;
  
  const sizeStyles = size === 'large' 
    ? 'px-10 py-5 text-xl rounded-[50px]' 
    : 'px-6 py-3 text-base rounded-xl';

  const combinedStyles = `${baseStyles} ${sizeStyles} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={combinedStyles}
        style={{
          fontFamily: 'Plus Jakarta Sans',
          fontWeight: 600,
          textDecoration: 'none'
        }}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={combinedStyles}
      style={{
        fontFamily: 'Plus Jakarta Sans',
        fontWeight: 600
      }}
    >
      {children}
    </button>
  );
}