import React from 'react';
import { render, screen } from '@testing-library/react';
import EpisodeList from './EpisodeList';
import { EpisodeProvider } from '../contexts/EpisodesContext';

const mockEpisodes = [
  { id: '1', title: 'A New Hope' },
  { id: '2', title: 'The Empire Strikes Back' },
];

jest.mock('../contexts/EpisodesContext', () => ({
  useEpisodes: () => ({
    episodes: mockEpisodes,
    loadEpisodes: jest.fn(),
    hasMore: false,
  }),
}));

describe('EpisodeList', () => {
  it('renders a list of episodes', () => {
    render(
      <EpisodeProvider>
        <EpisodeList />
      </EpisodeProvider>
    );

    expect(screen.getByText('A New Hope')).toBeInTheDocument();
    expect(screen.getByText('The Empire Strikes Back')).toBeInTheDocument();
  });
});
