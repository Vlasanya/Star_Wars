'use client';

import dynamic from 'next/dynamic';
import { Container, Heading, Text } from '@chakra-ui/react';

const StarshipList = dynamic(() => import('../../components/StarshipList'), { ssr: false });

const StarshipsPage = () => {
  return (
    <Container maxW="container.lg" py={8}>
      <Heading as="h2" size="xl" mb={4} textAlign="center">
        Star Wars Starships
      </Heading>
      <Text textAlign="center" fontSize="lg" mb={4}>
        Here is the list of Star Wars starships. Click on a starship to see more details.
      </Text>
      <StarshipList />
    </Container>
  );
};

export default StarshipsPage;
