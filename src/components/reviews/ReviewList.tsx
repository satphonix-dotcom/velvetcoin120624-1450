import React from 'react';
import { Star, ThumbsUp, Flag } from 'lucide-react';
import { useReviews } from '../../hooks/useReviews';
import { formatDistanceToNow } from 'date-fns';
import Button from '../common/Button';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';
import type { Review } from '../../types/review';

interface ReviewListProps {
  productId: string;
}

const ReviewList: React.FC<ReviewListProps> = ({ productId }) => {
  const {
    reviews,
    isLoading,
    error,
    markHelpful,
    reportReview,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useReviews(productId);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!reviews?.length) {
    return (
      <div className="text-center py-8">
        <p className="font-body text-gray-500">No reviews yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {reviews.map((review) => (
        <ReviewItem
          key={review.id}
          review={review}
          onMarkHelpful={markHelpful}
          onReport={reportReview}
        />
      ))}

      {hasNextPage && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => fetchNextPage()}
            isLoading={isFetchingNextPage}
          >
            Load More Reviews
          </Button>
        </div>
      )}
    </div>
  );
};

interface ReviewItemProps {
  review: Review;
  onMarkHelpful: (reviewId: string) => Promise<void>;
  onReport: (reviewId: string, reason: string) => Promise<void>;
}

const ReviewItem: React.FC<ReviewItemProps> = ({
  review,
  onMarkHelpful,
  onReport
}) => {
  return (
    <div className="border-b border-gray-200 pb-8">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                />
              ))}
            </div>
            <h3 className="font-heading font-heading2 text-lg">{review.title}</h3>
          </div>
          <p className="font-body text-sm text-gray-500">
            By {review.user.firstName} {review.user.lastName} •{' '}
            {formatDistanceToNow(new Date(review.createdAt))} ago
            {review.verifiedPurchase && (
              <span className="ml-2 text-green-600">Verified Purchase</span>
            )}
          </p>
        </div>
      </div>

      <p className="font-body text-gray-600 mb-4">{review.content}</p>

      {review.images?.length > 0 && (
        <div className="flex gap-4 mb-4">
          {review.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Review image ${index + 1}`}
              className="w-20 h-20 object-cover rounded-lg"
            />
          ))}
        </div>
      )}

      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onMarkHelpful(review.id)}
          icon={<ThumbsUp size={16} />}
        >
          Helpful ({review.helpful.length})
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const reason = prompt('Why are you reporting this review?');
            if (reason) {
              onReport(review.id, reason);
            }
          }}
          icon={<Flag size={16} />}
        >
          Report
        </Button>
      </div>
    </div>
  );
};

export default ReviewList;