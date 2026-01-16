import React from 'react';
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

const PriceGraph = ({ data }) => {
  const chartData = data.map((flight, index) => ({
    name: `Flight ${index + 1}`,
    price: parseFloat(flight.price.total),
    airline: flight.validatingAirlineCodes[0],
  }));

  if (data.length === 0) return null;

  return (
    <Paper
      elevation={0}
      className="p-6 rounded-3xl border border-neutral-200 bg-white mb-8"
    >
      <Box className="mb-4 flex justify-between items-center">
        <Typography variant="h6" className="font-bold text-neutral-800">
          Price Insights
        </Typography>
        <Typography variant="caption" className="text-neutral-500 font-medium">
          Showing trends for current results
        </Typography>
      </Box>

      <div className="h-62.5 w-full">
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
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#2563eb"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorPrice)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Paper>
  );
};

export default PriceGraph;
