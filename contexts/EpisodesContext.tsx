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
  starships: string[];
}

interface EpisodeContextProps {
  episodes: Episode[];
  loadEpisodes: () => Promise<void>;
  hasMore: boolean;
}

const EpisodeContext = createContext<EpisodeContextProps | undefined>(undefined);

export const EpisodeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);

  const loadEpisodes = async () => {
    setLoading(true);
    try {
      let page = 1;
      let hasMore = true;
      let allEpisodes: Episode[] = [];
      
      while (hasMore) {
        const response = await axios.get(`https://sw-api.starnavi.io/films/?page=${page}`);
        allEpisodes = [
          ...allEpisodes,
          ...response.data.results.map((episode: Episode) => ({
            ...episode,
            id: episode.episode_id.toString()
          }))
        ];
        hasMore = response.data.next !== null;
        page++;
      }
      setEpisodes(allEpisodes);
    } catch (error) {
      console.error('Failed to load episodes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEpisodes();
  }, []);

  return (
    <EpisodeContext.Provider value={{ episodes, loadEpisodes, hasMore: episodes.length > 0 }}>
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
