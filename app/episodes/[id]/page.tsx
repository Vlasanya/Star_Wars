'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Spinner, Text, Box, Stack, Badge, SimpleGrid } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import HeroCard from '../../../components/HeroCard';
import StarshipCard from '../../../components/StarshipCard';

interface Episode {
  id: string;
  title: string;
  release_date: string;
  episode_id: string;
  characters: string[];
  starships: string[];
  director: string;
  producer: string;
  opening_crawl: string;
}

const EpisodeDetailPage = () => {
  const { id } = useParams();
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadEpisode(id as string);
    }
  }, [id]);

  const loadEpisode = async (id: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://sw-api.starnavi.io/films/${id}`);
      const data = response.data;
      data.characters = data.characters.map((characterId: number) => characterId.toString());
      data.starships = data.starships ? data.starships.map((starshipId: number) => starshipId.toString()) : [];
      setEpisode(data);
    } catch (error) {
      console.error('Failed to load episode details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner size="xl" />;
  }

  if (!episode) {
    return <Text fontSize="xl">Episode not found</Text>;
  }

  return (
    <Container maxW="container.md" py={8}>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={5} boxShadow="lg">
        <Stack spacing={4} align="center" textAlign="center">
          <Text fontSize="4xl" fontWeight="bold">{episode.title}</Text>
          <Badge colorScheme="green">Episode {episode.episode_id}</Badge>
          <Text fontSize="lg">Director: {episode.director}</Text>
          <Text fontSize="lg">Producer: {episode.producer}</Text>
          <Text fontSize="lg">Release Date: {episode.release_date}</Text>
          <Text fontSize="lg">Opening Crawl:</Text>
          <Text fontStyle="italic">{episode.opening_crawl}</Text>
          <Text fontWeight="bold" mt={4}>Characters:</Text>
          <SimpleGrid columns={2} spacing={10}>
            <Box>
              <Stack spacing={4}>
                {episode.characters.map((characterId) => (
                  <HeroCard key={characterId} id={characterId} />
                ))}
              </Stack>
            </Box>
          </SimpleGrid>
          <Text fontWeight="bold" mt={4}>Starships:</Text>
          <SimpleGrid columns={2} spacing={10}>
            <Box>
              <Stack spacing={4}>
                {episode.starships.map((starshipId) => (
                  <StarshipCard key={starshipId} id={starshipId} />
                ))}
              </Stack>
            </Box>
          </SimpleGrid>
        </Stack>
      </Box>
    </Container>
  );
};

export default EpisodeDetailPage;
