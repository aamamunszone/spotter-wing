import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'motion/react';

/**
 * Live API status indicator with pulsing animation
 */
const LiveStatusIndicator = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        px: 2,
        py: 1,
        borderRadius: 3,
        bgcolor: 'rgba(16, 185, 129, 0.1)',
        border: '1px solid rgba(16, 185, 129, 0.3)',
      }}
    >
      {/* Pulsing Dot */}
      <Box sx={{ position: 'relative', width: 10, height: 10 }}>
        <motion.div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            backgroundColor: '#10B981',
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            bgcolor: '#10B981',
          }}
        />
      </Box>

      {/* Status Text */}
      <Typography
        variant="caption"
        sx={{
          fontWeight: 700,
          color: '#10B981',
          fontSize: { xs: '0.7rem', sm: '0.75rem' },
          display: { xs: 'none', sm: 'block' },
        }}
      >
        Live API Connected
      </Typography>
    </Box>
  );
};

export default LiveStatusIndicator;
