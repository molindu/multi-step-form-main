import { Plan } from '../types/form';

export const plans: Plan[] = [
  {
    id: 'arcade',
    name: 'Arcade',
    monthlyPrice: 9,
    yearlyPrice: 90,
    icon: '🕹️'
  },
  {
    id: 'advanced',
    name: 'Advanced',
    monthlyPrice: 12,
    yearlyPrice: 120,
    icon: '🎮'
  },
  {
    id: 'pro',
    name: 'Pro',
    monthlyPrice: 15,
    yearlyPrice: 150,
    icon: '🎯'
  }
];