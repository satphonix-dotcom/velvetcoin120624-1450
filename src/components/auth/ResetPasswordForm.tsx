import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';

interface ResetPasswordFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

interface ResetPasswordData {
  email: string;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  onSuccess,
  onCancel,
}) => {
  const { resetPassword } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordData>();

  const onSubmit = async (data: ResetPasswordData) => {
    try {
      await resetPassword(data.email);
      onSuccess();
    } catch (error) {
      console.error('Reset password error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="email" className="block font-body text-sm mb-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register('email', { required: 'Email is required' })}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg font-body focus:ring-0 focus:border-gray-300"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 border border-gray-200 py-3 font-body hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-black text-white py-3 font-body hover:bg-gray-900 transition-colors disabled:bg-gray-400"
        >
          {isSubmitting ? 'Sending...' : 'Reset Password'}
        </button>
      </div>
    </form>
  );
};

export default ResetPasswordForm;