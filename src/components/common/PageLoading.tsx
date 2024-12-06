import React from 'react';
import LoadingSpinner from './LoadingSpinner';

const PageLoading: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSpinner size={32} />
    </div>
  );
};

export default PageLoading;