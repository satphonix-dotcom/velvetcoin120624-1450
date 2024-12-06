import React from 'react';
import { Heart } from 'lucide-react';
import { useWishlist } from '../../hooks/useWishlist';
import { useAuth } from '../../hooks/useAuth';
import Button from '../common/Button';

interface WishlistButtonProps {
  productId: string;
  className?: string;
}

const WishlistButton: React.FC<WishlistButtonProps> = ({ 
  productId, 
  className = '' 
}) => {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();

  const isInWishlist = wishlist?.products.some(
    item => item.product.id === productId
  );

  const handleClick = async () => {
    if (!isAuthenticated) {
      // Handle authentication required
      return;
    }

    try {
      if (isInWishlist) {
        await removeFromWishlist(productId);
      } else {
        await addToWishlist(productId);
      }
    } catch (error) {
      console.error('Wishlist operation failed:', error);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleClick}
      className={className}
      icon={
        <Heart
          size={20}
          className={isInWishlist ? 'fill-current' : ''}
        />
      }
    >
      {isInWishlist ? 'Saved' : 'Save'}
    </Button>
  );
};

export default WishlistButton;