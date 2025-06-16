import React, { useState } from 'react';
import {
  Box,
  Card,
  Typography,
  Divider,
  IconButton,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  useTheme,
  ToggleButton,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

export interface FilterPanelProps {
  amenities: string[];
  selectedAmenities: string[];
  onToggleAmenity: (amenity: string) => void;

  prices: string[];
  selectedPrices: string[];
  onTogglePrice: (price: string) => void;

  selectedStars: number;
  onStarChange: (star: number) => void;

  onClearFilters: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  amenities,
  selectedAmenities,
  onToggleAmenity,
  prices,
  selectedPrices,
  onTogglePrice,
  selectedStars,
  onStarChange,
  onClearFilters,
}) => {
  const theme = useTheme();
  const [openAmenity, setOpenAmenity] = useState(true);
  const [openPrice, setOpenPrice] = useState(true);
  const [openStars, setOpenStars] = useState(true);

  return (
    <Card variant="outlined" sx={{ p: 2 }}>
      {/* Title + Clear */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <Typography variant="h6">FILTERS</Typography>
        <Button
          size="small"
          sx={{ textTransform: 'none', fontSize: '0.8rem', color: theme.palette.primary.main }}
          onClick={onClearFilters}
        >
          Clear Filters
        </Button>
      </Box>
      <Divider sx={{ mb: 2 }} />

      {/* === Amenities === */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle1">Amenities</Typography>
        <IconButton size="small" onClick={() => setOpenAmenity(!openAmenity)}>
          {openAmenity ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Box>

      {openAmenity && (
        <FormGroup sx={{ pl: 1 }}>
          {amenities.map((item) => (
            <FormControlLabel
              key={item}
              control={
                <Checkbox
                  checked={selectedAmenities.includes(item)}
                  onChange={() => onToggleAmenity(item)}
                />
              }
              label={item}
            />
          ))}
        </FormGroup>
      )}

      <Divider sx={{ my: 2 }} />

      {/* === Price === */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle1">Price</Typography>
        <IconButton size="small" onClick={() => setOpenPrice(!openPrice)}>
          {openPrice ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Box>

      {openPrice && (
        <FormGroup sx={{ pl: 1 }}>
          {prices.map((item) => (
            <FormControlLabel
              key={item}
              control={
                <Checkbox
                  checked={selectedPrices.includes(item)}
                  onChange={() => onTogglePrice(item)}
                />
              }
              label={item}
            />
          ))}
        </FormGroup>
      )}

      <Divider sx={{ my: 2 }} />

      {/* === Hotel Star Level === */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle1">Hotel Star Level</Typography>
        <IconButton size="small" onClick={() => setOpenStars(!openStars)}>
          {openStars ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Box>

      {openStars && (
        <Box display="flex" flexWrap="wrap" gap={1} mt={1} mb={2}>
          {[1, 2, 3, 4, 5].map((star) => (
            <ToggleButton
              key={star}
              value={star}
              selected={selectedStars === star}
              onClick={() => onStarChange(star)}
              sx={{
                borderRadius: '20px',
                px: 2,
                py: 0.5,
                fontWeight: 500,
                color: selectedStars === star ? 'white' : 'text.primary',
                backgroundColor: selectedStars === star ? theme.palette.primary.main : '#f0f0f0',
                '&:hover': {
                  backgroundColor:
                    selectedStars === star
                      ? theme.palette.primary.dark
                      : theme.palette.grey[300],
                },
              }}
            >
              {star}+
            </ToggleButton>
          ))}
        </Box>
      )}
    </Card>
  );
};

export default FilterPanel;
