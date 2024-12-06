import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  message, 
  className = '' 
}) => {
  return (
    <div className={`flex items-center gap-2 p-4 text-red-600 bg-red-50 rounded-lg ${className}`}>
      <AlertCircle size={20} />
      <p className="font-body text-sm">{message}</p>
    </div>
  );
};

export default ErrorMessage;