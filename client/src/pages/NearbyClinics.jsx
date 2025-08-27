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
  Paper,
  IconButton,
  Tooltip,
  TextField,
  InputAdornment,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Alert,
  CircularProgress,
  Rating,
  Tabs,
  Tab,
} from '@mui/material';
import {
  LocationOn,
  Search,
  FilterList,
  Directions,
  Phone,
  Email,
  Language,
  AccessTime,
  Star,
  LocalHospital,
  LocalPharmacy,
  MedicalServices,
  Emergency,
  DirectionsCar,
  DirectionsWalk,
  DirectionsBike,
  Public,
  Wifi,
  WheelchairPickup,
  Translate,
  Payment,
  Security,
  Notifications,
  Favorite,
  Share,
  Print,
  Download,
  CloudUpload,
  Settings,
  Refresh,
  MyLocation,
  Map,
  List as ListIcon,
  ViewModule,
  ViewList,
} from '@mui/icons-material';
import Layout from '../components/Layout';

const NearbyClinics = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [distance, setDistance] = useState(10);
  const [viewMode, setViewMode] = useState('grid');
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [nearbyFacilities, setNearbyFacilities] = useState([]);
  const [filteredFacilities, setFilteredFacilities] = useState([]);

  useEffect(() => {
    // Mock nearby facilities data
    const mockFacilities = [
      {
        id: 1,
        name: 'City General Hospital',
        type: 'hospital',
        category: 'Emergency Care',
        address: '123 Medical Center Dr',
        city: 'New York',
        state: 'NY',
        zip: '10001',
        phone: '555-0123',
        email: 'info@citygeneral.com',
        website: 'www.citygeneral.com',
        rating: 4.8,
        reviewCount: 156,
        distance: 0.8,
        eta: '3 min',
        coordinates: { lat: 40.7128, lng: -74.0060 },
        services: ['Emergency', 'Surgery', 'Cardiology', 'Neurology'],
        hours: '24/7',
        insurance: ['Blue Cross', 'Aetna', 'Cigna'],
        features: ['Wheelchair Accessible', 'Free WiFi', 'Multi-language Support', 'Parking Available'],
        status: 'open',
        waitTime: '15 min'
      },
      {
        id: 2,
        name: 'Community Medical Center',
        type: 'clinic',
        category: 'Primary Care',
        address: '456 Health Ave',
        city: 'New York',
        state: 'NY',
        zip: '10002',
        phone: '555-0456',
        email: 'contact@communitymed.com',
        website: 'www.communitymed.com',
        rating: 4.6,
        reviewCount: 89,
        distance: 1.2,
        eta: '5 min',
        coordinates: { lat: 40.7589, lng: -73.9851 },
        services: ['Primary Care', 'Pediatrics', 'Women\'s Health', 'Vaccinations'],
        hours: 'Mon-Fri 8AM-6PM, Sat 9AM-2PM',
        insurance: ['Blue Cross', 'Medicare', 'Medicaid'],
        features: ['Wheelchair Accessible', 'Free WiFi', 'Child-friendly'],
        status: 'open',
        waitTime: '25 min'
      },
      {
        id: 3,
        name: 'Urgent Care Express',
        type: 'urgent-care',
        category: 'Urgent Care',
        address: '789 Care St',
        city: 'New York',
        state: 'NY',
        zip: '10003',
        phone: '555-0789',
        email: 'help@urgentcare.com',
        website: 'www.urgentcare.com',
        rating: 4.4,
        reviewCount: 67,
        distance: 0.5,
        eta: '2 min',
        coordinates: { lat: 40.7505, lng: -73.9934 },
        services: ['Urgent Care', 'X-rays', 'Lab Tests', 'Minor Procedures'],
        hours: 'Mon-Sun 7AM-10PM',
        insurance: ['Blue Cross', 'Aetna', 'Cigna', 'Self-pay'],
        features: ['Wheelchair Accessible', 'Free WiFi', 'Online Check-in'],
        status: 'open',
        waitTime: '10 min'
      },
      {
        id: 4,
        name: 'Downtown Pharmacy',
        type: 'pharmacy',
        category: 'Pharmacy',
        address: '321 Drug Store Blvd',
        city: 'New York',
        state: 'NY',
        zip: '10004',
        phone: '555-0321',
        email: 'pharmacy@downtown.com',
        website: 'www.downtownpharmacy.com',
        rating: 4.7,
        reviewCount: 234,
        distance: 0.3,
        eta: '1 min',
        coordinates: { lat: 40.6892, lng: -74.0445 },
        services: ['Prescriptions', 'Over-the-counter', 'Health Supplies', 'Consultations'],
        hours: 'Mon-Fri 8AM-9PM, Sat-Sun 9AM-6PM',
        insurance: ['All Major Plans'],
        features: ['Wheelchair Accessible', 'Free WiFi', 'Drive-thru', '24/7 Emergency'],
        status: 'open',
        waitTime: '5 min'
      },
      {
        id: 5,
        name: 'Specialty Care Institute',
        type: 'specialty',
        category: 'Specialty Care',
        address: '654 Specialist Way',
        city: 'New York',
        state: 'NY',
        zip: '10005',
        phone: '555-0654',
        email: 'specialty@institute.com',
        website: 'www.specialtyinstitute.com',
        rating: 4.9,
        reviewCount: 189,
        distance: 1.8,
        eta: '7 min',
        coordinates: { lat: 40.7064, lng: -74.0090 },
        services: ['Cardiology', 'Oncology', 'Orthopedics', 'Dermatology'],
        hours: 'Mon-Fri 9AM-5PM',
        insurance: ['Blue Cross', 'Aetna', 'Cigna', 'UnitedHealth'],
        features: ['Wheelchair Accessible', 'Free WiFi', 'Valet Parking', 'Concierge Service'],
        status: 'open',
        waitTime: '45 min'
      }
    ];
    
    setNearbyFacilities(mockFacilities);
    setFilteredFacilities(mockFacilities);
  }, []);

  useEffect(() => {
    // Filter facilities based on search query and category
    let filtered = nearbyFacilities;
    
    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(facility =>
        facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        facility.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        facility.services.some(service => service.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(facility => facility.type === selectedCategory);
    }
    
    // Filter by distance
    filtered = filtered.filter(facility => facility.distance <= distance);
    
    setFilteredFacilities(filtered);
  }, [searchQuery, selectedCategory, distance, nearbyFacilities]);

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
        }
      );
    } else {
      setIsLoadingLocation(false);
      alert('Geolocation is not supported by this browser.');
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'hospital': return <LocalHospital />;
      case 'clinic': return <MedicalServices />;
      case 'urgent-care': return <Emergency />;
      case 'pharmacy': return <LocalPharmacy />;
      case 'specialty': return <MedicalServices />;
      default: return <MedicalServices />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'hospital': return 'error';
      case 'clinic': return 'primary';
      case 'urgent-care': return 'warning';
      case 'pharmacy': return 'success';
      case 'specialty': return 'secondary';
      default: return 'default';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'success';
      case 'closed': return 'error';
      case 'closing-soon': return 'warning';
      default: return 'default';
    }
  };

  const getTransportationIcon = (mode) => {
    switch (mode) {
      case 'driving': return <DirectionsCar />;
      case 'walking': return <DirectionsWalk />;
      case 'biking': return <DirectionsBike />;
      case 'transit': return <Public />;
      default: return <DirectionsCar />;
    }
  };

  const handleGetDirections = (facility) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${facility.coordinates.lat},${facility.coordinates.lng}`;
    window.open(url, '_blank');
  };

  const handleCall = (phone) => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleEmail = (email) => {
    window.open(`mailto:${email}`, '_self');
  };

  const handleWebsite = (website) => {
    window.open(`https://${website}`, '_blank');
  };

  return (
    <Layout>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        {/* Header */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
            Nearby Healthcare Facilities
          </Typography>
          <Typography variant="h6" color="textSecondary" sx={{ mb: 2 }}>
            Find hospitals, clinics, pharmacies, and urgent care centers near you
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Chip 
              icon={<LocationOn />} 
              label="GPS Location" 
              color="primary" 
              variant="outlined"
            />
            <Chip 
              icon={<Search />} 
              label="Smart Search" 
              color="secondary" 
              variant="outlined"
            />
            <Chip 
              icon={<Directions />} 
              label="Turn-by-Turn" 
              color="accent" 
              variant="outlined"
            />
          </Box>
        </Box>

        {/* Search and Filters */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Search facilities, services, or addresses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={selectedCategory}
                    label="Category"
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <MenuItem value="all">All Categories</MenuItem>
                    <MenuItem value="hospital">Hospitals</MenuItem>
                    <MenuItem value="clinic">Clinics</MenuItem>
                    <MenuItem value="urgent-care">Urgent Care</MenuItem>
                    <MenuItem value="pharmacy">Pharmacies</MenuItem>
                    <MenuItem value="specialty">Specialty Centers</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={3}>
                <Box>
                  <Typography variant="body2" gutterBottom>
                    Distance: {distance} miles
                  </Typography>
                  <Slider
                    value={distance}
                    onChange={(e, newValue) => setDistance(newValue)}
                    min={0.5}
                    max={25}
                    step={0.5}
                    marks={[
                      { value: 0.5, label: '0.5' },
                      { value: 5, label: '5' },
                      { value: 10, label: '10' },
                      { value: 25, label: '25' }
                    ]}
                    valueLabelDisplay="auto"
                  />
                </Box>
              </Grid>
              
              <Grid item xs={12} md={2}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<MyLocation />}
                  onClick={getCurrentLocation}
                  disabled={isLoadingLocation}
                  fullWidth
                  sx={{ py: 1.5 }}
                >
                  {isLoadingLocation ? <CircularProgress size={20} /> : 'My Location'}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* View Mode Toggle */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Found {filteredFacilities.length} facilities
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title="Grid View">
              <IconButton
                color={viewMode === 'grid' ? 'primary' : 'default'}
                onClick={() => setViewMode('grid')}
              >
                <ViewModule />
              </IconButton>
            </Tooltip>
            <Tooltip title="List View">
              <IconButton
                color={viewMode === 'list' ? 'primary' : 'default'}
                onClick={() => setViewMode('list')}
              >
                <ViewList />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Facilities Grid/List */}
        {viewMode === 'grid' ? (
          <Grid container spacing={3}>
            {filteredFacilities.map((facility) => (
              <Grid item xs={12} sm={6} md={4} key={facility.id}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    {/* Header */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ 
                          backgroundColor: `${getTypeColor(facility.type)}.light`,
                          color: `${getTypeColor(facility.type)}.main`
                        }}>
                          {getTypeIcon(facility.type)}
                        </Avatar>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {facility.name}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {facility.category}
                          </Typography>
                        </Box>
                      </Box>
                      <Chip 
                        label={facility.status} 
                        color={getStatusColor(facility.status)}
                        size="small"
                      />
                    </Box>
                    
                    {/* Rating and Distance */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Rating value={facility.rating} precision={0.1} size="small" readOnly />
                        <Typography variant="body2" color="textSecondary">
                          ({facility.reviewCount})
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
                          {facility.distance} mi
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {facility.eta} away
                        </Typography>
                      </Box>
                    </Box>
                    
                    {/* Address */}
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {facility.address}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {facility.city}, {facility.state} {facility.zip}
                      </Typography>
                    </Box>
                    
                    {/* Services */}
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Services:
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                        {facility.services.slice(0, 3).map((service, index) => (
                          <Chip
                            key={index}
                            label={service}
                            size="small"
                            variant="outlined"
                            color={getTypeColor(facility.type)}
                          />
                        ))}
                        {facility.services.length > 3 && (
                          <Chip
                            label={`+${facility.services.length - 3} more`}
                            size="small"
                            variant="outlined"
                          />
                        )}
                      </Box>
                    </Box>
                    
                    {/* Features */}
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Features:
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                        {facility.features.slice(0, 2).map((feature, index) => (
                          <Chip
                            key={index}
                            label={feature}
                            size="small"
                            variant="outlined"
                            color="default"
                          />
                        ))}
                      </Box>
                    </Box>
                    
                    {/* Wait Time */}
                    <Box sx={{ mb: 2, p: 1, backgroundColor: 'warning.50', borderRadius: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: 'warning.main' }}>
                        ⏱️ Estimated Wait: {facility.waitTime}
                      </Typography>
                    </Box>
                    
                    {/* Actions */}
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<Directions />}
                        onClick={() => handleGetDirections(facility)}
                        fullWidth
                      >
                        Directions
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        size="small"
                        startIcon={<Phone />}
                        onClick={() => handleCall(facility.phone)}
                        fullWidth
                      >
                        Call
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          /* List View */
          <Box>
            {filteredFacilities.map((facility) => (
              <Paper
                key={facility.id}
                sx={{
                  p: 3,
                  mb: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  '&:hover': {
                    borderColor: 'primary.main',
                    backgroundColor: 'primary.50',
                  }
                }}
              >
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} md={2}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Avatar
                        sx={{
                          width: 56,
                          height: 56,
                          mx: 'auto',
                          mb: 1,
                          backgroundColor: `${getTypeColor(facility.type)}.light`,
                          color: `${getTypeColor(facility.type)}.main`
                        }}
                      >
                        {getTypeIcon(facility.type)}
                      </Avatar>
                      <Chip 
                        label={facility.type.replace('-', ' ')} 
                        color={getTypeColor(facility.type)}
                        size="small"
                        sx={{ textTransform: 'capitalize' }}
                      />
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      {facility.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                      {facility.category}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {facility.address}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {facility.city}, {facility.state} {facility.zip}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} md={2}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                        {facility.distance} mi
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {facility.eta} away
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, mt: 1 }}>
                        <Star sx={{ fontSize: 16, color: 'warning.main' }} />
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {facility.rating}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} md={2}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                        {facility.hours}
                      </Typography>
                      <Chip 
                        label={facility.status} 
                        color={getStatusColor(facility.status)}
                        size="small"
                        sx={{ mb: 1 }}
                      />
                      <Typography variant="body2" color="warning.main" sx={{ fontWeight: 600 }}>
                        Wait: {facility.waitTime}
                      </Typography>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} md={2}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<Directions />}
                        onClick={() => handleGetDirections(facility)}
                        fullWidth
                      >
                        Directions
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        size="small"
                        startIcon={<Phone />}
                        onClick={() => handleCall(facility.phone)}
                        fullWidth
                      >
                        Call
                      </Button>
                      <Button
                        variant="outlined"
                        color="info"
                        size="small"
                        startIcon={<Language />}
                        onClick={() => handleWebsite(facility.website)}
                        fullWidth
                      >
                        Website
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            ))}
          </Box>
        )}

        {/* Map Integration Notice */}
        <Box sx={{ mt: 4 }}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #0D9488 0%, #14B8A6 100%)',
            color: 'white'
          }}>
            <CardContent sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                🗺️ Google Maps Integration
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
                Get real-time directions, traffic updates, and turn-by-turn navigation to any healthcare facility
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                <Chip 
                  icon={<DirectionsCar />} 
                  label="Driving Directions" 
                  sx={{ 
                    backgroundColor: 'rgba(255,255,255,0.2)', 
                    color: 'white',
                    fontWeight: 600
                  }} 
                />
                <Chip 
                  icon={<DirectionsWalk />} 
                  label="Walking Routes" 
                  sx={{ 
                    backgroundColor: 'rgba(255,255,255,0.2)', 
                    color: 'white',
                    fontWeight: 600
                  }} 
                />
                <Chip 
                  icon={<Public />} 
                  label="Public Transit" 
                  sx={{ 
                    backgroundColor: 'rgba(255,255,255,0.2)', 
                    color: 'white',
                    fontWeight: 600
                  }} 
                />
                <Chip 
                  icon={<AccessTime />} 
                  label="Real-time Traffic" 
                  sx={{ 
                    backgroundColor: 'rgba(255,255,255,0.2)', 
                    color: 'white',
                    fontWeight: 600
                  }} 
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Layout>
  );
};

export default NearbyClinics;
