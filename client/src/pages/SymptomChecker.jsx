import { useState, useRef, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Paper,
  Avatar,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Send,
  Psychology,
  HealthAndSafety,
  Warning,
  Info,
  CheckCircle,
  Close,
  Mic,
  Stop,
  History,
  TrendingUp,
} from '@mui/icons-material';
import Layout from '../components/Layout';

const SymptomChecker = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showEmergencyDialog, setShowEmergencyDialog] = useState(false);
  const [currentSymptoms, setCurrentSymptoms] = useState([]);
  const [healthScore, setHealthScore] = useState(85);
  const messagesEndRef = useRef(null);

  // Mock AI responses for demonstration
  const aiResponses = {
    'headache': {
      response: "I understand you're experiencing a headache. Let me ask a few questions to better assess your situation.",
      questions: [
        "How severe is the pain on a scale of 1-10?",
        "Where exactly is the pain located?",
        "How long have you had this headache?",
        "Are there any other symptoms like nausea or sensitivity to light?"
      ],
      severity: "moderate",
      recommendations: [
        "Rest in a quiet, dark room",
        "Stay hydrated",
        "Consider over-the-counter pain relievers",
        "Monitor for worsening symptoms"
      ]
    },
    'fever': {
      response: "A fever can indicate various conditions. Let me gather more information to help you.",
      questions: [
        "What's your current temperature?",
        "Are you experiencing chills or sweating?",
        "Do you have any other symptoms?",
        "Have you been exposed to anyone who's sick?"
      ],
      severity: "high",
      recommendations: [
        "Monitor your temperature regularly",
        "Stay hydrated and rest",
        "Consider fever-reducing medications",
        "Seek medical attention if fever persists above 103°F"
      ]
    },
    'chest pain': {
      response: "Chest pain requires immediate attention. This could be serious.",
      questions: [
        "Is the pain sharp or dull?",
        "Does it radiate to your arm, jaw, or back?",
        "Are you experiencing shortness of breath?",
        "Do you have a history of heart problems?"
      ],
      severity: "critical",
      recommendations: [
        "Call emergency services immediately",
        "Don't delay seeking medical help",
        "Stay calm and rest",
        "This could be a medical emergency"
      ]
    }
  };

  useEffect(() => {
    // Add welcome message
    setMessages([
      {
        id: 1,
        type: 'ai',
        content: "Hello! I'm your AI Health Assistant. I can help you assess symptoms and provide health guidance. Please describe what you're experiencing, or you can speak to me using the microphone button.",
        timestamp: new Date(),
        suggestions: ['Headache', 'Fever', 'Chest Pain', 'Fatigue', 'Nausea']
      }
    ]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI processing
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    
    // Check for emergency keywords
    if (lowerInput.includes('chest pain') || lowerInput.includes('heart attack') || lowerInput.includes('stroke')) {
      setShowEmergencyDialog(true);
      return {
        id: Date.now(),
        type: 'ai',
        content: "⚠️ EMERGENCY ALERT: You've mentioned symptoms that could indicate a serious medical condition. Please call emergency services immediately if you're experiencing severe chest pain, shortness of breath, or other emergency symptoms.",
        timestamp: new Date(),
        severity: 'critical',
        isEmergency: true
      };
    }

    // Check for known symptoms
    for (const [symptom, data] of Object.entries(aiResponses)) {
      if (lowerInput.includes(symptom)) {
        setCurrentSymptoms(prev => [...prev, symptom]);
        return {
          id: Date.now(),
          type: 'ai',
          content: data.response,
          timestamp: new Date(),
          questions: data.questions,
          recommendations: data.recommendations,
          severity: data.severity
        };
      }
    }

    // Generic response
    return {
      id: Date.now(),
      type: 'ai',
      content: "Thank you for sharing your symptoms. To provide you with the best guidance, I need to understand more about your situation. Could you please provide more details about the severity, duration, and any other symptoms you're experiencing?",
      timestamp: new Date(),
      suggestions: ['More details', 'Other symptoms', 'Duration', 'Severity']
    };
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
  };

  const handleVoiceInput = () => {
    if (isRecording) {
      setIsRecording(false);
      // Stop recording logic here
    } else {
      setIsRecording(true);
      // Start recording logic here
      // For demo purposes, simulate voice input
      setTimeout(() => {
        const voiceText = "I have a headache and feel dizzy";
        setInputValue(voiceText);
        setIsRecording(false);
      }, 2000);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'error';
      case 'high': return 'warning';
      case 'moderate': return 'info';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical': return <Warning />;
      case 'high': return <HealthAndSafety />;
      case 'moderate': return <Info />;
      case 'low': return <CheckCircle />;
      default: return <Info />;
    }
  };

  return (
    <Layout>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        {/* Header */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
            AI Symptom Checker
          </Typography>
          <Typography variant="h6" color="textSecondary" sx={{ mb: 2 }}>
            Get instant health insights and guidance from our AI-powered medical assistant
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Chip 
              icon={<Psychology />} 
              label="NLP Powered" 
              color="primary" 
              variant="outlined"
            />
            <Chip 
              icon={<HealthAndSafety />} 
              label="24/7 Available" 
              color="secondary" 
              variant="outlined"
            />
            <Chip 
              icon={<TrendingUp />} 
              label="Learning AI" 
              color="accent" 
              variant="outlined"
            />
          </Box>
        </Box>

        <Grid container spacing={3}>
          {/* Chat Interface */}
          <Grid item xs={12} md={8}>
            <Card sx={{ height: '70vh', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 0 }}>
                {/* Chat Header */}
                <Box sx={{ 
                  p: 2, 
                  borderBottom: 1, 
                  borderColor: 'divider',
                  backgroundColor: 'primary.main',
                  color: 'white'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ backgroundColor: 'secondary.main' }}>
                      <Psychology />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        AI Health Assistant
                      </Typography>
                      <Typography variant="caption" sx={{ opacity: 0.8 }}>
                        {isTyping ? 'Typing...' : 'Online'}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Messages */}
                <Box sx={{ 
                  flex: 1, 
                  overflowY: 'auto', 
                  p: 2,
                  backgroundColor: 'grey.50'
                }}>
                  {messages.map((message) => (
                    <Box
                      key={message.id}
                      sx={{
                        display: 'flex',
                        justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
                        mb: 2
                      }}
                    >
                      <Paper
                        sx={{
                          p: 2,
                          maxWidth: '80%',
                          backgroundColor: message.type === 'user' ? 'primary.main' : 'white',
                          color: message.type === 'user' ? 'white' : 'text.primary',
                          borderRadius: 2,
                          boxShadow: 2
                        }}
                      >
                        <Typography variant="body1" sx={{ mb: 1 }}>
                          {message.content}
                        </Typography>
                        
                        {message.severity && (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            {getSeverityIcon(message.severity)}
                            <Chip 
                              label={message.severity.toUpperCase()} 
                              color={getSeverityColor(message.severity)}
                              size="small"
                            />
                          </Box>
                        )}

                        {message.questions && (
                          <Box sx={{ mt: 2 }}>
                            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                              Please answer these questions:
                            </Typography>
                            <List dense>
                              {message.questions.map((question, index) => (
                                <ListItem key={index} sx={{ py: 0.5 }}>
                                  <ListItemIcon sx={{ minWidth: 24 }}>
                                    <Typography variant="body2" color="primary">
                                      {index + 1}.
                                    </Typography>
                                  </ListItemIcon>
                                  <ListItemText 
                                    primary={question} 
                                    primaryTypographyProps={{ variant: 'body2' }}
                                  />
                                </ListItem>
                              ))}
                            </List>
                          </Box>
                        )}

                        {message.recommendations && (
                          <Box sx={{ mt: 2 }}>
                            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                              Recommendations:
                            </Typography>
                            <List dense>
                              {message.recommendations.map((rec, index) => (
                                <ListItem key={index} sx={{ py: 0.5 }}>
                                  <ListItemIcon sx={{ minWidth: 24 }}>
                                    <CheckCircle color="success" fontSize="small" />
                                  </ListItemIcon>
                                  <ListItemText 
                                    primary={rec} 
                                    primaryTypographyProps={{ variant: 'body2' }}
                                  />
                                </ListItem>
                              ))}
                            </List>
                          </Box>
                        )}

                        {message.suggestions && (
                          <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            {message.suggestions.map((suggestion, index) => (
                              <Chip
                                key={index}
                                label={suggestion}
                                size="small"
                                variant="outlined"
                                onClick={() => handleSuggestionClick(suggestion)}
                                sx={{ cursor: 'pointer' }}
                              />
                            ))}
                          </Box>
                        )}

                        <Typography variant="caption" sx={{ opacity: 0.7, display: 'block', mt: 1 }}>
                          {message.timestamp.toLocaleTimeString()}
                        </Typography>
                      </Paper>
                    </Box>
                  ))}
                  
                  {isTyping && (
                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
                      <Paper sx={{ p: 2, backgroundColor: 'white' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CircularProgress size={16} />
                          <Typography variant="body2">AI is analyzing your symptoms...</Typography>
                        </Box>
                      </Paper>
                    </Box>
                  )}
                  
                  <div ref={messagesEndRef} />
                </Box>

                {/* Input Area */}
                <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Describe your symptoms or ask a health question..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      size="small"
                    />
                    <Tooltip title={isRecording ? "Stop Recording" : "Voice Input"}>
                      <IconButton
                        color={isRecording ? "error" : "primary"}
                        onClick={handleVoiceInput}
                        sx={{ 
                          backgroundColor: isRecording ? 'error.light' : 'primary.light',
                          '&:hover': {
                            backgroundColor: isRecording ? 'error.main' : 'primary.main',
                            color: 'white'
                          }
                        }}
                      >
                        {isRecording ? <Stop /> : <Mic />}
                      </IconButton>
                    </Tooltip>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim()}
                      endIcon={<Send />}
                    >
                      Send
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Health Insights Panel */}
          <Grid item xs={12} md={4}>
            <Grid container spacing={2}>
              {/* Health Score */}
              <Grid item xs={12}>
                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" color="primary.main" sx={{ fontWeight: 700 }}>
                      {healthScore}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      Health Score
                    </Typography>
                    <Box sx={{ position: 'relative', display: 'inline-flex', mb: 2 }}>
                      <CircularProgress
                        variant="determinate"
                        value={healthScore}
                        size={80}
                        thickness={4}
                        color="primary"
                      />
                      <Box
                        sx={{
                          top: 0,
                          left: 0,
                          bottom: 0,
                          right: 0,
                          position: 'absolute',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Typography variant="h6" component="div" color="primary.main">
                          {healthScore}%
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" color="textSecondary">
                      Based on your symptoms and health data
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              {/* Current Symptoms */}
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                      Current Symptoms
                    </Typography>
                    {currentSymptoms.length > 0 ? (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {currentSymptoms.map((symptom, index) => (
                          <Chip
                            key={index}
                            label={symptom}
                            color="warning"
                            variant="outlined"
                            onDelete={() => setCurrentSymptoms(prev => prev.filter((_, i) => i !== index))}
                          />
                        ))}
                      </Box>
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        No symptoms recorded yet
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>

              {/* Quick Actions */}
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                      Quick Actions
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<History />}
                        fullWidth
                      >
                        View History
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        startIcon={<HealthAndSafety />}
                        fullWidth
                      >
                        Health Records
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        startIcon={<Warning />}
                        fullWidth
                        onClick={() => setShowEmergencyDialog(true)}
                      >
                        Emergency Services
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>

      {/* Emergency Dialog */}
      <Dialog
        open={showEmergencyDialog}
        onClose={() => setShowEmergencyDialog(false)}
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
          <Warning />
          Emergency Medical Alert
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              ⚠️ This could be a medical emergency!
            </Typography>
            <Typography variant="body1">
              Based on your symptoms, you may need immediate medical attention. 
              Please call emergency services (911) or go to the nearest emergency room.
            </Typography>
          </Alert>
          
          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>Do NOT delay seeking medical help</strong> if you experience:
          </Typography>
          
          <List>
            <ListItem>
              <ListItemIcon>
                <Warning color="error" />
              </ListItemIcon>
              <ListItemText primary="Severe chest pain or pressure" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Warning color="error" />
              </ListItemIcon>
              <ListItemText primary="Difficulty breathing or shortness of breath" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Warning color="error" />
              </ListItemIcon>
              <ListItemText primary="Sudden severe headache" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Warning color="error" />
              </ListItemIcon>
              <ListItemText primary="Loss of consciousness or confusion" />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button 
            variant="outlined" 
            onClick={() => setShowEmergencyDialog(false)}
          >
            I Understand
          </Button>
          <Button 
            variant="contained" 
            color="error"
            startIcon={<Warning />}
            onClick={() => {
              // In a real app, this would call emergency services
              alert('Calling emergency services...');
              setShowEmergencyDialog(false);
            }}
          >
            Call Emergency Services
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default SymptomChecker;
