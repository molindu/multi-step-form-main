import {useState} from 'react';
import {useForm, FormProvider} from 'react-hook-form';
import {FormData} from './types/form';
import {Sidebar} from './components/Sidebar';
import {StepOne} from './components/StepOne';
import {StepTwo} from './components/StepTwo';
import {StepThree} from './components/StepThree';
import {StepFour} from './components/StepFour';
import {ThankYou} from './components/ThankYou';
import {useWindowSize} from './hooks/useWindowSize';

function App() {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const {width} = useWindowSize();
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

    const {handleSubmit, trigger} = methods;

    const nextStep = async () => {
        let isValid = true;

        if (currentStep === 1) {
            isValid = await trigger(['personalInfo.name', 'personalInfo.email', 'personalInfo.phone']);
        } else if (currentStep === 2) {
            isValid = await trigger('selectedPlan');
        } else if (currentStep === 3) {
            // Step 3 doesn't require validation, just move to next step
            isValid = true;
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
            return <ThankYou/>;
        }

        switch (currentStep) {
            case 1:
                return <StepOne/>;
            case 2:
                return <StepTwo/>;
            case 3:
                return <StepThree/>;
            case 4:
                return <StepFour onChangePlan={goToStep2} onConfirm={handleConfirm}/>;
            default:
                return <StepOne/>;
        }
    };

    if (isMobile) {
        return (
            <div className="min-h-screen bg-blue-50 font-ubuntu">
                <Sidebar currentStep={currentStep} isMobile={true}/>

                <div className="px-4 py-8">
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
                                        className="bg-blue-950 text-white px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
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
        <div className="min-h-screen bg-blue-50 font-ubuntu flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-4 shadow-xl max-w-4xl w-full">
                <div className="flex gap-8">
                    <div className="w-1/3">
                        <Sidebar currentStep={currentStep}/>
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
                                                className="bg-blue-950 text-white px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
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