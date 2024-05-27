'use client';

import HeroGraph from '../../../components/HeroGraph';
import { HeroProvider } from '../../../contexts/HeroContext';
import { EpisodeProvider } from '../../../contexts/EpisodesContext';
import { StarshipProvider } from '../../../contexts/StarshipsContext';

const HeroDetailPage = () => {
  return (
    <HeroProvider>
      <EpisodeProvider>
        <StarshipProvider>
          <HeroGraph />
        </StarshipProvider>
      </EpisodeProvider>
    </HeroProvider>
  );
};

export default HeroDetailPage;
