import React from 'react';
import { Check } from 'lucide-react';

export const ThankYou: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 space-y-6">
      <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
        <Check className="w-8 h-8 text-white" />
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-blue-950">
        Thank you!
      </h1>
      <p className="text-grey-500 max-w-md">
        Thanks for confirming your subscription! We hope you have fun 
        using our platform. If you ever need support, please feel free 
        to email us at support@loremgaming.com.
      </p>
    </div>
  );
};