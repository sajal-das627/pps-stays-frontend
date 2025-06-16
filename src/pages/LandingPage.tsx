import React, { useState, useRef } from 'react';
import { Box, Button, Card, Container, Grid, Tab, Tabs, TextField, Typography, ToggleButton, ToggleButtonGroup,  Popper, Fade } from '@mui/material';
import HotelIcon from '@mui/icons-material/Hotel';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import FlightIcon from '@mui/icons-material/Flight';
import DirectionsBoatIcon from '@mui/icons-material/DirectionsBoat';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import Header from '../components/Header'; 
import { Add, Remove } from '@mui/icons-material';

const HotelHero: React.FC = () => {
  const anchorRef = useRef(null);

  const [tab, setTab] = React.useState(0);
  const [hotelType, setHotelType] = useState<'single' | 'multi'>('single');
  const [showGuestDropdown, setShowGuestDropdown] = React.useState(false);
  const [rooms, setRooms] = React.useState(1);
  const [adults, setAdults] = React.useState(2);
  const [children, setChildren] = React.useState(0);
  const [childAges, setChildAges] = React.useState<string[]>([]);

  const handleHotelTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: 'single' | 'multi' | null
  ) => {
    if (newValue !== null) setHotelType(newValue);
  };

  const handleChildAgeChange = (index: number, value: string) => {
    const updatedAges = [...childAges];
    updatedAges[index] = value;
    setChildAges(updatedAges);
  };

  const guestSummary = `${adults} Adult${adults > 1 ? 's' : ''}, ${rooms} Room${rooms > 1 ? 's' : ''}`
    + (children > 0 ? `, ${children} Child${children > 1 ? 'ren' : ''}${childAges.length > 0 ? ` (${childAges.filter(age => age).join(', ')})` : ''}` : '');

  return (
    <Box sx={{ bgcolor: '#E5F2FF' }}>
      <Header />
      <Box sx={{ height: '70px' }}></Box>
      <Box
        sx={{
          backgroundImage: `url('../../images/hotel-hero-img.png')`,
          //  backgroundSize: {xs:'cover', xl:'100% auto', lg:'100% 100%', md:'100% 100%'},
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          color: '#fff',
          pb: 10,
          // bgcolor: '#E5F2FF',
        }}
      >

        <Container maxWidth="xl">
          <Typography align="center" sx={{ fontSize: 50, fontWeight: 540, position: 'relative', top: 130, color: '#fff' }}>
            Experience Luxury Stays In
          </Typography>
          <Typography variant="h3" align="center" sx={{ fontSize: 50, fontWeight: 700, position: 'relative', top: 125, color: '#FF6F00', mt: 2, mb: 1 }}>
            Every Destination
          </Typography>
          <Typography align="center" gutterBottom sx={{ fontSize: 24, position: 'relative', top: 150, }}>
            Find Hotels tailored to your lifestyle
          </Typography>

          <Card
            sx={{
              position: 'relative',
              top: 235,
              left: '50%',
              transform: 'translateX(-50%)',
              height: '60px',
              width: { xs: '60%', md: '570px', lg: '570px', xl: '570px' },
              borderRadius: 2.5,
              boxShadow: '10px 10px 5px #00000033',
              backgroundColor: 'white',
              zIndex: 1,
              pb: 1.5,
            }}
          >
            <Tabs
              value={tab}
              onChange={(e, newVal) => setTab(newVal)}
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
            // sx={{ borderBottom: 1, borderColor: 'divider', position: 'absolute', top: 100, left: '25%', backgroundColor: '#fff' }}
            >
              <Tab icon={<HotelIcon />} label="Hotels" />
              <Tab icon={<DirectionsCarIcon />} label="Cars" />
              <Tab icon={<FlightIcon />} label="Flights" />
              <Tab icon={<DirectionsBoatIcon />} label="Cruises" />
              <Tab icon={<AllInclusiveIcon />} label="Packages" />
            </Tabs>
          </Card>

          {/* <Card sx={{ mt: 4, borderRadius: 4 }}> */}
          <Box sx={{ position: 'relative', top: 220, left: { xs: 0, sm: '10%' }, height: '300px', width: { xs: '90%', sm: '80%' }, borderRadius: 5, boxShadow: '10px 10px 5px #00000033', backgroundColor: 'white', zIndex: 0, p: 2, pb: { xs: 5, md: 0 } }}>
            <Grid container spacing={2} mt={2}>
              <Grid xs={12} textAlign={'left'}>
                <ToggleButtonGroup
                  value={hotelType}
                  exclusive
                  onChange={handleHotelTypeChange}
                  sx={{
                    mb: 2,
                    '& .MuiToggleButtonGroup-grouped': {
                      borderRadius: '34px !important',
                      margin: '0 5px',
                      border: '1px solid #ddd',
                    },
                  }}
                >
                  <ToggleButton
                    value="single"
                    sx={{
                      borderRadius: 4,
                      color: '#0050C8',
                      borderColor: '#0050C8',
                      fontWeight: 600,
                      px: 3,
                      textTransform: 'none',
                      '&.Mui-selected': {
                        backgroundColor: '#f2f6ff',
                        borderColor: '#003e99',
                        color: '#003e99',
                      },
                    }}
                  >
                    Single Hotel
                  </ToggleButton>
                  <ToggleButton
                    value="multi"
                    sx={{
                      borderRadius: 4,
                      color: '#0050C8',
                      borderColor: '#0050C8',
                      fontWeight: 600,
                      px: 3,
                      textTransform: 'none',
                      '&.Mui-selected': {
                        backgroundColor: '#f2f6ff',
                        borderColor: '#003e99',
                        color: '#003e99',
                      },
                    }}
                  >
                    Multi Hotel
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
              <Grid item xs={12} >
                <TextField fullWidth label="Enter a destination or Property" variant="outlined" />
              </Grid>
              <Grid item xs={6} md={3} >
                <TextField
                  fullWidth
                  label="Check-in"
                  variant="outlined"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  defaultValue="2025-07-09"
                />
              </Grid>
              <Grid item xs={6} md={3} >
                <TextField
                  fullWidth
                  label="Check-out"
                  variant="outlined"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  defaultValue="2025-07-11"
                />
              </Grid>
              <Grid item xs={12} md={6} sx={{ position: 'relative', }} >
                <TextField
                  fullWidth
                  label="Guests"
                  value={guestSummary}
                  inputRef={anchorRef}
                  onClick={() => setShowGuestDropdown(prev => !prev)}
                  InputProps={{ readOnly: true }}
                />

                <Popper
                  open={showGuestDropdown}
                  anchorEl={anchorRef.current}
                  placement="bottom-start"
                  transition
                  modifiers={[
                    {
                      name: 'offset',
                      options: {
                        offset: [0, 8],
                      },
                    },
                  ]}
                  sx={{ zIndex: 1300 }}
                >
                  {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={200}>
                      <Box
                        sx={{
                          bgcolor: 'white',
                          boxShadow: 3,
                          borderRadius: 2,
                          p: 2,
                          minWidth: 300,
                        }}
                      >
                        {[{ label: 'Rooms', value: rooms, setValue: setRooms, min: 1, max: 9 },
                        { label: 'Adults', value: adults, setValue: setAdults, min: 1, max: 36 },
                        { label: 'Children', value: children, setValue: setChildren, min: 0, max: 8 }
                        ].map((item) => (
                          <Box key={item.label} sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Typography>{item.label}</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Button
                                onClick={() => item.setValue(Math.max(item.min, item.value - 1))}
                                disabled={item.value <= item.min}
                                sx={{ minWidth: 36, height: 36, borderRadius: '50%', backgroundColor: '#f0f0f0', color:'red' }}
                              >
                                <Remove />
                              </Button>
                              <Typography>{item.value}</Typography>
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
                                <Typography variant="body2" gutterBottom>
                                  Age of Child {index + 1}
                                </Typography>
                                <TextField
                                  select
                                  SelectProps={{ native: true }}
                                  fullWidth
                                  value={childAges[index] || ''}
                                  onChange={(e) => handleChildAgeChange(index, e.target.value)}
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
                          Add your child's age at check-in for the best deals and assistance.
                        </Typography>

                        <Button
                          variant="contained"
                          sx={{ borderRadius: 9999, px: 4 }}
                          onClick={() => setShowGuestDropdown(false)}
                        >
                          Done
                        </Button>
                      </Box>
                    </Fade>
                  )}
                </Popper>
              </Grid>
              <Grid item xs={12} >
                <Box sx={{ height: 100 }}>&nbsp;</Box>

              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              position: 'relative',
              // mt: '-30px', // Negative margin to pull it up over the card
              top: { xs: 200, },
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Button
              variant="contained"
              color="warning"
              size="large"
              sx={{
                fontWeight: 'bold',
                zIndex: 1,
                width: '200px',
              }}
            >
              Find Your Hotel
            </Button>
          </Box>

        </Container>
        {/* <Button
              variant="contained"
              color="warning"
              size="large"
              fullWidth
              sx={{ fontWeight: 'bold', position: 'absolute', zIndex: 10, left: 'calc(50% - 100px)', bottom: -20, width:'200px' }}
            >
              Find Your Hotel
            </Button> */}
      </Box>


      <Box
        sx={{
          mt: 20,
          position: 'relative',
          backgroundColor: '#E5F2FF', // dreamy background
          py: 10,
          overflow: 'hidden', // hide image overflow
          zIndex: 0,
        }}
      >
        {/* Watermark 1 – left circle */}
        <Box
          component="img"
          src="/images/watermark-circle.svg"
          alt="Watermark"
          sx={{
            position: 'absolute',
            top: '20%',
            left: 0,
            width: 200,
            opacity: 0.2,
            zIndex: 0,
          }}
        />

        {/* Watermark 2 – building right */}
        <Box
          component="img"
          src="/images/watermark-building-right.svg"
          alt="Building"
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            height: '100%',
            opacity: 0.1,
            zIndex: 0,
          }}
        />

        {/* Stats */}
        <Container sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container justifyContent="center" spacing={4}>
            {[
              { label: 'Luxury Hotels', value: '10k+' },
              { label: 'Destinations', value: '150+' },
              { label: 'Happy Guests', value: '50K+' },
              { label: 'Average Rating', value: '4.5' },
            ].map((item, idx) => (
              <Grid item xs={6} md={3} key={idx} textAlign="center">
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#FF6F00' }}>
                  {item.value}
                </Typography>
                <Typography variant="subtitle1" sx={{ color: '#FF690F' }}>
                  {item.label}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

    </Box>
  );
};

export default HotelHero;