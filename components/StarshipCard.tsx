'use client';

import * as React from 'react';
import { Box, Image, Text, VStack, Link as ChakraLink } from '@chakra-ui/react';
import Link from 'next/link';

interface StarshipCardProps {
  id: string;
  name: string;
}

export default function StarshipCard({ id, name }: StarshipCardProps) {
  return (
    <Link href={`/starships/${id}`} passHref>
      <ChakraLink>
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={2} boxShadow="md">
          <VStack spacing={2} align="center">
            <Image
              borderRadius="full"
              boxSize="100px"
              src={`https://starwars-visualguide.com/assets/img/starships/${id}.jpg`}
              alt={name}
              fallbackSrc="https://via.placeholder.com/100"
            />
            <Text fontWeight="bold">{name}</Text>
          </VStack>
        </Box>
      </ChakraLink>
    </Link>
  );
}