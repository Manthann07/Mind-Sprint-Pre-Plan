import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Paper,
  Divider,
  IconButton,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import {
  Emergency,
  LocationOn,
  Phone,
  Warning,
  Info,
  Close,
  Share,
  Navigation,
  LocalHospital,
  LocalPolice,
  LocalFireDepartment,
  DirectionsCar,
  Person,
  AccessTime,
  Speed,
} from '@mui/icons-material';
import Layout from '../components/Layout';

const EmergencyServices = () => {
  const [showSOSDialog, setShowSOSDialog] = useState(false);
  const [showLocationDialog, setShowLocationDialog] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [nearbyHospitals, setNearbyHospitals] = useState([]);

  useEffect(() => {
    // Mock emergency contacts
    setEmergencyContacts([
      {
        id: 1,
        name: 'Emergency Services',
        number: '911',
        type: 'emergency',
        description: 'Police, Fire, Ambulance'
      },
      {
        id: 2,
        name: 'Poison Control',
        number: '1-800-222-1222',
        type: 'poison',
        description: '24/7 Poison Information'
      },
      {
        id: 3,
        name: 'Suicide Prevention',
        number: '988',
        type: 'mental-health',
        description: 'Crisis Support Line'
      },
      {
        id: 4,
        name: 'Local Hospital',
        number: '555-0123',
        type: 'hospital',
        description: 'City General Hospital'
      }
    ]);

    // Mock nearby hospitals
    setNearbyHospitals([
      {
        id: 1,
        name: 'City General Hospital',
        distance: '0.8 miles',
        eta: '3 min',
        address: '123 Medical Center Dr',
        phone: '555-0123',
        emergency: true,
        rating: 4.8
      },
      {
        id: 2,
        name: 'Community Medical Center',
        distance: '1.2 miles',
        eta: '5 min',
        address: '456 Health Ave',
        phone: '555-0456',
        emergency: true,
        rating: 4.6
      },
      {
        id: 3,
        name: 'Urgent Care Clinic',
        distance: '0.5 miles',
        eta: '2 min',
        address: '789 Care St',
        phone: '555-0789',
        emergency: false,
        rating: 4.4
      }
    ]);
  }, []);

  const handleSOS = () => {
    setShowSOSDialog(true);
    // In a real app, this would:
    // 1. Get current location
    // 2. Send emergency alert to contacts
    // 3. Contact emergency services
    // 4. Share location with family/emergency contacts
  };

  const getCurrentLocation = () => {
    setIsLoadingLocation(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy
          };
          setCurrentLocation(location);
          setIsLoadingLocation(false);
          setShowLocationDialog(true);
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsLoadingLocation(false);
          // Mock location for demo
          setCurrentLocation({
            lat: 40.7128,
            lng: -74.0060,
            accuracy: 100
          });
          setShowLocationDialog(true);
        }
      );
    } else {
      setIsLoadingLocation(false);
      alert('Geolocation is not supported by this browser.');
    }
  };

  const shareLocation = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Emergency Location',
        text: `Emergency location: ${currentLocation.lat}, ${currentLocation.lng}`,
        url: `https://maps.google.com/?q=${currentLocation.lat},${currentLocation.lng}`
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(
        `Emergency location: https://maps.google.com/?q=${currentLocation.lat},${currentLocation.lng}`
      );
      alert('Location copied to clipboard!');
    }
  };

  const callEmergency = (number) => {
    window.open(`tel:${number}`, '_self');
  };

  const getEmergencyTypeColor = (type) => {
    switch (type) {
      case 'emergency': return 'error';
      case 'poison': return 'warning';
      case 'mental-health': return 'info';
      case 'hospital': return 'primary';
      default: return 'default';
    }
  };

  const getEmergencyTypeIcon = (type) => {
    switch (type) {
      case 'emergency': return <Emergency />;
      case 'poison': return <Warning />;
      case 'mental-health': return <Info />;
      case 'hospital': return <LocalHospital />;
      default: return <Phone />;
    }
  };

  return (
    <Layout>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        {/* Emergency Header */}
        <Box sx={{ 
          background: 'linear-gradient(135deg, #DC2626 0%, #EF4444 100%)',
          color: 'white',
          p: 4,
          borderRadius: 3,
          mb: 4,
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Typography variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
              🚨 Emergency Services
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, mb: 3 }}>
              24/7 Emergency Support & Location Services
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Chip 
                label="SOS Button Available" 
                sx={{ 
                  backgroundColor: 'rgba(255,255,255,0.2)', 
                  color: 'white',
                  fontWeight: 600
                }} 
              />
              <Chip 
                label="GPS Location Tracking" 
                sx={{ 
                  backgroundColor: 'rgba(255,255,255,0.2)', 
                  color: 'white',
                  fontWeight: 600
                }} 
              />
              <Chip 
                label="Emergency Contacts" 
                sx={{ 
                  backgroundColor: 'rgba(255,255,255,0.2)', 
                  color: 'white',
                  fontWeight: 600
                }} 
              />
            </Box>
          </Box>
          <Box 
            sx={{ 
              position: 'absolute', 
              right: -50, 
              top: -50, 
              opacity: 0.1,
              transform: 'rotate(15deg)'
            }}
          >
            <Emergency sx={{ fontSize: 200 }} />
          </Box>
        </Box>

        {/* SOS Button */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: 'error.main',
              color: 'white',
              fontSize: '1.5rem',
              padding: '20px 40px',
              borderRadius: '50px',
              boxShadow: '0 8px 32px rgba(220, 38, 38, 0.4)',
              '&:hover': {
                backgroundColor: 'error.dark',
                transform: 'scale(1.05)',
                boxShadow: '0 12px 40px rgba(220, 38, 38, 0.6)',
              },
              transition: 'all 0.3s ease',
            }}
            onClick={handleSOS}
            startIcon={<Emergency sx={{ fontSize: 40 }} />}
          >
            SOS EMERGENCY
          </Button>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
            Press this button in case of medical emergency, accident, or life-threatening situation
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Emergency Contacts */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: 'error.main' }}>
                  Emergency Contacts
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                  Quick access to emergency services and support lines
                </Typography>
                
                <List>
                  {emergencyContacts.map((contact) => (
                    <ListItem
                      key={contact.id}
                      sx={{
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 2,
                        mb: 2,
                        '&:hover': {
                          borderColor: 'error.main',
                          backgroundColor: 'error.50',
                        }
                      }}
                    >
                      <ListItemIcon>
                        <Avatar sx={{ 
                          backgroundColor: `${getEmergencyTypeColor(contact.type)}.light`,
                          color: `${getEmergencyTypeColor(contact.type)}.main`
                        }}>
                          {getEmergencyTypeIcon(contact.type)}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                              {contact.name}
                            </Typography>
                            <Chip 
                              label={contact.type} 
                              size="small" 
                              color={getEmergencyTypeColor(contact.type)}
                              variant="outlined"
                            />
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
                              {contact.number}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              {contact.description}
                            </Typography>
                          </Box>
                        }
                      />
                      <Button
                        variant="contained"
                        color="error"
                        startIcon={<Phone />}
                        onClick={() => callEmergency(contact.number)}
                        sx={{ minWidth: 'auto' }}
                      >
                        Call
                      </Button>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Location Services */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                  Location Services
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                  Share your location with emergency services and contacts
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<LocationOn />}
                    onClick={getCurrentLocation}
                    disabled={isLoadingLocation}
                    sx={{ py: 2 }}
                  >
                    {isLoadingLocation ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      'Get Current Location'
                    )}
                  </Button>
                  
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="large"
                    startIcon={<Share />}
                    onClick={shareLocation}
                    disabled={!currentLocation}
                    sx={{ py: 2 }}
                  >
                    Share Location
                  </Button>
                  
                  <Button
                    variant="outlined"
                    color="accent"
                    size="large"
                    startIcon={<Navigation />}
                    disabled={!currentLocation}
                    sx={{ py: 2 }}
                  >
                    Open in Maps
                  </Button>
                </Box>

                {currentLocation && (
                  <Paper sx={{ mt: 3, p: 2, backgroundColor: 'success.50' }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                      Current Location:
                    </Typography>
                    <Typography variant="body2" fontFamily="monospace">
                      Latitude: {currentLocation.lat.toFixed(6)}
                    </Typography>
                    <Typography variant="body2" fontFamily="monospace">
                      Longitude: {currentLocation.lng.toFixed(6)}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Accuracy: ±{currentLocation.accuracy} meters
                    </Typography>
                  </Paper>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Nearby Hospitals */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: 'secondary.main' }}>
                  Nearby Medical Facilities
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                  Find the closest hospitals and urgent care centers
                </Typography>
                
                <Grid container spacing={2}>
                  {nearbyHospitals.map((hospital) => (
                    <Grid item xs={12} md={4} key={hospital.id}>
                      <Paper
                        sx={{
                          p: 2,
                          border: '1px solid',
                          borderColor: 'divider',
                          borderRadius: 2,
                          '&:hover': {
                            borderColor: 'secondary.main',
                            backgroundColor: 'secondary.50',
                          }
                        }}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                          <Box>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                              {hospital.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              {hospital.address}
                            </Typography>
                          </Box>
                          <Chip 
                            label={hospital.emergency ? 'Emergency' : 'Urgent Care'} 
                            color={hospital.emergency ? 'error' : 'warning'}
                            size="small"
                          />
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <LocationOn fontSize="small" color="primary" />
                            <Typography variant="body2">{hospital.distance}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Speed fontSize="small" color="secondary" />
                            <Typography variant="body2">{hospital.eta}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Person fontSize="small" color="accent" />
                            <Typography variant="body2">{hospital.rating}/5</Typography>
                          </Box>
                        </Box>
                        
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            startIcon={<Phone />}
                            onClick={() => callEmergency(hospital.phone)}
                            fullWidth
                          >
                            Call
                          </Button>
                          <Button
                            variant="outlined"
                            color="secondary"
                            size="small"
                            startIcon={<Navigation />}
                            fullWidth
                          >
                            Directions
                          </Button>
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Emergency Instructions */}
        <Box sx={{ mt: 4 }}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #F97316 0%, #FB923C 100%)',
            color: 'white'
          }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                🚨 Emergency Response Instructions
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    What to do in an emergency:
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <Typography variant="body2" color="white">1.</Typography>
                      </ListItemIcon>
                      <ListItemText primary="Stay calm and assess the situation" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Typography variant="body2" color="white">2.</Typography>
                      </ListItemIcon>
                      <ListItemText primary="Press the SOS button if life-threatening" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Typography variant="body2" color="white">3.</Typography>
                      </ListItemIcon>
                      <ListItemText primary="Call appropriate emergency number" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Typography variant="body2" color="white">4.</Typography>
                      </ListItemIcon>
                      <ListItemText primary="Share your location if possible" />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Remember:
                  </Typography>
                  <Alert severity="warning" sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      ⚠️ This app is NOT a substitute for professional medical care
                    </Typography>
                    <Typography variant="body2">
                      Always call emergency services (911) for life-threatening situations
                    </Typography>
                  </Alert>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* SOS Emergency Dialog */}
      <Dialog
        open={showSOSDialog}
        onClose={() => setShowSOSDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ 
          backgroundColor: 'error.main', 
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          <Emergency />
          EMERGENCY SOS ACTIVATED
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              🚨 EMERGENCY ALERT TRIGGERED
            </Typography>
            <Typography variant="body1">
              Emergency services are being notified. Please stay calm and follow instructions.
            </Typography>
          </Alert>
          
          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>Immediate Actions:</strong>
          </Typography>
          
          <List>
            <ListItem>
              <ListItemIcon>
                <Emergency color="error" />
              </ListItemIcon>
              <ListItemText primary="Calling 911 Emergency Services" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <LocationOn color="primary" />
              </ListItemIcon>
              <ListItemText primary="Sharing your location with emergency contacts" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Phone color="secondary" />
              </ListItemIcon>
              <ListItemText primary="Notifying your emergency contacts" />
            </ListItem>
          </List>
          
          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography variant="body2">
              <strong>Stay on the line</strong> with emergency services and follow their instructions.
              Help is on the way.
            </Typography>
          </Alert>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button 
            variant="outlined" 
            onClick={() => setShowSOSDialog(false)}
          >
            I Understand
          </Button>
          <Button 
            variant="contained" 
            color="error"
            startIcon={<Phone />}
            onClick={() => {
              callEmergency('911');
              setShowSOSDialog(false);
            }}
          >
            Call 911 Now
          </Button>
        </DialogActions>
      </Dialog>

      {/* Location Dialog */}
      <Dialog
        open={showLocationDialog}
        onClose={() => setShowLocationDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ 
          backgroundColor: 'primary.main', 
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}>
          <LocationOn />
          Location Retrieved
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Your current location has been successfully retrieved:
          </Typography>
          
          <Paper sx={{ p: 2, backgroundColor: 'grey.50', mb: 2 }}>
            <Typography variant="h6" fontFamily="monospace" gutterBottom>
              {currentLocation?.lat.toFixed(6)}, {currentLocation?.lng.toFixed(6)}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Accuracy: ±{currentLocation?.accuracy} meters
            </Typography>
          </Paper>
          
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            This location can now be shared with emergency services and your contacts.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button 
            variant="outlined" 
            onClick={() => setShowLocationDialog(false)}
          >
            Close
          </Button>
          <Button 
            variant="contained" 
            color="primary"
            startIcon={<Share />}
            onClick={() => {
              shareLocation();
              setShowLocationDialog(false);
            }}
          >
            Share Location
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default EmergencyServices;
