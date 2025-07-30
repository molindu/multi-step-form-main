import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormData } from '../types/form';

export const StepOne: React.FC = () => {
  const { register, formState: { errors } } = useFormContext<FormData>();

  return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-blue-950 mb-2">
            Personal info
          </h1>
          <p className="text-grey-500">
            Please provide your name, email address, and phone number.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="name" className="block text-sm font-medium text-blue-950">
                Name
              </label>
            </div>
            <input
                type="text"
                id="name"
                placeholder="e.g. Stephen King"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 ${
                    errors.personalInfo?.name
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-purple-200 focus:border-purple-600'
                }`}
                {...register('personalInfo.name', {
                  required: 'This field is required'
                })}
            />
            {errors.personalInfo?.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.personalInfo.name.message}
                </p>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="email" className="block text-sm font-medium text-blue-950">
                Email Address
              </label>
            </div>
            <input
                type="email"
                id="email"
                placeholder="e.g. stephenking@lorem.com"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 ${
                    errors.personalInfo?.email
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-purple-200 focus:border-purple-600'
                }`}
                {...register('personalInfo.email', {
                  required: 'This field is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
            />
            {errors.personalInfo?.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.personalInfo.email.message}
                </p>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="phone" className="block text-sm font-medium text-blue-950">
                Phone Number
              </label>
            </div>
            <input
                type="tel"
                id="phone"
                placeholder="e.g. +1 234 567 890"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 ${
                    errors.personalInfo?.phone
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-purple-200 focus:border-purple-600'
                }`}
                {...register('personalInfo.phone', {
                  required: 'This field is required',
                  pattern: {
                    value: /^[\+]?[1-9][\d]{0,15}$/,
                    message: 'Please enter a valid phone number'
                  },
                  minLength: {
                    value: 10,
                    message: 'Phone number must be at least 10 digits'
                  },
                  maxLength: {
                    value: 15,
                    message: 'Phone number must not exceed 15 digits'
                  }
                })}
            />
            {errors.personalInfo?.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.personalInfo.phone.message}
                </p>
            )}
          </div>
        </div>
      </div>
  );
};