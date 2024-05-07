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
import Pagination from '@mui/material/Pagination';

const Episodes = () => {
    const router = useRouter()

    const [episodes, setEpisodes] = React.useState<EpisodeType[]>([])
    const [info, setInfo] = React.useState<InfoType>({
        count: 0,
        pages: 0,
        next: '',
        prev: '',
    })
    const [isLoading, setLoading] = React.useState(true)

    React.useEffect(() => {
        fetch('/api/episode')
            .then((res) => res.json())
            .then((res) => {
                const { info: currentInfo, results } = res
                setEpisodes(results)
                setInfo(currentInfo)
                setLoading(false)
            })
    }, [])

    const handlePaginatorChange = (event: React.ChangeEvent<unknown>, value: number) => {
        fetch(`/api/episode?page=${value}`)
            .then((res) => res.json())
            .then((res) => {
                const { info: currentInfo, results } = res
                setEpisodes(results)
                setInfo(currentInfo)
                setLoading(false)
            })
    }
    if (isLoading) return <p>Loading...</p>
    if (!episodes.length) return <p>No episodes</p>

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
                    Album layout
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" paragraph>
                    Something short and leading about the collection below—its contents,
                    the creator, etc. Make it short and sweet, but not too short so folks
                    don&apos;t simply skip over it entirely.
                </Typography>
                <Stack
                    sx={{pt: 4}}
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                >
                    <Button variant="contained">Main call to action</Button>
                    <Button variant="outlined">Secondary action</Button>
                </Stack>
            </Container>
            <Container sx={{ py: 8 }} maxWidth="md">
                <Grid container spacing={4}>
                    {episodes.map((episode) => (
                        <Grid item key={`episode-${episode.id}-${episode.episode}`} xs={12} sm={6} md={4}>
                            <Card
                                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                            >
                                <CardMedia
                                    component="div"
                                    sx={{
                                        // 16:9
                                        pt: '56.25%',
                                    }}
                                    image={episode.url}
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {episode.name}
                                    </Typography>
                                    <Typography>
                                        {episode.air_date}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={() => router.push(`/episodes/${episode.id}`)}>View</Button>
                                    {/*<Button size="small">Edit</Button>*/}
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <Pagination count={info.pages} onChange={handlePaginatorChange} variant="outlined" color="primary" />
        </Box>
    </main>;
}

export default Episodes;
