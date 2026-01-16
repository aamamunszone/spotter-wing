import { createTheme } from '@mui/material/styles';

/**
 * Create MUI theme with glassmorphic design for light and dark mode
 * @param {string} mode - 'light' or 'dark'
 */
export const getAppTheme = (mode) => {
  return createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            // Light Mode Palette - Soft Pastels
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
              default: '#F0F4FF', // Soft blue-tinted background
              paper: 'rgba(255, 255, 255, 0.6)', // Glass effect
            },
            text: {
              primary: '#0F172A',
              secondary: '#475569',
            },
            divider: 'rgba(148, 163, 184, 0.2)',
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
            // Dark Mode Palette - Deep Navy/Slate
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
              default: '#0A0E1A', // Deep navy background
              paper: 'rgba(15, 23, 42, 0.7)', // Dark glass effect
            },
            text: {
              primary: '#F1F5F9',
              secondary: '#94A3B8',
            },
            divider: 'rgba(148, 163, 184, 0.15)',
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
              boxShadow:
                mode === 'light'
                  ? '0 8px 24px rgba(37, 99, 235, 0.3)'
                  : '0 8px 24px rgba(59, 130, 246, 0.4)',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            backdropFilter: 'blur(15px)',
            WebkitBackdropFilter: 'blur(15px)',
            border:
              mode === 'light'
                ? '1px solid rgba(255, 255, 255, 0.3)'
                : '1px solid rgba(255, 255, 255, 0.1)',
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
              backgroundColor:
                mode === 'light'
                  ? 'rgba(241, 245, 249, 0.6)'
                  : 'rgba(51, 65, 85, 0.6)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border:
                mode === 'light'
                  ? '1px solid rgba(255, 255, 255, 0.3)'
                  : '1px solid rgba(255, 255, 255, 0.1)',
              '&:hover': {
                backgroundColor:
                  mode === 'light'
                    ? 'rgba(226, 232, 240, 0.7)'
                    : 'rgba(71, 85, 105, 0.7)',
              },
              '&.Mui-focused': {
                backgroundColor:
                  mode === 'light'
                    ? 'rgba(226, 232, 240, 0.8)'
                    : 'rgba(71, 85, 105, 0.8)',
                border:
                  mode === 'light'
                    ? '1px solid rgba(37, 99, 235, 0.5)'
                    : '1px solid rgba(59, 130, 246, 0.5)',
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

/**
 * Get mesh gradient background based on theme mode
 */
export const getMeshGradient = (mode) => {
  if (mode === 'light') {
    return `
      radial-gradient(at 0% 0%, rgba(147, 197, 253, 0.3) 0px, transparent 50%),
      radial-gradient(at 100% 0%, rgba(196, 181, 253, 0.3) 0px, transparent 50%),
      radial-gradient(at 100% 100%, rgba(252, 211, 77, 0.2) 0px, transparent 50%),
      radial-gradient(at 0% 100%, rgba(167, 243, 208, 0.3) 0px, transparent 50%)
    `;
  } else {
    return `
      radial-gradient(at 0% 0%, rgba(37, 99, 235, 0.2) 0px, transparent 50%),
      radial-gradient(at 100% 0%, rgba(139, 92, 246, 0.2) 0px, transparent 50%),
      radial-gradient(at 100% 100%, rgba(59, 130, 246, 0.15) 0px, transparent 50%),
      radial-gradient(at 0% 100%, rgba(16, 185, 129, 0.15) 0px, transparent 50%)
    `;
  }
};
