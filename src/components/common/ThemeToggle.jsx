import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { motion } from 'motion/react';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

/**
 * Theme toggle button with smooth animation
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
          bgcolor: 'background.paper',
          border: 1,
          borderColor: 'divider',
          '&:hover': {
            bgcolor: 'action.hover',
            transform: 'scale(1.05)',
          },
          transition: 'all 0.2s ease-in-out',
        }}
      >
        <motion.div
          initial={false}
          animate={{
            scale: [0.8, 1.2, 1],
            rotate: isDark ? 180 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          {isDark ? (
            <DarkModeIcon sx={{ color: 'primary.main' }} />
          ) : (
            <LightModeIcon sx={{ color: 'warning.main' }} />
          )}
        </motion.div>
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
