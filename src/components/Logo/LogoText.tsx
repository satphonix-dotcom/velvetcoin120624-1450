import React from 'react';

interface LogoTextProps {
  className?: string;
  size?: 'small' | 'large';
}

const LogoText: React.FC<LogoTextProps> = ({ className = '', size = 'small' }) => {
  const textClasses = size === 'large' 
    ? 'text-[2.5rem] leading-none tracking-[0.2em]'
    : 'text-[1.75rem] leading-none tracking-[0.2em]';

  return (
    <span className={`font-heading font-heading1 ${textClasses} ${className}`}>
      VELVET COIN
    </span>
  );
};

export default LogoText;