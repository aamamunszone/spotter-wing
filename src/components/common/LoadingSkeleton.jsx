import React from 'react';
import { Box, Paper, Skeleton } from '@mui/material';

/**
 * Loading skeleton for flight cards
 */
export const FlightCardSkeleton = () => {
  return (
    <Paper
      elevation={0}
      className="mb-4 p-5 rounded-2xl border border-neutral-200"
    >
      <Box className="flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Airline */}
        <Box className="flex flex-col items-center">
          <Skeleton variant="circular" width={48} height={48} />
          <Skeleton variant="text" width={40} className="mt-1" />
        </Box>

        {/* Journey */}
        <Box className="flex-1 flex justify-center items-center gap-8 w-full">
          <Box className="text-center">
            <Skeleton variant="text" width={60} height={32} />
            <Skeleton variant="text" width={50} height={20} />
          </Box>

          <Box className="flex-1 flex flex-col items-center">
            <Skeleton variant="text" width={80} height={20} />
            <Skeleton
              variant="rectangular"
              width="100%"
              height={2}
              className="my-2"
            />
            <Skeleton variant="text" width={60} height={20} />
          </Box>

          <Box className="text-center">
            <Skeleton variant="text" width={60} height={32} />
            <Skeleton variant="text" width={50} height={20} />
          </Box>
        </Box>

        {/* Price */}
        <Box className="flex flex-col items-end">
          <Skeleton variant="text" width={100} height={40} />
          <Skeleton
            variant="rectangular"
            width={100}
            height={36}
            className="mt-2 rounded-lg"
          />
        </Box>
      </Box>
    </Paper>
  );
};

/**
 * Multiple loading skeletons
 */
export const FlightListSkeleton = ({ count = 3 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <FlightCardSkeleton key={index} />
      ))}
    </>
  );
};
