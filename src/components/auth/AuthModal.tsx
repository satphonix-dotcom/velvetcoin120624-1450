import React, { useState } from 'react';
import { X } from 'lucide-react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import ResetPasswordForm from './ResetPasswordForm';

type AuthView = 'signIn' | 'signUp' | 'resetPassword';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [view, setView] = useState<AuthView>('signIn');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
        
        <div className="relative bg-white w-full max-w-md rounded-lg p-8">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} strokeWidth={1.5} />
          </button>

          <div className="mb-8">
            <h2 className="font-heading font-heading1 text-2xl tracking-wider mb-2">
              {view === 'signIn' ? 'Sign In' : view === 'signUp' ? 'Create Account' : 'Reset Password'}
            </h2>
            <p className="font-body text-gray-600">
              {view === 'signIn'
                ? 'Welcome back to Velvet Coin'
                : view === 'signUp'
                ? 'Join the luxury cryptocurrency shopping experience'
                : 'Enter your email to reset your password'}
            </p>
          </div>

          {view === 'signIn' && (
            <SignInForm
              onSuccess={onClose}
              onSignUp={() => setView('signUp')}
              onForgotPassword={() => setView('resetPassword')}
            />
          )}

          {view === 'signUp' && (
            <SignUpForm
              onSuccess={onClose}
              onSignIn={() => setView('signIn')}
            />
          )}

          {view === 'resetPassword' && (
            <ResetPasswordForm
              onSuccess={() => setView('signIn')}
              onCancel={() => setView('signIn')}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;