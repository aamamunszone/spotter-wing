import { memo } from 'react';
import { Paper, Typography, Box, Button, Chip } from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import WifiIcon from '@mui/icons-material/Wifi';
import UsbIcon from '@mui/icons-material/Usb';
import AirlineSeatReclineExtraIcon from '@mui/icons-material/AirlineSeatReclineExtra';
import {
  formatTime,
  formatDuration,
  formatPrice,
  getStopsText,
} from '../../utils/formatters';
import { motion } from 'motion/react';

/**
 * Get city name from IATA code (mock data for demo)
 * In production, this would come from the API or a lookup table
 */
const getCityName = (iataCode) => {
  const cities = {
    JFK: 'New York',
    LAX: 'Los Angeles',
    LHR: 'London',
    CDG: 'Paris',
    DXB: 'Dubai',
    SIN: 'Singapore',
    HND: 'Tokyo',
    SYD: 'Sydney',
    FRA: 'Frankfurt',
    AMS: 'Amsterdam',
    MAD: 'Madrid',
    BCN: 'Barcelona',
    BKK: 'Bangkok',
    HKG: 'Hong Kong',
    ICN: 'Seoul',
  };
  return cities[iataCode] || iataCode;
};

/**
 * Generate mock perks based on airline (for demo purposes)
 */
const getFlightPerks = (airlineCode) => {
  const allPerks = [
    { icon: <WifiIcon sx={{ fontSize: 14 }} />, label: 'Free WiFi' },
    { icon: <UsbIcon sx={{ fontSize: 14 }} />, label: 'USB Power' },
    {
      icon: <AirlineSeatReclineExtraIcon sx={{ fontSize: 14 }} />,
      label: 'Extra Legroom',
    },
  ];

  // Randomly assign 1-2 perks for variety
  const perkCount = Math.random() > 0.5 ? 2 : 1;
  return allPerks.slice(0, perkCount);
};

