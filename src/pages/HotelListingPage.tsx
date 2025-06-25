import React, { useState } from 'react';
import { Add, Remove } from '@mui/icons-material'; // Add this at the top
import FilterPanel from '../components/FilterPanel';
import HotelCard, { Hotel } from '../components/HotelCard';
import {
    Box,
    Grid,
    Typography,
    Button,
    TextField,
    Pagination,
    InputAdornment,
} from '@mui/material';


import SearchIcon from '@mui/icons-material/Search';
import Header from '../components/Header';


const hotels = new Array(9).fill({
    name: 'Osaka Luxury Suites',
    rating: 4.3,
    reviews: 1214,
    price: 300,
    offerPrice: 240,
    distance: '20.7 km drive to Dallas City Center',
    amenities: ['Swimming Pool', 'Gym'],
    imageUrl: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/506955680.jpg?k=f6e5ef0ecf85029aa536bc67e5e00d7f2de8c13be1fcb1b6e0546c2fcbb94e2a&o=&hp=1',
});

const amenities = [
    'Free Wifi',
    'Free Car Parking',
    'Pets Allowed',
    'Swimming Pool',
    'Gym',
    'Spa',
    'Restaurant',
];

const prices = [
    '$0 to $50',
    '$100 to $200',
    '$200 to $300',
    '$300 to $400',
    '$400 to $500',
    '$500 to $1000',
    '$1000 to $1500',
];

const HotelListingPage = () => {

    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
    const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
    const [selectedStars, setSelectedStars] = useState<number>(5);

    const [searchLocation, setSearchLocation] = useState("Dallas, TX");
    const [sortBy, setSortBy] = useState("Most Popular");

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


    const toggleAmenity = (value: string) => {
        setSelectedAmenities(prev =>
            prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
        );
    };

    const togglePrice = (value: string) => {
        setSelectedPrices(prev =>
            prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
        );
    };

    const clearFilters = () => {
        setSelectedAmenities([]);
        setSelectedPrices([]);
    };

    return (
        <>
            <Header />

            {/* Hero Section */}
            <Box sx={{ backgroundColor: '#f5f5f5', px: { xs: 2, md: 6 }, py: 2, borderBottom: '1px solid #ccc' }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={3}>
                        <TextField
                            fullWidth
                            label="Enter a Destination or Property"
                            variant="outlined"
                            size="small"
                            value={searchLocation}
                            onChange={(e) => setSearchLocation(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6} md={2.5}>
                        <TextField
                            fullWidth
                            type="date"
                            label="Check-in"
                            InputLabelProps={{ shrink: true }}
                            defaultValue="2025-07-09"
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={6} md={2.5}>
                        <TextField
                            fullWidth
                            type="date"
                            label="Check-out"
                            InputLabelProps={{ shrink: true }}
                            defaultValue="2025-07-11"
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box display="flex" alignItems="center" position="relative">
                            <TextField
                                fullWidth
                                label="Guests"
                                value={guestSummary}
                                size="small"
                                onClick={() => setShowGuestDropdown(!showGuestDropdown)}
                                InputProps={{ readOnly: true }}
                            />
                            <Box ml={2} flexShrink={0}>
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: '#ff6b00',
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: '#e65c00',
                                        },
                                    }}
                                >
                                    Update Search
                                </Button>

                            </Box>

                            {showGuestDropdown && (
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: '100%',
                                        left: 0,
                                        width: '100%',
                                        bgcolor: 'white',
                                        boxShadow: 3,
                                        borderRadius: 2,
                                        zIndex: 10,
                                        p: 2,
                                        mt: 1,
                                    }}
                                >
                                    {/* Rooms, Adults, Children selectors */}
                                    {[{ label: 'Rooms', value: rooms, setValue: setRooms, min: 1, max: 9 },
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
                        </Box>
                    </Grid>

                </Grid>
            </Box>

            {/* Sort & Search */}
            <Box
                px={{ xs: 2, md: 6 }}
                pt={2}
                display="flex"
                flexDirection={{ xs: 'column', md: 'row' }}
                justifyContent="space-between"
                alignItems={{ xs: 'stretch', md: 'center' }}
                gap={2}
            >
                <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
                    <Typography variant="body2" fontWeight={500}>Sort by:</Typography>
                    <Button
                        size="small"
                        variant={sortBy === 'Most Popular' ? 'contained' : 'outlined'}
                        onClick={() => setSortBy('Most Popular')}
                        sx={{ textTransform: 'none' }}
                    >
                        Most Popular
                    </Button>
                    <Button
                        size="small"
                        variant={sortBy === 'Price - Low to High' ? 'contained' : 'outlined'}
                        onClick={() => setSortBy('Price - Low to High')}
                        sx={{ textTransform: 'none' }}
                    >
                        Price - Low to High
                    </Button>
                    <Button
                        size="small"
                        variant={sortBy === 'Price - High to Low' ? 'contained' : 'outlined'}
                        onClick={() => setSortBy('Price - High to Low')}
                        sx={{ textTransform: 'none' }}
                    >
                        Price - High to Low
                    </Button>
                    <Button
                        size="small"
                        variant={sortBy === 'Highest Reviews' ? 'contained' : 'outlined'}
                        onClick={() => setSortBy('Highest Reviews')}
                        sx={{ textTransform: 'none' }}
                    >
                        Highest Reviews
                    </Button>
                </Box>

                {/* Search Field Right Aligned */}
                <TextField
                    size="small"
                    placeholder="Search Location or Property Name"
                    sx={{ minWidth: '280px' }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>



            {/* Main Section */}
            <Box px={{ xs: 2, md: 6 }} py={4}>
                <Grid container spacing={3}>
                    {/* Filter Section */}
                    <Grid item xs={12} md={3}>
                        <FilterPanel
                            amenities={amenities}
                            selectedAmenities={selectedAmenities}
                            onToggleAmenity={toggleAmenity}
                            prices={prices}
                            selectedPrices={selectedPrices}
                            onTogglePrice={togglePrice}
                            selectedStars={selectedStars}
                            onStarChange={(star) => setSelectedStars(star)}
                            onClearFilters={clearFilters}
                        />
                    </Grid>

                    {/* Listing Section */}
                    <Grid item xs={12} md={9}>

                        {/* Hotel Cards */}
                        <Box display="flex" flexDirection="column" gap={2}>
                            {hotels.map((hotel: Hotel, idx) => (
                                <HotelCard key={idx} hotel={hotel} />
                            ))}
                        </Box>

                        {/* Pagination */}
                        <Box mt={4} display="flex" justifyContent="center">
                            <Pagination count={10} color="primary" />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default HotelListingPage;
