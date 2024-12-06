import React from 'react';
import GeneralSettings from './GeneralSettings';
import PaymentSettings from './PaymentSettings';
import NotificationSettings from './NotificationSettings';

const Settings = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading font-heading1 text-3xl tracking-wider mb-2">
          Settings
        </h1>
        <p className="font-body text-gray-600">
          Manage your store settings and preferences
        </p>
      </div>

      <div className="space-y-8">
        <GeneralSettings />
        <PaymentSettings />
        <NotificationSettings />
      </div>
    </div>
  );
};

export default Settings;