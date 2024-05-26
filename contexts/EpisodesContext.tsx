'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

export interface Episode {
  id: string;
  title: string;
  release_date: string;
  episode_id: string;
  characters: string[];
  director: string;
  producer: string;
  opening_crawl: string;
}

interface EpisodeContextProps {
  episodes: Episode[];
  loadEpisodes: (page: number) => Promise<void>;
  hasMore: boolean;
}

const EpisodeContext = createContext<EpisodeContextProps | undefined>(undefined);

export const EpisodeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const loadEpisodes = async (page: number) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://sw-api.starnavi.io/films/?page=${page}`);
      console.log('Episodes loaded:', response.data.results);
      setEpisodes((prev) => [
        ...prev,
        ...response.data.results.map((episode: Episode) => ({
          ...episode,
          id: episode.episode_id.toString() // Ensure the ID is a string
        }))
      ]);
      setHasMore(response.data.next !== null);
    } catch (error) {
      console.error('Failed to load episodes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEpisodes(page);
  }, [page]);

  return (
    <EpisodeContext.Provider value={{ episodes, loadEpisodes, hasMore }}>
      {children}
    </EpisodeContext.Provider>
  );
};

export const useEpisodes = () => {
  const context = useContext(EpisodeContext);
  if (!context) {
    throw new Error('useEpisodes must be used within an EpisodeProvider');
  }
  return context;
};
