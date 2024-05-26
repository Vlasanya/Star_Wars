'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Spinner, Text, Box, Stack, Badge, SimpleGrid, Link as ChakraLink } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface Starship {
  id: string;
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  films: string[];
}

interface Episode {
  id: string;
  title: string;
}

const StarshipDetailPage = () => {
  const { id } = useParams();
  const [starship, setStarship] = useState<Starship | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingEpisodes, setLoadingEpisodes] = useState(true);

  useEffect(() => {
    if (id) {
      loadStarship(id as string);
    }
  }, [id]);

  const loadStarship = async (id: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://sw-api.starnavi.io/starships/${id}`);
      const starshipData = { ...response.data, id: response.data.id.toString() };
      setStarship(starshipData);
      loadEpisodes(starshipData.films.map(filmId => filmId.toString()));
    } catch (error) {
      console.error('Failed to load starship details:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadEpisodes = async (filmIds: string[]) => {
    setLoadingEpisodes(true);
    try {
      const episodePromises = filmIds.map(async (filmId) => {
        const response = await axios.get(`https://sw-api.starnavi.io/films/${filmId}`);
        return { id: response.data.episode_id.toString(), title: response.data.title };
      });
      const episodesData = await Promise.all(episodePromises);
      setEpisodes(episodesData);
    } catch (error) {
      console.error('Failed to load episodes:', error);
    } finally {
      setLoadingEpisodes(false);
    }
  };

  if (loading) {
    return <Spinner size="xl" />;
  }

  if (!starship) {
    return <Text fontSize="xl">Starship not found</Text>;
  }

  return (
    <Container maxW="container.md" py={8}>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={5} boxShadow="lg">
        <Stack spacing={4} align="center" textAlign="center">
          <Text fontSize="4xl" fontWeight="bold">{starship.name}</Text>
          <Badge colorScheme="green">{starship.starship_class}</Badge>
          <Text fontSize="lg">Model: {starship.model}</Text>
          <SimpleGrid columns={2} spacing={10}>
            <Box>
              <Text fontSize="md" fontWeight="bold">Manufacturer:</Text>
              <Text fontSize="md">{starship.manufacturer}</Text>
            </Box>
            <Box>
              <Text fontSize="md" fontWeight="bold">Cost:</Text>
              <Text fontSize="md">{starship.cost_in_credits} credits</Text>
            </Box>
            <Box>
              <Text fontSize="md" fontWeight="bold">Length:</Text>
              <Text fontSize="md">{starship.length} meters</Text>
            </Box>
            <Box>
              <Text fontSize="md" fontWeight="bold">Max Speed:</Text>
              <Text fontSize="md">{starship.max_atmosphering_speed}</Text>
            </Box>
            <Box>
              <Text fontSize="md" fontWeight="bold">Crew:</Text>
              <Text fontSize="md">{starship.crew}</Text>
            </Box>
            <Box>
              <Text fontSize="md" fontWeight="bold">Passengers:</Text>
              <Text fontSize="md">{starship.passengers}</Text>
            </Box>
            <Box>
              <Text fontSize="md" fontWeight="bold">Cargo Capacity:</Text>
              <Text fontSize="md">{starship.cargo_capacity}</Text>
            </Box>
            <Box>
              <Text fontSize="md" fontWeight="bold">Consumables:</Text>
              <Text fontSize="md">{starship.consumables}</Text>
            </Box>
            <Box>
              <Text fontSize="md" fontWeight="bold">Hyperdrive Rating:</Text>
              <Text fontSize="md">{starship.hyperdrive_rating}</Text>
            </Box>
            <Box>
              <Text fontSize="md" fontWeight="bold">MGLT:</Text>
              <Text fontSize="md">{starship.MGLT}</Text>
            </Box>
          </SimpleGrid>
          <Box>
            <Text fontSize="md" fontWeight="bold">Films:</Text>
            {loadingEpisodes ? (
              <Spinner size="md" />
            ) : (
              <Stack spacing={2} align="center">
                {episodes.map((episode) => (
                  <Link key={episode.id} href={`/episodes/${episode.id}`} passHref>
                    <ChakraLink>
                      <Text>{episode.title}</Text>
                    </ChakraLink>
                  </Link>
                ))}
              </Stack>
            )}
          </Box>
        </Stack>
      </Box>
    </Container>
  );
};

export default StarshipDetailPage;
