'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

export interface Hero {
  id: string;
  name: string;
  birth_year: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  mass: string;
  skin_color: string;
  homeworld: string;
  films: string[];
  species: string[];
  starships: string[];
  vehicles: string[];
}

interface HeroContextProps {
  heroes: Hero[];
  loadHeroes: (page: number) => Promise<void>;
  getHeroById: (id: string) => Hero | undefined;
  hasMore: boolean;
}

const HeroContext = createContext<HeroContextProps | undefined>(undefined);

export const HeroProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const loadHeroes = async (page: number) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://sw-api.starnavi.io/people/?page=${page}`);
      setHeroes((prev) => [
        ...prev,
        ...response.data.results.map((hero: any) => ({
          ...hero,
          id: hero.id.toString()
        }))
      ]);
      setHasMore(response.data.next !== null);
    } catch (error) {
      console.error('Failed to load heroes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHeroes(page);
  }, [page]);

  const getHeroById = (id: string) => {
    const hero = heroes.find(hero => hero.id === id);
    return hero;
  };

  return (
    <HeroContext.Provider value={{ heroes, loadHeroes, getHeroById, hasMore }}>
      {children}
    </HeroContext.Provider>
  );
};

export const useHeroes = () => {
  const context = useContext(HeroContext);
  if (!context) {
    throw new Error('useHeroes must be used within a HeroProvider');
  }
  return context;
};
