import React from 'react';
import { Add, Remove } from '@mui/icons-material'; // Add this at the top
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Slide,
  useScrollTrigger,
  Grid,
  TextField,
  Tabs,
  Tab,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HideOnScroll = ({ children }: { children: React.ReactElement }) => {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

const LandingPage = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = React.useState(0);
  const [hotelType, setHotelType] = React.useState('single');

  const [showGuestDropdown, setShowGuestDropdown] = React.useState(false);
  const [rooms, setRooms] = React.useState(1);
  const [adults, setAdults] = React.useState(2);
  const [children, setChildren] = React.useState(0);
  const [childAges, setChildAges] = React.useState<string[]>([]);

  const handleChildAgeChange = (index: number, value: string) => {
    const updatedAges = [...childAges];
    updatedAges[index] = value;
    setChildAges(updatedAges);
  };

  const guestSummary = `${adults} Adult${adults > 1 ? 's' : ''}, ${rooms} Room${rooms > 1 ? 's' : ''}`
    + (children > 0 ? `, ${children} Child${children > 1 ? 'ren' : ''}${childAges.length > 0 ? ` (${childAges.filter(age => age).join(', ')})` : ''}` : '');

  return (
    <Box>
      {/* AppBar */}
      <HideOnScroll>
        <AppBar position="sticky" color="transparent" elevation={0}>
          <Toolbar
            sx={{
              justifyContent: 'space-between',
              px: { xs: 2, md: 6 },
              py: 1,
              backgroundColor: '#ffffff',
            }}
          >
            <Box component="img" src="/images/credit-union-of-texas-logo.svg" alt="CUTX" sx={{ height: 48 }} />

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                component="img"
                src="/images/us-flag.svg"
                alt="US Flag"
                sx={{ height: 20 }}
              />
              <Box
                component="a"
                href="tel:+18005551234"
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <Box
                  component="img"
                  src="/images/call-icon.svg"
                  alt="Call"
                  sx={{ height: 20, cursor: 'pointer' }}
                />
              </Box>

              <Button
                variant="outlined"
                sx={{
                  borderRadius: 4,
                  color: '#0050C8',
                  borderColor: '#0050C8',
                  fontWeight: 600,
                  px: 3,
                  textTransform: 'none',
                  '&:hover': {
                    borderColor: '#003e99',
                    backgroundColor: '#f2f6ff',
                  },
                }}
                onClick={() => navigate('/login')}
              >
                Login / Signup
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </HideOnScroll>

      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: `url('/images/hotel-banner.svg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          py: 10,
          textAlign: 'center',
          color: 'white',
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Experience Luxury Stays In{' '}
          <Box component="span" color="orange">
            Every Destination
          </Box>
        </Typography>
        <Typography variant="subtitle1" sx={{ mt: 1 }}>
          Find Hotels tailored to your lifestyle
        </Typography>

        {/* Tabs */}
        <Box
          sx={{
            background: 'white',
            mt: 4,
            mx: 'auto',
            maxWidth: 1100,
            borderRadius: 3,
            p: 3,
            boxShadow: 3,
          }}
        >
          <Tabs
            value={tabValue}
            onChange={(_, val) => setTabValue(val)}
            variant="fullWidth"
            textColor="primary"
            indicatorColor="primary"
            sx={{ mb: 2 }}
          >
            <Tab label="Hotels" />
            <Tab label="Cars" />
            <Tab label="Flights" />
            <Tab label="Cruises" />
            <Tab label="Packages" />
          </Tabs>

          <ToggleButtonGroup
            value={hotelType}
            exclusive
            onChange={(_, val) => val && setHotelType(val)}
            sx={{ mb: 2 }}
          >
            <ToggleButton value="single">Single Hotel</ToggleButton>
            <ToggleButton value="multi">Multi Hotel</ToggleButton>
          </ToggleButtonGroup>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Enter a destination or Property"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="date"
                label="Check-in"
                InputLabelProps={{ shrink: true }}
                defaultValue="2025-07-09"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="date"
                label="Check-out"
                InputLabelProps={{ shrink: true }}
                defaultValue="2025-07-11"
              />
            </Grid>
            <Grid item xs={12} md={4} sx={{ position: 'relative' }}>
              <TextField
                fullWidth
                label="Guests"
                value={guestSummary}
                onClick={() => setShowGuestDropdown(!showGuestDropdown)}
                InputProps={{ readOnly: true }}
              />

              {showGuestDropdown && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    bgcolor: 'white',
                    boxShadow: 3,
                    borderRadius: 2,
                    zIndex: 10,
                    p: 2,
                    mt: 1,
                  }}
                >
                  {[
                    { label: 'Rooms', value: rooms, setValue: setRooms, min: 1, max: 9 },
                    { label: 'Adults', value: adults, setValue: setAdults, min: 1, max: 36 },
                    { label: 'Children', value: children, setValue: setChildren, min: 0, max: 8 },
                  ].map((item) => (
                    <Box key={item.label} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                      <Typography sx={{ color: 'black' }}>{item.label}</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Button
                          onClick={() => item.setValue(Math.max(item.min, item.value - 1))}
                          disabled={item.value <= item.min}
                          sx={{ minWidth: 36, height: 36, borderRadius: '50%', backgroundColor: '#f0f0f0' }}
                        >
                          <Remove />
                        </Button>
                        <Typography sx={{ color: 'black' }}>{item.value}</Typography>
                        <Button
                          onClick={() => item.setValue(Math.min(item.max, item.value + 1))}
                          disabled={item.value >= item.max}
                          sx={{ minWidth: 36, height: 36, borderRadius: '50%', backgroundColor: '#f0f0f0' }}
                        >
                          <Add />
                        </Button>
                      </Box>
                    </Box>
                  ))}

                  {children > 0 && (
                    <Box sx={{ mt: 2 }}>
                      {Array.from({ length: children }).map((_, index) => (
                        <Box key={index} sx={{ mb: 2 }}>
                          <Typography variant="body2" sx={{ color: 'black' }} gutterBottom>
                            Age of Child {index + 1}
                          </Typography>
                          <TextField
                            select
                            SelectProps={{ native: true }}
                            fullWidth
                            value={childAges[index] || ''}
                            onChange={(e) => handleChildAgeChange(index, e.target.value)}
                            sx={{ color: 'black' }}
                          >
                            <option value="">Age Needed...</option>
                            <option value="Infant">Infant</option>
                            {Array.from({ length: 18 }).map((_, i) => (
                              <option key={i + 1} value={`${i + 1} yrs`}>
                                {i + 1} yrs
                              </option>
                            ))}
                          </TextField>
                        </Box>
                      ))}
                    </Box>
                  )}

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Add your child's age at check-in for the best deals and assistance. Each hotel has unique policies.
                  </Typography>

                  <Button
                    variant="contained"
                    sx={{ borderRadius: 9999, px: 4 }}
                    onClick={() => setShowGuestDropdown(false)}
                  >
                    Done
                  </Button>
                </Box>
              )}
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="warning"
                size="large"
                fullWidth
                sx={{ fontWeight: 'bold' }}
              >
                Find Your Hotel
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Stats Section */}
      <Container sx={{ py: 6, textAlign: 'center', backgroundColor: '#F9F9F9' }}>
        <Grid container spacing={4}>
          <Grid item xs={6} md={3}>
            <Typography variant="h6" fontWeight="bold" sx={{ color: '#F26522' }}>
              10k+
            </Typography>
            <Typography variant="subtitle2" sx={{ color: '#F26522' }}>
              Luxury Hotels
            </Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="h6" fontWeight="bold" sx={{ color: '#F26522' }}>
              150+
            </Typography>
            <Typography variant="subtitle2" sx={{ color: '#F26522' }}>
              Destinations
            </Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="h6" fontWeight="bold" sx={{ color: '#F26522' }}>
              50K+
            </Typography>
            <Typography variant="subtitle2" sx={{ color: '#F26522' }}>
              Happy Guests
            </Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="h6" fontWeight="bold" sx={{ color: '#F26522' }}>
              4.5
            </Typography>
            <Typography variant="subtitle2" sx={{ color: '#F26522' }}>
              Average Rating
            </Typography>
          </Grid>
        </Grid>
      </Container>

    </Box>
  );
};

export default LandingPage;
