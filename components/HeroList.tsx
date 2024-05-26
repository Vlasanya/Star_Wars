// components/HeroList.tsx
import React, { useEffect, useState } from 'react';
import { useHeroes } from '../contexts/HeroContext';  // Оновлено
import { Box, Button, VStack, Image } from '@chakra-ui/react';
import Link from 'next/link';
import MediaCard from './MediaCard';

const HeroList = () => {
  const { heroes, loadHeroes, hasMore } = useHeroes();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      loadHeroes(page).then(() => setLoading(false));
    }
  }, [page, isClient]);

  if (!isClient) {
    return null;
  }

  return (
    <VStack spacing={4}>
      {heroes.map((hero) => (
        <Link key={hero.id} href={`/characters/${hero.id}`} passHref>
          <Box w="full">
            <Image
              borderRadius="full"
              boxSize="150px"
              src={`https://starwars-visualguide.com/assets/img/characters/${hero.id}.jpg`}
              alt={hero.name}
              fallbackSrc="https://via.placeholder.com/150"
            />
            <MediaCard
              heroName={hero.name}
              birthYear={hero.birth_year}
              eyesColor={hero.eye_color}
              gender={hero.gender}
              hairColor={hero.hair_color}
              height={hero.height}
              weight={hero.mass}
              skinColor={hero.skin_color}
              homeworld={hero.homeworld}
              films={hero.films}
              species={hero.species}
              starships={hero.starships}
              vehicles={hero.vehicles}
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

export default HeroList;
