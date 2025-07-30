/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'purple-600': 'hsl(243, 100%, 62%)',
                'purple-200': 'hsl(229, 24%, 87%)',
                'blue-950': 'hsl(213, 96%, 18%)',
                'blue-300': 'hsl(228, 100%, 84%)',
                'blue-200': 'hsl(206, 94%, 87%)',
                'blue-100': 'hsl(218, 100%, 97%)',
                'blue-50': 'hsl(231, 100%, 99%)',
                'red-500': 'hsl(354, 84%, 57%)',
                'grey-500': 'hsl(231, 11%, 63%)',
            },
            fontFamily: {
                'ubuntu': ['Ubuntu', 'sans-serif'],
            },
            fontWeight: {
                'normal': '400',
                'medium': '500',
                'bold': '700',
            },
            backgroundImage: {
                'sidebar-desktop': "url('/src/assets/images/bg-sidebar-desktop.svg')",
                'sidebar-mobile': "url('/src/assets/images/bg-sidebar-mobile.svg')",
            }
        },
    },
    plugins: [],
};