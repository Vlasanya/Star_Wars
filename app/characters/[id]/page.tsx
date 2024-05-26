'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Spinner, Text, Box, Stack, Badge, Image, SimpleGrid, Link, Button } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import { useHeroes, Hero } from '../../../contexts/HeroContext';
import { useEpisodes } from '../../../contexts/EpisodesContext';
import { useStarships } from '../../../contexts/StarshipsContext'; // Імпорт useStarships

interface Episode {
  id: string;
  title: string;
}

interface Starship {
  id: string;
  name: string;
}

const HeroDetailPage = () => {
  const { id } = useParams();
  const { getHeroById, heroes } = useHeroes();
  const { episodes: allEpisodes } = useEpisodes();
  const { starships: allStarships } = useStarships(); // Використання useStarships
  const [hero, setHero] = useState<Hero | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [starships, setStarships] = useState<Starship[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id && heroes.length > 0) {
      const hero = getHeroById(id as string);
      if (hero) {
        setHero(hero);
        const filmIds = hero.films.map(filmId => filmId.toString());
        const starshipIds = hero.starships.map(starshipId => starshipId.toString());
        loadEpisodes(filmIds);
        loadStarships(starshipIds);
      } else {
        setLoading(false);
      }
    }
  }, [id, heroes]);

  const loadEpisodes = (filmIds: string[]) => {
    const episodesData = filmIds
      .map(filmId => allEpisodes.find(episode => episode.id === filmId))
      .filter(Boolean) as Episode[];
    setEpisodes(episodesData);
  };

  const loadStarships = (starshipIds: string[]) => {
    const starshipsData = starshipIds
      .map(starshipId => allStarships.find(starship => starship.id === starshipId))
      .filter(Boolean) as Starship[];
    setStarships(starshipsData);
    setLoading(false);
  };

  if (loading) {
    return <Spinner size="xl" />;
  }

  if (!hero) {
    return <Text fontSize="xl">Hero not found</Text>;
  }

  return (
    <Container maxW="container.md" py={8}>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={5} boxShadow="lg">
        <Stack spacing={4} align="center" textAlign="center">
          <Image
            borderRadius="full"
            boxSize="150px"
            src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
            alt={hero.name}
            fallbackSrc="https://via.placeholder.com/150"
          />
          <Text fontSize="4xl" fontWeight="bold">{hero.name}</Text>
          <Badge colorScheme="green">{hero.gender}</Badge>
          <Text fontSize="lg">Birth Year: {hero.birth_year}</Text>
          <SimpleGrid columns={2} spacing={10}>
            <Box>
              <Text fontSize="md" fontWeight="bold">Eye Color:</Text>
              <Text fontSize="md">{hero.eye_color}</Text>
            </Box>
            <Box>
              <Text fontSize="md" fontWeight="bold">Hair Color:</Text>
              <Text fontSize="md">{hero.hair_color}</Text>
            </Box>
            <Box>
              <Text fontSize="md" fontWeight="bold">Height:</Text>
              <Text fontSize="md">{hero.height} cm</Text>
            </Box>
            <Box>
              <Text fontSize="md" fontWeight="bold">Mass:</Text>
              <Text fontSize="md">{hero.mass} kg</Text>
            </Box>
            <Box>
              <Text fontSize="md" fontWeight="bold">Skin Color:</Text>
              <Text fontSize="md">{hero.skin_color}</Text>
            </Box>
          </SimpleGrid>
          <Box>
            <Text fontSize="md" fontWeight="bold">Films:</Text>
            {episodes.map((episode) => (
              <Link key={episode.id} href={`/episodes/${episode.id}`}>
                <Button as="a" variant="link">
                  {episode.title}
                </Button>
              </Link>
            ))}
          </Box>
          <Box>
            <Text fontSize="md" fontWeight="bold">Starships:</Text>
            {starships.map((starship) => (
              <Link key={starship.id} href={`/starships/${starship.id}`}>
                <Button as="a" variant="link">
                  {starship.name}
                </Button>
              </Link>
            ))}
          </Box>
        </Stack>
      </Box>
    </Container>
  );
};

export default HeroDetailPage;
