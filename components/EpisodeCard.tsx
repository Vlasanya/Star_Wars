'use client';

import * as React from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';

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

interface EpisodeCardProps {
  episode: Episode;
}

const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} boxShadow="md">
      <VStack spacing={4} align="start">
        <Text fontSize="2xl" fontWeight="bold">{episode.title}</Text>
        <Text>Release Date: {episode.release_date}</Text>
      </VStack>
    </Box>
  );
}

export default EpisodeCard;
