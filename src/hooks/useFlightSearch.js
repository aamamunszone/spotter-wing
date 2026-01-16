import { useState, useMemo, useCallback } from 'react';
import { searchFlights } from '../api/amadeus';
import { getErrorMessage, logError } from '../utils/errorHandler';

/**
 * Custom hook to manage flight search state and logic
 */
export const useFlightSearch = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [sortBy, setSortBy] = useState('price');

  // Process flights with filtering and sorting
  const processedFlights = useMemo(() => {
    if (!flights.length) return [];

    // Filter by price
    let result = flights.filter((flight) => {
      const price = parseFloat(flight.price.total);
      return !isNaN(price) && price <= maxPrice;
    });

    // Sort by selected criteria
    if (sortBy === 'price') {
      result.sort((a, b) => {
        const priceA = parseFloat(a.price.total);
        const priceB = parseFloat(b.price.total);
        return priceA - priceB;
      });
    } else if (sortBy === 'duration') {
      result.sort((a, b) => {
        const durationA = a.itineraries?.[0]?.duration || '';
        const durationB = b.itineraries?.[0]?.duration || '';
        return durationA.localeCompare(durationB);
      });
    }

    return result;
  }, [flights, maxPrice, sortBy]);

  // Calculate max price from results
  const calculateMaxPrice = useCallback((flightData) => {
    if (!flightData.length) return 5000;

    const prices = flightData
      .map((f) => parseFloat(f.price.total))
      .filter((p) => !isNaN(p));

    if (!prices.length) return 5000;

    return Math.ceil(Math.max(...prices));
  }, []);

  // Handle flight search
  const handleSearch = useCallback(
    async (origin, destination, date) => {
      // Validate inputs
      if (!origin || !destination || !date) {
        setError('Please fill in all search fields');
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await searchFlights(origin, destination, date);

        if (!data || data.length === 0) {
          setError(
            'No flights found for this route. Try different dates or airports.',
          );
          setFlights([]);
          return;
        }

        setFlights(data);
        setMaxPrice(calculateMaxPrice(data));
      } catch (err) {
        const errorMessage = getErrorMessage(err);
        setError(errorMessage);
        logError('Flight Search', err);
        setFlights([]);
      } finally {
        setLoading(false);
      }
    },
    [calculateMaxPrice],
  );

  return {
    flights: processedFlights,
    loading,
    error,
    maxPrice,
    sortBy,
    setMaxPrice,
    setSortBy,
    handleSearch,
    hasResults: flights.length > 0,
  };
};
