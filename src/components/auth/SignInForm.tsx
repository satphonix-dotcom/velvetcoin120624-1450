import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData } from '../../utils/validation';
import { useAuth } from '../../hooks/useAuth';
import FormField from '../common/FormField';
import ErrorMessage from '../common/ErrorMessage';
import LoadingSpinner from '../common/LoadingSpinner';

interface SignInFormProps {
  onSuccess: () => void;
  onSignUp: () => void;
  onForgotPassword: () => void;
}

const SignInForm: React.FC<SignInFormProps> = ({
  onSuccess,
  onSignUp,
  onForgotPassword,
}) => {
  const { signIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await signIn(data);
      onSuccess();
    } catch (error: any) {
      setError('root', {
        message: error.message || 'An error occurred during sign in',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {errors.root && (
        <ErrorMessage message={errors.root.message} />
      )}

      <FormField
        label="Email"
        type="email"
        id="email"
        error={errors.email?.message}
        {...register('email')}
      />

      <FormField
        label="Password"
        type="password"
        id="password"
        error={errors.password?.message}
        {...register('password')}
      />

      <button
        type="button"
        onClick={onForgotPassword}
        className="font-body text-sm text-gray-600 hover:text-gray-900"
      >
        Forgot your password?
      </button>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-black text-white py-3 font-body hover:bg-gray-900 transition-colors disabled:bg-gray-400 relative"
      >
        {isSubmitting ? (
          <LoadingSpinner className="mx-auto" />
        ) : (
          'Sign In'
        )}
      </button>

      <div className="text-center">
        <p className="font-body text-sm text-gray-600">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={onSignUp}
            className="text-black hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </form>
  );
};

export default SignInForm;