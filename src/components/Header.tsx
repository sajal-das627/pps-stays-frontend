import React from 'react';
import { AppBar, Toolbar, Box, Button, Slide, useScrollTrigger } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HideOnScroll = ({ children }: { children: React.ReactElement }) => {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

const Header = () => {
  const navigate = useNavigate();

  return (
    // <HideOnScroll>  
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
    // </HideOnScroll>
  );
};

export default Header;
