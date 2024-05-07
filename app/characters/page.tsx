'use client'
import React from 'react';
import { useRouter } from 'next/navigation'
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded';
import CalendarViewWeekRoundedIcon from '@mui/icons-material/CalendarViewWeekRounded';
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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';

const Characters = () => {
    const router = useRouter()

    const [characters, setCharacters] = React.useState<CharacterType[]>([])
    const [info, setInfo] = React.useState<InfoType>({
        count: 0,
        pages: 0,
        next: '',
        prev: '',
    })
    const [isLoading, setLoading] = React.useState(true)
    const [view, setView] = React.useState('grid' as 'grid' | 'list')
    const [filter, setFilter] = React.useState<CharacterFilterType>({})

    const loadCharacters = (page = 1) => {
        const urlSearchParams = new URLSearchParams(filter);
        fetch(`/api/character?page=${page}&${urlSearchParams.toString()}`)
            .then((res) => res.json())
            .then((res) => {
                const { info: currentInfo, results } = res
                setCharacters(results)
                setInfo(currentInfo)
                setLoading(false)
            })
    }

    const handlePaginatorChange = (event: React.ChangeEvent<unknown>, value: number) => {
        loadCharacters(value);
    }

    const onFilterChangeHandler = (event: SelectChangeEvent | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { name, value } = event.target
        setFilter({ ...filter, [name]: value })
        loadCharacters()
    }

    React.useEffect(() => {
        loadCharacters()
    }, [filter])

    if (isLoading) return <p>Loading...</p>
    if (!characters.length) return <p>No characters</p>

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
                    Characters
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" paragraph>
                    There is a total of 826 characters sorted by id.
                </Typography>
                <Stack
                    sx={{pt: 4}}
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                >
                    <IconButton onClick={() => setView(view === 'list' ? 'grid' : 'list')} color={view === 'grid' ? 'primary' : 'default'}>
                        {view === 'list' ? <ViewListRoundedIcon/> : <CalendarViewWeekRoundedIcon/>}
                    </IconButton>
                    <Button variant="contained">Main call to action</Button>
                    <Button variant="outlined">Secondary action</Button>
                </Stack>
            </Container>
            <Container maxWidth="md">
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <TextField
                        id="name"
                        name="name"
                        label="Name"
                        placeholder="search by name"
                        // TODO: add debouncing
                        onChange={onFilterChangeHandler}
                    />
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="status-label">Status</InputLabel>
                    <Select
                        labelId="status-label"
                        id="status"
                        name="status"
                        value={filter.status || ''}
                        label="Status"
                        onChange={onFilterChangeHandler}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="alive">alive</MenuItem>
                        <MenuItem value="dead">dead</MenuItem>
                        <MenuItem value="unknown">unknown</MenuItem>
                    </Select>
                    <FormHelperText>Filter Status</FormHelperText>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="species-label">Species</InputLabel>
                    <Select
                        labelId="species-label"
                        id="species"
                        name="species"
                        value={filter.species || ''}
                        label="Species"
                        onChange={onFilterChangeHandler}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="Human">Human</MenuItem>
                        <MenuItem value="Alien">Alien</MenuItem>
                        <MenuItem value="Alien">Robot</MenuItem>
                        <MenuItem value="Alien">Humanoid</MenuItem>
                        <MenuItem value="Alien">Animal</MenuItem>
                        <MenuItem value="unknown">unknown</MenuItem>
                    </Select>
                    <FormHelperText>Filter Status</FormHelperText>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="gender-label">Gender</InputLabel>
                    <Select
                        labelId="gender-label"
                        id="gender"
                        name="gender"
                        value={filter.gender || ''}
                        label="gender"
                        onChange={onFilterChangeHandler}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="female">female</MenuItem>
                        <MenuItem value="male">male</MenuItem>
                        <MenuItem value="genderless">genderless</MenuItem>
                        <MenuItem value="unknown">unknown</MenuItem>
                    </Select>
                    <FormHelperText>Filter Gender</FormHelperText>
                </FormControl>
            </Container>
            <Container sx={{ py: 8 }} maxWidth="md">
                <Grid container spacing={4}>
                    {characters.map((character) => (
                        <Grid item key={`character-${character.id}-${character.type}`} xs={12} sm={6} md={4}>
                            <Card
                                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                            >
                                <CardMedia
                                    component="div"
                                    sx={{
                                        pt: '56.25%',
                                    }}
                                    image={character.image}
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        name: {character.name}
                                    </Typography>
                                    <Typography>
                                        status: {character.status}
                                    </Typography>
                                    <Typography>
                                        species: {character.species}
                                    </Typography>
                                    <Typography>
                                        type: {character.type}
                                    </Typography>
                                    <Typography>
                                        gender: {character.gender}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={() => router.push(`/characters/${character.id}`)}>View</Button>
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

export default Characters;
