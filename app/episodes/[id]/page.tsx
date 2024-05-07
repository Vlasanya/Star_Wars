'use client'
import React from 'react';
import { useRouter } from 'next/navigation'
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Episode = ({ params }: { params: { id: string } }) => {
    const router = useRouter()
    const [episode, setEpisode] = React.useState<EpisodeType | null>(null)
    const [characters, setCharacters] = React.useState<CharacterType[]>([])
    const [info, setInfo] = React.useState<InfoType | null>(null)
    const [isLoading, setLoading] = React.useState(true)
    const [isLoadingCharacters, setLoadingCharacters] = React.useState(true)

    React.useEffect(() => {
        fetch(`/api/episode/${params.id}`)
            .then((res) => res.json())
            .then((res) => {
                setEpisode(res)
                setLoading(false)
            })
    }, [params.id])

    const loadCharacters = () => {
        setLoadingCharacters(true)
        const getCharacters = (episode?.characters || []).map((character) => {
            const characterId = character.split('/').pop()
            return fetch(`/api/character/${characterId}`).then((res) => res.json())
        })
        Promise.all(getCharacters).then((responses: CharacterType[]) => {
            setCharacters(responses)
            setLoadingCharacters(false)
        })
    }

    if (isLoading) return <p>Loading...</p>
    if (!episode) return <p>No info</p>

    return <main>
        <Box
            sx={{
                bgcolor: 'background.paper',
                pt: 8,
                pb: 6,
            }}
        >
            <Container maxWidth="sm">
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    {episode.name}
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" paragraph>
                    {episode.episode}
                </Typography>
                <Stack
                    sx={{pt: 4}}
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                >
                    <Button variant="contained" onClick={() => router.push('/episodes')}>Back</Button>
                    <Button variant="outlined" onClick={loadCharacters}>Show Characters</Button>
                </Stack>
            </Container>
            <Container sx={{ py: 8 }} maxWidth="md">
                <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                    <CardMedia
                        component="div"
                        sx={{
                            pt: '56.25%',
                        }}
                        image="https://source.unsplash.com/random?wallpapers"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                            {episode.name}
                        </Typography>
                        <Typography>
                            {episode.air_date}
                        </Typography>
                    </CardContent>
                </Card>
            </Container>
            <Container sx={{ py: 8 }} maxWidth="md">
                <Grid container spacing={4}>
                    {characters.map((character) => (
                        <Grid item key={`episode-${character.id}-${character.type}`} xs={12} sm={6} md={4}>
                            <Card
                                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                            >
                                <CardMedia
                                    component="div"
                                    sx={{
                                        pt: '56.25%',
                                    }}
                                    // image="https://source.unsplash.com/random?wallpapers"
                                    image={character.image}
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {character.name}
                                    </Typography>
                                    <Typography>
                                        {character.status}
                                    </Typography>
                                    <Typography>
                                        {character.species}
                                    </Typography>
                                    <Typography>
                                        {character.type}
                                    </Typography>
                                    <Typography>
                                        {character.gender}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    </main>;
}

export default Episode;
