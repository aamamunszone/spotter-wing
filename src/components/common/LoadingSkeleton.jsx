import { Box, Paper, Skeleton } from '@mui/material';

/**
 * Loading skeleton for flight cards with glassmorphic design
 */
export const FlightCardSkeleton = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        mb: 3,
        p: { xs: 3, sm: 4 },
        borderRadius: 3,
        bgcolor: 'background.paper',
        backdropFilter: 'blur(15px)',
        WebkitBackdropFilter: 'blur(15px)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'stretch', md: 'center' },
          gap: { xs: 3, md: 4 },
        }}
      >
        {/* Airline */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Skeleton
            variant="rounded"
            width={56}
            height={56}
            sx={{ borderRadius: 2 }}
          />
          <Skeleton variant="text" width={40} sx={{ mt: 1 }} />
        </Box>

        {/* Journey */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: { xs: 3, sm: 4, md: 6 },
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <Skeleton variant="text" width={60} height={32} />
            <Skeleton variant="text" width={50} height={20} />
          </Box>

          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Skeleton variant="text" width={80} height={20} />
            <Skeleton
              variant="rectangular"
              width="100%"
              height={2}
              sx={{ my: 1 }}
            />
            <Skeleton variant="text" width={60} height={20} />
          </Box>

          <Box sx={{ textAlign: 'center' }}>
            <Skeleton variant="text" width={60} height={32} />
            <Skeleton variant="text" width={50} height={20} />
          </Box>
        </Box>

        {/* Price */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'row', md: 'column' },
            alignItems: { xs: 'center', md: 'flex-end' },
            justifyContent: { xs: 'space-between', md: 'center' },
            gap: 2,
          }}
        >
          <Skeleton variant="text" width={100} height={40} />
          <Skeleton
            variant="rounded"
            width={100}
            height={40}
            sx={{ borderRadius: 2 }}
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
