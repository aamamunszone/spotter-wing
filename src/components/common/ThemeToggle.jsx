import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { motion } from 'motion/react';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

/**
 * Theme toggle button with smooth rotation animation
 */
const ThemeToggle = ({ mode, onToggle }) => {
  const isDark = mode === 'dark';

  return (
    <Tooltip title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
      <IconButton
        onClick={onToggle}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        sx={{
          width: 44,
          height: 44,
          borderRadius: 2,
          bgcolor:
            mode === 'light'
              ? 'rgba(255, 255, 255, 0.3)'
              : 'rgba(15, 23, 42, 0.5)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border:
            mode === 'light'
              ? '1px solid rgba(255, 255, 255, 0.4)'
              : '1px solid rgba(255, 255, 255, 0.15)',
          '&:hover': {
            bgcolor:
              mode === 'light'
                ? 'rgba(255, 255, 255, 0.5)'
                : 'rgba(15, 23, 42, 0.7)',
            transform: 'scale(1.05)',
          },
          transition: 'all 0.2s ease-in-out',
        }}
      >
        <motion.div
          initial={false}
          animate={{
            rotate: isDark ? 180 : 0,
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: { duration: 0.5, ease: 'easeInOut' },
            scale: { duration: 0.3 },
          }}
        >
          {isDark ? (
            <DarkModeIcon sx={{ color: '#60A5FA' }} />
          ) : (
            <LightModeIcon sx={{ color: '#F59E0B' }} />
          )}
        </motion.div>
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
