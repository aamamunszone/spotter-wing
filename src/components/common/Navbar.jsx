import { useState } from 'react';
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import CloseIcon from '@mui/icons-material/Close';
import ThemeToggle from './ThemeToggle';
import LiveStatusIndicator from './LiveStatusIndicator';
import { motion, AnimatePresence } from 'motion/react';

/**
 * Modern Navbar with Centered Logo and Functional Actions
 * Features: Back button, centered branding, theme toggle, profile, and menu drawer
 */
const Navbar = ({ mode, onToggleTheme }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: 'About', icon: <InfoOutlinedIcon />, action: () => {} },
    { text: 'Settings', icon: <SettingsOutlinedIcon />, action: () => {} },
    { text: 'Logout', icon: <LogoutOutlinedIcon />, action: () => {} },
  ];

  return (
    <>
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
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
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
            <Container maxWidth="xl">
              <Toolbar
                disableGutters
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '1fr auto 1fr',
                  alignItems: 'center',
                  py: { xs: 1, sm: 1.5 },
                  minHeight: { xs: 64, sm: 70 },
                  gap: 2,
                }}
              >
                {/* Left Section - Back/Search */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    justifyContent: 'flex-start',
                  }}
                >
                  {!isMobile && (
                    <>
                      <IconButton
                        size="medium"
                        aria-label="Go back"
                        sx={{
                          color: 'text.primary',
                          bgcolor:
                            mode === 'light'
                              ? 'rgba(0, 0, 0, 0.03)'
                              : 'rgba(255, 255, 255, 0.05)',
                          backdropFilter: 'blur(10px)',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            bgcolor:
                              mode === 'light'
                                ? 'rgba(0, 0, 0, 0.06)'
                                : 'rgba(255, 255, 255, 0.1)',
                            transform: 'translateX(-2px)',
                          },
                        }}
                      >
                        <ArrowBackIcon />
                      </IconButton>
                      <IconButton
                        size="medium"
                        aria-label="Search"
                        sx={{
                          color: 'text.primary',
                          bgcolor:
                            mode === 'light'
                              ? 'rgba(0, 0, 0, 0.03)'
                              : 'rgba(255, 255, 255, 0.05)',
                          backdropFilter: 'blur(10px)',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            bgcolor:
                              mode === 'light'
                                ? 'rgba(0, 0, 0, 0.06)'
                                : 'rgba(255, 255, 255, 0.1)',
                          },
                        }}
                      >
                        <SearchIcon />
                      </IconButton>
                    </>
                  )}
                </Box>

                {/* Center Section - Logo */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: { xs: 1.5, sm: 2 },
                    justifyContent: 'center',
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
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: '0 6px 20px rgba(37, 99, 235, 0.5)',
                      },
                    }}
                  >
                    <FlightTakeoffIcon
                      sx={{
                        color: 'white',
                        fontSize: { xs: 24, sm: 28 },
                      }}
                    />
                  </Box>
                  {!isMobile && (
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <Box
                        component="span"
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
                      </Box>
                      <LiveStatusIndicator compact />
                    </Box>
                  )}
                </Box>

                {/* Right Section - Actions */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: { xs: 0.5, sm: 1.5 },
                    justifyContent: 'flex-end',
                  }}
                >
                  {!isMobile && (
                    <ThemeToggle mode={mode} onToggle={onToggleTheme} />
                  )}

                  {!isMobile && (
                    <IconButton
                      size="medium"
                      aria-label="User profile"
                      sx={{
                        p: 0.5,
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          transform: 'scale(1.05)',
                        },
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 36,
                          height: 36,
                          bgcolor: 'primary.main',
                          fontSize: '0.95rem',
                          fontWeight: 700,
                        }}
                      >
                        U
                      </Avatar>
                    </IconButton>
                  )}

                  <IconButton
                    size="medium"
                    aria-label="Open menu"
                    onClick={toggleDrawer(true)}
                    sx={{
                      color: 'text.primary',
                      bgcolor:
                        mode === 'light'
                          ? 'rgba(0, 0, 0, 0.03)'
                          : 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        bgcolor:
                          mode === 'light'
                            ? 'rgba(0, 0, 0, 0.06)'
                            : 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    <MenuIcon />
                  </IconButton>
                </Box>
              </Toolbar>
            </Container>
          </AppBar>
        </motion.div>
      </Box>

      {/* Drawer Menu */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: { xs: '80%', sm: 320 },
            bgcolor:
              mode === 'light'
                ? 'rgba(255, 255, 255, 0.95)'
                : 'rgba(15, 23, 42, 0.95)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderLeft:
              mode === 'light'
                ? '1px solid rgba(0, 0, 0, 0.05)'
                : '1px solid rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        <AnimatePresence>
          {drawerOpen && (
            <motion.div
              initial={{ x: 320 }}
              animate={{ x: 0 }}
              exit={{ x: 320 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <Box sx={{ width: '100%', height: '100%' }}>
                {/* Drawer Header */}
                <Box
                  sx={{
                    p: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar
                      sx={{
                        width: 48,
                        height: 48,
                        bgcolor: 'primary.main',
                        fontSize: '1.25rem',
                        fontWeight: 700,
                      }}
                    >
                      U
                    </Avatar>
                    <Box>
                      <Box
                        sx={{
                          fontWeight: 700,
                          fontSize: '1rem',
                          color: 'text.primary',
                        }}
                      >
                        User Name
                      </Box>
                      <Box
                        sx={{
                          fontSize: '0.85rem',
                          color: 'text.secondary',
                        }}
                      >
                        user@example.com
                      </Box>
                    </Box>
                  </Box>
                  <IconButton
                    onClick={toggleDrawer(false)}
                    sx={{ color: 'text.secondary' }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>

                <Divider sx={{ opacity: 0.1 }} />

                {/* Mobile-only items */}
                {isMobile && (
                  <>
                    <Box sx={{ p: 2 }}>
                      <ThemeToggle
                        mode={mode}
                        onToggle={onToggleTheme}
                        fullWidth
                      />
                    </Box>
                    <Divider sx={{ opacity: 0.1 }} />
                  </>
                )}

                {/* Menu Items */}
                <List sx={{ px: 2, py: 2 }}>
                  {menuItems.map((item, index) => (
                    <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                      <ListItemButton
                        onClick={() => {
                          item.action();
                          setDrawerOpen(false);
                        }}
                        sx={{
                          borderRadius: 2,
                          py: 1.5,
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            bgcolor:
                              mode === 'light'
                                ? 'rgba(0, 0, 0, 0.04)'
                                : 'rgba(255, 255, 255, 0.06)',
                          },
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 40,
                            color: 'text.secondary',
                          }}
                        >
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={item.text}
                          primaryTypographyProps={{
                            fontWeight: 600,
                            fontSize: '0.95rem',
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>

                {/* Footer */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: 3,
                    borderTop:
                      mode === 'light'
                        ? '1px solid rgba(0, 0, 0, 0.05)'
                        : '1px solid rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <Box
                    sx={{
                      fontSize: '0.8rem',
                      color: 'text.secondary',
                      textAlign: 'center',
                    }}
                  >
                    Spotter-Wing © 2026
                  </Box>
                </Box>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Drawer>
    </>
  );
};

export default Navbar;
