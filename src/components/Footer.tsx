import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        textAlign: 'center'
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} PPS One Stay. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
