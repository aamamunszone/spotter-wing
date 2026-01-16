import React, { useState, useMemo } from 'react';
import {
  AppBar,
  Box,
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
import LiveStatusIndicator from './components/common/LiveStatusIndicator';
import { useFlightSearch } from './hooks/useFlightSearch';
import { getAppTheme, getMeshGradient } from './theme/AppTheme';
import { motion, AnimatePresence } from 'motion/react';

const App = () => {
  // Theme state
  const [mode, setMode] = useState('light');
  const theme = useMemo(() => getAppTheme(mode), [mode]);
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

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
            background: getMeshGradient(mode),
            transition: 'background 0.5s ease',
            position: 'relative',
          }}
        >
          {/* Floating Glassmorphic Navbar */}
          <Box
            sx={{
              position: 'sticky',
              top: 0,
              zIndex: 1100,
              pt: { xs: 1.5, sm: 2 },
              px: { xs: 2, sm: 3 },
            }}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <AppBar
                position="static"
                elevation={0}
                sx={{
                  bgcolor:
                    mode === 'light'
                      ? 'rgba(255, 255, 255, 0.1)'
                      : 'rgba(15, 23, 42, 0.5)',
                  backdropFilter: 'blur(15px)',
                  WebkitBackdropFilter: 'blur(15px)',
                  border:
                    mode === 'light'
                      ? '1px solid rgba(255, 255, 255, 0.2)'
                      : '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 4,
                  boxShadow:
                    mode === 'light'
                      ? '0 8px 32px rgba(0, 0, 0, 0.1)'
                      : '0 8px 32px rgba(0, 0, 0, 0.4)',
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
                      py: { xs: 1.5, sm: 2 },
                      minHeight: { xs: 64, sm: 70 },
                    }}
                  >
                    {/* Logo */}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: { xs: 1.5, sm: 2 },
                      }}
                    >
                      <Box
                        sx={{
                          width: { xs: 40, sm: 48 },
                          height: { xs: 40, sm: 48 },
                          borderRadius: 2.5,
                          bgcolor: 'primary.main',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)',
                        }}
                      >
                        <FlightTakeoffIcon
                          sx={{
                            color: 'white',
                            fontSize: { xs: 24, sm: 28 },
                          }}
                        />
                      </Box>
                      <Typography
                        variant="h5"
                        component="div"
                        sx={{
                          fontWeight: 900,
                          letterSpacing: '-0.02em',
                          background:
                            mode === 'light'
                              ? 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)'
                              : 'linear-gradient(135deg, #60A5FA 0%, #A78BFA 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          fontSize: { xs: '1.25rem', sm: '1.5rem' },
                        }}
                      >
                        Spotter-Wing
                      </Typography>
                    </Box>

                    {/* Right Side: Live Status + Theme Toggle */}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: { xs: 1, sm: 2 },
                      }}
                    >
                      <LiveStatusIndicator />
                      <ThemeToggle mode={mode} onToggle={toggleTheme} />
                    </Box>
                  </Toolbar>
                </Container>
              </AppBar>
            </motion.div>
          </Box>

          <Container
            maxWidth="lg"
            component="main"
            sx={{ py: { xs: 4, sm: 6, md: 8 } }}
          >
            {/* Hero Section */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
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
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <SearchForm onSearch={handleSearch} />
            </motion.div>

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

            {/* Results Section - Two Column Layout with Sticky Sidebar */}
            {!loading && hasResults && (
              <Box
                sx={{
                  mt: { xs: 4, sm: 6, md: 8 },
                  minHeight: '100vh',
                }}
              >
                {/* 
                  CSS Grid with align-items: flex-start
                  This prevents the sidebar from stretching to match flight list height
                */}
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', lg: '340px 1fr' },
                    gap: { xs: 4, lg: 6 },
                    alignItems: 'flex-start', // CRITICAL: Prevents sidebar stretching
                  }}
                >
                  {/* 
                    Left Sidebar - Sticky Wrapper
                    position: sticky + top: 100px + align-self: flex-start
                  */}
                  <Box
                    sx={{
                      position: { xs: 'relative', lg: 'sticky' },
                      top: { lg: '100px' },
                      alignSelf: 'flex-start', // CRITICAL: Prevents stretching
                      height: 'fit-content', // Only as tall as content
                      zIndex: 10,
                    }}
                  >
                    {/* Sidebar Content Container */}
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                      }}
                    >
                      {/* Price Graph */}
                      <PriceGraph data={flights} />

                      {/* Filter Controls */}
                      <Paper
                        elevation={0}
                        sx={{
                          p: { xs: 3, sm: 4 },
                          borderRadius: 4,
                          bgcolor: 'background.paper',
                          backdropFilter: 'blur(15px)',
                          WebkitBackdropFilter: 'blur(15px)',
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
                            bgcolor:
                              mode === 'light'
                                ? 'rgba(241, 245, 249, 0.5)'
                                : 'rgba(51, 65, 85, 0.5)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: 2,
                            p: 0.5,
                            minHeight: 44,
                            '& .MuiTab-root': {
                              minHeight: 40,
                              borderRadius: 1.5,
                              fontWeight: 700,
                              fontSize: '0.875rem',
                              flex: 1,
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
                        <Box sx={{ mb: 2 }}>
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              mb: 1,
                            }}
                          >
                            <Typography
                              variant="caption"
                              component="label"
                              htmlFor="price-slider"
                              sx={{
                                color: 'text.secondary',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                fontWeight: 700,
                                fontSize: '0.7rem',
                              }}
                            >
                              Max Budget
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: 700,
                                color: 'primary.main',
                              }}
                            >
                              ${maxPrice}
                            </Typography>
                          </Box>
                          <Slider
                            id="price-slider"
                            value={maxPrice}
                            min={0}
                            max={5000}
                            step={50}
                            onChange={(e, v) => setMaxPrice(v)}
                            aria-label="Maximum price filter"
                            aria-valuemin={0}
                            aria-valuemax={5000}
                            aria-valuenow={maxPrice}
                          />
                        </Box>

                        <Typography
                          variant="caption"
                          sx={{
                            color: 'text.secondary',
                            display: 'block',
                          }}
                        >
                          Showing {flights.length} flight
                          {flights.length !== 1 ? 's' : ''} under ${maxPrice}
                        </Typography>
                      </Paper>
                    </Box>
                  </Box>

                  {/* Right Side - Flight List (scrolls independently) */}
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

                    {/* Flight Cards with Layout Animation */}
                    <motion.div
                      layout
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <AnimatePresence mode="popLayout">
                        {flights.length > 0 ? (
                          flights.map((flight, i) => (
                            <motion.div
                              key={flight.id || `flight-${i}`}
                              layout
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{
                                opacity: 0,
                                scale: 0.95,
                                transition: { duration: 0.2 },
                              }}
                              transition={{
                                layout: { duration: 0.3, ease: 'easeInOut' },
                                opacity: { duration: 0.2 },
                                y: { duration: 0.2 },
                              }}
                            >
                              <FlightCard flight={flight} />
                            </motion.div>
                          ))
                        ) : (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Paper
                              sx={{
                                p: { xs: 6, sm: 8, md: 12 },
                                borderRadius: 4,
                                textAlign: 'center',
                                border: 2,
                                borderStyle: 'dashed',
                                borderColor: 'divider',
                                bgcolor: 'background.paper',
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
                    </motion.div>
                  </Box>
                </Box>
              </Box>
            )}

            {/* Empty State */}
            {!loading && !hasResults && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
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
                    bgcolor: 'background.paper',
                  }}
                >
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    Ready for takeoff. Enter details above to see results.
                  </Typography>
                </Paper>
              </motion.div>
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
