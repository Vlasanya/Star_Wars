'use client';

import * as React from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';

interface MediaCardProps {
  heroName: string;
  birthYear: string;
  eyesColor: string;
  gender: string;
  hairColor: string;
  height: string;
  weight: string;
  skinColor: string;
  homeworld: string;
  films: string[];
  species: string[];
  starships: string[];
  vehicles: string[];
}

export default function MediaCard({
  heroName
}: MediaCardProps) {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} boxShadow="md">
      <VStack spacing={4} align="start">
        <Text fontWeight="bold" fontSize="xl">
          {heroName}
        </Text>
      </VStack>
    </Box>
  );
}
