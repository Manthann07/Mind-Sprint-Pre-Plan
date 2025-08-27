import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		primary: {
			main: '#1E3A8A',
			light: '#3B82F6',
			dark: '#1E40AF',
			contrastText: '#FFFFFF',
		},
		secondary: {
			main: '#0D9488',
			light: '#14B8A6',
			dark: '#0F766E',
			contrastText: '#FFFFFF',
		},
		accent: {
			main: '#F97316',
			light: '#FB923C',
			dark: '#EA580C',
			contrastText: '#FFFFFF',
		},
		success: {
			main: '#059669',
			light: '#10B981',
			dark: '#047857',
		},
		warning: {
			main: '#D97706',
			light: '#F59E0B',
			dark: '#B45309',
		},
		error: {
			main: '#DC2626',
			light: '#EF4444',
			dark: '#B91C1C',
		},
		background: {
			default: '#F8FAFC',
			paper: '#FFFFFF',
		},
		text: {
			primary: '#1E293B',
			secondary: '#64748B',
		},
	},
	typography: {
		fontFamily: 'Inter, Roboto, Helvetica, Arial, sans-serif',
		h1: {
			fontWeight: 700,
			fontSize: '2.5rem',
		},
		h2: {
			fontWeight: 600,
			fontSize: '2rem',
		},
		h3: {
			fontWeight: 600,
			fontSize: '1.75rem',
		},
		h4: {
			fontWeight: 600,
			fontSize: '1.5rem',
		},
		h5: {
			fontWeight: 500,
			fontSize: '1.25rem',
		},
		h6: {
			fontWeight: 500,
			fontSize: '1.125rem',
		},
	},
	shape: {
		borderRadius: 12,
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: 'none',
					borderRadius: 8,
					fontWeight: 500,
				},
				contained: {
					boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					boxShadow:
						'0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
					borderRadius: 12,
				},
			},
		},
	},
});

export default theme;