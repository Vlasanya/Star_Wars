'use client';

import React, { useEffect, useState } from 'react';
import { Box, Button, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { useEpisodes } from '../contexts/EpisodesContext';
import EpisodeCard from './EpisodeCard';

const EpisodeList = () => {
  const { episodes, loadEpisodes, hasMore } = useEpisodes();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && episodes.length === 0) {
      loadEpisodes(page).then(() => setLoading(false));
    }
  }, [page, isClient]);

  return (
    <VStack spacing={4}>
      {episodes.map((episode) => (
        <Link key={episode.id} href={`/episodes/${episode.id}`} passHref>
          <Box w="full">
            <EpisodeCard
              episode={episode}
            />
          </Box>
        </Link>
      ))}
      {hasMore && (
        <Button onClick={() => setPage((prev) => prev + 1)} isLoading={loading}>
          Load More
        </Button>
      )}
    </VStack>
  );
};

export default EpisodeList;
