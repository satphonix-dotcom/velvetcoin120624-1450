import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 24, 
  className = '' 
}) => {
  return (
    <div className="flex items-center justify-center p-4">
      <Loader2 
        size={size} 
        className={`animate-spin ${className}`}
      />
    </div>
  );
};

export default LoadingSpinner;