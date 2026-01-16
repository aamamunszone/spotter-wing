import React from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

/**
 * Error Boundary to catch React errors and show fallback UI
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Only log errors in development
    if (import.meta.env.DEV) {
      console.error('[ErrorBoundary]', error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            minHeight: '100vh',
            bgcolor: 'background.default',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
          }}
        >
          <Paper
            sx={{
              p: { xs: 4, sm: 6, md: 8 },
              borderRadius: 4,
              maxWidth: 480,
              textAlign: 'center',
              border: 1,
              borderColor: 'divider',
            }}
          >
            <ErrorOutlineIcon
              sx={{
                color: 'error.main',
                mb: 3,
                fontSize: 64,
              }}
            />
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: 'text.primary',
              }}
            >
              Oops! Something went wrong
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                mb: 4,
              }}
            >
              We encountered an unexpected error. Don't worry, your data is
              safe.
            </Typography>
            <Button
              variant="contained"
              onClick={this.handleReset}
              sx={{
                borderRadius: 2,
                fontWeight: 700,
                px: 4,
                py: 1.5,
              }}
            >
              Reload Application
            </Button>
          </Paper>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
