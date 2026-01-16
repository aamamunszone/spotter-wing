import React from 'react';
import {
  AppBar,
  Box,
  Chip,
  Container,
  Paper,
  Slider,
  Toolbar,
  Typography,
  Alert,
  Snackbar,
  Tabs,
  Tab,
} from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import SearchForm from './features/search/SearchForm';
import FlightCard from './features/results/FlightCard';
import PriceGraph from './features/graph/PriceGraph';
import { FlightListSkeleton } from './components/common/LoadingSkeleton';
import ErrorBoundary from './components/common/ErrorBoundary';
import { useFlightSearch } from './hooks/useFlightSearch';
import { motion, AnimatePresence } from 'motion/react';

const App = () => {
  const {
    flights,
    loading,
    error,
    maxPrice,
    sortBy,
    setMaxPrice,
    setSortBy,
    handleSearch,
    hasResults,
  } = useFlightSearch();

  const [showError, setShowError] = React.useState(false);

  // Show error notification when error changes
  React.useEffect(() => {
    if (error) {
      setShowError(true);
    }
  }, [error]);

  return (
    <ErrorBoundary>
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
          {/* Hero Section */}
          <motion.header
            className="mb-12"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
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
              Find the best flight deals with real-time price trends and
              advanced analytics.
            </Typography>
          </motion.header>

          {/* Search Form */}
          <SearchForm onSearch={handleSearch} />

          {/* Loading State */}
          {loading && (
            <Box
              className="mt-12"
              role="status"
              aria-live="polite"
              aria-label="Loading flights"
            >
              <Typography
                variant="h6"
                className="text-center mb-8 text-blue-500 font-bold animate-pulse"
              >
                Searching the best deals for you...
              </Typography>
              <FlightListSkeleton count={5} />
            </Box>
          )}

          {/* Results Section */}
          {!loading && hasResults && (
            <Box className="mt-12">
              <Box className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Sidebar: Graph & Filters */}
                <Box className="lg:col-span-4">
                  <Box className="sticky top-24 space-y-6">
                    <PriceGraph data={flights} />

                    <Paper
                      elevation={0}
                      className="p-6 rounded-3xl border border-neutral-200 bg-white"
                    >
                      <Typography
                        variant="h6"
                        className="font-bold mb-6 text-neutral-800"
                      >
                        Refine Results
                      </Typography>

                      {/* Sort Tabs */}
                      <Tabs
                        value={sortBy}
                        onChange={(e, v) => setSortBy(v)}
                        className="mb-6 bg-neutral-50 rounded-xl p-1"
                        indicatorColor="primary"
                        aria-label="Sort flights by"
                      >
                        <Tab
                          label="Cheapest"
                          value="price"
                          className="capitalize font-bold"
                          aria-label="Sort by cheapest price"
                        />
                        <Tab
                          label="Fastest"
                          value="duration"
                          className="capitalize font-bold"
                          aria-label="Sort by fastest duration"
                        />
                      </Tabs>

                      {/* Price Slider */}
                      <Typography
                        variant="caption"
                        className="text-neutral-400 uppercase tracking-widest font-bold"
                        component="label"
                        htmlFor="price-slider"
                      >
                        Max Budget: ${maxPrice}
                      </Typography>
                      <Slider
                        id="price-slider"
                        value={maxPrice}
                        min={0}
                        max={5000}
                        step={50}
                        onChange={(e, v) => setMaxPrice(v)}
                        className="mt-2"
                        aria-label="Maximum price filter"
                        aria-valuemin={0}
                        aria-valuemax={5000}
                        aria-valuenow={maxPrice}
                      />
                      <Typography
                        variant="caption"
                        className="text-neutral-400 mt-2 block"
                      >
                        Showing {flights.length} flight
                        {flights.length !== 1 ? 's' : ''} under ${maxPrice}
                      </Typography>
                    </Paper>
                  </Box>
                </Box>

                {/* Right Side: Flight List */}
                <Box className="lg:col-span-8">
                  <Typography
                    variant="h6"
                    className="font-bold mb-6 text-neutral-800"
                    role="status"
                    aria-live="polite"
                  >
                    Available Flights ({flights.length})
                  </Typography>

                  <AnimatePresence mode="popLayout">
                    {flights.length > 0 ? (
                      flights.map((flight, i) => (
                        <motion.div
                          key={flight.id || i}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          <FlightCard flight={flight} />
                        </motion.div>
                      ))
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <Paper className="p-12 rounded-3xl text-center border-2 border-dashed border-neutral-200">
                          <Typography className="text-neutral-400">
                            No flights found in this price range. Try adjusting
                            your filters.
                          </Typography>
                        </Paper>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Box>
              </Box>
            </Box>
          )}

          {/* Empty State */}
          {!loading && !hasResults && (
            <Paper
              variant="outlined"
              className="mt-12 rounded-3xl border-2 border-dashed border-neutral-200 p-12 text-center bg-transparent"
            >
              <Typography variant="body1" className="text-neutral-400">
                Ready for takeoff. Enter details above to see results.
              </Typography>
            </Paper>
          )}
        </Container>

        {/* Error Notification */}
        <Snackbar
          open={showError}
          autoHideDuration={6000}
          onClose={() => setShowError(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setShowError(false)}
            severity="error"
            variant="filled"
            className="rounded-xl"
          >
            {error}
          </Alert>
        </Snackbar>
      </Box>
    </ErrorBoundary>
  );
};

export default App;
