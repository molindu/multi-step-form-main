import React from 'react';

interface SidebarProps {
    currentStep: number;
    isMobile?: boolean;
}

const steps = [
    {number: 1, title: 'YOUR INFO', description: 'Personal info'},
    {number: 2, title: 'SELECT PLAN', description: 'Select your plan'},
    {number: 3, title: 'ADD-ONS', description: 'Pick add-ons'},
    {number: 4, title: 'SUMMARY', description: 'Finishing up'}
];

export const Sidebar: React.FC<SidebarProps> = ({currentStep, isMobile = false}) => {
    if (isMobile) {
        return (
            <div className="bg-gradient-to-r from-blue-300 to-purple-600 p-6 flex justify-center items-start">
                <div className="flex space-x-4">
                    {steps.map((step) => (
                        <div
                            key={step.number}
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 ${
                                currentStep === step.number
                                    ? 'bg-blue-100 text-blue-950 border-blue-100'
                                    : 'text-white border-white'
                            }`}
                        >
                            {step.number}
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        // <div className="bg-gradient-to-b from-purple-600 to-blue-300 p-8 rounded-2xl relative overflow-hidden min-h-[500px]">
        <div
            className="bg-sidebar-desktop bg-cover bg-no-repeat text-base p-8 rounded-2xl relative overflow-hidden min-h-[550px]">
            {/* Decorative circles */}
            {/*<div className="absolute -bottom-20 -left-20 w-40 h-40 bg-orange-300 rounded-full opacity-50"></div>*/}
            {/*<div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-300 rounded-full opacity-50"></div>*/}

            <div className="relative z-10 space-y-8">
                {steps.map((step) => (
                    <div key={step.number} className="flex items-center space-x-4">
                        <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 ${
                                currentStep === step.number
                                    ? 'bg-blue-100 text-blue-950 border-blue-100'
                                    : 'text-white border-white'
                            }`}
                        >
                            {step.number}
                        </div>
                        <div className="text-white hidden md:block">
                            <div className="text-xs text-blue-100 font-normal uppercase tracking-wide">
                                STEP {step.number}
                            </div>
                            <div className="font-medium uppercase tracking-wide text-sm">
                                {step.title}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};