interface MultiLineButtonProps {
  title: string;
  subtitle?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  animated?: boolean;
}

export function MultiLineButton({ 
  title, 
  subtitle, 
  href, 
  onClick, 
  className = '',
  animated = true 
}: MultiLineButtonProps) {
  const buttonStyles = `
    inline-flex flex-col items-center justify-center
    bg-gradient-to-r from-[#00D9FF] to-[#c10fff]
    text-[#0a0a0a]
    hover:from-[#33E3FF] hover:to-[#d645ff]
    px-10 py-6 rounded-[50px]
    transition-all duration-300
    shadow-xl shadow-[#00D9FF]/30 hover:shadow-2xl hover:shadow-[#c10fff]/40
    hover:scale-105
    ${animated ? 'animate-pulse hover:animate-none' : ''}
    ${className}
  `;

  const content = (
    <>
      <span 
        className="text-xl md:text-2xl text-center"
        style={{ 
          fontFamily: 'Plus Jakarta Sans', 
          fontWeight: 600,
          lineHeight: 1.2
        }}
      >
        {title}
      </span>
      {subtitle && (
        <span 
          className="text-sm md:text-base mt-2 opacity-90 text-center"
          style={{ 
            fontFamily: 'Inter', 
            fontWeight: 400 
          }}
        >
          {subtitle}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a 
        href={href} 
        className={buttonStyles}
        style={{ textDecoration: 'none' }}
      >
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={buttonStyles}>
      {content}
    </button>
  );
}