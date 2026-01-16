import axios from 'axios';

// API Credentials from .env.local
const API_KEY = import.meta.env.VITE_AMADEUS_API_KEY;
const API_SECRET = import.meta.env.VITE_AMADEUS_API_SECRET;
const BASE_URL = 'https://test.api.amadeus.com';

let accessToken = '';

// Function to get/refresh the access token
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
      }
    );
    accessToken = response.data.access_token;
    return accessToken;
  } catch (error) {
    console.error('Amadeus Auth Error:', error.response?.data || error.message);
    throw error;
  }
};

// Main function to search flights
export const searchFlights = async (origin, destination, date) => {
  try {
    if (!accessToken) await getAccessToken();

    const response = await axios.get(`${BASE_URL}/v2/shopping/flight-offers`, {
      params: {
        originLocationCode: origin,
        destinationLocationCode: destination,
        departureDate: date,
        adults: 1,
        max: 10,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data.data;
  } catch (error) {
    if (error.response?.status === 401) {
      await getAccessToken();
      return searchFlights(origin, destination, date);
    }
    throw error;
  }
};
