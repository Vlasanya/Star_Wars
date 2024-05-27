import { Box, Text, Image } from '@chakra-ui/react';

interface StarshipCardProps {
  id: string;
  name: string;
}

const StarshipCard: React.FC<StarshipCardProps> = ({ id, name }) => {
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
        src={`https://starwars-visualguide.com/assets/img/starships/${id}.jpg`}
        alt={name}
        mb={4}
        borderRadius="md"
        objectFit="cover"
        boxSize="200px"
        mx="auto"
      />
      <Text fontWeight="bold">{name}</Text>
    </Box>
  );
};

export default StarshipCard;
