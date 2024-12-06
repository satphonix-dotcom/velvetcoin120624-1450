import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterFormData } from '../../utils/validation';
import { useAuth } from '../../hooks/useAuth';
import FormField from '../common/FormField';
import ErrorMessage from '../common/ErrorMessage';
import LoadingSpinner from '../common/LoadingSpinner';

interface SignUpFormProps {
  onSuccess: () => void;
  onSignIn: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSuccess, onSignIn }) => {
  const { signUp } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await signUp(data);
      onSuccess();
    } catch (error: any) {
      setError('root', {
        message: error.message || 'An error occurred during sign up',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {errors.root && (
        <ErrorMessage message={errors.root.message} />
      )}

      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="First Name"
          type="text"
          id="firstName"
          error={errors.firstName?.message}
          {...register('firstName')}
        />

        <FormField
          label="Last Name"
          type="text"
          id="lastName"
          error={errors.lastName?.message}
          {...register('lastName')}
        />
      </div>

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
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-black text-white py-3 font-body hover:bg-gray-900 transition-colors disabled:bg-gray-400 relative"
      >
        {isSubmitting ? (
          <LoadingSpinner className="mx-auto" />
        ) : (
          'Create Account'
        )}
      </button>

      <div className="text-center">
        <p className="font-body text-sm text-gray-600">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onSignIn}
            className="text-black hover:underline"
          >
            Sign In
          </button>
        </p>
      </div>
    </form>
  );
};

export default SignUpForm;