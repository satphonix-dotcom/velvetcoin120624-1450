import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = '', showText = false }) => {
  return (
    <div className={`flex items-center gap-6 ${className}`}>
      <div className="bg-[#1C1C1C] rounded-full w-16 h-16 flex items-center justify-center">
        <span className="text-white font-heading font-heading1 text-3xl tracking-wider">V</span>
      </div>
      {showText && (
        <div className="flex flex-col">
          <h2 className="text-2xl font-heading font-heading1 tracking-[0.2em]">VELVET COIN</h2>
          <p className="text-sm font-body text-gray-400 mt-1">
            Exclusivity and luxury<br />
            with cryptocurrency
          </p>
        </div>
      )}
    </div>
  );
};

export default Logo;