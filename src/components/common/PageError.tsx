import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface PageErrorProps {
  message?: string;
  onRetry?: () => void;
}

const PageError: React.FC<PageErrorProps> = ({
  message = 'An error occurred while loading the page.',
  onRetry,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <AlertTriangle size={48} className="mx-auto text-red-500" />
        <p className="font-body text-gray-600">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-black text-white font-body hover:bg-gray-900 transition-colors"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default PageError;