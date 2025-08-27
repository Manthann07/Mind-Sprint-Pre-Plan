import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Chip,
  Paper,
} from '@mui/material';
import {
  Medication,
  Download,
  Description,
  Print,
} from '@mui/icons-material';
import Layout from '../components/Layout';

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    // Temporary mock data
    setPrescriptions([
      {
        id: 'rx-001',
        date: '2024-01-12',
        doctor: 'Dr. Sarah Wilson',
        patient: 'John Doe',
        meds: ['Lisinopril 10mg - 1 tab daily', 'Atorvastatin 20mg - 1 tab nightly'],
        notes: 'Monitor blood pressure daily. Reduce salt intake.',
        status: 'active',
      },
      {
        id: 'rx-002',
        date: '2023-12-02',
        doctor: 'Dr. Michael Brown',
        patient: 'John Doe',
        meds: ['Metformin 500mg - 1 tab twice daily'],
        notes: 'Check fasting glucose weekly.',
        status: 'active',
      },
    ]);
  }, []);

  return (
    <Layout>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
            Prescriptions
          </Typography>
          <Typography variant="h6" color="textSecondary">
            View and download your digital prescriptions
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {prescriptions.map((rx) => (
            <Grid item xs={12} key={rx.id}>
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
                <Grid container spacing={2}>
                  <Grid item xs={12} md={8}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Medication color="primary" />
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Prescription {rx.id}
                      </Typography>
                      <Chip label={rx.status} size="small" color="success" />
                    </Box>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                      Date: {rx.date}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Doctor: {rx.doctor}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Patient: {rx.patient}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                      Medications:
                    </Typography>
                    {rx.meds.map((m, i) => (
                      <Typography key={i} variant="body2">• {m}</Typography>
                    ))}
                    <Typography variant="subtitle2" sx={{ mt: 1 }}>
                      Notes:
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {rx.notes}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Card sx={{ height: '100%' }}>
                      <CardContent>
                        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                          Actions
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                          <Button variant="contained" startIcon={<Download />}>Download PDF</Button>
                          <Button variant="outlined" startIcon={<Print />}>Print</Button>
                          <Button variant="outlined" startIcon={<Description />}>View Details</Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Layout>
  );
};

export default Prescriptions;
