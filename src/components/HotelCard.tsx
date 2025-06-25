import React from 'react';
import {
  Box,
  Card,
  CardMedia,
  Typography,
  Chip,
  Button,
  Divider,
} from '@mui/material';

import DoneIcon from '@mui/icons-material/Done';

export interface Hotel {
  name: string;
  rating: number;
  reviews: number;
  price: number;
  offerPrice: number;
  distance: string;
  amenities: string[];
  imageUrl: string;
}

interface HotelCardProps {
  hotel: Hotel;
  /** Optional callback if you want the whole card clickable */
  onSelect?: (hotel: Hotel) => void;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel, onSelect }) => (
  <Card
    variant="outlined"
    sx={{
      display: 'flex',
      p: 2,
      borderLeft: '5px solid #f44336',
      cursor: onSelect ? 'pointer' : 'default',
      flexDirection: {
        xs: 'column', // phones
        sm: 'column', // tablets
        md: 'row',    // laptops and up
      },
    }}
    onClick={() => onSelect?.(hotel)}
  >
    {/* image */}
    <Box flexShrink={0}>
      <CardMedia
        component="img"
        sx={{ width: 180, height: 140, borderRadius: 2 }}
        image={hotel.imageUrl}
        alt={hotel.name}
      />
    </Box>

    {/* main details */}
    <Box flex={1} pl={2}
      sx={{
        marginBottom: {
          xs: '1rem',
          sm: '1rem',
        },
      }}
    >
      <Box display="flex" justifyContent="space-between" flexWrap="wrap">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }} 
          // display="flex"
        >
          <Typography variant="body2" fontWeight={600}>
            4★ Hotel
          </Typography>
          <Box 
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              flex: 1,
              gap: 1,
            }}
          >
            <Typography variant="caption">{hotel.reviews} Ratings</Typography>
            <Chip 
              label={`${hotel.rating}/5`} 
              color="success" 
              sx={{
                borderRadius: '3px',
              }}
            />
          </Box>
        </Box>
        <Box>
          <Typography variant="h6">{hotel.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>📍 Irving</strong> • {hotel.distance}
          </Typography>
        </Box>
      </Box>

      <Box display="flex" alignItems="center" mt={1} flexWrap="wrap" gap={1} mb={2}>
        {hotel.amenities.slice(0, 3).map((item) => (
          <Chip key={item} label={item} size="small" variant="outlined"
            sx={{
              borderRadius: '3px',
            }}
          />
        ))}
        {hotel.amenities.length > 3 && <Chip label="& more" size="small" color="primary" />}
      </Box>

      {/* <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 1 }}
      >
        ✔️ Free Cancellation • Free stay for the child • Book @ ₹0 • Breakfast available at extra charges
      </Typography> */}

      <Box>
        {[
          'Free Cancellation',
          'Free stay for the child',
          'Book @ ₹0 Available',
          'Breakfast available at extra charges'
        ].map((sentence, index) => (
          <Typography key={index} 
            sx={{ 
              fontSize: '12px',
              lineHeight: '0.5 rem',
            }}
          >
            <DoneIcon sx={{
              width: '12px',
              height: '16px',
              fill: 'rgb(21 111 26)',
              verticalAlign: 'middle', 
              mr: 0.5,
            }}
            /> {sentence}
          </Typography>
        ))}
      </Box>
    </Box>

    <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

    {/* pricing / cta */}
    <Box
      minWidth={160}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      textAlign="center"
    >
      <Box>
        <Typography
          variant="caption"
          sx={{
            backgroundColor: '#ffebee',
            color: '#d32f2f',
            fontWeight: 'bold',
            px: 1,
            py: 0.5,
            borderRadius: '4px',
            display: 'inline-block',
            mb: 0.5,
          }}
        >
          20% Off
        </Typography>
        <Typography variant="caption" display="block" color="text.secondary">
          Pay using American Express card
        </Typography>
      </Box>

      <Box>
        <Typography variant="body2" sx={{ textDecoration: 'line-through' }}>
          ${hotel.price}
        </Typography>
        <Typography variant="h6">${hotel.offerPrice}</Typography>
        <Typography variant="caption">For 1 room per night</Typography>
        <Button
          fullWidth
          variant="contained"
          size="small"
          sx={{
            backgroundColor: '#ff6b00',
            color: 'white',
            mt: 1,
            '&:hover': { backgroundColor: '#e65c00' },
          }}
        >
          Check Availability
        </Button>
      </Box>
    </Box>
  </Card>
);

export default HotelCard;
