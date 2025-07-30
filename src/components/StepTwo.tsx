import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormData } from '../types/form';
import { plans } from '../data/plans';

export const StepTwo: React.FC = () => {
  const { register, watch, setValue } = useFormContext<FormData>();
  const selectedPlan = watch('selectedPlan');
  const isYearly = watch('isYearly');

  const handleToggle = () => {
    setValue('isYearly', !isYearly);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-blue-950 mb-2">
          Select your plan
        </h1>
        <p className="text-grey-500">
          You have the option of monthly or yearly billing.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <label
            key={plan.id}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-purple-600 ${
              selectedPlan === plan.id 
                ? 'border-purple-600 bg-blue-50' 
                : 'border-purple-200'
            }`}
          >
            <input
              type="radio"
              value={plan.id}
              className="sr-only"
              {...register('selectedPlan', { required: true })}
            />
            <div className="space-y-3">
              <div className="text-3xl">{plan.icon}</div>
              <div>
                <h3 className="font-bold text-blue-950">{plan.name}</h3>
                <p className="text-grey-500 text-sm">
                  ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}/{isYearly ? 'yr' : 'mo'}
                </p>
                {isYearly && (
                  <p className="text-blue-950 text-sm">2 months free</p>
                )}
              </div>
            </div>
          </label>
        ))}
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-center justify-center space-x-4">
          <span className={`text-sm font-medium ${!isYearly ? 'text-blue-950' : 'text-grey-500'}`}>
            Monthly
          </span>
          <button
            type="button"
            onClick={handleToggle}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              isYearly ? 'bg-blue-950' : 'bg-blue-950'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isYearly ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className={`text-sm font-medium ${isYearly ? 'text-blue-950' : 'text-grey-500'}`}>
            Yearly
          </span>
        </div>
      </div>
    </div>
  );
};