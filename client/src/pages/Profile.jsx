import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Avatar,
  Chip,
  Paper,
  TextField,
  Switch,
  FormControlLabel,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress,
  Tabs,
  Tab,
  Badge,
} from '@mui/material';
import {
  Person,
  Edit,
  Save,
  Cancel,
  Security,
  Notifications,
  Language,
  Accessibility,
  PrivacyTip,
  Help,
  Logout,
  VerifiedUser,
  Email,
  Phone,
  LocationOn,
  CalendarToday,
  Male,
  Female,
  Favorite,
  Height,
  Speed,
  Opacity,
  DirectionsWalk,
  Bed,
  CloudUpload,
  Download,
  Share,
  Print,
  Settings,
  AccountCircle,
  HealthAndSafety,
  Emergency,
  Watch,
  Psychology,
  VideoCall,
  Description,
  Medication,
  LocationCity,
  Work,
  School,
  People,

} from '@mui/icons-material';
import Layout from '../components/Layout';

const Profile = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const [editProfile, setEditProfile] = useState({});

  useEffect(() => {
    // Mock user profile data
    const mockProfile = {
      personal: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@email.com',
        phone: '+1 (555) 123-4567',
        dateOfBirth: '1985-03-15',
        gender: 'male',
        bloodType: 'O+',
        height: '5\'10"',
        weight: '175 lbs',
        emergencyContact: {
          name: 'Jane Doe',
          relationship: 'Spouse',
          phone: '+1 (555) 987-6543',
          email: 'jane.doe@email.com'
        }
      },
      medical: {
        primaryCarePhysician: 'Dr. Sarah Wilson',
        hospital: 'City General Hospital',
        insuranceProvider: 'Blue Cross Blue Shield',
        policyNumber: 'BCBS123456789',
        allergies: ['Penicillin', 'Peanuts'],
        conditions: ['Hypertension', 'Type 2 Diabetes'],
        medications: ['Lisinopril 10mg', 'Metformin 500mg'],
        lastCheckup: '2024-01-10',
        nextCheckup: '2024-04-10'
      },
      preferences: {
        notifications: {
          email: true,
          sms: false,
          push: true,
          appointmentReminders: true,
          medicationReminders: true,
          healthAlerts: true
        },
        privacy: {
          shareDataWithDoctors: true,
          shareDataForResearch: false,
          shareDataWithFamily: true,
          allowEmergencyAccess: true
        },
        accessibility: {
          highContrast: false,
          largeText: false,
          screenReader: false,
          voiceCommands: true
        }
      },
      activity: {
        lastLogin: new Date(Date.now() - 3600000), // 1 hour ago
        totalLogins: 156,
        lastAppointment: '2024-01-15',
        nextAppointment: '2024-02-20',
        healthScore: 85,
        streakDays: 12
      }
    };
    
    setUserProfile(mockProfile);
    setEditProfile(mockProfile);
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setUserProfile(editProfile);
    setIsEditing(false);
    // In a real app, this would save to the backend
  };

  const handleCancel = () => {
    setEditProfile(userProfile);
    setIsEditing(false);
  };

  const handleInputChange = (section, field, value) => {
    setEditProfile(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleLogout = () => {
    // In a real app, this would clear auth tokens and redirect
    console.log('Logging out...');
    setShowLogoutDialog(false);
  };

  const getGenderIcon = (gender) => {
    return gender === 'male' ? <Male /> : <Female />;
  };

  const getGenderColor = (gender) => {
    return gender === 'male' ? 'primary' : 'secondary';
  };

  const TabPanel = ({ children, value, index, ...other }) => (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );

  return (
    <Layout>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        {/* Profile Header */}
        <Card sx={{ mb: 4, background: 'linear-gradient(135deg, #1E3A8A 0%, #0D9488 100%)', color: 'white' }}>
          <CardContent sx={{ p: 4 }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                      <IconButton
                        size="small"
                        sx={{ 
                          backgroundColor: 'white', 
                          color: 'primary.main',
                          '&:hover': { backgroundColor: 'grey.100' }
                        }}
                      >
                        <Edit />
                      </IconButton>
                    }
                  >
                    <Avatar
                      sx={{
                        width: 120,
                        height: 120,
                        fontSize: '3rem',
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        border: '4px solid rgba(255,255,255,0.3)'
                      }}
                    >
                      {userProfile.personal?.firstName?.charAt(0)}
                    </Avatar>
                  </Badge>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
                  {userProfile.personal?.firstName} {userProfile.personal?.lastName}
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9, mb: 2 }}>
                  {userProfile.personal?.email}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Chip 
                    icon={<VerifiedUser />}
                    label="Verified Account" 
                    sx={{ 
                      backgroundColor: 'rgba(255,255,255,0.2)', 
                      color: 'white',
                      fontWeight: 600
                    }} 
                  />
                  <Chip 
                    icon={<HealthAndSafety />}
                    label="Premium Member" 
                    sx={{ 
                      backgroundColor: 'accent.main', 
                      color: 'white',
                      fontWeight: 600
                    }} 
                  />
                  <Chip 
                    icon={<CalendarToday />}
                    label={`Member since ${new Date().getFullYear() - 2}`} 
                    sx={{ 
                      backgroundColor: 'rgba(255,255,255,0.2)', 
                      color: 'white',
                      fontWeight: 600
                    }} 
                  />
                </Box>
              </Grid>
              
              <Grid item xs={12} md={3}>
                <Box sx={{ textAlign: 'right' }}>
                  <Button
                    variant={isEditing ? "outlined" : "contained"}
                    color={isEditing ? "warning" : "secondary"}
                    onClick={isEditing ? handleSave : handleEdit}
                    startIcon={isEditing ? <Save /> : <Edit />}
                    sx={{ mb: 2, minWidth: 120 }}
                  >
                    {isEditing ? 'Save Changes' : 'Edit Profile'}
                  </Button>
                  {isEditing && (
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={handleCancel}
                      startIcon={<Cancel />}
                      sx={{ minWidth: 120 }}
                    >
                      Cancel
                    </Button>
                  )}
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Profile Tabs */}
        <Card sx={{ mb: 4 }}>
          <CardContent sx={{ p: 0 }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
                px: 3,
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 600,
                },
              }}
            >
              <Tab label="Personal Information" />
              <Tab label="Medical Information" />
              <Tab label="Preferences" />
              <Tab label="Activity & Stats" />
            </Tabs>

            {/* Personal Information Tab */}
            <TabPanel value={activeTab} index={0}>
              <Box sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                  Personal Information
                </Typography>
                
                <Grid container spacing={3}>
                  {/* Basic Information */}
                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                        Basic Information
                      </Typography>
                      
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            label="First Name"
                            value={isEditing ? editProfile.personal?.firstName : userProfile.personal?.firstName}
                            onChange={(e) => handleInputChange('personal', 'firstName', e.target.value)}
                            disabled={!isEditing}
                            variant="outlined"
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            label="Last Name"
                            value={isEditing ? editProfile.personal?.lastName : userProfile.personal?.lastName}
                            onChange={(e) => handleInputChange('personal', 'lastName', e.target.value)}
                            disabled={!isEditing}
                            variant="outlined"
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Email"
                            value={isEditing ? editProfile.personal?.email : userProfile.personal?.email}
                            onChange={(e) => handleInputChange('personal', 'email', e.target.value)}
                            disabled={!isEditing}
                            variant="outlined"
                            size="small"
                            startAdornment={<Email />}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Phone"
                            value={isEditing ? editProfile.personal?.phone : userProfile.personal?.phone}
                            onChange={(e) => handleInputChange('personal', 'phone', e.target.value)}
                            disabled={!isEditing}
                            variant="outlined"
                            size="small"
                            startAdornment={<Phone />}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            label="Date of Birth"
                            type="date"
                            value={isEditing ? editProfile.personal?.dateOfBirth : userProfile.personal?.dateOfBirth}
                            onChange={(e) => handleInputChange('personal', 'dateOfBirth', e.target.value)}
                            disabled={!isEditing}
                            variant="outlined"
                            size="small"
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Chip
                              icon={getGenderIcon(userProfile.personal?.gender)}
                              label={userProfile.personal?.gender?.charAt(0).toUpperCase() + userProfile.personal?.gender?.slice(1)}
                              color={getGenderColor(userProfile.personal?.gender)}
                              variant="outlined"
                            />
                          </Box>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>

                  {/* Physical Information */}
                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                        Physical Information
                      </Typography>
                      
                      <Grid container spacing={2}>
                        <Grid item xs={4}>
                          <Box sx={{ textAlign: 'center' }}>
                            <Favorite sx={{ fontSize: 40, color: 'error.main', mb: 1 }} />
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                              {userProfile.personal?.bloodType}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              Blood Type
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={4}>
                          <Box sx={{ textAlign: 'center' }}>
                            <Height sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                              {userProfile.personal?.height}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              Height
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={4}>
                          <Box sx={{ textAlign: 'center' }}>
                            <Favorite sx={{ fontSize: 40, color: 'secondary.main', mb: 1 }} />
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                              {userProfile.personal?.weight}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              Weight
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>

                  {/* Emergency Contact */}
                  <Grid item xs={12}>
                    <Paper sx={{ p: 3 }}>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                        Emergency Contact
                      </Typography>
                      
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="Contact Name"
                            value={userProfile.personal?.emergencyContact?.name}
                            disabled
                            variant="outlined"
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="Relationship"
                            value={userProfile.personal?.emergencyContact?.relationship}
                            disabled
                            variant="outlined"
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="Phone"
                            value={userProfile.personal?.emergencyContact?.phone}
                            disabled
                            variant="outlined"
                            size="small"
                            startAdornment={<Phone />}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="Email"
                            value={userProfile.personal?.emergencyContact?.email}
                            disabled
                            variant="outlined"
                            size="small"
                            startAdornment={<Email />}
                          />
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            </TabPanel>

            {/* Medical Information Tab */}
            <TabPanel value={activeTab} index={1}>
              <Box sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: 'secondary.main' }}>
                  Medical Information
                </Typography>
                
                <Grid container spacing={3}>
                  {/* Healthcare Providers */}
                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                        Healthcare Providers
                      </Typography>
                      
                      <List>
                        <ListItem>
                          <ListItemIcon>
                            <Person color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary="Primary Care Physician"
                            secondary={userProfile.medical?.primaryCarePhysician}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <LocalHospital color="secondary" />
                          </ListItemIcon>
                          <ListItemText
                            primary="Preferred Hospital"
                            secondary={userProfile.medical?.hospital}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <Security color="info" />
                          </ListItemIcon>
                          <ListItemText
                            primary="Insurance Provider"
                            secondary={userProfile.medical?.insuranceProvider}
                          />
                        </ListItem>
                      </List>
                    </Paper>
                  </Grid>

                  {/* Health Conditions */}
                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                        Health Conditions
                      </Typography>
                      
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" gutterBottom>
                          Allergies:
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                          {userProfile.medical?.allergies?.map((allergy, index) => (
                            <Chip
                              key={index}
                              label={allergy}
                              color="warning"
                              variant="outlined"
                              size="small"
                            />
                          ))}
                        </Box>
                      </Box>
                      
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" gutterBottom>
                          Medical Conditions:
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                          {userProfile.medical?.conditions?.map((condition, index) => (
                            <Chip
                              key={index}
                              label={condition}
                              color="error"
                              variant="outlined"
                              size="small"
                            />
                          ))}
                        </Box>
                      </Box>
                      
                      <Box>
                        <Typography variant="subtitle2" gutterBottom>
                          Current Medications:
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                          {userProfile.medical?.medications?.map((medication, index) => (
                            <Chip
                              key={index}
                              label={medication}
                              color="info"
                              variant="outlined"
                              size="small"
                            />
                          ))}
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>

                  {/* Checkup Schedule */}
                  <Grid item xs={12}>
                    <Paper sx={{ p: 3 }}>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                        Checkup Schedule
                      </Typography>
                      
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <Box sx={{ textAlign: 'center', p: 2, backgroundColor: 'success.50', borderRadius: 2 }}>
                            <Typography variant="h6" color="success.main" sx={{ fontWeight: 600 }}>
                              Last Checkup
                            </Typography>
                            <Typography variant="h4" sx={{ fontWeight: 700 }}>
                              {userProfile.medical?.lastCheckup}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              Completed successfully
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Box sx={{ textAlign: 'center', p: 2, backgroundColor: 'warning.50', borderRadius: 2 }}>
                            <Typography variant="h6" color="warning.main" sx={{ fontWeight: 600 }}>
                              Next Checkup
                            </Typography>
                            <Typography variant="h4" sx={{ fontWeight: 700 }}>
                              {userProfile.medical?.nextCheckup}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              Scheduled appointment
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            </TabPanel>

            {/* Preferences Tab */}
            <TabPanel value={activeTab} index={2}>
              <Box sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: 'accent.main' }}>
                  Preferences & Settings
                </Typography>
                
                <Grid container spacing={3}>
                  {/* Notifications */}
                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                        Notification Preferences
                      </Typography>
                      
                      <List>
                        <ListItem>
                          <ListItemIcon>
                            <Email />
                          </ListItemIcon>
                          <ListItemText primary="Email Notifications" />
                          <Switch
                            checked={userProfile.preferences?.notifications?.email}
                            onChange={(e) => handleInputChange('preferences', 'notifications', {
                              ...userProfile.preferences.notifications,
                              email: e.target.checked
                            })}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <Phone />
                          </ListItemIcon>
                          <ListItemText primary="SMS Notifications" />
                          <Switch
                            checked={userProfile.preferences?.notifications?.sms}
                            onChange={(e) => handleInputChange('preferences', 'notifications', {
                              ...userProfile.preferences.notifications,
                              sms: e.target.checked
                            })}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <Notifications />
                          </ListItemIcon>
                          <ListItemText primary="Push Notifications" />
                          <Switch
                            checked={userProfile.preferences?.notifications?.push}
                            onChange={(e) => handleInputChange('preferences', 'notifications', {
                              ...userProfile.preferences.notifications,
                              push: e.target.checked
                            })}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <CalendarToday />
                          </ListItemIcon>
                          <ListItemText primary="Appointment Reminders" />
                          <Switch
                            checked={userProfile.preferences?.notifications?.appointmentReminders}
                            onChange={(e) => handleInputChange('preferences', 'notifications', {
                              ...userProfile.preferences.notifications,
                              appointmentReminders: e.target.checked
                            })}
                          />
                        </ListItem>
                      </List>
                    </Paper>
                  </Grid>

                  {/* Privacy Settings */}
                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                        Privacy Settings
                      </Typography>
                      
                      <List>
                        <ListItem>
                          <ListItemIcon>
                            <Person />
                          </ListItemIcon>
                          <ListItemText primary="Share data with doctors" />
                          <Switch
                            checked={userProfile.preferences?.privacy?.shareDataWithDoctors}
                            onChange={(e) => handleInputChange('preferences', 'privacy', {
                              ...userProfile.preferences.privacy,
                              shareDataWithDoctors: e.target.checked
                            })}
                          />
                        </ListItem>
                        <ListItem>
                                          <ListItemIcon>
                  <People />
                </ListItemIcon>
                          <ListItemText primary="Share data with family" />
                          <Switch
                            checked={userProfile.preferences?.privacy?.shareDataWithFamily}
                            onChange={(e) => handleInputChange('preferences', 'privacy', {
                              ...userProfile.preferences.privacy,
                              shareDataWithFamily: e.target.checked
                            })}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <Emergency />
                          </ListItemIcon>
                          <ListItemText primary="Allow emergency access" />
                          <Switch
                            checked={userProfile.preferences?.privacy?.allowEmergencyAccess}
                            onChange={(e) => handleInputChange('preferences', 'privacy', {
                              ...userProfile.preferences.privacy,
                              allowEmergencyAccess: e.target.checked
                            })}
                          />
                        </ListItem>
                      </List>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            </TabPanel>

            {/* Activity & Stats Tab */}
            <TabPanel value={activeTab} index={3}>
              <Box sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: 'success.main' }}>
                  Activity & Statistics
                </Typography>
                
                <Grid container spacing={3}>
                  {/* Activity Summary */}
                  <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 3 }}>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                        Recent Activity
                      </Typography>
                      
                      <List>
                        <ListItem>
                          <ListItemIcon>
                            <AccountCircle color="primary" />
                          </ListItemIcon>
                          <ListItemText
                            primary="Last Login"
                            secondary={userProfile.activity?.lastLogin?.toLocaleString()}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <CalendarToday color="secondary" />
                          </ListItemIcon>
                          <ListItemText
                            primary="Last Appointment"
                            secondary={userProfile.activity?.lastAppointment}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <CalendarToday color="accent" />
                          </ListItemIcon>
                          <ListItemText
                            primary="Next Appointment"
                            secondary={userProfile.activity?.nextAppointment}
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <HealthAndSafety color="success" />
                          </ListItemIcon>
                          <ListItemText
                            primary="Health Score"
                            secondary={`${userProfile.activity?.healthScore}%`}
                          />
                        </ListItem>
                      </List>
                    </Paper>
                  </Grid>

                  {/* Quick Stats */}
                  <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3, textAlign: 'center' }}>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                        Quick Stats
                      </Typography>
                      
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="h4" color="primary.main" sx={{ fontWeight: 700 }}>
                          {userProfile.activity?.totalLogins}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Total Logins
                        </Typography>
                      </Box>
                      
                      <Box>
                        <Typography variant="h4" color="success.main" sx={{ fontWeight: 700 }}>
                          {userProfile.activity?.streakDays}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Day Streak
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            </TabPanel>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<Settings />}
            size="large"
          >
            Account Settings
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<Security />}
            size="large"
          >
            Security Settings
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<Logout />}
            size="large"
            onClick={() => setShowLogoutDialog(true)}
          >
            Logout
          </Button>
        </Box>
      </Box>

      {/* Logout Dialog */}
      <Dialog
        open={showLogoutDialog}
        onClose={() => setShowLogoutDialog(false)}
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
          <Logout />
          Confirm Logout
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Typography variant="body1">
            Are you sure you want to logout? Any unsaved changes will be lost.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button 
            variant="outlined" 
            onClick={() => setShowLogoutDialog(false)}
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            color="error"
            onClick={handleLogout}
            startIcon={<Logout />}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default Profile;
