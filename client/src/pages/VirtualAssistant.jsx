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
  IconButton,
  Tooltip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Badge,
} from '@mui/material';
import {
  Send,
  SmartToy,
  HealthAndSafety,
  Psychology,
  CalendarToday,
  Medication,
  LocationOn,
  Emergency,
  Help,
  ExpandMore,
  Mic,
  Stop,
  History,
  Settings,
  TrendingUp,
  Favorite,
  Speed,
  Opacity,
  WbSunny,
  DirectionsWalk,
  Bed,
  LocalHospital,
  Person,
  Phone,
  Email,
  Share,
  Print,
  Download,
  CloudUpload,
  Security,
  Notifications,
  Language,
  Accessibility,
} from '@mui/icons-material';
import Layout from '../components/Layout';

const VirtualAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [activeCategory, setActiveCategory] = useState('general');
  const [showQuickActions, setShowQuickActions] = useState(true);
  const messagesEndRef = useRef(null);

  // Mock AI responses for demonstration
  const aiResponses = {
    'appointment': {
      response: "I can help you with appointment scheduling! Here are your options:",
      actions: [
        "Book new appointment",
        "Reschedule existing appointment",
        "Cancel appointment",
        "View upcoming appointments"
      ],
      category: "appointments"
    },
    'medication': {
      response: "I can assist you with medication-related queries. What would you like to know?",
      actions: [
        "Check medication interactions",
        "Set medication reminders",
        "Refill prescriptions",
        "View medication history"
      ],
      category: "medications"
    },
    'symptoms': {
      response: "I can help assess your symptoms. Please describe what you're experiencing in detail.",
      actions: [
        "Symptom checker",
        "Find nearby doctors",
        "Emergency services",
        "Health records"
      ],
      category: "health"
    },
    'location': {
      response: "I can help you find healthcare facilities near you. What type of care do you need?",
      actions: [
        "Find hospitals",
        "Find pharmacies",
        "Find urgent care",
        "Find specialists"
      ],
      category: "location"
    }
  };

  const quickActions = [
    {
      title: 'Book Appointment',
      description: 'Schedule with specialists',
      icon: <CalendarToday />,
      color: 'primary',
      action: 'appointment'
    },
    {
      title: 'Medication Help',
      description: 'Get medication assistance',
      icon: <Medication />,
      color: 'secondary',
      action: 'medication'
    },
    {
      title: 'Symptom Checker',
      description: 'Assess your symptoms',
      icon: <HealthAndSafety />,
      color: 'accent',
      action: 'symptoms'
    },
    {
      title: 'Find Facilities',
      description: 'Locate healthcare centers',
      icon: <LocationOn />,
      color: 'info',
      action: 'location'
    },
    {
      title: 'Emergency Help',
      description: 'Get immediate assistance',
      icon: <Emergency />,
      color: 'error',
      action: 'emergency'
    },
    {
      title: 'Health Records',
      description: 'Access your medical data',
      icon: <HealthAndSafety />,
      color: 'success',
      action: 'records'
    }
  ];

  const faqCategories = [
    {
      title: 'General Health',
      icon: <HealthAndSafety />,
      questions: [
        {
          question: 'How do I book an appointment?',
          answer: 'You can book appointments through the appointment section, or I can help you schedule one right now. Just let me know what type of specialist you need and your preferred time.'
        },
        {
          question: 'How do I access my health records?',
          answer: 'Your health records are available in the Health Records section. You can view, download, and share them with your healthcare providers.'
        },
        {
          question: 'Can I get medication reminders?',
          answer: 'Yes! I can help you set up medication reminders. Just tell me your medication schedule and I\'ll configure reminders for you.'
        }
      ]
    },
    {
      title: 'Appointments',
      icon: <CalendarToday />,
      questions: [
        {
          question: 'How do I reschedule an appointment?',
          answer: 'You can reschedule appointments through the appointment section. I can also help you find alternative times if needed.'
        },
        {
          question: 'What should I bring to my appointment?',
          answer: 'Bring your ID, insurance card, list of current medications, and any recent test results. It\'s also helpful to write down your symptoms and questions.'
        }
      ]
    },
    {
      title: 'Medications',
      icon: <Medication />,
      questions: [
        {
          question: 'How do I check for drug interactions?',
          answer: 'I can help you check for potential drug interactions. Just provide me with your current medications and I\'ll analyze them for any conflicts.'
        },
        {
          question: 'Can I get prescription refills?',
          answer: 'Yes, you can request prescription refills through the prescription section. I can also help you track when refills are due.'
        }
      ]
    }
  ];

  useEffect(() => {
    // Add welcome message
    setMessages([
      {
        id: 1,
        type: 'ai',
        content: "Hello! I'm your AI Health Assistant, available 24/7 to help you with all your healthcare needs. How can I assist you today?",
        timestamp: new Date(),
        category: 'general'
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
    if (lowerInput.includes('emergency') || lowerInput.includes('urgent') || lowerInput.includes('pain')) {
      return {
        id: Date.now(),
        type: 'ai',
        content: "🚨 I detect you may need immediate medical attention. If this is an emergency, please call 911 or go to the nearest emergency room. I can help you find nearby emergency facilities or connect you with emergency services.",
        timestamp: new Date(),
        category: 'emergency',
        isEmergency: true
      };
    }

    // Check for known categories
    for (const [keyword, data] of Object.entries(aiResponses)) {
      if (lowerInput.includes(keyword)) {
        setActiveCategory(data.category);
        return {
          id: Date.now(),
          type: 'ai',
          content: data.response,
          timestamp: new Date(),
          actions: data.actions,
          category: data.category
        };
      }
    }

    // Generic response
    return {
      id: Date.now(),
      type: 'ai',
      content: "Thank you for your message. I'm here to help with your healthcare needs. You can ask me about appointments, medications, symptoms, finding healthcare facilities, or any other health-related questions. How can I assist you further?",
      timestamp: new Date(),
      category: 'general',
      suggestions: ['Book appointment', 'Medication help', 'Symptom checker', 'Find facilities']
    };
  };

  const handleQuickAction = (action) => {
    const actionMessage = {
      id: Date.now(),
      type: 'user',
      content: `I need help with ${action}`,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, actionMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI processing
    setTimeout(() => {
      const aiResponse = generateAIResponse(action);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000);
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
        const voiceText = "I need to book an appointment with a cardiologist";
        setInputValue(voiceText);
        setIsRecording(false);
      }, 2000);
      setShowQuickActions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
  };

  return (
    <Layout>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        {/* Header */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
            AI Virtual Health Assistant
          </Typography>
          <Typography variant="h6" color="textSecondary" sx={{ mb: 2 }}>
            24/7 AI-powered healthcare support and assistance
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Chip 
              icon={<SmartToy />} 
              label="AI Powered" 
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
              icon={<Psychology />} 
              label="Smart Learning" 
              color="accent" 
              variant="outlined"
            />
          </Box>
        </Box>

        <Grid container spacing={3}>
          {/* Chat Interface */}
          <Grid item xs={12} md={8}>
            <Card sx={{ height: '80vh', display: 'flex', flexDirection: 'column' }}>
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
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      badgeContent={
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            backgroundColor: 'success.main',
                            borderRadius: '50%',
                            border: '2px solid white'
                          }}
                        />
                      }
                    >
                      <Avatar sx={{ backgroundColor: 'secondary.main' }}>
                        <SmartToy />
                      </Avatar>
                    </Badge>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        AI Health Assistant
                      </Typography>
                      <Typography variant="caption" sx={{ opacity: 0.8 }}>
                        {isTyping ? 'Typing...' : 'Online - Available 24/7'}
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
                        
                        {message.actions && (
                          <Box sx={{ mt: 2 }}>
                            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                              Quick Actions:
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                              {message.actions.map((action, index) => (
                                <Chip
                                  key={index}
                                  label={action}
                                  size="small"
                                  variant="outlined"
                                  onClick={() => handleQuickAction(action)}
                                  sx={{ 
                                    cursor: 'pointer',
                                    color: message.type === 'user' ? 'white' : 'primary.main',
                                    borderColor: message.type === 'user' ? 'white' : 'primary.main',
                                    '&:hover': {
                                      backgroundColor: message.type === 'user' ? 'rgba(255,255,255,0.1)' : 'primary.50'
                                    }
                                  }}
                                />
                              ))}
                            </Box>
                          </Box>
                        )}

                        {message.suggestions && (
                          <Box sx={{ mt: 2 }}>
                            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                              Suggested Topics:
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                              {message.suggestions.map((suggestion, index) => (
                                <Chip
                                  key={index}
                                  label={suggestion}
                                  size="small"
                                  variant="outlined"
                                  onClick={() => handleSuggestionClick(suggestion)}
                                  sx={{ 
                                    cursor: 'pointer',
                                    color: message.type === 'user' ? 'white' : 'primary.main',
                                    borderColor: message.type === 'user' ? 'white' : 'primary.main',
                                    '&:hover': {
                                      backgroundColor: message.type === 'user' ? 'rgba(255,255,255,0.1)' : 'primary.50'
                                    }
                                  }}
                                />
                              ))}
                            </Box>
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
                          <Typography variant="body2">AI is processing your request...</Typography>
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
                      placeholder="Ask me anything about your health, appointments, medications, or healthcare needs..."
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

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            <Grid container spacing={2}>
              {/* Quick Actions */}
              {showQuickActions && (
                <Grid item xs={12}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                        Quick Actions
                      </Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                        Get instant help with common tasks
                      </Typography>
                      
                      <Grid container spacing={1}>
                        {quickActions.map((action, index) => (
                          <Grid item xs={6} key={index}>
                            <Paper
                              sx={{
                                p: 2,
                                textAlign: 'center',
                                cursor: 'pointer',
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: 2,
                                '&:hover': {
                                  borderColor: `${action.color}.main`,
                                  backgroundColor: `${action.color}.50`,
                                }
                              }}
                              onClick={() => handleQuickAction(action.action)}
                            >
                              <Box sx={{ 
                                color: `${action.color}.main`,
                                mb: 1 
                              }}>
                                {action.icon}
                              </Box>
                              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                                {action.title}
                              </Typography>
                              <Typography variant="caption" color="textSecondary">
                                {action.description}
                              </Typography>
                            </Paper>
                          </Grid>
                        ))}
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              )}

              {/* FAQ Section */}
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'secondary.main' }}>
                      Frequently Asked Questions
                    </Typography>
                    
                    {faqCategories.map((category, index) => (
                      <Accordion key={index} sx={{ mb: 1 }}>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ color: 'secondary.main' }}>
                              {category.icon}
                            </Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                              {category.title}
                            </Typography>
                          </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                          <List dense>
                            {category.questions.map((faq, faqIndex) => (
                              <ListItem key={faqIndex} sx={{ px: 0 }}>
                                <ListItemText
                                  primary={
                                    <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                                      {faq.question}
                                    </Typography>
                                  }
                                  secondary={
                                    <Typography variant="body2" color="textSecondary">
                                      {faq.answer}
                                    </Typography>
                                  }
                                />
                              </ListItem>
                            ))}
                          </List>
                        </AccordionDetails>
                      </Accordion>
                    ))}
                  </CardContent>
                </Card>
              </Grid>

              {/* AI Capabilities */}
              <Grid item xs={12}>
                <Card sx={{ 
                  background: 'linear-gradient(135deg, #0D9488 0%, #14B8A6 100%)',
                  color: 'white'
                }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                      🤖 AI Capabilities
                    </Typography>
                    <List dense>
                      <ListItem sx={{ px: 0 }}>
                        <ListItemIcon>
                          <Typography variant="body2" color="white">•</Typography>
                        </ListItemIcon>
                        <ListItemText primary="24/7 Health Support" />
                      </ListItem>
                      <ListItem sx={{ px: 0 }}>
                        <ListItemIcon>
                          <Typography variant="body2" color="white">•</Typography>
                        </ListItemIcon>
                        <ListItemText primary="Appointment Scheduling" />
                      </ListItem>
                      <ListItem sx={{ px: 0 }}>
                        <ListItemIcon>
                          <Typography variant="body2" color="white">•</Typography>
                        </ListItemIcon>
                        <ListItemText primary="Medication Assistance" />
                      </ListItem>
                      <ListItem sx={{ px: 0 }}>
                        <ListItemIcon>
                          <Typography variant="body2" color="white">•</Typography>
                        </ListItemIcon>
                        <ListItemText primary="Symptom Assessment" />
                      </ListItem>
                      <ListItem sx={{ px: 0 }}>
                        <ListItemIcon>
                          <Typography variant="body2" color="white">•</Typography>
                        </ListItemIcon>
                        <ListItemText primary="Healthcare Navigation" />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Features Showcase */}
        <Box sx={{ mt: 4 }}>
          <Card sx={{ 
            background: 'linear-gradient(135deg, #F97316 0%, #FB923C 100%)',
            color: 'white'
          }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                🚀 Advanced AI Features
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Natural Language Processing
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Understand complex health queries and provide accurate, contextual responses
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Learning & Adaptation
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Continuously learns from interactions to provide better, personalized assistance
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Multi-Modal Support
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Text and voice input support for accessibility and convenience
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Layout>
  );
};

export default VirtualAssistant;
