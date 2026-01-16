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
    console.error('Error Boundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
          <Paper className="p-8 rounded-3xl max-w-md text-center">
            <ErrorOutlineIcon
              className="text-red-500 mb-4"
              sx={{ fontSize: 64 }}
            />
            <Typography variant="h5" className="font-bold mb-2">
              Oops! Something went wrong
            </Typography>
            <Typography variant="body2" className="text-neutral-500 mb-6">
              We encountered an unexpected error. Don't worry, your data is
              safe.
            </Typography>
            <Button
              variant="contained"
              onClick={this.handleReset}
              className="bg-blue-600 rounded-lg normal-case font-bold"
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
