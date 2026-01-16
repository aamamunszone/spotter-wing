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
import { Paper, Typography, Box } from '@mui/material';
import { motion } from 'motion/react';

const PriceGraph = ({ data }) => {
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
        className="p-6 rounded-3xl border border-neutral-200 bg-white mb-8"
        role="region"
        aria-label="Price insights chart"
      >
        <Box className="mb-4 flex justify-between items-center">
          <Typography variant="h6" className="font-bold text-neutral-800">
            Price Insights
          </Typography>
          <Typography
            variant="caption"
            className="text-neutral-500 font-medium"
          >
            {data.length} result{data.length !== 1 ? 's' : ''}
          </Typography>
        </Box>

        {/* Price Stats */}
        <Box className="mb-4 flex gap-4 text-center">
          <Box className="flex-1">
            <Typography
              variant="caption"
              className="text-neutral-400 uppercase text-xs"
            >
              Lowest
            </Typography>
            <Typography variant="body2" className="font-bold text-green-600">
              ${minPrice.toFixed(0)}
            </Typography>
          </Box>
          <Box className="flex-1">
            <Typography
              variant="caption"
              className="text-neutral-400 uppercase text-xs"
            >
              Average
            </Typography>
            <Typography variant="body2" className="font-bold text-blue-600">
              ${avgPrice.toFixed(0)}
            </Typography>
          </Box>
          <Box className="flex-1">
            <Typography
              variant="caption"
              className="text-neutral-400 uppercase text-xs"
            >
              Highest
            </Typography>
            <Typography variant="body2" className="font-bold text-red-600">
              ${maxPrice.toFixed(0)}
            </Typography>
          </Box>
        </Box>

        <div
          className="h-62.5 w-full"
          role="img"
          aria-label={`Price trend chart showing ${data.length} flights ranging from $${minPrice.toFixed(0)} to $${maxPrice.toFixed(0)}`}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f0f0f0"
              />
              <XAxis dataKey="name" hide />
              <YAxis
                domain={['auto', 'auto']}
                tick={{ fontSize: 12, fill: '#94a3b8' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: 'none',
                  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                }}
                formatter={(value) => [`$${value}`, 'Price']}
                labelFormatter={(label) => label}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#2563eb"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorPrice)"
                animationDuration={800}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Paper>
    </motion.div>
  );
};

// Memoize to prevent unnecessary re-renders
export default memo(PriceGraph);
