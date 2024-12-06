import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Star } from 'lucide-react';
import { reviewSchema } from '../../utils/validation';
import { useReviews } from '../../hooks/useReviews';
import FormField from '../common/FormField';
import TextArea from '../common/TextArea';
import Button from '../common/Button';
import ErrorMessage from '../common/ErrorMessage';
import type { CreateReviewData } from '../../types/review';

interface ReviewFormProps {
  productId: string;
  onSuccess?: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ productId, onSuccess }) => {
  const { createReview } = useReviews();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<CreateReviewData>({
    resolver: zodResolver(reviewSchema)
  });

  const rating = watch('rating', 0);

  const onSubmit = async (data: CreateReviewData) => {
    try {
      await createReview(productId, data);
      onSuccess?.();
    } catch (error) {
      console.error('Failed to submit review:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Rating Stars */}
      <div className="space-y-2">
        <label className="block font-body text-sm">Rating</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setValue('rating', value)}
              className="p-1 hover:scale-110 transition-transform"
            >
              <Star
                size={24}
                className={value <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
              />
            </button>
          ))}
        </div>
        {errors.rating && (
          <p className="text-sm text-red-600">{errors.rating.message}</p>
        )}
      </div>

      <FormField
        label="Title"
        error={errors.title?.message}
        {...register('title')}
        placeholder="Summarize your experience"
      />

      <TextArea
        label="Review"
        error={errors.content?.message}
        {...register('content')}
        rows={4}
        placeholder="Share your thoughts about the product"
      />

      <Button
        type="submit"
        variant="primary"
        fullWidth
        isLoading={isSubmitting}
      >
        Submit Review
      </Button>
    </form>
  );
};

export default ReviewForm;