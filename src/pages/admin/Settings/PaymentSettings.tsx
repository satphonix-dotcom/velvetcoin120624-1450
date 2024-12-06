import React from 'react';
import { useForm } from 'react-hook-form';

interface PaymentSettingsData {
  acceptedCurrencies: {
    btc: boolean;
    eth: boolean;
  };
  wallets: {
    btc: string;
    eth: string;
  };
  minimumOrder: number;
  processingFee: number;
}

const PaymentSettings = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentSettingsData>({
    defaultValues: {
      acceptedCurrencies: {
        btc: true,
        eth: true,
      },
      wallets: {
        btc: 'bc1qxy...zw9p',
        eth: '0x1234...5678',
      },
      minimumOrder: 100,
      processingFee: 2.5,
    },
  });

  const onSubmit = (data: PaymentSettingsData) => {
    console.log('Form data:', data);
    // Handle form submission
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h2 className="font-heading font-heading2 text-xl mb-6">Payment Settings</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <h3 className="font-heading font-heading2 text-lg mb-4">
            Accepted Cryptocurrencies
          </h3>
          <div className="space-y-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register('acceptedCurrencies.btc')}
                className="rounded border-gray-300 text-black focus:ring-0"
              />
              <span className="font-body">Bitcoin (BTC)</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register('acceptedCurrencies.eth')}
                className="rounded border-gray-300 text-black focus:ring-0"
              />
              <span className="font-body">Ethereum (ETH)</span>
            </label>
          </div>
        </div>

        <div>
          <h3 className="font-heading font-heading2 text-lg mb-4">Wallet Addresses</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="btcWallet" className="block font-body text-sm mb-2">
                Bitcoin Wallet
              </label>
              <input
                type="text"
                id="btcWallet"
                {...register('wallets.btc', { required: 'BTC wallet is required' })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg font-body focus:ring-0 focus:border-gray-300"
              />
              {errors.wallets?.btc && (
                <p className="mt-1 text-sm text-red-600">{errors.wallets.btc.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="ethWallet" className="block font-body text-sm mb-2">
                Ethereum Wallet
              </label>
              <input
                type="text"
                id="ethWallet"
                {...register('wallets.eth', { required: 'ETH wallet is required' })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg font-body focus:ring-0 focus:border-gray-300"
              />
              {errors.wallets?.eth && (
                <p className="mt-1 text-sm text-red-600">{errors.wallets.eth.message}</p>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="minimumOrder" className="block font-body text-sm mb-2">
              Minimum Order Amount (USD)
            </label>
            <input
              type="number"
              id="minimumOrder"
              {...register('minimumOrder', {
                required: 'Minimum order amount is required',
                min: { value: 0, message: 'Must be positive' },
              })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg font-body focus:ring-0 focus:border-gray-300"
            />
            {errors.minimumOrder && (
              <p className="mt-1 text-sm text-red-600">{errors.minimumOrder.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="processingFee" className="block font-body text-sm mb-2">
              Processing Fee (%)
            </label>
            <input
              type="number"
              id="processingFee"
              step="0.1"
              {...register('processingFee', {
                required: 'Processing fee is required',
                min: { value: 0, message: 'Must be positive' },
              })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg font-body focus:ring-0 focus:border-gray-300"
            />
            {errors.processingFee && (
              <p className="mt-1 text-sm text-red-600">{errors.processingFee.message}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-black text-white font-body hover:bg-gray-900 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentSettings;