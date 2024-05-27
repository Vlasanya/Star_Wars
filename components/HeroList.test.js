import React from 'react';
import { render, screen } from '@testing-library/react';
import HeroList from './HeroList';
import { HeroProvider } from '../contexts/HeroContext';

const mockHeroes = [
  { id: '1', name: 'Luke Skywalker' },
  { id: '2', name: 'Darth Vader' },
];

jest.mock('../contexts/HeroContext', () => ({
  useHeroes: () => ({
    heroes: mockHeroes,
    loadHeroes: jest.fn(),
    hasMore: false,
  }),
}));

describe('HeroList', () => {
  it('renders a list of heroes', () => {
    render(
      <HeroProvider>
        <HeroList />
      </HeroProvider>
    );

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Darth Vader')).toBeInTheDocument();
  });
});
