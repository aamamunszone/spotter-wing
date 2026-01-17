import { useState } from 'react';
import { Box, Paper, Slider, Typography, Tabs, Tab } from '@mui/material';
import SearchForm from '../../features/search/SearchForm';
import PriceGraph from '../../features/graph/PriceGraph';
import { motion } from 'motion/react';

/**
 * Unified Hero Dashboard - Control Center for Flight Search
 * Combines Search Form, Price Slider, and Price Graph in one cohesive panel
 */
const HeroDashboard = ({
  onSearch,
  flights,
  maxPrice,
  setMaxPrice,
  sortBy,
  setSortBy,
  hasResults,
  mode,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, sm: 4, md: 6 },
          borderRadius: 5,
          bgcolor: 'background.paper',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: (theme) =>
            theme.palette.mode === 'light'
              ? '1px solid rgba(255, 255, 255, 0.4)'
              : '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: (theme) =>
            theme.palette.mode === 'light'
              ? '0 24px 48px rgba(37, 99, 235, 0.12), 0 8px 16px rgba(37, 99, 235, 0.08)'
              : '0 24px 48px rgba(0, 0, 0, 0.5), 0 8px 16px rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* Search Form - Full Width */}
        <Box sx={{ mb: hasResults ? 4 : 0 }}>
          <SearchForm onSearch={onSearch} />
        </Box>

        {/* Two-Column Layout: Filters + Graph */}
        {hasResults && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', lg: '400px 1fr' },
                gap: { xs: 4, lg: 6 },
                mt: 4,
                pt: 4,
                borderTop: 1,
                borderColor: 'divider',
              }}
            >
              {/* Left: Filters */}
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    mb: 3,
                    color: 'text.primary',
                    fontSize: { xs: '1.125rem', sm: '1.25rem' },
                  }}
                >
                  Refine Your Search
                </Typography>

                {/* Sort Tabs */}
                <Tabs
                  value={sortBy}
                  onChange={(e, v) => setSortBy(v)}
                  sx={{
                    mb: 4,
                    bgcolor: (theme) =>
                      theme.palette.mode === 'light'
                        ? 'rgba(241, 245, 249, 0.6)'
                        : 'rgba(51, 65, 85, 0.6)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 2.5,
                    p: 0.75,
                    minHeight: 48,
                    '& .MuiTab-root': {
                      minHeight: 44,
                      borderRadius: 2,
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      flex: 1,
                      transition: 'all 0.2s ease',
                    },
                  }}
                  indicatorColor="primary"
                  aria-label="Sort flights by"
                >
                  <Tab
                    label="💰 Cheapest"
                    value="price"
                    aria-label="Sort by cheapest price"
                  />
                  <Tab
                    label="⚡ Fastest"
                    value="duration"
                    aria-label="Sort by fastest duration"
                  />
                </Tabs>

                {/* Price Slider */}
                <Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 2,
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
                        fontSize: '0.75rem',
                      }}
                    >
                      Maximum Budget
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 800,
                        background: (theme) =>
                          theme.palette.mode === 'light'
                            ? 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)'
                            : 'linear-gradient(135deg, #60A5FA 0%, #A78BFA 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
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
                    sx={{
                      '& .MuiSlider-thumb': {
                        width: 24,
                        height: 24,
                        transition: 'all 0.2s ease',
                        '&:hover, &.Mui-focusVisible': {
                          boxShadow: (theme) =>
                            `0 0 0 10px ${theme.palette.mode === 'light' ? 'rgba(37, 99, 235, 0.16)' : 'rgba(59, 130, 246, 0.16)'}`,
                        },
                      },
                      '& .MuiSlider-track': {
                        height: 6,
                      },
                      '& .MuiSlider-rail': {
                        height: 6,
                        opacity: 0.3,
                      },
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'text.secondary',
                      fontSize: '0.8rem',
                      mt: 1,
                      display: 'block',
                    }}
                  >
                    Showing {flights.length} flight
                    {flights.length !== 1 ? 's' : ''} under ${maxPrice}
                  </Typography>
                </Box>
              </Box>

              {/* Right: Price Graph */}
              <Box>
                <PriceGraph data={flights} />
              </Box>
            </Box>
          </motion.div>
        )}
      </Paper>
    </motion.div>
  );
};

export default HeroDashboard;
