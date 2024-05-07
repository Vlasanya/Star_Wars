'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Grid, Card, Typography, Button, Pagination, CircularProgress, Container, CardActions, CardContent } from '@mui/material';

interface LocationType {
    id: number;
    name: string;
    type: string;
    dimension: string;
}

interface InfoType {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
}

const Locations = () => {
    const router = useRouter();
    const [locations, setLocations] = useState<LocationType[]>([]);
    const [info, setInfo] = useState<InfoType>({ count: 0, pages: 0, next: null, prev: null });
    const [isLoading, setLoading] = useState(true);

    const loadLocations = async (page: number) => {
        setLoading(true);
        try {
        const response = await fetch(`/api/location?page=${page}`);
        const data = await response.json();
        setLocations(data.results);
        
        setLoading(false);
        } catch (error) {
        console.error('Failed to fetch locations:', error);
        setLoading(false);
        }
    };

    const handlePaginatorChange = (event: React.ChangeEvent<unknown>, value: number) => {
        loadLocations(value);
    };

    useEffect(() => {
        loadLocations(1); 
    }, []);

    if (isLoading) return <CircularProgress />;

    return (
        <Box sx={{ bgcolor: 'background.paper', pt: 8, pb: 6 }}>
            <Container maxWidth="sm">
                <Typography variant="h2" align="center" color="text.primary" gutterBottom>
                    Locations
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" paragraph>
                    Explore a variety of locations from the Rick and Morty universe.
                </Typography>
            </Container>
            <Container maxWidth="md">
                <Grid container spacing={4}>
                    {locations.map((location) => (
                        <Grid item key={location.id} xs={12} sm={6} md={4}>
                            <Card>
                                <CardContent sx={{ flexGrow: 1 }}>

                                    <Typography variant="h5">{location.name}</Typography>
                                    <Typography variant="body1">Type: {location.type}</Typography>
                                    <Typography variant="body1">Dimension: {location.dimension}</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={() => router.push(`/locations/${location.id}`)}>View</Button>
                                    {/*<Button size="small">Edit</Button>*/}
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Pagination count={info.pages}  onChange={handlePaginatorChange} color="primary" />
            </Container>
        </Box>
    );
};

export default Locations;
