'use client';

import dynamic from 'next/dynamic';
import { Container, Heading, Text } from '@chakra-ui/react';
import ClientLayout from '../../components/ClientLayout';
import HeroList from '../../components/HeroList';


const CharactersPage = () => {
  return (
    <ClientLayout>
    <Container maxW="container.lg" py={8}>
      <Heading as="h2" size="xl" mb={4} textAlign="center">
        Star Wars Heroes
      </Heading>
      <Text textAlign="center" fontSize="lg" mb={4}>
        Here is the list of Star Wars heroes. Click on a hero to see more details.
      </Text>
      <HeroList />
    </Container>
    </ClientLayout>
  );
};

export default CharactersPage;
