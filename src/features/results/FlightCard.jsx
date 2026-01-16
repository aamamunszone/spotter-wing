import React from 'react';
import { Paper, Typography, Box, Button } from '@mui/material';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';

const FlightCard = ({ flight }) => {
  const { itineraries, price, validatingAirlineCodes } = flight;
  const outbound = itineraries[0];
  const departure = outbound.segments[0].departure;
  const arrival = outbound.segments[outbound.segments.length - 1].arrival;

  return (
    <Paper
      elevation={0}
      className="mb-4 p-5 rounded-2xl border border-neutral-200 hover:border-blue-400 transition-all duration-300 hover:shadow-lg"
    >
      <Box className="flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Airline Info */}
        <Box className="flex flex-col items-center">
          <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center font-bold text-blue-600">
            {validatingAirlineCodes[0]}
          </div>
          <Typography variant="caption" className="mt-1 font-bold">
            {validatingAirlineCodes[0]}
          </Typography>
        </Box>

        {/* Journey Details */}
        <Box className="flex-1 flex justify-center items-center gap-8 w-full">
          <Box className="text-center">
            <Typography variant="h6" className="font-bold">
              {departure.iataCode}
            </Typography>
            <Typography variant="caption" className="text-neutral-500">
              {new Date(departure.at).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Typography>
          </Box>

          <Box className="flex-1 flex flex-col items-center relative">
            <Typography
              variant="caption"
              className="text-blue-500 font-bold mb-1"
            >
              {outbound.segments.length - 1 === 0
                ? 'Direct'
                : `${outbound.segments.length - 1} Stop(s)`}
            </Typography>
            <div className="w-full h-0.5 bg-neutral-200 relative">
              <ConnectingAirportsIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-neutral-300 bg-white px-1" />
            </div>
            <Typography variant="caption" className="mt-1 text-neutral-400">
              {outbound.duration.replace('PT', '').toLowerCase()}
            </Typography>
          </Box>

          <Box className="text-center">
            <Typography variant="h6" className="font-bold">
              {arrival.iataCode}
            </Typography>
            <Typography variant="caption" className="text-neutral-500">
              {new Date(arrival.at).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Typography>
          </Box>
        </Box>

        {/* Price & Action */}
        <Box className="flex flex-col items-end min-w-30">
          <Typography variant="h5" className="font-black text-blue-600">
            {price.currency} {price.total}
          </Typography>
          <Button
            variant="contained"
            className="mt-2 bg-blue-600 rounded-lg normal-case font-bold px-6"
          >
            Select
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default FlightCard;
