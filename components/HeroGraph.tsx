'use client';

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import ReactFlow, { MiniMap, Controls, Background, useNodesState, useEdgesState, Node, Edge } from 'react-flow-renderer';
import { Container, Spinner, Text } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import { useHeroes, Hero } from '../contexts/HeroContext';
import { useEpisodes, Episode } from '../contexts/EpisodesContext';
import { useStarships, Starship } from '../contexts/StarshipsContext';

const HeroGraph = () => {
  const { id } = useParams();
  const { getHeroById, heroes } = useHeroes();
  const { episodes } = useEpisodes();
  const { starships, loadStarships } = useStarships();
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);
  const [loading, setLoading] = useState(true);

  const nodeTypes = useMemo(() => ({}), []);
  const edgeTypes = useMemo(() => ({}), []);

  const generateGraph = useCallback((hero: Hero) => {
    if (!hero) return;

    const heroNode: Node = {
      id: hero.id,
      type: 'input',
      data: { label: <Text fontSize="lg" fontWeight="bold">{hero.name}</Text> },
      position: { x: 250, y: 0 },
      style: { backgroundColor: '#f0f0f0', border: '1px solid #222', padding: 10 },
    };

    const episodeNodes: Node[] = hero.films.map((filmId: string | number, index: number) => {
      const episode = episodes.find((ep: Episode) => ep.id === filmId.toString());
      if (!episode) return null;

      return {
        id: `episode-${episode.id}`,
        data: { label: <a href={`/episodes/${episode.id}`} style={{ textDecoration: 'none', color: '#333' }}>{episode.title}</a> },
        position: { x: 250, y: 100 + index * 100 },
        style: { backgroundColor: '#e3f2fd', border: '1px solid #90caf9', padding: 10 },
      };
    }).filter(Boolean) as Node[];

    const starshipNodes: Node[] = hero.starships.map((starshipId: string | number, index: number) => {
      const starship = starships.find((ss: Starship) => ss.id === starshipId.toString());
      if (!starship) return null;

      return {
        id: `starship-${starship.id}`,
        data: { label: <a href={`/starships/${starship.id}`} style={{ textDecoration: 'none', color: '#333' }}>{starship.name}</a> },
        position: { x: 500, y: 100 + index * 100 },
        style: { backgroundColor: '#f3e5f5', border: '1px solid #ce93d8', padding: 10 },
      };
    }).filter(Boolean) as Node[];

    const episodeEdges: Edge[] = hero.films.map((filmId: string | number) => ({
      id: `edge-${hero.id}-episode-${filmId}`,
      source: hero.id,
      target: `episode-${filmId}`,
      style: { stroke: '#90caf9' }
    }));

    const starshipEdges: Edge[] = hero.starships.map((starshipId: string | number) => ({
      id: `edge-${hero.id}-starship-${starshipId}`,
      source: hero.id,
      target: `starship-${starshipId}`,
      style: { stroke: '#ce93d8' }
    }));

    setNodes([heroNode, ...episodeNodes, ...starshipNodes]);
    setEdges([...episodeEdges, ...starshipEdges]);
  }, [episodes, starships, setNodes, setEdges]);

  useEffect(() => {
    if (id && heroes.length > 0 && starships.length > 0) {
      const hero = getHeroById(id as string);

      if (hero) {
        generateGraph(hero);
        setLoading(false);
      }
    } else {
      loadStarships();
    }
  }, [id, getHeroById, heroes, episodes, starships, generateGraph, loadStarships]);

  if (loading) {
    return <Spinner size="xl" />;
  }

  return (
    <Container maxW="container.xl" py={8} style={{ height: '80vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        style={{ width: '100%', height: '100%' }}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </Container>
  );
};

export default HeroGraph;
