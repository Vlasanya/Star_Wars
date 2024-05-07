'use client'
import React from 'react';
import { useRouter } from 'next/navigation'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


const LocationDetails = ({ params }: { params: { id: string } }) => {
    const router = useRouter()
    const [location, setLocation] = React.useState<LocationType | null>(null)
    const [info, setInfo] = React.useState<InfoType | null>(null)
    const [isLoading, setLoading] = React.useState(true)

    React.useEffect(() => {
        fetch(`/api/location/${params.id}`)
            .then((res) => res.json())
            .then((res) => {
                setLocation(res)
                setLoading(false)
            })
    }, [])

    if (isLoading) return <p>Loading...</p>
    if (!location) return <p>No info</p>
    return <main>

        <Box sx={{ bgcolor: 'background.paper', pt: 8, pb: 6, height: '100vh' }}>
            <Container sx={{ py: 8 }} maxWidth="md">
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h4" align="center">{location.name}</Typography>
                        <Typography variant="body1">Type: {location.type}</Typography>
                        <Typography variant="body1">Dimension: {location.dimension}</Typography>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" onClick={() => router.push('/locations')}>Back</Button>
                    </CardActions>
                </Card>
            </Container>
        </Box>
    </main>
    
};

export default LocationDetails;
