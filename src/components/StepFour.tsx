import React from 'react';
import {useFormContext} from 'react-hook-form';
import {FormData} from '../types/form';
import {plans} from '../data/plans';
import {addOns} from '../data/addOns';

interface StepFourProps {
    onChangePlan: () => void;
    onConfirm: () => void;
}

export const StepFour: React.FC<StepFourProps> = ({onChangePlan}) => {
    const {watch} = useFormContext<FormData>();
    const selectedPlan = watch('selectedPlan');
    const selectedAddOns = watch('addOns') || [];
    const isYearly = watch('isYearly');

    const plan = plans.find(p => p.id === selectedPlan);
    const selectedAddOnItems = addOns.filter(addOn => selectedAddOns.includes(addOn.id));

    const planPrice = plan ? (isYearly ? plan.yearlyPrice : plan.monthlyPrice) : 0;
    const addOnsPrice = selectedAddOnItems.reduce((total, addOn) => {
        return total + (isYearly ? addOn.yearlyPrice : addOn.monthlyPrice);
    }, 0);
    const totalPrice = planPrice + addOnsPrice;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-blue-950 mb-2">
                    Finishing up
                </h1>
                <p className="text-grey-500">
                    Double-check everything looks OK before confirming.
                </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
                <div className="space-y-4">
                    {plan && (
                        <div className="flex items-center justify-between pb-4 border-b border-purple-200">
                            <div>
                                <h3 className="font-bold text-blue-950">
                                    {plan.name} ({isYearly ? 'Yearly' : 'Monthly'})
                                </h3>
                                <button
                                    type="button"
                                    onClick={onChangePlan}
                                    className="text-grey-500 text-sm underline hover:text-purple-600"
                                >
                                    Change
                                </button>
                            </div>
                            <div className="font-bold text-blue-950">
                                ${planPrice}/{isYearly ? 'yr' : 'mo'}
                            </div>
                        </div>
                    )}

                    {selectedAddOnItems.map((addOn) => (
                        <div key={addOn.id} className="flex items-center justify-between">
                            <div className="text-grey-500 text-sm">{addOn.name}</div>
                            <div className="text-blue-950">
                                +${isYearly ? addOn.yearlyPrice : addOn.monthlyPrice}/{isYearly ? 'yr' : 'mo'}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-between px-6">
                <div className="text-grey-500">
                    Total (per {isYearly ? 'year' : 'month'})
                </div>
                <div className="text-xl font-bold text-purple-600">
                    +${totalPrice}/{isYearly ? 'yr' : 'mo'}
                </div>
            </div>
        </div>
    );
};