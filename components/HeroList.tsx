import { Box, Text, Link, Image } from '@chakra-ui/react';
import { useHeroes } from '../contexts/HeroContext';
import NextLink from 'next/link';

const HeroList = () => {
  const { heroes } = useHeroes();

  return (
    <>
      {heroes.map((hero) => (
        <Box
          key={hero.id}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p={4}
          textAlign="center"
          bg="white"
          _hover={{ bg: 'gray.100' }}
        >
          <NextLink href={`/characters/${hero.id}`} passHref>
            <Link>
              <Image 
                src={`https://starwars-visualguide.com/assets/img/characters/${hero.id}.jpg`} 
                alt={hero.name} 
                mb={4}
                borderRadius="full"
                boxSize="150px"
                objectFit="cover"
                mx="auto"
              />
              <Text fontWeight="bold">{hero.name}</Text>
            </Link>
          </NextLink>
          <Text fontSize="sm">{hero.birth_year}</Text>
        </Box>
      ))}
    </>
  );
};

export default HeroList;
