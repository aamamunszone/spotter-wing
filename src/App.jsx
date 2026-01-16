import React, { useEffect } from 'react';
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

const App = () => {
  useEffect(() => {
    const testFetch = async () => {
      try {
        const data = await searchFlights('JFK', 'LHR', '2026-06-15');
        console.log('Flight Data Received:', data);
      } catch (err) {
        console.error('Fetch Failed:', err);
      }
    };

    testFetch();
  }, []);

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

        {/* Work in Progress Area using MUI Paper */}
        <Paper
          variant="outlined"
          className="rounded-3xl border-2 border-dashed border-neutral-200 p-20 text-center bg-transparent"
        >
          <Box className="flex flex-col items-center gap-4">
            <Box className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center animate-pulse">
              <FlightTakeoffIcon className="text-blue-400" fontSize="large" />
            </Box>
            <Typography
              variant="body1"
              className="text-neutral-400 font-medium"
            >
              Ready for takeoff. Engine warm-up in progress...
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default App;
