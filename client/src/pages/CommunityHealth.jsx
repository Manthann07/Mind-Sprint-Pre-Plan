import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Paper,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  Analytics,
  TrendingUp,
  TrendingDown,
  People,
  HealthAndSafety,
  LocationOn,
} from '@mui/icons-material';
import Layout from '../components/Layout';

const CommunityHealth = () => {
  const [healthTrends, setHealthTrends] = useState([]);
  const [regionalStats, setRegionalStats] = useState([]);

  useEffect(() => {
    // Mock data for community health trends
    setHealthTrends([
      {
        id: 1,
        condition: 'Diabetes',
        trend: 'up',
        percentage: 12.5,
        region: 'Urban',
        severity: 'moderate',
      },
      {
        id: 2,
        condition: 'Hypertension',
        trend: 'down',
        percentage: -8.2,
        region: 'Rural',
        severity: 'low',
      },
      {
        id: 3,
        condition: 'Respiratory Issues',
        trend: 'up',
        percentage: 15.7,
        region: 'Urban',
        severity: 'high',
      },
    ]);

    setRegionalStats([
      {
        region: 'North Zone',
        population: '2.5M',
        avgAge: 42,
        healthScore: 78,
        topCondition: 'Diabetes',
        vaccinationRate: 85,
      },
      {
        region: 'South Zone',
        population: '3.1M',
        avgAge: 38,
        healthScore: 82,
        topCondition: 'Hypertension',
        vaccinationRate: 92,
      },
      {
        region: 'East Zone',
        population: '1.8M',
        avgAge: 45,
        healthScore: 75,
        topCondition: 'Respiratory',
        vaccinationRate: 78,
      },
      {
        region: 'West Zone',
        population: '2.9M',
        avgAge: 40,
        healthScore: 80,
        topCondition: 'Cardiovascular',
        vaccinationRate: 88,
      },
    ]);
  }, []);

  const getTrendIcon = (trend) => {
    return trend === 'up' ? <TrendingUp color="error" /> : <TrendingDown color="success" />;
  };

  const getTrendColor = (trend) => {
    return trend === 'up' ? 'error' : 'success';
  };

  const getSeverityColor = (severity) => {
    const colors = {
      low: 'success',
      moderate: 'warning',
      high: 'error',
    };
    return colors[severity] || 'default';
  };

  return (
    <Layout>
      <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
            Community Health Dashboard
          </Typography>
          <Typography variant="h6" color="textSecondary">
            Regional health analytics and trends for public health planning
          </Typography>
        </Box>

        {/* Key Metrics */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ textAlign: 'center', p: 2 }}>
              <People sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
                10.3M
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Total Population
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ textAlign: 'center', p: 2 }}>
              <HealthAndSafety sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'success.main' }}>
                79
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Average Health Score
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ textAlign: 'center', p: 2 }}>
              <Analytics sx={{ fontSize: 40, color: 'secondary.main', mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'secondary.main' }}>
                86%
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Vaccination Rate
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ textAlign: 'center', p: 2 }}>
              <LocationOn sx={{ fontSize: 40, color: 'accent.main', mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'accent.main' }}>
                4
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Health Zones
              </Typography>
            </Card>
          </Grid>
        </Grid>

        {/* Health Trends */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  Health Condition Trends
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {healthTrends.map((trend) => (
                    <Paper key={trend.id} sx={{ p: 2, mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {trend.condition}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {trend.region} Region
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {getTrendIcon(trend.trend)}
                          <Chip
                            label={`${trend.trend === 'up' ? '+' : ''}${trend.percentage}%`}
                            color={getTrendColor(trend.trend)}
                            size="small"
                          />
                          <Chip
                            label={trend.severity}
                            color={getSeverityColor(trend.severity)}
                            size="small"
                          />
                        </Box>
                      </Box>
                    </Paper>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  Regional Health Statistics
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Region</TableCell>
                        <TableCell>Population</TableCell>
                        <TableCell>Health Score</TableCell>
                        <TableCell>Vaccination</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {regionalStats.map((stat) => (
                        <TableRow key={stat.region}>
                          <TableCell>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                              {stat.region}
                            </Typography>
                          </TableCell>
                          <TableCell>{stat.population}</TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography variant="body2">{stat.healthScore}</Typography>
                              <LinearProgress
                                variant="determinate"
                                value={stat.healthScore}
                                sx={{ width: 60, height: 6, borderRadius: 3 }}
                              />
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={`${stat.vaccinationRate}%`}
                              color={stat.vaccinationRate >= 90 ? 'success' : 'warning'}
                              size="small"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Public Health Insights */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Public Health Insights & Recommendations
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2, backgroundColor: 'success.50' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'success.main' }}>
                    🎯 Positive Trends
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    • Vaccination rates improving across all zones
                    • Rural areas showing better hypertension management
                    • Overall health score trending upward
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2, backgroundColor: 'warning.50' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'warning.main' }}>
                    ⚠️ Areas of Concern
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    • Urban diabetes rates increasing
                    • Respiratory issues rising in industrial areas
                    • East Zone needs vaccination campaign focus
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Data Privacy Notice */}
        <Card sx={{ backgroundColor: 'info.50' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'info.main' }}>
              🔒 Data Privacy & Anonymization
            </Typography>
            <Typography variant="body2" color="textSecondary">
              All data displayed is anonymized and aggregated to protect individual privacy. 
              This dashboard helps public health officials and NGOs make data-driven decisions 
              for community health improvement programs.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Layout>
  );
};

export default CommunityHealth;
