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
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress,
  LinearProgress,
} from '@mui/material';
import {
  Description,
  Upload,
  Download,
  Search,
  FilterList,
  Add,
  Edit,
  Delete,
  Visibility,
  CloudUpload,
  History,
  MedicalServices,
  LocalHospital,
  Medication,
  Psychology,
  FitnessCenter,
  PregnantWoman,
  Person,
  CalendarToday,
  FileCopy,
  Share,
  Print,
  Favorite,
  HealthAndSafety,
} from '@mui/icons-material';
import Layout from '../components/Layout';

const HealthRecords = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [healthRecords, setHealthRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);

  useEffect(() => {
    // Mock health records data
    const mockRecords = [
      {
        id: 1,
        title: 'Blood Test Results',
        type: 'lab-results',
        category: 'Laboratory',
        date: new Date('2024-01-15'),
        doctor: 'Dr. Sarah Wilson',
        hospital: 'City General Hospital',
        status: 'completed',
        fileSize: '2.4 MB',
        description: 'Complete blood count, cholesterol, and glucose levels',
        tags: ['blood', 'cholesterol', 'glucose'],
        priority: 'normal'
      },
      {
        id: 2,
        title: 'Chest X-Ray Report',
        type: 'imaging',
        category: 'Radiology',
        date: new Date('2024-01-10'),
        doctor: 'Dr. Michael Brown',
        hospital: 'Community Medical Center',
        status: 'completed',
        fileSize: '5.8 MB',
        description: 'Chest X-ray showing normal cardiac silhouette and clear lung fields',
        tags: ['x-ray', 'chest', 'cardiac'],
        priority: 'normal'
      },
      {
        id: 3,
        title: 'ECG Report',
        type: 'cardiology',
        category: 'Cardiology',
        date: new Date('2024-01-08'),
        doctor: 'Dr. Emily Davis',
        hospital: 'Heart Institute',
        status: 'completed',
        fileSize: '1.2 MB',
        description: '12-lead ECG showing normal sinus rhythm',
        tags: ['ecg', 'heart', 'rhythm'],
        priority: 'normal'
      },
      {
        id: 4,
        title: 'Prescription - Hypertension',
        type: 'prescription',
        category: 'Medication',
        date: new Date('2024-01-12'),
        doctor: 'Dr. Sarah Wilson',
        hospital: 'City General Hospital',
        status: 'active',
        fileSize: '0.8 MB',
        description: 'Lisinopril 10mg daily for blood pressure control',
        tags: ['prescription', 'hypertension', 'lisinopril'],
        priority: 'high'
      },
      {
        id: 5,
        title: 'Vaccination Record',
        type: 'vaccination',
        category: 'Immunization',
        date: new Date('2023-12-20'),
        doctor: 'Dr. John Smith',
        hospital: 'Family Care Clinic',
        status: 'completed',
        fileSize: '1.5 MB',
        description: 'Annual flu shot and COVID-19 booster',
        tags: ['vaccination', 'flu', 'covid'],
        priority: 'normal'
      }
    ];
    
    setHealthRecords(mockRecords);
    setFilteredRecords(mockRecords);
  }, []);

  useEffect(() => {
    // Filter records based on search query
    if (searchQuery.trim() === '') {
      setFilteredRecords(healthRecords);
    } else {
      const filtered = healthRecords.filter(record =>
        record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredRecords(filtered);
    }
  }, [searchQuery, healthRecords]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleFileUpload = () => {
    setUploadingFile(true);
    // Simulate file upload
    setTimeout(() => {
      setUploadingFile(false);
      setShowUploadDialog(false);
      // Add new record
      const newRecord = {
        id: Date.now(),
        title: 'New Health Record',
        type: 'document',
        category: 'General',
        date: new Date(),
        doctor: 'Dr. Current',
        hospital: 'Current Hospital',
        status: 'pending',
        fileSize: '1.0 MB',
        description: 'Newly uploaded health record',
        tags: ['new', 'upload'],
        priority: 'normal'
      };
      setHealthRecords(prev => [newRecord, ...prev]);
    }, 2000);
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'lab-results': return <MedicalServices />;
      case 'imaging': return <LocalHospital />;
      case 'cardiology': return <Favorite />;
      case 'prescription': return <Medication />;
      case 'vaccination': return <HealthAndSafety />;
      default: return <Description />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'lab-results': return 'primary';
      case 'imaging': return 'secondary';
      case 'cardiology': return 'error';
      case 'prescription': return 'warning';
      case 'vaccination': return 'success';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'normal': return 'success';
      default: return 'default';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'pending': return 'warning';
      case 'active': return 'info';
      default: return 'default';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const TabPanel = ({ children, value, index, ...other }) => (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`health-records-tabpanel-${index}`}
      aria-labelledby={`health-records-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );

  return (
    <Layout>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        {/* Header */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
            Health Records
          </Typography>
          <Typography variant="h6" color="textSecondary" sx={{ mb: 2 }}>
            Manage your complete medical history, reports, and documents
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Chip 
              icon={<Description />} 
              label="Medical Documents" 
              color="primary" 
              variant="outlined"
            />
            <Chip 
              icon={<History />} 
              label="Complete History" 
              color="secondary" 
              variant="outlined"
            />
            <Chip 
              icon={<CloudUpload />} 
              label="Secure Storage" 
              color="accent" 
              variant="outlined"
            />
          </Box>
        </Box>

        {/* Search and Upload */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Search health records by title, description, doctor, or tags..."
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
              <Grid item xs={12} md={4}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Upload />}
                  onClick={() => setShowUploadDialog(true)}
                  fullWidth
                  sx={{ py: 1.5 }}
                >
                  Upload Record
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Tabs */}
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
              <Tab label="All Records" />
              <Tab label="Laboratory" />
              <Tab label="Imaging" />
              <Tab label="Prescriptions" />
              <Tab label="Vaccinations" />
            </Tabs>

            {/* All Records Tab */}
            <TabPanel value={activeTab} index={0}>
              <Box sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    All Health Records ({filteredRecords.length})
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="outlined"
                      startIcon={<FilterList />}
                      size="small"
                    >
                      Filter
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<Download />}
                      size="small"
                    >
                      Export
                    </Button>
                  </Box>
                </Box>

                <Grid container spacing={2}>
                  {filteredRecords.map((record) => (
                    <Grid item xs={12} key={record.id}>
                      <Paper
                        sx={{
                          p: 3,
                          border: '1px solid',
                          borderColor: 'divider',
                          borderRadius: 2,
                          '&:hover': {
                            borderColor: 'primary.main',
                            backgroundColor: 'primary.50',
                          }
                        }}
                      >
                        <Grid container spacing={2} alignItems="center">
                          <Grid item xs={12} md={1}>
                            <Avatar
                              sx={{
                                backgroundColor: `${getTypeColor(record.type)}.light`,
                                color: `${getTypeColor(record.type)}.main`,
                                width: 48,
                                height: 48
                              }}
                            >
                              {getTypeIcon(record.type)}
                            </Avatar>
                          </Grid>
                          
                          <Grid item xs={12} md={6}>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                              {record.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                              {record.description}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                              {record.tags.map((tag, index) => (
                                <Chip
                                  key={index}
                                  label={tag}
                                  size="small"
                                  variant="outlined"
                                  color={getTypeColor(record.type)}
                                />
                              ))}
                            </Box>
                          </Grid>
                          
                          <Grid item xs={12} md={3}>
                            <Box sx={{ textAlign: 'center' }}>
                              <Typography variant="body2" color="textSecondary">
                                {record.date.toLocaleDateString()}
                              </Typography>
                              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                {record.doctor}
                              </Typography>
                              <Typography variant="caption" color="textSecondary">
                                {record.hospital}
                              </Typography>
                            </Box>
                          </Grid>
                          
                          <Grid item xs={12} md={2}>
                            <Box sx={{ textAlign: 'right' }}>
                              <Chip 
                                label={record.status} 
                                color={getStatusColor(record.status)}
                                size="small"
                                sx={{ mb: 1 }}
                              />
                              <Chip 
                                label={record.priority} 
                                color={getPriorityColor(record.priority)}
                                size="small"
                                variant="outlined"
                              />
                            </Box>
                          </Grid>
                        </Grid>
                        
                        <Divider sx={{ my: 2 }} />
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2" color="textSecondary">
                            File size: {record.fileSize}
                          </Typography>
                          
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Tooltip title="View">
                              <IconButton size="small" color="primary">
                                <Visibility />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Download">
                              <IconButton size="small" color="secondary">
                                <Download />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Share">
                              <IconButton size="small" color="info">
                                <Share />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Print">
                              <IconButton size="small" color="accent">
                                <Print />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit">
                              <IconButton size="small" color="warning">
                                <Edit />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton size="small" color="error">
                                <Delete />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </TabPanel>

            {/* Other tabs would contain filtered content */}
            <TabPanel value={activeTab} index={1}>
              <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="h6" color="textSecondary">
                  Laboratory Records
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Filtered laboratory test results and reports
                </Typography>
              </Box>
            </TabPanel>

            <TabPanel value={activeTab} index={2}>
              <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="h6" color="textSecondary">
                  Imaging Records
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  X-rays, MRIs, CT scans, and other imaging reports
                </Typography>
              </Box>
            </TabPanel>

            <TabPanel value={activeTab} index={3}>
              <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="h6" color="textSecondary">
                  Prescriptions
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Current and past medication prescriptions
                </Typography>
              </Box>
            </TabPanel>

            <TabPanel value={activeTab} index={4}>
              <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="h6" color="textSecondary">
                  Vaccinations
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Immunization records and vaccination history
                </Typography>
              </Box>
            </TabPanel>
          </CardContent>
        </Card>

        {/* Summary Statistics */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="primary.main" sx={{ fontWeight: 700 }}>
                  {healthRecords.length}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Total Records
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  All health documents
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="secondary.main" sx={{ fontWeight: 700 }}>
                  {healthRecords.filter(r => r.status === 'completed').length}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Completed
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Finalized reports
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="warning.main" sx={{ fontWeight: 700 }}>
                  {healthRecords.filter(r => r.status === 'pending').length}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Pending
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Awaiting results
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="success.main" sx={{ fontWeight: 700 }}>
                  {healthRecords.filter(r => r.priority === 'high').length}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  High Priority
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Important records
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Upload Dialog */}
      <Dialog
        open={showUploadDialog}
        onClose={() => setShowUploadDialog(false)}
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
          <CloudUpload />
          Upload Health Record
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Upload your health records, test results, or medical documents securely.
          </Typography>
          
          <Box sx={{ 
            border: '2px dashed', 
            borderColor: 'primary.main', 
            borderRadius: 2, 
            p: 4, 
            textAlign: 'center',
            backgroundColor: 'primary.50'
          }}>
            <CloudUpload sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Drop files here or click to browse
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              Supported formats: PDF, JPG, PNG, DOC, DOCX (Max 10MB)
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Upload />}
            >
              Choose Files
            </Button>
          </Box>
          
          {uploadingFile && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="body2" gutterBottom>
                Uploading file...
              </Typography>
              <LinearProgress />
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button 
            variant="outlined" 
            onClick={() => setShowUploadDialog(false)}
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            color="primary"
            onClick={handleFileUpload}
            disabled={uploadingFile}
            startIcon={uploadingFile ? <CircularProgress size={20} /> : <Upload />}
          >
            {uploadingFile ? 'Uploading...' : 'Upload'}
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default HealthRecords;
