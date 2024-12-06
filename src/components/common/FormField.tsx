import React from 'react';

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  id,
  className = '',
  ...props
}) => {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block font-body text-sm">
        {label}
      </label>
      <input
        id={id}
        className={`w-full px-4 py-2 border border-gray-200 rounded-lg font-body 
          focus:ring-0 focus:border-gray-300 ${
          error ? 'border-red-500' : ''
        } ${className}`}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default FormField;