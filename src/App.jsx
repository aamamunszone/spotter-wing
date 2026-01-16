import React, { useState, useMemo } from 'react';
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
  CssBaseline,
  useMediaQuery,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import SearchForm from './features/search/SearchForm';
import FlightCard from './features/results/FlightCard';
import PriceGraph from './features/graph/PriceGraph';
import { FlightListSkeleton } from './components/common/LoadingSkeleton';
import ErrorBoundary from './components/common/ErrorBoundary';
import ThemeToggle from './components/common/ThemeToggle';
import { useFlightSearch } from './hooks/useFlightSearch';
import { getAppTheme } from './theme/AppTheme';
import { motion, AnimatePresence } from 'motion/react';

const App = () => {
  // Theme state
  const [mode, setMode] = useState('light');
  const theme = useMemo(() => getAppTheme(mode), [mode]);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Toggle theme
  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // Flight search state
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

  const [showError, setShowError] = useState(false);

  // Show error notification when error changes
  React.useEffect(() => {
    if (error) {
      setShowError(true);
    }
  }, [error]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>
        <Box
          sx={{
            minHeight: '100vh',
            bgcolor: 'background.default',
            color: 'text.primary',
            transition: 'background-color 0.3s ease, color 0.3s ease',
          }}
        >
          {/* Responsive Navbar */}
          <AppBar
            position="sticky"
            elevation={0}
            sx={{
              bgcolor: 'background.paper',
              backdropFilter: 'blur(8px)',
              borderBottom: 1,
              borderColor: 'divider',
              transition: 'all 0.3s ease',
            }}
          >
            <Container maxWidth="lg">
              <Toolbar
                disableGutters
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  py: { xs: 1, sm: 1.5 },
                }}
              >
                {/* Logo */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: { xs: 1, sm: 2 },
                  }}
                >
                  <FlightTakeoffIcon
                    sx={{
                      color: 'primary.main',
                      fontSize: { xs: 28, sm: 36 },
                    }}
                  />
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{
                      fontWeight: 900,
                      letterSpacing: '-0.02em',
                      color: 'primary.main',
                      fontSize: { xs: '1.25rem', sm: '1.5rem' },
                    }}
                  >
                    Spotter-Wing
                  </Typography>
                </Box>

                {/* Right Side: Chip + Theme Toggle */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Chip
                    label="Spotter Assignment"
                    variant="outlined"
                    size="small"
                    sx={{
                      display: { xs: 'none', sm: 'flex' },
                      borderColor: 'divider',
                      color: 'text.secondary',
                      fontWeight: 600,
                    }}
                  />
                  <ThemeToggle mode={mode} onToggle={toggleTheme} />
                </Box>
              </Toolbar>
            </Container>
          </AppBar>

          <Container
            maxWidth="lg"
            component="main"
            sx={{ py: { xs: 4, sm: 6, md: 8 } }}
          >
            {/* Hero Section */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Box
                sx={{
                  mb: { xs: 4, sm: 6, md: 8 },
                  textAlign: { xs: 'center', sm: 'left' },
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                    color: 'text.primary',
                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                    mb: 2,
                  }}
                >
                  Where to next?
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: 'text.secondary',
                    fontWeight: 400,
                    maxWidth: '42rem',
                    fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
                  }}
                >
                  Find the best flight deals with real-time price trends and
                  advanced analytics.
                </Typography>
              </Box>
            </motion.div>

            {/* Search Form */}
            <SearchForm onSearch={handleSearch} />

            {/* Loading State */}
            {loading && (
              <Box
                sx={{ mt: { xs: 4, sm: 6, md: 8 } }}
                role="status"
                aria-live="polite"
                aria-label="Loading flights"
              >
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: 'center',
                    mb: 4,
                    color: 'primary.main',
                    fontWeight: 700,
                    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                    '@keyframes pulse': {
                      '0%, 100%': { opacity: 1 },
                      '50%': { opacity: 0.5 },
                    },
                  }}
                >
                  Searching the best deals for you...
                </Typography>
                <FlightListSkeleton count={isMobile ? 3 : 5} />
              </Box>
            )}

            {/* Results Section */}
            {!loading && hasResults && (
              <Box sx={{ mt: { xs: 4, sm: 6, md: 8 } }}>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', lg: '1fr 2fr' },
                    gap: { xs: 4, sm: 6, lg: 8 },
                  }}
                >
                  {/* Left Sidebar: Graph & Filters */}
                  <Box>
                    <Box
                      sx={{
                        position: { lg: 'sticky' },
                        top: { lg: 96 },
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                      }}
                    >
                      <PriceGraph data={flights} />

                      <Paper
                        elevation={0}
                        sx={{
                          p: { xs: 3, sm: 4 },
                          borderRadius: 4,
                          border: 1,
                          borderColor: 'divider',
                          bgcolor: 'background.paper',
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            mb: 3,
                            color: 'text.primary',
                          }}
                        >
                          Refine Results
                        </Typography>

                        {/* Sort Tabs */}
                        <Tabs
                          value={sortBy}
                          onChange={(e, v) => setSortBy(v)}
                          sx={{
                            mb: 3,
                            bgcolor: 'action.hover',
                            borderRadius: 2,
                            p: 0.5,
                            minHeight: 44,
                            '& .MuiTab-root': {
                              minHeight: 40,
                              borderRadius: 1.5,
                              fontWeight: 700,
                              fontSize: '0.875rem',
                            },
                          }}
                          indicatorColor="primary"
                          aria-label="Sort flights by"
                        >
                          <Tab
                            label="Cheapest"
                            value="price"
                            aria-label="Sort by cheapest price"
                          />
                          <Tab
                            label="Fastest"
                            value="duration"
                            aria-label="Sort by fastest duration"
                          />
                        </Tabs>

                        {/* Price Slider */}
                        <Typography
                          variant="caption"
                          component="label"
                          htmlFor="price-slider"
                          sx={{
                            color: 'text.secondary',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            fontWeight: 700,
                            fontSize: '0.75rem',
                          }}
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
                          sx={{ mt: 2 }}
                          aria-label="Maximum price filter"
                          aria-valuemin={0}
                          aria-valuemax={5000}
                          aria-valuenow={maxPrice}
                        />
                        <Typography
                          variant="caption"
                          sx={{
                            color: 'text.secondary',
                            mt: 2,
                            display: 'block',
                          }}
                        >
                          Showing {flights.length} flight
                          {flights.length !== 1 ? 's' : ''} under ${maxPrice}
                        </Typography>
                      </Paper>
                    </Box>
                  </Box>

                  {/* Right Side: Flight List */}
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        mb: 3,
                        color: 'text.primary',
                      }}
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
                          <Paper
                            sx={{
                              p: { xs: 6, sm: 8, md: 12 },
                              borderRadius: 4,
                              textAlign: 'center',
                              border: 2,
                              borderStyle: 'dashed',
                              borderColor: 'divider',
                              bgcolor: 'transparent',
                            }}
                          >
                            <Typography sx={{ color: 'text.secondary' }}>
                              No flights found in this price range. Try
                              adjusting your filters.
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
                sx={{
                  mt: { xs: 4, sm: 6, md: 8 },
                  borderRadius: 4,
                  border: 2,
                  borderStyle: 'dashed',
                  borderColor: 'divider',
                  p: { xs: 6, sm: 8, md: 12 },
                  textAlign: 'center',
                  bgcolor: 'transparent',
                }}
              >
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
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
              sx={{ borderRadius: 3 }}
            >
              {error}
            </Alert>
          </Snackbar>
        </Box>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;
