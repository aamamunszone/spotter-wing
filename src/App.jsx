import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Chip,
  Container,
  Paper,
  Toolbar,
  Typography,
} from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { searchFlights } from './api/amadeus';
import SearchForm from './features/search/SearchForm';
import FlightCard from './features/results/FlightCard';

const App = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFlightSearch = async (origin, destination, date) => {
    setLoading(true);
    try {
      const data = await searchFlights(origin, destination, date);
      setFlights(data);
      console.log('Search Results:', data);
    } catch (err) {
      alert('Failed to fetch flights. Check console.', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="min-h-screen bg-neutral-50 antialiased">
      {/* Navbar with MUI AppBar */}
      <AppBar
        position="sticky"
        elevation={0}
        className="border-b border-neutral-200 bg-white/80 backdrop-blur-md"
        sx={{ bgcolor: 'rgba(255, 255, 255, 0.8)' }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters className="flex justify-between">
            <Box className="flex items-center gap-2">
              <FlightTakeoffIcon className="text-blue-600" fontSize="large" />
              <Typography
                variant="h5"
                className="font-black tracking-tight text-blue-600"
                component="div"
              >
                Spotter-Wing
              </Typography>
            </Box>

            <Chip
              label="Spotter Assignment • Jan 2026"
              variant="outlined"
              size="small"
              className="hidden sm:flex border-neutral-200 text-neutral-500 font-medium"
            />
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="lg" component="main" className="py-12">
        <header className="mb-12">
          <Typography
            variant="h3"
            className="font-bold tracking-tight text-neutral-900 sm:text-5xl"
            gutterBottom
          >
            Where to next?
          </Typography>
          <Typography
            variant="h6"
            className="text-neutral-500 font-normal max-w-2xl"
          >
            Find the best flight deals with real-time price trends and advanced
            analytics.
          </Typography>
        </header>

        {/* Main Area using MUI Paper */}
        <Paper
          variant="outlined"
          className="rounded-3xl border-2 border-dashed border-neutral-200 p-20 text-center bg-transparent"
        >
          {/* Search Form Integration */}
          <Box className="mb-12">
            <SearchForm onSearch={handleFlightSearch} />
          </Box>

          {/* Results Area */}
          <Box className="mt-10">
            {loading ? (
              <Box className="text-center py-20">
                <Typography
                  variant="h6"
                  className="animate-pulse text-blue-500"
                >
                  Searching the best deals for you...
                </Typography>
              </Box>
            ) : (
              <Box className="grid grid-cols-1 gap-4">
                {flights.map((flight, index) => (
                  <FlightCard key={index} flight={flight} />
                ))}
              </Box>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default App;
