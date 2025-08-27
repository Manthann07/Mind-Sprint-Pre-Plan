import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  CircularProgress,
  Avatar,
  Chip,
  LinearProgress,
  IconButton,
  Tooltip,
  Paper,
} from '@mui/material';
import {
  HealthAndSafety,
  TrendingUp,
  Emergency,
  Watch,
  Psychology,
  VideoCall,
  LocationOn,
  SmartToy,
  Public,
  Analytics,
  Medication,
  Description,
  EventNote,
  Notifications,
  ArrowForward,
} from '@mui/icons-material';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [healthMetrics, setHealthMetrics] = useState({});
  
  // Temporary mock user for development
  const user = {
    profile: {
      firstName: 'John',
      lastName: 'Doe',
      avatar: 'JD'
    },
    role: 'patient'
  };

  useEffect(() => {
    // Mock appointments data for development
    const mockAppointments = [
      {
        _id: '1',
        dateTime: new Date(Date.now() + 86400000), // Tomorrow
        type: 'video',
        status: 'scheduled',
        doctor: {
          profile: {
            firstName: 'Sarah',
            lastName: 'Wilson',
            specialization: 'Cardiologist'
          }
        }
      },
      {
        _id: '2',
        dateTime: new Date(Date.now() + 172800000), // Day after tomorrow
        type: 'in-person',
        status: 'scheduled',
        doctor: {
          profile: {
            firstName: 'Michael',
            lastName: 'Brown',
            specialization: 'Neurologist'
          }
        }
      }
    ];
    
    // Mock health metrics
    const mockHealthMetrics = {
      heartRate: 72,
      bloodPressure: '120/80',
      oxygenLevel: 98,
      steps: 8500,
      sleepHours: 7.5,
      waterIntake: 6,
      mood: 'Good'
    };
    
    setAppointments(mockAppointments);
    setHealthMetrics(mockHealthMetrics);
    setLoading(false);
  }, []);

  const quickActionCards = [
    {
      title: 'Book Consultation',
      description: 'Schedule with specialists',
      icon: <EventNote sx={{ fontSize: 40, color: 'primary.main' }} />,
      color: 'primary',
      path: '/appointments',
      gradient: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)'
    },
    {
      title: 'AI Symptom Checker',
      description: 'Get instant health insights',
      icon: <Psychology sx={{ fontSize: 40, color: 'secondary.main' }} />,
      color: 'secondary',
      path: '/symptom-checker',
      gradient: 'linear-gradient(135deg, #0D9488 0%, #14B8A6 100%)'
    },
    {
      title: 'Video Consultation',
      description: 'Connect with doctors remotely',
      icon: <VideoCall sx={{ fontSize: 40, color: 'accent.main' }} />,
      color: 'accent',
      path: '/consultation',
      gradient: 'linear-gradient(135deg, #F97316 0%, #FB923C 100%)'
    },
    {
      title: 'Emergency Services',
      description: '24/7 emergency support',
      icon: <Emergency sx={{ fontSize: 40, color: 'error.main' }} />,
      color: 'error',
      path: '/emergency-services',
      gradient: 'linear-gradient(135deg, #DC2626 0%, #EF4444 100%)'
    }
  ];

  const featureCards = [
    {
      title: 'Wearable Integration',
      description: 'Sync with smartwatches & track vitals',
      icon: <Watch />,
      path: '/wearable-integration',
      status: 'Connected',
      statusColor: 'success'
    },
    {
      title: 'Health Records',
      description: 'View & manage medical history',
      icon: <Description />,
      path: '/health-records',
      status: 'Updated',
      statusColor: 'info'
    },
    {
      title: 'Prescriptions',
      description: 'Digital prescriptions & refills',
      icon: <Medication />,
      path: '/prescriptions',
      status: 'Active',
      statusColor: 'warning'
    },
    {
      title: 'Nearby Clinics',
      description: 'Find local healthcare facilities',
      icon: <LocationOn />,
      path: '/nearby-clinics',
      status: 'Available',
      statusColor: 'success'
    }
  ];

  if (loading) {
    return (
      <Layout>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress size={60} />
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Welcome Header */}
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #1E3A8A 0%, #0D9488 100%)',
          color: 'white',
          p: 4,
          borderRadius: 3,
          mb: 4,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box component={motion.div} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
            Welcome back, {user?.profile?.firstName}! 👋
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, mb: 2 }}>
            Your health journey is our priority. Here's what's happening today.
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip 
              label={`${user?.role === 'patient' ? 'Patient' : 'Doctor'} Dashboard`}
              sx={{ 
                backgroundColor: 'rgba(255,255,255,0.2)', 
                color: 'white',
                fontWeight: 600
              }} 
            />
            <Chip 
              label="Premium Member"
              sx={{ 
                backgroundColor: 'accent.main', 
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
          <motion.div initial={{ rotate: 5 }} animate={{ rotate: 15 }} transition={{ duration: 1.2, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}>
            <HealthAndSafety sx={{ fontSize: 200 }} />
          </motion.div>
        </Box>
      </Box>

      {/* Quick Actions */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {quickActionCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card 
              sx={{ 
                height: '100%',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                }
              }}
              onClick={() => navigate(card.path)}
            >
              <CardContent component={motion.div} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: index * 0.05 }} sx={{ 
                textAlign: 'center', 
                p: 3,
                background: card.gradient,
                color: 'white',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}>
                <Box sx={{ mb: 2 }}>
                  {card.icon}
                </Box>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  {card.title}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9, mb: 2 }}>
                  {card.description}
                </Typography>
                <Button 
                  variant="outlined" 
                  sx={{ 
                    color: 'white', 
                    borderColor: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Health Metrics & Appointments */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Health Metrics */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent component={motion.div} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                Today's Health Metrics
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Heart Rate</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {healthMetrics.heartRate} BPM
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={70} 
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Blood Pressure</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {healthMetrics.bloodPressure}
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={85} 
                  sx={{ height: 8, borderRadius: 4, backgroundColor: 'success.light' }}
                  color="success"
                />
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Oxygen Level</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {healthMetrics.oxygenLevel}%
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={98} 
                  sx={{ height: 8, borderRadius: 4, backgroundColor: 'info.light' }}
                  color="info"
                />
              </Box>
              
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Chip 
                  label={`${healthMetrics.steps} steps`} 
                  size="small" 
                  color="primary" 
                  variant="outlined"
                />
                <Chip 
                  label={`${healthMetrics.sleepHours}h sleep`} 
                  size="small" 
                  color="secondary" 
                  variant="outlined"
                />
                <Chip 
                  label={healthMetrics.mood} 
                  size="small" 
                  color="success" 
                  variant="outlined"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Upcoming Appointments */}
        <Grid item xs={12} md={8}>
          <Card sx={{ height: '100%' }}>
            <CardContent component={motion.div} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: 0.05 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
                  Upcoming Appointments
                </Typography>
                <Button 
                  variant="outlined" 
                  color="primary"
                  onClick={() => navigate('/appointments')}
                  endIcon={<ArrowForward />}
                >
                  View All
                </Button>
              </Box>
              
              {appointments.length > 0 ? (
                appointments.slice(0, 3).map((appointment) => (
                  <Paper
                    key={appointment._id}
                    sx={{
                      p: 2,
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
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {new Date(appointment.dateTime).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                          {new Date(appointment.dateTime).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          Dr. {appointment.doctor.profile.firstName} {appointment.doctor.profile.lastName}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {appointment.doctor.profile.specialization}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ textAlign: 'right' }}>
                        <Chip 
                          label={appointment.type === 'video' ? 'Video Call' : 'In-Person'}
                          color={appointment.type === 'video' ? 'primary' : 'secondary'}
                          size="small"
                          sx={{ mb: 1 }}
                        />
                        {appointment.type === 'video' && (
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            startIcon={<VideoCall />}
                            onClick={() => navigate(`/consultation/${appointment._id}`)}
                          >
                            Join Call
                          </Button>
                        )}
                      </Box>
                    </Box>
                  </Paper>
                ))
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <EventNote sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
                  <Typography color="textSecondary" gutterBottom>
                    No upcoming appointments
                  </Typography>
                  <Button 
                    variant="contained" 
                    color="primary"
                    onClick={() => navigate('/appointments')}
                  >
                    Book Your First Appointment
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Feature Cards */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
            Quick Access to Features
          </Typography>
        </Grid>
        {featureCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card 
              sx={{ 
                height: '100%',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
                }
              }}
              onClick={() => navigate(card.path)}
            >
              <CardContent component={motion.div} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.25, delay: index * 0.03 }} sx={{ textAlign: 'center', p: 3 }}>
                <Avatar 
                  sx={{ 
                    width: 56, 
                    height: 56, 
                    mx: 'auto', 
                    mb: 2,
                    backgroundColor: 'primary.light',
                    color: 'white'
                  }}
                >
                  {card.icon}
                </Avatar>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  {card.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                  {card.description}
                </Typography>
                <Chip 
                  label={card.status} 
                  color={card.statusColor} 
                  size="small"
                  sx={{ mb: 2 }}
                />
                <Button 
                  variant="outlined" 
                  color="primary"
                  size="small"
                  endIcon={<ArrowForward />}
                >
                  Access
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Premium Features Preview */}
      <Box sx={{ mt: 4 }}>
        <Card sx={{ 
          background: 'linear-gradient(135deg, #F97316 0%, #FB923C 100%)',
          color: 'white'
        }}>
          <CardContent component={motion.div} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3 }} sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  🚀 Premium Features Available
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9, mb: 2 }}>
                  Unlock AI-powered health insights, community health analytics, and 24/7 virtual assistance.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button 
                    variant="contained" 
                    sx={{ 
                      backgroundColor: 'white', 
                      color: 'accent.main',
                      '&:hover': {
                        backgroundColor: 'grey.100'
                      }
                    }}
                    onClick={() => navigate('/community-health')}
                  >
                    Explore Community Health
                  </Button>
                  <Button 
                    variant="outlined" 
                    sx={{ 
                      borderColor: 'white', 
                      color: 'white',
                      '&:hover': {
                        borderColor: 'white',
                        backgroundColor: 'rgba(255,255,255,0.1)'
                      }
                    }}
                    onClick={() => navigate('/virtual-assistant')}
                  >
                    Try Virtual Assistant
                  </Button>
                </Box>
              </Box>
              <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <SmartToy sx={{ fontSize: 120, opacity: 0.2 }} />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Layout>
  );
};

export default Dashboard;
