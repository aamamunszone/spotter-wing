import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Chip,
  Container,
  Paper,
  Slider,
  Toolbar,
  Typography,
} from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { searchFlights } from './api/amadeus';
import SearchForm from './features/search/SearchForm';
import FlightCard from './features/results/FlightCard';
import PriceGraph from './features/graph/PriceGraph';

const App = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [maxPrice, setMaxPrice] = useState(3000);

  const handleFlightSearch = async (origin, destination, date) => {
    setLoading(true);
    try {
      const data = await searchFlights(origin, destination, date);
      setFlights(data);
      setFilteredFlights(data);

      const prices = data.map((f) => parseFloat(f.price.total));
      const highest = Math.max(...prices);
      setMaxPrice(Math.ceil(highest));

      console.log('Search Results:', data);
    } catch (err) {
      alert('Failed to fetch flights. Check console.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (price) => {
    setMaxPrice(price);
    const filtered = flights.filter((f) => parseFloat(f.price.total) <= price);
    setFilteredFlights(filtered);
  };

  return (
    <Box className="min-h-screen bg-neutral-50 antialiased text-neutral-900">
      {/* Navbar */}
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

        {/* Main Area with Dashed Border */}
        <Paper
          variant="outlined"
          className="rounded-3xl border-2 border-dashed border-neutral-200 p-6 md:p-12 text-center bg-transparent"
        >
          {/* Search Form */}
          <Box className="mb-12">
            <SearchForm onSearch={handleFlightSearch} />
          </Box>

          {/* Conditional Rendering: Loading or Results */}
          {loading ? (
            <Box className="py-20">
              <Typography
                variant="h6"
                className="animate-pulse text-blue-500 font-bold"
              >
                Searching the best deals for you...
              </Typography>
            </Box>
          ) : flights.length > 0 ? (
            /* Results Grid */
            <Box className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10 text-left">
              {/* Left Side: Graph & Filters */}
              <Box className="lg:col-span-1">
                <PriceGraph data={filteredFlights} />

                <Paper
                  elevation={0}
                  className="p-6 rounded-3xl border border-neutral-200 bg-white"
                >
                  <Typography variant="subtitle1" className="font-bold mb-4">
                    Max Price: ${maxPrice}
                  </Typography>
                  <Slider
                    value={maxPrice}
                    min={0}
                    max={5000}
                    onChange={(e, val) => handleFilterChange(val)}
                    className="text-blue-600"
                  />
                  <Typography variant="caption" className="text-neutral-400">
                    Adjust the slider to filter results and update the graph
                    instantly.
                  </Typography>
                </Paper>
              </Box>

              {/* Right Side: Flight List */}
              <Box className="lg:col-span-2">
                <Typography
                  variant="h6"
                  className="font-bold mb-4 text-neutral-800"
                >
                  Available Flights ({filteredFlights.length})
                </Typography>
                {filteredFlights.length > 0 ? (
                  filteredFlights.map((flight, index) => (
                    <FlightCard key={flight.id || index} flight={flight} />
                  ))
                ) : (
                  <Typography className="text-neutral-400 py-10 text-center">
                    No flights found in this price range.
                  </Typography>
                )}
              </Box>
            </Box>
          ) : (
            /* Initial State Message */
            <Box className="py-10">
              <Typography variant="body1" className="text-neutral-400">
                Ready for takeoff. Enter details above to see results.
              </Typography>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default App;
