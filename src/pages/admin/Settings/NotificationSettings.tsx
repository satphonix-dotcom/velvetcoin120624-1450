import React from 'react';
import { useForm } from 'react-hook-form';

interface NotificationSettingsData {
  email: {
    newOrders: boolean;
    orderStatus: boolean;
    lowStock: boolean;
    newCustomers: boolean;
    reviews: boolean;
  };
  slack: {
    enabled: boolean;
    webhook: string;
    notifications: {
      newOrders: boolean;
      orderStatus: boolean;
      lowStock: boolean;
    };
  };
}

const NotificationSettings = () => {
  const { register, handleSubmit, watch } = useForm<NotificationSettingsData>({
    defaultValues: {
      email: {
        newOrders: true,
        orderStatus: true,
        lowStock: true,
        newCustomers: false,
        reviews: false,
      },
      slack: {
        enabled: false,
        webhook: '',
        notifications: {
          newOrders: true,
          orderStatus: false,
          lowStock: true,
        },
      },
    },
  });

  const slackEnabled = watch('slack.enabled');

  const onSubmit = (data: NotificationSettingsData) => {
    console.log('Form data:', data);
    // Handle form submission
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h2 className="font-heading font-heading2 text-xl mb-6">Notification Settings</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <h3 className="font-heading font-heading2 text-lg mb-4">Email Notifications</h3>
          <div className="space-y-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register('email.newOrders')}
                className="rounded border-gray-300 text-black focus:ring-0"
              />
              <span className="font-body">New orders</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register('email.orderStatus')}
                className="rounded border-gray-300 text-black focus:ring-0"
              />
              <span className="font-body">Order status changes</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register('email.lowStock')}
                className="rounded border-gray-300 text-black focus:ring-0"
              />
              <span className="font-body">Low stock alerts</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register('email.newCustomers')}
                className="rounded border-gray-300 text-black focus:ring-0"
              />
              <span className="font-body">New customer registrations</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register('email.reviews')}
                className="rounded border-gray-300 text-black focus:ring-0"
              />
              <span className="font-body">New product reviews</span>
            </label>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-heading2 text-lg">Slack Integration</h3>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register('slack.enabled')}
                className="rounded border-gray-300 text-black focus:ring-0"
              />
              <span className="font-body">Enable Slack notifications</span>
            </label>
          </div>

          {slackEnabled && (
            <div className="space-y-4">
              <div>
                <label htmlFor="slackWebhook" className="block font-body text-sm mb-2">
                  Webhook URL
                </label>
                <input
                  type="text"
                  id="slackWebhook"
                  {...register('slack.webhook')}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg font-body focus:ring-0 focus:border-gray-300"
                  placeholder="https://hooks.slack.com/services/..."
                />
              </div>

              <div className="space-y-3">
                <p className="font-body text-sm text-gray-600">Notification Types</p>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    {...register('slack.notifications.newOrders')}
                    className="rounded border-gray-300 text-black focus:ring-0"
                  />
                  <span className="font-body">New orders</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    {...register('slack.notifications.orderStatus')}
                    className="rounded border-gray-300 text-black focus:ring-0"
                  />
                  <span className="font-body">Order status changes</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    {...register('slack.notifications.lowStock')}
                    className="rounded border-gray-300 text-black focus:ring-0"
                  />
                  <span className="font-body">Low stock alerts</span>
                </label>
              </div>
            </div>
          )}
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

export default NotificationSettings;