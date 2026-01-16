import React, { memo } from 'react';
import { Paper, Typography, Box, Button } from '@mui/material';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import { formatTime, formatDuration, formatPrice, getStopsText } from '../../utils/formatters';
import { motion } from 'motion/react';

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
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Paper
        elevation={0}
        role="article"
        aria-label={`Flight from ${departure.iataCode} to ${arrival.iataCode}`}
        sx={{
          mb: 3,
          p: { xs: 3, sm: 4 },
          borderRadius: 3,
          border: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper',
          transition: 'all 0.3s ease',
          '&:hover': {
            borderColor: 'primary.main',
            boxShadow: (theme) =>
              theme.palette.mode === 'light'
                ? '0 20px 25px -5px rgb(37 99 235 / 0.15), 0 8px 10px -6px rgb(37 99 235 / 0.1)'
                : '0 20px 25px -5px rgb(59 130 246 / 0.3), 0 8px 10px -6px rgb(59 130 246 / 0.2)',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'stretch', md: 'center' },
            gap: { xs: 3, md: 4 },
          }}
        >
          {/* Airline Info */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 80 }}>
            <Box
              role="img"
              aria-label={`Airline ${airlineCode}`}
              sx={{
                width: 56,
                height: 56,
                bgcolor: 'action.hover',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                color: 'primary.main',
                fontSize: '1.125rem',
              }}
            >
              {airlineCode}
            </Box>
            <Typography
              variant="caption"
              sx={{
                mt: 1,
                fontWeight: 700,
                color: 'text.secondary',
              }}
            >
              {airlineCode}
            </Typography>
          </Box>

          {/* Journey Details */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: { xs: 3, sm: 4, md: 6 },
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: 'text.primary',
                }}
                aria-label="Departure airport"
              >
                {departure.iataCode || 'N/A'}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: 'text.secondary' }}
                aria-label="Departure time"
              >
                {departure.at ? formatTime(departure.at) : 'N/A'}
              </Typography>
            </Box>

            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: 'primary.main',
                  fontWeight: 700,
                  mb: 1,
                  fontSize: '0.75rem',
                }}
                aria-label={`Flight has ${stopsText}`}
              >
                {stopsText}
              </Typography>
              <Box
                sx={{
                  width: '100%',
                  height: 2,
                  bgcolor: 'divider',
                  position: 'relative',
                }}
                aria-hidden="true"
              >
                <ConnectingAirportsIcon
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: 'text.secondary',
                    bgcolor: 'background.paper',
                    px: 1,
                    fontSize: '1.25rem',
                  }}
                />
              </Box>
              <Typography
                variant="caption"
                sx={{
                  mt: 1,
                  color: 'text.secondary',
                  fontSize: '0.75rem',
                }}
                aria-label={`Flight duration ${formatDuration(outbound.duration)}`}
              >
                {formatDuration(outbound.duration)}
              </Typography>
            </Box>

            <Box sx={{ textAlign: 'center' }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: 'text.primary',
                }}
                aria-label="Arrival airport"
              >
                {arrival.iataCode || 'N/A'}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: 'text.secondary' }}
                aria-label="Arrival time"
              >
                {arrival.at ? formatTime(arrival.at) : 'N/A'}
              </Typography>
            </Box>
          </Box>

          {/* Price & Action */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'row', md: 'column' },
              alignItems: { xs: 'center', md: 'flex-end' },
              justifyContent: { xs: 'space-between', md: 'center' },
              minWidth: { md: 140 },
              gap: 2,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 900,
                color: 'primary.main',
                fontSize: { xs: '1.5rem', sm: '1.75rem' },
              }}
              aria-label={`Price ${formatPrice(price.total, price.currency)}`}
            >
              {formatPrice(price.total, price.currency)}
            </Typography>
            <Button
              variant="contained"
              aria-label={`Select flight from ${departure.iataCode} to ${arrival.iataCode} for ${formatPrice(price.total, price.currency)}`}
              sx={{
                borderRadius: 2,
                fontWeight: 700,
                px: { xs: 4, sm: 5 },
                py: 1.5,
                fontSize: '0.95rem',
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: (theme) =>
                    `0 8px 16px ${theme.palette.primary.main}40`,
                },
              }}
            >
              Select
            </Button>
          </Box>
        </Box>
      </Paper>
    </motion.div>
  );
};

// Memoize to prevent unnecessary re-renders
export default memo(FlightCard);
