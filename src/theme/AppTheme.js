import { createTheme } from '@mui/material/styles';

/**
 * Create MUI theme with light and dark mode support
 * @param {string} mode - 'light' or 'dark'
 */
export const getAppTheme = (mode) => {
  return createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            // Light Mode Palette
            primary: {
              main: '#2563EB',
              light: '#60A5FA',
              dark: '#1E40AF',
              contrastText: '#FFFFFF',
            },
            secondary: {
              main: '#8B5CF6',
              light: '#A78BFA',
              dark: '#7C3AED',
              contrastText: '#FFFFFF',
            },
            background: {
              default: '#F8FAFC',
              paper: '#FFFFFF',
            },
            text: {
              primary: '#0F172A',
              secondary: '#64748B',
            },
            divider: '#E2E8F0',
            success: {
              main: '#10B981',
              light: '#34D399',
              dark: '#059669',
            },
            error: {
              main: '#EF4444',
              light: '#F87171',
              dark: '#DC2626',
            },
            warning: {
              main: '#F59E0B',
              light: '#FBBF24',
              dark: '#D97706',
            },
            info: {
              main: '#3B82F6',
              light: '#60A5FA',
              dark: '#2563EB',
            },
          }
        : {
            // Dark Mode Palette
            primary: {
              main: '#3B82F6',
              light: '#60A5FA',
              dark: '#2563EB',
              contrastText: '#FFFFFF',
            },
            secondary: {
              main: '#A78BFA',
              light: '#C4B5FD',
              dark: '#8B5CF6',
              contrastText: '#FFFFFF',
            },
            background: {
              default: '#0F172A',
              paper: '#1E293B',
            },
            text: {
              primary: '#F1F5F9',
              secondary: '#94A3B8',
            },
            divider: '#334155',
            success: {
              main: '#10B981',
              light: '#34D399',
              dark: '#059669',
            },
            error: {
              main: '#EF4444',
              light: '#F87171',
              dark: '#DC2626',
            },
            warning: {
              main: '#F59E0B',
              light: '#FBBF24',
              dark: '#D97706',
            },
            info: {
              main: '#3B82F6',
              light: '#60A5FA',
              dark: '#2563EB',
            },
          }),
    },
    typography: {
      fontFamily:
        '"Inter", "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      h1: {
        fontWeight: 800,
        letterSpacing: '-0.02em',
      },
      h2: {
        fontWeight: 800,
        letterSpacing: '-0.02em',
      },
      h3: {
        fontWeight: 700,
        letterSpacing: '-0.01em',
      },
      h4: {
        fontWeight: 700,
        letterSpacing: '-0.01em',
      },
      h5: {
        fontWeight: 700,
      },
      h6: {
        fontWeight: 700,
      },
      button: {
        fontWeight: 600,
        textTransform: 'none',
      },
    },
    shape: {
      borderRadius: 16,
    },
    shadows: [
      'none',
      mode === 'light'
        ? '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'
        : '0 1px 3px 0 rgb(0 0 0 / 0.5), 0 1px 2px -1px rgb(0 0 0 / 0.5)',
      mode === 'light'
        ? '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
        : '0 4px 6px -1px rgb(0 0 0 / 0.5), 0 2px 4px -2px rgb(0 0 0 / 0.5)',
      mode === 'light'
        ? '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
        : '0 10px 15px -3px rgb(0 0 0 / 0.5), 0 4px 6px -4px rgb(0 0 0 / 0.5)',
      mode === 'light'
        ? '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
        : '0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.5)',
      ...Array(20).fill(
        mode === 'light'
          ? '0 25px 50px -12px rgb(0 0 0 / 0.25)'
          : '0 25px 50px -12px rgb(0 0 0 / 0.6)',
      ),
    ],
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            padding: '10px 24px',
            fontSize: '0.95rem',
            fontWeight: 600,
          },
          contained: {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
          outlined: {
            borderWidth: 1,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiFilledInput-root': {
              borderRadius: 12,
              backgroundColor: mode === 'light' ? '#F1F5F9' : '#334155',
              '&:hover': {
                backgroundColor: mode === 'light' ? '#E2E8F0' : '#475569',
              },
              '&.Mui-focused': {
                backgroundColor: mode === 'light' ? '#E2E8F0' : '#475569',
              },
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            fontWeight: 500,
          },
        },
      },
      MuiSlider: {
        styleOverrides: {
          root: {
            '& .MuiSlider-thumb': {
              width: 20,
              height: 20,
            },
          },
        },
      },
    },
  });
};
