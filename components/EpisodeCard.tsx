import { Box, Text, Image } from '@chakra-ui/react';
import { Episode } from '../contexts/EpisodesContext';

interface EpisodeCardProps {
  episode: Episode;
}

const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      textAlign="center"
      bg="white"
      _hover={{ bg: 'gray.100' }}
    >
      <Image
        src={`https://starwars-visualguide.com/assets/img/films/${episode.id}.jpg`}
        alt={episode.title}
        mb={4}
        borderRadius="md"
        objectFit="cover"
        boxSize="200px"
        mx="auto"
      />
      <Text fontWeight="bold">{episode.title}</Text>
      <Text fontSize="sm">{episode.release_date}</Text>
    </Box>
  );
};

export default EpisodeCard;
