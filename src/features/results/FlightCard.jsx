import React, { memo } from 'react';
import { Paper, Typography, Box, Button } from '@mui/material';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import {
  formatTime,
  formatDuration,
  formatPrice,
  getStopsText,
} from '../../utils/formatters';

const FlightCard = ({ flight }) => {
  // Safely extract flight data with fallbacks
  const itineraries = flight?.itineraries || [];
  const price = flight?.price || {};
  const validatingAirlineCodes = flight?.validatingAirlineCodes || [];

  if (!itineraries.length) {
    return null; // Don't render invalid flights
  }

  const outbound = itineraries[0];
  const segments = outbound?.segments || [];

  if (!segments.length) {
    return null;
  }

  const departure = segments[0]?.departure || {};
  const arrival = segments[segments.length - 1]?.arrival || {};
  const airlineCode = validatingAirlineCodes[0] || 'N/A';
  const stopsText = getStopsText(segments);

  return (
    <Paper
      elevation={0}
      className="mb-4 p-5 rounded-2xl border border-neutral-200 hover:border-blue-400 transition-all duration-300 hover:shadow-lg"
      role="article"
      aria-label={`Flight from ${departure.iataCode} to ${arrival.iataCode}`}
    >
      <Box className="flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Airline Info */}
        <Box className="flex flex-col items-center">
          <div
            className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center font-bold text-blue-600"
            role="img"
            aria-label={`Airline ${airlineCode}`}
          >
            {airlineCode}
          </div>
          <Typography variant="caption" className="mt-1 font-bold">
            {airlineCode}
          </Typography>
        </Box>

        {/* Journey Details */}
        <Box className="flex-1 flex justify-center items-center gap-8 w-full">
          <Box className="text-center">
            <Typography
              variant="h6"
              className="font-bold"
              aria-label="Departure airport"
            >
              {departure.iataCode || 'N/A'}
            </Typography>
            <Typography
              variant="caption"
              className="text-neutral-500"
              aria-label="Departure time"
            >
              {departure.at ? formatTime(departure.at) : 'N/A'}
            </Typography>
          </Box>

          <Box className="flex-1 flex flex-col items-center relative">
            <Typography
              variant="caption"
              className="text-blue-500 font-bold mb-1"
              aria-label={`Flight has ${stopsText}`}
            >
              {stopsText}
            </Typography>
            <div
              className="w-full h-0.5 bg-neutral-200 relative"
              aria-hidden="true"
            >
              <ConnectingAirportsIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-neutral-300 bg-white px-1" />
            </div>
            <Typography
              variant="caption"
              className="mt-1 text-neutral-400"
              aria-label={`Flight duration ${formatDuration(outbound.duration)}`}
            >
              {formatDuration(outbound.duration)}
            </Typography>
          </Box>

          <Box className="text-center">
            <Typography
              variant="h6"
              className="font-bold"
              aria-label="Arrival airport"
            >
              {arrival.iataCode || 'N/A'}
            </Typography>
            <Typography
              variant="caption"
              className="text-neutral-500"
              aria-label="Arrival time"
            >
              {arrival.at ? formatTime(arrival.at) : 'N/A'}
            </Typography>
          </Box>
        </Box>

        {/* Price & Action */}
        <Box className="flex flex-col items-end min-w-30">
          <Typography
            variant="h5"
            className="font-black text-blue-600"
            aria-label={`Price ${formatPrice(price.total, price.currency)}`}
          >
            {formatPrice(price.total, price.currency)}
          </Typography>
          <Button
            variant="contained"
            className="mt-2 bg-blue-600 rounded-lg normal-case font-bold px-6 hover:bg-blue-700"
            aria-label={`Select flight from ${departure.iataCode} to ${arrival.iataCode} for ${formatPrice(price.total, price.currency)}`}
          >
            Select
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

// Memoize to prevent unnecessary re-renders
export default memo(FlightCard);
