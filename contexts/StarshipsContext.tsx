'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

export interface Starship {
  id: string;
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
}

interface StarshipContextProps {
  starships: Starship[];
  loadStarships: (page: number) => Promise<void>;
  getStarshipById: (id: string) => Starship | undefined;
  hasMore: boolean;
}

const StarshipContext = createContext<StarshipContextProps | undefined>(undefined);

export const StarshipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [starships, setStarships] = useState<Starship[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const loadStarships = async (page: number) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://sw-api.starnavi.io/starships/?page=${page}`);
      console.log('Starships loaded:', response.data.results);
      setStarships((prev) => [
        ...prev,
        ...response.data.results.map((starship: Starship) => ({
          ...starship,
          id: starship.id.toString() // Ensure the ID is a string
        }))
      ]);
      setHasMore(response.data.next !== null);
    } catch (error) {
      console.error('Failed to load starships:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStarships(page);
  }, [page]);

  const getStarshipById = (id: string) => {
    const starship = starships.find(starship => starship.id === id);
    console.log('Searching for starship with id:', id);
    console.log('Found starship:', starship);
    return starship;
  };

  return (
    <StarshipContext.Provider value={{ starships, loadStarships, getStarshipById, hasMore }}>
      {children}
    </StarshipContext.Provider>
  );
};

export const useStarships = () => {
  const context = useContext(StarshipContext);
  if (!context) {
    throw new Error('useStarships must be used within a StarshipProvider');
  }
  return context;
};
