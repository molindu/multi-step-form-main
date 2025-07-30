export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
}

export interface Plan {
  id: string;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  icon: string;
}

export interface AddOn {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  selected: boolean;
}

export interface FormData {
  personalInfo: PersonalInfo;
  selectedPlan: string;
  isYearly: boolean;
  addOns: string[];
}