import { useState, useCallback } from 'react';
import { z } from 'zod';

interface UseFormOptions<T> {
  schema: z.ZodSchema<T>;
  onSubmit: (data: T) => Promise<void>;
}

export function useForm<T>({ schema, onSubmit }: UseFormOptions<T>) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(
    async (data: unknown) => {
      try {
        setIsSubmitting(true);
        setErrors({});

        const validatedData = schema.parse(data);
        await onSubmit(validatedData);
      } catch (error) {
        if (error instanceof z.ZodError) {
          const formattedErrors: Record<string, string> = {};
          error.errors.forEach((err) => {
            if (err.path) {
              formattedErrors[err.path.join('.')] = err.message;
            }
          });
          setErrors(formattedErrors);
        }
        throw error;
      } finally {
        setIsSubmitting(false);
      }
    },
    [schema, onSubmit]
  );

  return {
    errors,
    isSubmitting,
    handleSubmit,
  };
}