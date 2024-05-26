'use client';

import React, { useEffect, useState } from 'react';
import { Box, Button, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { useStarships } from '../contexts/StarshipsContext';
import StarshipCard from './StarshipCard';

const StarshipList = () => {
  const { starships, loadStarships, hasMore } = useStarships();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      loadStarships(page);
    }
  }, [page, isClient]);

  useEffect(() => {
    setLoading(false);
  }, [starships]);

  if (!isClient) {
    return null;
  }

  return (
    <VStack spacing={4}>
      {starships.map((starship) => (
        <Link key={starship.id} href={`/starships/${starship.id}`} passHref>
          <Box w="full">
            <StarshipCard id={starship.id} name={starship.name} />
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

export default StarshipList;
