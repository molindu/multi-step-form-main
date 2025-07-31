import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { FormData } from './types/form';
import { Sidebar } from './components/Sidebar';
import { StepOne } from './components/StepOne';
import { StepTwo } from './components/StepTwo';
import { StepThree } from './components/StepThree';
import { StepFour } from './components/StepFour';
import { ThankYou } from './components/ThankYou';
import { useWindowSize } from './hooks/useWindowSize';

function App() {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { width } = useWindowSize();
    const isMobile = width < 768;

    const methods = useForm<FormData>({
        defaultValues: {
            personalInfo: {
                name: '',
                email: '',
                phone: ''
            },
            selectedPlan: 'arcade',
            isYearly: false,
            addOns: []
        }
    });

    const { handleSubmit, trigger, watch } = methods;

    const nextStep = async () => {
        let isValid = true;

        if (currentStep === 1) {
            isValid = await trigger(['personalInfo.name', 'personalInfo.email', 'personalInfo.phone']);
        } else if (currentStep === 2) {
            isValid = await trigger('selectedPlan');
        } else if (currentStep === 3) {
            // Step 3 requires at least one add-on to be selected
            const addOns = watch('addOns') || [];
            isValid = addOns.length > 0;

            if (!isValid) {
                // You could add a toast notification or error state here
                console.log('Please select at least one add-on');
            }
        }

        if (isValid && currentStep < 4) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const goToStep2 = () => {
        setCurrentStep(2);
    };

    const onSubmit = (data: FormData) => {
        console.log('Form submitted:', data);
        setIsSubmitted(true);
    };

    const handleConfirm = () => {
        handleSubmit(onSubmit)();
    };

    const renderStep = () => {
        if (isSubmitted) {
            return <ThankYou />;
        }

        switch (currentStep) {
            case 1:
                return <StepOne />;
            case 2:
                return <StepTwo />;
            case 3:
                return <StepThree />;
            case 4:
                return <StepFour onChangePlan={goToStep2} onConfirm={handleConfirm} />;
            default:
                return <StepOne />;
        }
    };

    if (isMobile) {
        return (
            <div className="min-h-screen bg-blue-100 font-ubuntu">
                <Sidebar currentStep={currentStep} isMobile={true} />

                <div className="px-4 py-8 -mt-32">
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <FormProvider {...methods}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                {renderStep()}
                            </form>
                        </FormProvider>
                    </div>

                    {!isSubmitted && (
                        <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg">
                            <div className="flex justify-between items-center max-w-sm mx-auto">
                                {currentStep > 1 && (
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="text-grey-500 hover:text-blue-950 font-medium"
                                    >
                                        Go Back
                                    </button>
                                )}
                                <div className="flex-1"></div>
                                {currentStep < 4 ? (
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                                            currentStep === 3 && (!watch('addOns') || watch('addOns').length === 0)
                                                ? 'bg-grey-500 text-white cursor-not-allowed'
                                                : 'bg-blue-950 text-white hover:bg-opacity-90'
                                        }`}
                                        disabled={currentStep === 3 && (!watch('addOns') || watch('addOns').length === 0)}
                                    >
                                        Next Step
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        onClick={handleConfirm}
                                        className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
                                    >
                                        Confirm
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-blue-100 font-ubuntu flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-4 max-w-4xl w-full">
                <div className="flex gap-8">
                    <div className="w-1/3">
                        <Sidebar currentStep={currentStep} />
                    </div>

                    <div className="flex-1 py-8 pr-8">
                        <FormProvider {...methods}>
                            <div className="h-full flex flex-col">
                                <div className="flex-1">
                                    {renderStep()}
                                </div>

                                {!isSubmitted && (
                                    <div className="flex justify-between items-center mt-8">
                                        {currentStep > 1 ? (
                                            <button
                                                type="button"
                                                onClick={prevStep}
                                                className="text-grey-500 hover:text-blue-950 font-medium"
                                            >
                                                Go Back
                                            </button>
                                        ) : (
                                            <div></div>
                                        )}

                                        {currentStep < 4 ? (
                                            <button
                                                type="button"
                                                onClick={nextStep}
                                                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                                                    currentStep === 3 && (!watch('addOns') || watch('addOns').length === 0)
                                                        ? 'bg-grey-500 text-white cursor-not-allowed'
                                                        : 'bg-blue-950 text-white hover:bg-opacity-90'
                                                }`}
                                                disabled={currentStep === 3 && (!watch('addOns') || watch('addOns').length === 0)}
                                            >
                                                Next Step
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={handleConfirm}
                                                className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
                                            >
                                                Confirm
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </FormProvider>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;