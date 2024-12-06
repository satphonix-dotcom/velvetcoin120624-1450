import React from 'react';

interface LogoIconProps {
  className?: string;
}

const LogoIcon: React.FC<LogoIconProps> = ({ className = '' }) => {
  return (
    <div className={`bg-[#F5F5F5] rounded-full flex items-center justify-center ${className}`}>
      <span className="text-[#1C1C1C] font-heading font-heading1 text-[2em] tracking-[0.1em] transform translate-y-[2px]">V</span>
    </div>
  );
};

export default LogoIcon;