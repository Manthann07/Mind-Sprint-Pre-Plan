import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListSubheader,
  Chip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  EventNote,
  Person,
  ExitToApp,
  HealthAndSafety,
  Medication,
  Psychology,
  Watch,
  Emergency,
  Public,
  SmartToy,
  LocationOn,
  VideoCall,
  Description,
  Analytics,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const drawerWidth = 280;

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  // Temporary mock user for development
  const user = {
    profile: {
      firstName: 'John',
      lastName: 'Doe'
    },
    role: 'patient'
  };
  const logout = () => {
    navigate('/');
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Core Features
  const coreFeatures = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/' },
    { text: 'Appointments', icon: <EventNote />, path: '/appointments' },
    { text: 'Video Consultation', icon: <VideoCall />, path: '/consultation' },
    { text: 'Health Records', icon: <Description />, path: '/health-records' },
    { text: 'Prescriptions', icon: <Medication />, path: '/prescriptions' },
    { text: 'AI Symptom Checker', icon: <Psychology />, path: '/symptom-checker' },
  ];

  // Advanced Features
  const advancedFeatures = [
    { text: 'Wearable Integration', icon: <Watch />, path: '/wearable-integration' },
    { text: 'Emergency Services', icon: <Emergency />, path: '/emergency-services' },
    { text: 'Nearby Clinics', icon: <LocationOn />, path: '/nearby-clinics' },
  ];

  // Wow Factor Features
  const wowFeatures = [
    { text: 'Community Health', icon: <Public />, path: '/community-health' },
    { text: 'Virtual Assistant', icon: <SmartToy />, path: '/virtual-assistant' },
    { text: 'Health Analytics', icon: <Analytics />, path: '/analytics' },
  ];

  const drawer = (
    <div>
      <Toolbar />
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
          HealthXCare
        </Typography>
        <Typography variant="caption" color="textSecondary">
          Your Complete Health Solution
        </Typography>
      </Box>
      
      <List>
        <ListSubheader sx={{ 
          backgroundColor: 'background.paper', 
          color: 'primary.main',
          fontWeight: 600,
          fontSize: '0.875rem'
        }}>
          Core Features
        </ListSubheader>
        {coreFeatures.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => navigate(item.path)}
            selected={location.pathname === item.path}
            sx={{
              mx: 1,
              borderRadius: 2,
              mb: 0.5,
              '&.Mui-selected': {
                backgroundColor: 'primary.light',
                color: 'primary.contrastText',
                '&:hover': {
                  backgroundColor: 'primary.main',
                },
              },
            }}
          >
            <ListItemIcon sx={{ 
              color: location.pathname === item.path ? 'primary.contrastText' : 'primary.main' 
            }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        
        <Divider sx={{ my: 2 }} />
        
        <ListSubheader sx={{ 
          backgroundColor: 'background.paper', 
          color: 'secondary.main',
          fontWeight: 600,
          fontSize: '0.875rem'
        }}>
          Advanced Features
        </ListSubheader>
        {advancedFeatures.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => navigate(item.path)}
            selected={location.pathname === item.path}
            sx={{
              mx: 1,
              borderRadius: 2,
              mb: 0.5,
              '&.Mui-selected': {
                backgroundColor: 'secondary.light',
                color: 'secondary.contrastText',
                '&:hover': {
                  backgroundColor: 'secondary.main',
                },
              },
            }}
          >
            <ListItemIcon sx={{ 
              color: location.pathname === item.path ? 'secondary.contrastText' : 'secondary.main' 
            }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        
        <Divider sx={{ my: 2 }} />
        
        <ListSubheader sx={{ 
          backgroundColor: 'background.paper', 
          color: 'accent.main',
          fontWeight: 600,
          fontSize: '0.875rem'
        }}>
          Premium Features
        </ListSubheader>
        {wowFeatures.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => navigate(item.path)}
            selected={location.pathname === item.path}
            sx={{
              mx: 1,
              borderRadius: 2,
              mb: 0.5,
              '&.Mui-selected': {
                backgroundColor: 'accent.light',
                color: 'accent.contrastText',
                '&:hover': {
                  backgroundColor: 'accent.main',
                },
              },
            }}
          >
            <ListItemIcon sx={{ 
              color: location.pathname === item.path ? 'accent.contrastText' : 'accent.main' 
            }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
            <Chip 
              label="NEW" 
              size="small" 
              sx={{ 
                backgroundColor: 'accent.main', 
                color: 'white',
                fontSize: '0.7rem',
                height: 20
              }} 
            />
          </ListItem>
        ))}
        
        <Divider sx={{ my: 2 }} />
        
        <ListItem
          button
          onClick={() => navigate('/profile')}
          selected={location.pathname === '/profile'}
          sx={{
            mx: 1,
            borderRadius: 2,
            mb: 0.5,
            '&.Mui-selected': {
              backgroundColor: 'grey.200',
            },
          }}
        >
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: 'primary.main',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Toolbar component={motion.div} initial={{ y: -12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3 }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <HealthAndSafety sx={{ mr: 1, fontSize: 28 }} />
            <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 600 }}>
              HealthXCare
            </Typography>
          </Box>
          <Button
            onClick={handleMenuOpen}
            color="inherit"
            startIcon={
              <Avatar
                sx={{ 
                  width: 32, 
                  height: 32,
                  backgroundColor: 'secondary.main',
                  fontWeight: 600
                }}
                alt={user?.profile?.firstName}
              >
                {user?.profile?.firstName?.charAt(0)}
              </Avatar>
            }
            sx={{ textTransform: 'none' }}
          >
            {user?.profile?.firstName}
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => {
              handleMenuClose();
              navigate('/profile');
            }}>
              Profile
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ExitToApp sx={{ mr: 1 }} />
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          <motion.div initial={{ x: -24, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.25 }}>
            {drawer}
          </motion.div>
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: '1px solid',
              borderColor: 'divider',
            },
          }}
          open
        >
          <motion.div initial={{ x: -12, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.3 }}>
            {drawer}
          </motion.div>
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: 'background.default',
          minHeight: '100vh',
        }}
      >
        <Toolbar />
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
          {children}
        </motion.div>
      </Box>
    </Box>
  );
};

export default Layout;
