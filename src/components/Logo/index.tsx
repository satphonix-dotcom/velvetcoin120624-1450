import React from 'react';
import LogoIcon from './LogoIcon';
import LogoText from './LogoText';

interface LogoProps {
  className?: string;
  showText?: boolean;
  variant?: 'header' | 'footer';
}

const Logo: React.FC<LogoProps> = ({ className = '', showText = false, variant = 'footer' }) => {
  if (variant === 'header') {
    return <LogoText size="large" className={`${className} text-white`} />;
  }

  return (
    <div className={`flex items-start gap-8 ${className}`}>
      <LogoIcon className="w-20 h-20" />
      {showText && (
        <div className="flex flex-col">
          <LogoText className="text-white" />
          <p className="text-sm font-body text-gray-400 mt-2">
            Exclusivity and luxury<br />
            with cryptocurrency
          </p>
        </div>
      )}
    </div>
  );
};

export default Logo;