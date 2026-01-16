import axios from 'axios';
import { logError, isRateLimitError } from '../utils/errorHandler';

// API Credentials from .env.local
const API_KEY = import.meta.env.VITE_AMADEUS_API_KEY;
const API_SECRET = import.meta.env.VITE_AMADEUS_API_SECRET;
const BASE_URL = 'https://test.api.amadeus.com';

// Validate credentials on load
if (!API_KEY || !API_SECRET) {
  console.error(
    'Missing Amadeus API credentials. Please check your .env.local file.',
  );
}

// Token management
let accessToken = '';
let tokenExpiry = 0;

// Configure axios defaults
axios.defaults.timeout = 15000; // 15 second timeout

/**
 * Check if token is expired or about to expire (within 5 minutes)
 */
const isTokenExpired = () => {
  return Date.now() >= tokenExpiry - 5 * 60 * 1000;
};

/**
 * Get or refresh the access token
 */
const getAccessToken = async () => {
  try {
    const response = await axios.post(
      `${BASE_URL}/v1/security/oauth2/token`,
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: API_KEY,
        client_secret: API_SECRET,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    accessToken = response.data.access_token;
    // Token typically expires in 1800 seconds (30 minutes)
    const expiresIn = response.data.expires_in || 1800;
    tokenExpiry = Date.now() + expiresIn * 1000;

    return accessToken;
  } catch (error) {
    logError('Amadeus Authentication', error);
    throw new Error('Failed to authenticate with Amadeus API');
  }
};

/**
 * Retry logic with exponential backoff
 */
const retryWithBackoff = async (fn, maxRetries = 3) => {
  let lastError;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      // Don't retry on client errors (except 401 and 429)
      const status = error.response?.status;
      if (
        status &&
        status >= 400 &&
        status < 500 &&
        status !== 401 &&
        status !== 429
      ) {
        throw error;
      }

      // For rate limits, wait longer
      if (isRateLimitError(error)) {
        const waitTime = Math.pow(2, i) * 2000; // 2s, 4s, 8s
        await new Promise((resolve) => setTimeout(resolve, waitTime));
        continue;
      }

      // For other errors, shorter backoff
      if (i < maxRetries - 1) {
        const waitTime = Math.pow(2, i) * 500; // 0.5s, 1s, 2s
        await new Promise((resolve) => setTimeout(resolve, waitTime));
      }
    }
  }

  throw lastError;
};

/**
 * Main function to search flights
 */
export const searchFlights = async (origin, destination, date) => {
  // Validate inputs
  if (!origin || !destination || !date) {
    throw new Error('Missing required search parameters');
  }

  return retryWithBackoff(async () => {
    // Refresh token if expired
    if (!accessToken || isTokenExpired()) {
      await getAccessToken();
    }

    try {
      const response = await axios.get(
        `${BASE_URL}/v2/shopping/flight-offers`,
        {
          params: {
            originLocationCode: origin,
            destinationLocationCode: destination,
            departureDate: date,
            adults: 1,
            max: 10,
            currencyCode: 'USD',
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      // Validate response structure
      if (!response.data || !Array.isArray(response.data.data)) {
        throw new Error('Invalid response format from API');
      }

      return response.data.data;
    } catch (error) {
      // Handle token expiration
      if (error.response?.status === 401) {
        accessToken = ''; // Clear invalid token
        await getAccessToken();
        // Retry once with new token
        const response = await axios.get(
          `${BASE_URL}/v2/shopping/flight-offers`,
          {
            params: {
              originLocationCode: origin,
              destinationLocationCode: destination,
              departureDate: date,
              adults: 1,
              max: 10,
              currencyCode: 'USD',
            },
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        return response.data.data;
      }

      throw error;
    }
  });
};

/**
 * Search for airports by keyword
 */
export const getAirports = async (keyword) => {
  // Minimum 2 characters required
  if (!keyword || keyword.length < 2) return [];

  try {
    // Refresh token if expired
    if (!accessToken || isTokenExpired()) {
      await getAccessToken();
    }

    const response = await axios.get(
      `${BASE_URL}/v1/reference-data/locations`,
      {
        params: {
          subType: 'AIRPORT,CITY',
          keyword: keyword.toUpperCase(),
          'page[limit]': 5,
        },
        headers: { Authorization: `Bearer ${accessToken}` },
        timeout: 5000, // Shorter timeout for autocomplete
      },
    );

    // Validate response
    if (!response.data || !Array.isArray(response.data.data)) {
      return [];
    }

    return response.data.data.map((item) => ({
      label: `${item.address?.cityName || 'Unknown'} (${item.iataCode})`,
      code: item.iataCode,
    }));
  } catch (error) {
    // Don't throw errors for autocomplete - just return empty array
    logError('Airport Search', error);
    return [];
  }
};
