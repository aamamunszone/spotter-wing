/**
 * Centralized error handling utilities
 */

/**
 * Get user-friendly error message based on error type
 * @param {Error} error - The error object
 * @returns {string} User-friendly error message
 */
export const getErrorMessage = (error) => {
  // Network errors
  if (!error.response) {
    return 'Unable to connect. Please check your internet connection.';
  }

  const status = error.response?.status;
  const data = error.response?.data;

  // API-specific errors
  switch (status) {
    case 400:
      return (
        data?.errors?.[0]?.detail ||
        'Invalid search parameters. Please check your inputs.'
      );

    case 401:
      return 'Authentication failed. Please check your API credentials.';

    case 403:
      return 'Access denied. Your API key may not have the required permissions.';

    case 404:
      return 'No flights found for this route. Try different dates or airports.';

    case 429:
      return 'Too many requests. Please wait a moment and try again.';

    case 500:
    case 502:
    case 503:
      return 'Service temporarily unavailable. Please try again in a few moments.';

    default:
      return (
        data?.error_description || 'Something went wrong. Please try again.'
      );
  }
};

/**
 * Log error to console with context (only in development)
 * @param {string} context - Where the error occurred
 * @param {Error} error - The error object
 */
export const logError = (context, error) => {
  if (import.meta.env.DEV) {
    console.error(`[${context}]`, {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
  }
};

/**
 * Check if error is a rate limit error
 * @param {Error} error - The error object
 * @returns {boolean}
 */
export const isRateLimitError = (error) => {
  return error.response?.status === 429;
};

/**
 * Check if error is a network error
 * @param {Error} error - The error object
 * @returns {boolean}
 */
export const isNetworkError = (error) => {
  return !error.response && error.message === 'Network Error';
};