const FlightCard = ({ flight }) => {
  // Safely extract flight data with fallbacks
  const itineraries = flight?.itineraries || [];
  const price = flight?.price || {};
  const validatingAirlineCodes = flight?.validatingAirlineCodes || [];

  if (!itineraries.length) {
    return null;
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
  const perks = getFlightPerks(airlineCode);

  // Mock flight number
  const flightNumber = `${airlineCode} ${Math.floor(Math.random() * 9000) + 1000}`;

  return (
    <motion.div
      whileHover={{ scale: 1.01, y: -6 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <Paper
        elevation={0}
        role="article"
        aria-label={`Flight from ${departure.iataCode} to ${arrival.iataCode}`}
        sx={{
          mb: 3,
          p: 0,
          borderRadius: 4,
          bgcolor: 'background.paper',
          backdropFilter: 'blur(15px)',
          WebkitBackdropFilter: 'blur(15px)',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          '&:hover': {
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderColor: 'primary.main',
            boxShadow: (theme) =>
              theme.palette.mode === 'light'
                ? '0 24px 48px rgba(37, 99, 235, 0.2), 0 0 0 2px rgba(37, 99, 235, 0.3)'
                : '0 24px 48px rgba(59, 130, 246, 0.3), 0 0 0 2px rgba(59, 130, 246, 0.4)',
          },
        }}
      >
        {/* Card Content */}
        <Box sx={{ p: { xs: 3, sm: 4 } }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '200px 1fr 180px' },
              gap: { xs: 3, md: 4 },
              alignItems: 'center',
            }}
          >
            {/* Zone 1: Airline Identity */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: { xs: 'center', md: 'flex-start' },
                gap: 2,
              }}
            >
              {/* Airline Logo Circle */}
              <Box
                role="img"
                aria-label={`Airline ${airlineCode}`}
                sx={{
                  width: 72,
                  height: 72,
                  bgcolor: (theme) =>
                    theme.palette.mode === 'light'
                      ? 'rgba(37, 99, 235, 0.08)'
                      : 'rgba(59, 130, 246, 0.12)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  color: 'primary.main',
                  fontSize: '1.5rem',
                  border: (theme) =>
                    theme.palette.mode === 'light'
                      ? '2px solid rgba(37, 99, 235, 0.2)'
                      : '2px solid rgba(59, 130, 246, 0.3)',
                  letterSpacing: '-0.02em',
                }}
              >
                {airlineCode}
              </Box>

              {/* Airline Details */}
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 700,
                    color: 'text.primary',
                    fontSize: '0.95rem',
                    mb: 0.5,
                  }}
                >
                  {airlineCode} Airlines
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                    fontSize: '0.8rem',
                    fontFamily: 'monospace',
                  }}
                >
                  {flightNumber}
                </Typography>
              </Box>
            </Box>

            {/* Zone 2: Journey Timeline */}
            <Box>
              {/* Departure & Arrival */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 2,
                  mb: 2,
                }}
              >
                {/* Departure */}
                <Box sx={{ flex: 1 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      mb: 0.5,
                    }}
                  >
                    <FlightTakeoffIcon
                      sx={{ fontSize: 18, color: 'text.secondary' }}
                    />
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'text.secondary',
                        textTransform: 'uppercase',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        letterSpacing: '0.05em',
                      }}
                    >
                      Departure
                    </Typography>
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 800,
                      color: 'text.primary',
                      fontSize: { xs: '1.5rem', sm: '1.75rem' },
                      lineHeight: 1.2,
                      mb: 0.5,
                    }}
                  >
                    {departure.at ? formatTime(departure.at) : 'N/A'}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: 'text.primary',
                      fontSize: '0.95rem',
                    }}
                  >
                    {getCityName(departure.iataCode)}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'text.secondary',
                      fontSize: '0.8rem',
                    }}
                  >
                    {departure.iataCode}
                  </Typography>
                </Box>

                {/* Progress Bar with Stops */}
                <Box
                  sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    px: 2,
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
                  >
                    {stopsText}
                  </Typography>

                  {/* Progress Bar */}
                  <Box
                    sx={{
                      width: '100%',
                      height: 4,
                      bgcolor: 'divider',
                      borderRadius: 2,
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        height: '100%',
                        width: '100%',
                        background: (theme) =>
                          theme.palette.mode === 'light'
                            ? 'linear-gradient(90deg, #2563EB 0%, #7C3AED 100%)'
                            : 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)',
                        borderRadius: 2,
                      }}
                    />
                    {/* Stop indicators */}
                    {segments.length > 1 &&
                      segments.slice(0, -1).map((_, idx) => (
                        <Box
                          key={idx}
                          sx={{
                            position: 'absolute',
                            left: `${((idx + 1) / segments.length) * 100}%`,
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            border: 2,
                            borderColor: 'primary.main',
                            borderRadius: '50%',
                          }}
                        />
                      ))}
                  </Box>

                  <Typography
                    variant="caption"
                    sx={{
                      mt: 1,
                      color: 'text.secondary',
                      fontSize: '0.75rem',
                    }}
                  >
                    {formatDuration(outbound.duration)}
                  </Typography>
                </Box>

                {/* Arrival */}
                <Box sx={{ flex: 1, textAlign: 'right' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      gap: 1,
                      mb: 0.5,
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'text.secondary',
                        textTransform: 'uppercase',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        letterSpacing: '0.05em',
                      }}
                    >
                      Arrival
                    </Typography>
                    <FlightLandIcon
                      sx={{ fontSize: 18, color: 'text.secondary' }}
                    />
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 800,
                      color: 'text.primary',
                      fontSize: { xs: '1.5rem', sm: '1.75rem' },
                      lineHeight: 1.2,
                      mb: 0.5,
                    }}
                  >
                    {arrival.at ? formatTime(arrival.at) : 'N/A'}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: 'text.primary',
                      fontSize: '0.95rem',
                    }}
                  >
                    {getCityName(arrival.iataCode)}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'text.secondary',
                      fontSize: '0.8rem',
                    }}
                  >
                    {arrival.iataCode}
                  </Typography>
                </Box>
              </Box>

              {/* Perks */}
              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                  mt: 2,
                  flexWrap: 'wrap',
                }}
              >
                {perks.map((perk, idx) => (
                  <Chip
                    key={idx}
                    icon={perk.icon}
                    label={perk.label}
                    size="small"
                    sx={{
                      bgcolor: (theme) =>
                        theme.palette.mode === 'light'
                          ? 'rgba(16, 185, 129, 0.08)'
                          : 'rgba(16, 185, 129, 0.12)',
                      color: 'success.main',
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      border: (theme) =>
                        theme.palette.mode === 'light'
                          ? '1px solid rgba(16, 185, 129, 0.2)'
                          : '1px solid rgba(16, 185, 129, 0.3)',
                      '& .MuiChip-icon': {
                        color: 'success.main',
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>

            {/* Zone 3: Pricing & Action */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: { xs: 'center', md: 'flex-end' },
                gap: 2,
              }}
            >
              <Box sx={{ textAlign: { xs: 'center', md: 'right' } }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                    textTransform: 'uppercase',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    display: 'block',
                    mb: 0.5,
                  }}
                >
                  Total Price
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 900,
                    background: (theme) =>
                      theme.palette.mode === 'light'
                        ? 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)'
                        : 'linear-gradient(135deg, #60A5FA 0%, #A78BFA 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontSize: { xs: '2rem', sm: '2.25rem' },
                    lineHeight: 1,
                  }}
                >
                  {formatPrice(price.total, price.currency)}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                    fontSize: '0.75rem',
                    display: 'block',
                    mt: 0.5,
                  }}
                >
                  per person
                </Typography>
              </Box>

              <Button
                variant="contained"
                fullWidth
                sx={{
                  borderRadius: 2.5,
                  fontWeight: 700,
                  px: 4,
                  py: 1.5,
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  background: (theme) =>
                    theme.palette.mode === 'light'
                      ? 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)'
                      : 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: (theme) =>
                      theme.palette.mode === 'light'
                        ? '0 12px 24px rgba(37, 99, 235, 0.4)'
                        : '0 12px 24px rgba(59, 130, 246, 0.5)',
                  },
                }}
              >
                Select Flight
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </motion.div>
  );
};

// Memoize to prevent unnecessary re-renders
export default memo(FlightCard);
