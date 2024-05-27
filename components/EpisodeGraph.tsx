'use client';

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import ReactFlow, { MiniMap, Controls, Background, useNodesState, useEdgesState, Node, Edge } from 'react-flow-renderer';
import { Container, Spinner, Text } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import { useEpisodes, Episode } from '../contexts/EpisodesContext';
import { useHeroes, Hero } from '../contexts/HeroContext';
import { useStarships, Starship } from '../contexts/StarshipsContext';

const EpisodeGraph = () => {
  const { id } = useParams();
  const { episodes } = useEpisodes();
  const { heroes } = useHeroes();
  const { starships, loadStarships } = useStarships();
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);
  const [loading, setLoading] = useState(true);

  const nodeTypes = useMemo(() => ({}), []);
  const edgeTypes = useMemo(() => ({}), []);

  const generateGraph = useCallback((episode: Episode) => {
    if (!episode) return;

    const episodeNode: Node = {
      id: episode.id,
      type: 'input',
      data: { label: <Text fontSize="lg" fontWeight="bold">{episode.title}</Text> },
      position: { x: 250, y: 0 },
      style: { backgroundColor: '#f0f0f0', border: '1px solid #222', padding: 10 },
    };

    const heroNodes: Node[] = episode.characters.map((characterId: string | number, index: number) => {
      const hero = heroes.find((hero: Hero) => hero.id === characterId.toString());
      if (!hero) return null;

      return {
        id: `hero-${hero.id}`,
        data: { label: <a href={`/characters/${hero.id}`} style={{ textDecoration: 'none', color: '#333' }}>{hero.name}</a> },
        position: { x: 250, y: 100 + index * 100 },
        style: { backgroundColor: '#e3f2fd', border: '1px solid #90caf9', padding: 10 },
      };
    }).filter(Boolean) as Node[];

    console.log('Starship IDs:', episode.starships);
    const starshipNodes: Node[] = episode.starships.map((starshipId: string | number, index: number) => {
      const starship = starships.find((ss: Starship) => ss.id === starshipId.toString());
      console.log(`Finding Starship ID ${starshipId}:`, starship);
      if (!starship) return null;

      return {
        id: `starship-${starship.id}`,
        data: { label: <a href={`/starships/${starship.id}`} style={{ textDecoration: 'none', color: '#333' }}>{starship.name}</a> },
        position: { x: 500, y: 100 + index * 100 },
        style: { backgroundColor: '#f3e5f5', border: '1px solid #ce93d8', padding: 10 },
      };
    }).filter(Boolean) as Node[];

    const heroEdges: Edge[] = episode.characters.map((characterId: string | number) => ({
      id: `edge-${episode.id}-hero-${characterId}`,
      source: episode.id,
      target: `hero-${characterId}`,
      style: { stroke: '#90caf9' }
    }));

    const starshipEdges: Edge[] = episode.starships.map((starshipId: string | number) => ({
      id: `edge-${episode.id}-starship-${starshipId}`,
      source: episode.id,
      target: `starship-${starshipId}`,
      style: { stroke: '#ce93d8' }
    }));

    setNodes([episodeNode, ...heroNodes, ...starshipNodes]);
    setEdges([...heroEdges, ...starshipEdges]);
  }, [heroes, starships, setNodes, setEdges]);

  useEffect(() => {
    if (id && episodes.length > 0 && starships.length > 0) {
      const episode = episodes.find((ep: Episode) => ep.id === id as string);
      console.log('Episode:', episode);  // Debugging line
      console.log('Heroes:', heroes);  // Debugging line
      console.log('Starships:', starships);  // Debugging line

      if (episode) {
        generateGraph(episode);
        setLoading(false);
      }
    } else {
      loadStarships();
    }
  }, [id, episodes, heroes, starships, generateGraph, loadStarships]);

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

export default EpisodeGraph;
