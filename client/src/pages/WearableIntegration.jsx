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
  LinearProgress,
  Paper,
  IconButton,
  Tooltip,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  Watch,
  Bluetooth,
  BluetoothConnected,
  BluetoothSearching,
  TrendingUp,
  TrendingDown,
  Favorite,
  Speed,
  Opacity,
  WbSunny,
  DirectionsWalk,
  Bed,
  Battery90,
  SignalCellular4Bar,
  Refresh,
  Settings,
  Sync,
  HealthAndSafety,
  MonitorHeart,
  FitnessCenter,
} from '@mui/icons-material';
import Layout from '../components/Layout';

const WearableIntegration = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectedDevices, setConnectedDevices] = useState([]);
  const [vitalSigns, setVitalSigns] = useState({});
  const [healthMetrics, setHealthMetrics] = useState({});
  const [syncStatus, setSyncStatus] = useState('idle');
  const [autoSync, setAutoSync] = useState(true);

  useEffect(() => {
    // Mock connected devices
    setConnectedDevices([
      {
        id: 1,
        name: 'Apple Watch Series 9',
        type: 'smartwatch',
        battery: 85,
        signal: 'strong',
        lastSync: new Date(Date.now() - 300000), // 5 minutes ago
        status: 'connected'
      },
      {
        id: 2,
        name: 'Fitbit Charge 6',
        type: 'fitness-tracker',
        battery: 92,
        signal: 'strong',
        lastSync: new Date(Date.now() - 600000), // 10 minutes ago
        status: 'connected'
      },
      {
        id: 3,
        name: 'Oura Ring Gen 3',
        type: 'smart-ring',
        battery: 78,
        signal: 'medium',
        lastSync: new Date(Date.now() - 900000), // 15 minutes ago
        status: 'connected'
      }
    ]);

    // Mock vital signs data
    setVitalSigns({
      heartRate: {
        current: 72,
        min: 58,
        max: 120,
        trend: 'stable',
        unit: 'BPM'
      },
      bloodPressure: {
        systolic: 120,
        diastolic: 80,
        trend: 'normal',
        unit: 'mmHg'
      },
      oxygenSaturation: {
        current: 98,
        min: 95,
        max: 100,
        trend: 'stable',
        unit: '%'
      },
      temperature: {
        current: 98.6,
        min: 97.0,
        max: 99.5,
        trend: 'normal',
        unit: '°F'
      }
    });

    // Mock health metrics
    setHealthMetrics({
      steps: {
        current: 8500,
        goal: 10000,
        trend: 'increasing',
        unit: 'steps'
      },
      calories: {
        current: 420,
        goal: 500,
        trend: 'increasing',
        unit: 'kcal'
      },
      sleep: {
        current: 7.5,
        goal: 8,
        trend: 'stable',
        unit: 'hours'
      },
      waterIntake: {
        current: 6,
        goal: 8,
        trend: 'stable',
        unit: 'glasses'
      }
    });
  }, []);

  const handleConnect = () => {
    setIsConnecting(true);
    // Simulate connection process
    setTimeout(() => {
      setIsConnected(true);
      setIsConnecting(false);
    }, 2000);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
  };

  const handleSync = () => {
    setSyncStatus('syncing');
    // Simulate sync process
    setTimeout(() => {
      setSyncStatus('completed');
      setTimeout(() => setSyncStatus('idle'), 2000);
    }, 3000);
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'increasing': return <TrendingUp color="success" />;
      case 'decreasing': return <TrendingDown color="error" />;
      case 'stable': return <TrendingUp color="info" />;
      default: return <TrendingUp color="default" />;
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'increasing': return 'success';
      case 'decreasing': return 'error';
      case 'stable': return 'info';
      default: return 'default';
    }
  };

  const getBatteryColor = (level) => {
    if (level > 80) return 'success';
    if (level > 50) return 'warning';
    return 'error';
  };

  const getSignalColor = (signal) => {
    switch (signal) {
      case 'strong': return 'success';
      case 'medium': return 'warning';
      case 'weak': return 'error';
      default: return 'default';
    }
  };

  const getSignalIcon = (signal) => {
    switch (signal) {
      case 'strong': return <SignalCellular4Bar />;
      case 'medium': return <SignalCellular4Bar />;
      case 'weak': return <SignalCellular4Bar />;
      default: return <SignalCellular4Bar />;
    }
  };

  return (
    <Layout>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        {/* Header */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
            Wearable Integration
          </Typography>
          <Typography variant="h6" color="textSecondary" sx={{ mb: 2 }}>
            Connect your smart devices and monitor your health in real-time
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Chip 
              icon={<Watch />} 
              label="Smartwatches" 
              color="primary" 
              variant="outlined"
            />
            <Chip 
              icon={<Bluetooth />} 
              label="Bluetooth Sync" 
              color="secondary" 
              variant="outlined"
            />
            <Chip 
              icon={<HealthAndSafety />} 
              label="Real-time Monitoring" 
              color="accent" 
              variant="outlined"
            />
          </Box>
        </Box>

        {/* Connection Status */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, color: 'primary.main' }}>
                Device Connection Status
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={autoSync}
                      onChange={(e) => setAutoSync(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Auto-sync"
                />
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<Refresh />}
                  onClick={handleSync}
                  disabled={syncStatus === 'syncing'}
                >
                  {syncStatus === 'syncing' ? 'Syncing...' : 'Manual Sync'}
                </Button>
              </Box>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, textAlign: 'center' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    {isConnected ? (
                      <BluetoothConnected sx={{ fontSize: 60, color: 'success.main' }} />
                    ) : (
                      <Bluetooth sx={{ fontSize: 60, color: 'text.disabled' }} />
                    )}
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {isConnected ? 'Connected' : 'Not Connected'}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                    {isConnected 
                      ? 'Your devices are connected and syncing data' 
                      : 'Connect your wearable devices to start monitoring'
                    }
                  </Typography>
                  <Button
                    variant={isConnected ? "outlined" : "contained"}
                    color={isConnected ? "error" : "primary"}
                    onClick={isConnected ? handleDisconnect : handleConnect}
                    disabled={isConnecting}
                    startIcon={isConnecting ? <CircularProgress size={20} /> : 
                      (isConnected ? <Bluetooth /> : <BluetoothSearching />)}
                  >
                    {isConnecting ? 'Connecting...' : 
                      (isConnected ? 'Disconnect' : 'Connect Devices')}
                  </Button>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Sync Status
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Typography variant="body2">Last sync:</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {connectedDevices.length > 0 
                        ? new Date(Math.min(...connectedDevices.map(d => d.lastSync))).toLocaleTimeString()
                        : 'Never'
                      }
                    </Typography>
                  </Box>
                  
                  {syncStatus === 'syncing' && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CircularProgress size={16} />
                      <Typography variant="body2">Syncing data from devices...</Typography>
                    </Box>
                  )}
                  
                  {syncStatus === 'completed' && (
                    <Alert severity="success" sx={{ py: 0 }}>
                      <Typography variant="body2">Sync completed successfully!</Typography>
                    </Alert>
                  )}
                  
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" gutterBottom>
                      Connected devices: {connectedDevices.length}
                    </Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={connectedDevices.length > 0 ? 100 : 0} 
                      color="success"
                    />
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Connected Devices */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: 'secondary.main' }}>
                  Connected Devices
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                  Monitor the status and battery levels of your connected devices
                </Typography>
                
                <Grid container spacing={2}>
                  {connectedDevices.map((device) => (
                    <Grid item xs={12} md={4} key={device.id}>
                      <Paper
                        sx={{
                          p: 3,
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
                              {device.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" sx={{ textTransform: 'capitalize' }}>
                              {device.type.replace('-', ' ')}
                            </Typography>
                          </Box>
                          <Chip 
                            label={device.status} 
                            color={device.status === 'connected' ? 'success' : 'warning'}
                            size="small"
                          />
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Battery90 
                              sx={{ 
                                color: getBatteryColor(device.battery),
                                fontSize: 20
                              }} 
                            />
                            <Typography variant="body2">{device.battery}%</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            {getSignalIcon(device.signal)}
                            <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                              {device.signal}
                            </Typography>
                          </Box>
                        </Box>
                        
                        <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 2 }}>
                          Last sync: {device.lastSync.toLocaleTimeString()}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            startIcon={<Sync />}
                            fullWidth
                          >
                            Sync Now
                          </Button>
                          <Button
                            variant="outlined"
                            color="secondary"
                            size="small"
                            startIcon={<Settings />}
                            fullWidth
                          >
                            Settings
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

        {/* Vital Signs Monitoring */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: 'error.main' }}>
                  Real-time Vital Signs
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                  Monitor your vital signs in real-time from connected devices
                </Typography>
                
                <Grid container spacing={3}>
                  {Object.entries(vitalSigns).map(([key, data]) => (
                    <Grid item xs={12} sm={6} md={3} key={key}>
                      <Paper sx={{ p: 3, textAlign: 'center' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                          {key === 'heartRate' && <Favorite sx={{ fontSize: 40, color: 'error.main' }} />}
                          {key === 'bloodPressure' && <Speed sx={{ fontSize: 40, color: 'primary.main' }} />}
                          {key === 'oxygenSaturation' && <Opacity sx={{ fontSize: 40, color: 'info.main' }} />}
                          {key === 'temperature' && <WbSunny sx={{ fontSize: 40, color: 'warning.main' }} />}
                        </Box>
                        
                        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                          {key === 'bloodPressure' 
                            ? `${data.systolic}/${data.diastolic}` 
                            : data.current
                          }
                        </Typography>
                        
                        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                          {key === 'bloodPressure' ? 'mmHg' : data.unit}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 2 }}>
                          {getTrendIcon(data.trend)}
                          <Typography variant="body2" color={getTrendColor(data.trend)}>
                            {data.trend}
                          </Typography>
                        </Box>
                        
                        {key !== 'bloodPressure' && (
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="caption" color="textSecondary">
                              Range: {data.min} - {data.max}
                            </Typography>
                          </Box>
                        )}
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Health Metrics */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: 'success.main' }}>
                  Daily Health Metrics
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                  Track your daily health goals and progress
                </Typography>
                
                <Grid container spacing={3}>
                  {Object.entries(healthMetrics).map(([key, data]) => (
                    <Grid item xs={12} sm={6} md={3} key={key}>
                      <Paper sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                          {key === 'steps' && <DirectionsWalk sx={{ fontSize: 30, color: 'primary.main' }} />}
                          {key === 'calories' && <FitnessCenter sx={{ fontSize: 30, color: 'error.main' }} />}
                          {key === 'sleep' && <Bed sx={{ fontSize: 30, color: 'secondary.main' }} />}
                          {key === 'waterIntake' && <Opacity sx={{ fontSize: 30, color: 'info.main' }} />}
                          
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600, textTransform: 'capitalize' }}>
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              Goal: {data.goal} {data.unit}
                            </Typography>
                          </Box>
                        </Box>
                        
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                            {data.current}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {data.unit}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ mb: 2 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2">Progress</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              {Math.round((data.current / data.goal) * 100)}%
                            </Typography>
                          </Box>
                          <LinearProgress 
                            variant="determinate" 
                            value={Math.min((data.current / data.goal) * 100, 100)} 
                            color={getTrendColor(data.trend)}
                            sx={{ height: 8, borderRadius: 4 }}
                          />
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                          {getTrendIcon(data.trend)}
                          <Typography variant="body2" color={getTrendColor(data.trend)}>
                            {data.trend}
                          </Typography>
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Data History Table */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: 'accent.main' }}>
                  Health Data History
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                  View historical data from your connected devices
                </Typography>
                
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Heart Rate</TableCell>
                        <TableCell>Blood Pressure</TableCell>
                        <TableCell>Oxygen</TableCell>
                        <TableCell>Temperature</TableCell>
                        <TableCell>Steps</TableCell>
                        <TableCell>Sleep</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {[...Array(7)].map((_, index) => {
                        const date = new Date();
                        date.setDate(date.getDate() - index);
                        return (
                          <TableRow key={index}>
                            <TableCell>{date.toLocaleDateString()}</TableCell>
                            <TableCell>{72 + Math.floor(Math.random() * 20)} BPM</TableCell>
                            <TableCell>{120 + Math.floor(Math.random() * 20)}/{80 + Math.floor(Math.random() * 10)} mmHg</TableCell>
                            <TableCell>{96 + Math.floor(Math.random() * 4)}%</TableCell>
                            <TableCell>{(98.0 + Math.random() * 2).toFixed(1)}°F</TableCell>
                            <TableCell>{8000 + Math.floor(Math.random() * 4000)}</TableCell>
                            <TableCell>{(7.0 + Math.random() * 2).toFixed(1)}h</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Tips and Information */}
        <Box sx={{ mt: 4 }}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #0D9488 0%, #14B8A6 100%)',
            color: 'white'
          }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                💡 Tips for Better Device Integration
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Device Setup:
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <Typography variant="body2" color="white">•</Typography>
                      </ListItemIcon>
                      <ListItemText primary="Ensure Bluetooth is enabled on your device" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Typography variant="body2" color="white">•</Typography>
                      </ListItemIcon>
                      <ListItemText primary="Keep devices within 30 feet for optimal connection" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Typography variant="body2" color="white">•</Typography>
                      </ListItemIcon>
                      <ListItemText primary="Charge devices regularly for continuous monitoring" />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Data Accuracy:
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <Typography variant="body2" color="white">•</Typography>
                      </ListItemIcon>
                      <ListItemText primary="Wear devices snugly for accurate readings" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Typography variant="body2" color="white">•</Typography>
                      </ListItemIcon>
                      <ListItemText primary="Sync data regularly for up-to-date information" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Typography variant="body2" color="white">•</Typography>
                      </ListItemIcon>
                      <ListItemText primary="Consult healthcare providers for medical decisions" />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Layout>
  );
};

export default WearableIntegration;
