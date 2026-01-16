import React, { memo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Paper, Typography, Box, useTheme } from '@mui/material';
import { motion } from 'motion/react';

const PriceGraph = ({ data }) => {
  const theme = useTheme();

  if (!data || data.length === 0) return null;

  const chartData = data.map((flight, index) => ({
    name: `Flight ${index + 1}`,
    price: parseFloat(flight.price?.total || 0),
    airline: flight.validatingAirlineCodes?.[0] || 'N/A',
  }));

  // Calculate min and max for better insights
  const prices = chartData.map((d) => d.price).filter((p) => p > 0);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Paper
        elevation={0}
        role="region"
        aria-label="Price insights chart"
        sx={{
          p: { xs: 3, sm: 4 },
          borderRadius: 4,
          bgcolor: 'background.paper',
          backdropFilter: 'blur(15px)',
          WebkitBackdropFilter: 'blur(15px)',
          mb: 3,
        }}
      >
        <Box
          sx={{
            mb: 3,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: 'text.primary',
            }}
          >
            Price Insights
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              fontWeight: 600,
              px: 2,
              py: 0.5,
              borderRadius: 2,
              bgcolor:
                theme.palette.mode === 'light'
                  ? 'rgba(37, 99, 235, 0.1)'
                  : 'rgba(59, 130, 246, 0.15)',
            }}
          >
            {data.length} result{data.length !== 1 ? 's' : ''}
          </Typography>
        </Box>

        {/* Price Stats */}
        <Box
          sx={{
            mb: 3,
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 2,
            textAlign: 'center',
          }}
        >
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor:
                theme.palette.mode === 'light'
                  ? 'rgba(16, 185, 129, 0.1)'
                  : 'rgba(16, 185, 129, 0.15)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                textTransform: 'uppercase',
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
              }}
            >
              Lowest
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 700,
                color: 'success.main',
                fontSize: '1rem',
                mt: 0.5,
              }}
            >
              ${minPrice.toFixed(0)}
            </Typography>
          </Box>
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor:
                theme.palette.mode === 'light'
                  ? 'rgba(37, 99, 235, 0.1)'
                  : 'rgba(59, 130, 246, 0.15)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                textTransform: 'uppercase',
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
              }}
            >
              Average
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 700,
                color: 'primary.main',
                fontSize: '1rem',
                mt: 0.5,
              }}
            >
              ${avgPrice.toFixed(0)}
            </Typography>
          </Box>
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor:
                theme.palette.mode === 'light'
                  ? 'rgba(239, 68, 68, 0.1)'
                  : 'rgba(239, 68, 68, 0.15)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                textTransform: 'uppercase',
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
              }}
            >
              Highest
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 700,
                color: 'error.main',
                fontSize: '1rem',
                mt: 0.5,
              }}
            >
              ${maxPrice.toFixed(0)}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{ height: 250, width: '100%' }}
          role="img"
          aria-label={`Price trend chart showing ${data.length} flights ranging from $${minPrice.toFixed(0)} to $${maxPrice.toFixed(0)}`}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={theme.palette.primary.main}
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor={theme.palette.primary.main}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke={theme.palette.divider}
                opacity={0.5}
              />
              <XAxis dataKey="name" hide />
              <YAxis
                domain={['auto', 'auto']}
                tick={{
                  fontSize: 12,
                  fill: theme.palette.text.secondary,
                }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: 'none',
                  boxShadow: theme.shadows[3],
                  backgroundColor:
                    theme.palette.mode === 'light'
                      ? 'rgba(255, 255, 255, 0.95)'
                      : 'rgba(15, 23, 42, 0.95)',
                  backdropFilter: 'blur(10px)',
                  color: theme.palette.text.primary,
                }}
                formatter={(value) => [`$${value}`, 'Price']}
                labelFormatter={(label) => label}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke={theme.palette.primary.main}
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorPrice)"
                animationDuration={800}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </Paper>
    </motion.div>
  );
};

// Memoize to prevent unnecessary re-renders
export default memo(PriceGraph);
