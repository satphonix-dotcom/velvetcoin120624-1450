import React, { useState } from 'react';
import { Wallet, Bitcoin, AlertCircle } from 'lucide-react';
import { useCryptoPayment } from '../../hooks/useCryptoPayment';
import Button from '../common/Button';
import Card from '../common/Card';
import ErrorMessage from '../common/ErrorMessage';
import { cryptoService } from '../../services/crypto';
import type { Order } from '../../types/order';

interface CryptoPaymentProps {
  order: Order;
  onSuccess: () => void;
  onCancel: () => void;
}

const CryptoPayment: React.FC<CryptoPaymentProps> = ({
  order,
  onSuccess,
  onCancel,
}) => {
  const [error, setError] = useState<string | null>(null);
  const {
    processPayment,
    paymentStatus,
    isConfirming,
    balance,
    isConnected,
  } = useCryptoPayment();

  const handlePayment = async () => {
    try {
      setError(null);
      await processPayment(order);
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Payment failed');
    }
  };

  const hasInsufficientBalance = balance && order.total.eth > Number(balance.formatted);

  return (
    <Card className="max-w-md mx-auto">
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="font-heading font-heading1 text-xl mb-2">
            Complete Your Payment
          </h3>
          <p className="font-body text-gray-600">
            Pay with your preferred cryptocurrency
          </p>
        </div>

        {error && (
          <ErrorMessage message={error} />
        )}

        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <span className="font-body text-gray-600">Amount Due</span>
            <div className="text-right">
              <p className="font-heading font-heading1 text-xl">
                ${order.total.usd.toLocaleString()}
              </p>
              <p className="font-body text-sm text-gray-500">
                {cryptoService.formatEthPrice(order.total.eth)} ETH
              </p>
            </div>
          </div>

          {isConnected && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="font-body text-sm text-gray-600 mb-1">
                Wallet Balance
              </p>
              <p className="font-body font-semibold">
                {balance?.formatted} {balance?.symbol}
              </p>
              {hasInsufficientBalance && (
                <div className="flex items-center gap-2 mt-2 text-red-600">
                  <AlertCircle size={16} />
                  <p className="text-sm">Insufficient balance</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="space-y-3">
          <Button
            fullWidth
            variant="primary"
            size="lg"
            icon={<Wallet size={20} />}
            onClick={handlePayment}
            isLoading={paymentStatus === 'processing' || isConfirming}
            disabled={!isConnected || hasInsufficientBalance}
          >
            {!isConnected
              ? 'Connect Wallet'
              : isConfirming
              ? 'Confirming Transaction...'
              : 'Pay with ETH'}
          </Button>

          <Button
            fullWidth
            variant="outline"
            size="lg"
            icon={<Bitcoin size={20} />}
            disabled
          >
            Pay with BTC (Coming Soon)
          </Button>

          <Button
            fullWidth
            variant="secondary"
            onClick={onCancel}
            disabled={paymentStatus === 'processing' || isConfirming}
          >
            Cancel Payment
          </Button>
        </div>

        <p className="text-center font-body text-sm text-gray-500">
          Payments are processed securely using smart contracts.
          Transaction fees apply.
        </p>
      </div>
    </Card>
  );
};

export default CryptoPayment;