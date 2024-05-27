// StarshipContext.tsx
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
  films: string[];
}

interface StarshipContextProps {
  starships: Starship[];
  loadStarships: () => Promise<void>;
  hasMore: boolean;
}

const StarshipContext = createContext<StarshipContextProps | undefined>(undefined);

export const StarshipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [starships, setStarships] = useState<Starship[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadStarships = async () => {
    try {
      const response = await axios.get(`https://sw-api.starnavi.io/starships/?page=${page}`);
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
    }
  };

  useEffect(() => {
    loadStarships();
  }, [page]);

  return (
    <StarshipContext.Provider value={{ starships, loadStarships, hasMore }}>
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
