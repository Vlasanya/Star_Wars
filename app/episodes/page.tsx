'use client';

import dynamic from 'next/dynamic';
import { Container, Heading, Text } from '@chakra-ui/react';

const EpisodeList = dynamic(() => import('../../components/EpisodeList'), { ssr: false });

const EpisodesPage = () => {
  return (
    <Container maxW="container.lg" py={8}>
      <Heading as="h2" size="xl" mb={4} textAlign="center">
        Star Wars Episodes
      </Heading>
      <Text textAlign="center" fontSize="lg" mb={4}>
        Here is the list of Star Wars episodes. Click on an episode to see more details.
      </Text>
      <EpisodeList />
    </Container>
  );
};

export default EpisodesPage;
