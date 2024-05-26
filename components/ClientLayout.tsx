'use client';

import React from 'react';
import { HeroProvider } from '../contexts/HeroContext';
import { EpisodeProvider } from '../contexts/EpisodesContext';
import { StarshipProvider } from '../contexts/StarshipsContext';

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <HeroProvider>
      <EpisodeProvider>
        <StarshipProvider>
          {children}
        </StarshipProvider>
      </EpisodeProvider>
    </HeroProvider>
  );
};

export default ClientLayout;
