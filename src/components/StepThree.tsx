import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormData } from '../types/form';
import { addOns } from '../data/addOns';

export const StepThree: React.FC = () => {
  const { register, watch } = useFormContext<FormData>();
  const selectedAddOns = watch('addOns') || [];
  const isYearly = watch('isYearly');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-blue-950 mb-2">
          Pick add-ons
        </h1>
        <p className="text-grey-500">
          Add-ons help enhance your gaming experience.
        </p>
      </div>

      <div className="space-y-4">
        {addOns.map((addOn) => (
          <label
            key={addOn.id}
            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-purple-600 ${
              selectedAddOns.includes(addOn.id)
                ? 'border-purple-600 bg-blue-50'
                : 'border-purple-200'
            }`}
          >
            <input
              type="checkbox"
              value={addOn.id}
              className="w-5 h-5 text-purple-600 border-2 border-purple-200 rounded focus:ring-purple-600"
              {...register('addOns')}
            />
            <div className="ml-4 flex-1">
              <h3 className="font-bold text-blue-950">{addOn.name}</h3>
              <p className="text-grey-500 text-sm">{addOn.description}</p>
            </div>
            <div className="text-purple-600 font-medium">
              +${isYearly ? addOn.yearlyPrice : addOn.monthlyPrice}/{isYearly ? 'yr' : 'mo'}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};