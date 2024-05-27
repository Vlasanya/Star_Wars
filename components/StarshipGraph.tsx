'use client';

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import ReactFlow, { MiniMap, Controls, Background, useNodesState, useEdgesState, Node, Edge } from 'react-flow-renderer';
import { Container, Spinner, Text } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import { useEpisodes, Episode } from '../contexts/EpisodesContext';
import { useStarships, Starship } from '../contexts/StarshipsContext';

const StarshipGraph = () => {
  const { id } = useParams();
  const { episodes } = useEpisodes();
  const { starships } = useStarships();
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);
  const [loading, setLoading] = useState(true);

  const nodeTypes = useMemo(() => ({}), []);
  const edgeTypes = useMemo(() => ({}), []);

  const generateGraph = useCallback((starship: Starship) => {
    if (!starship) return;

    const starshipNode: Node = {
      id: starship.id,
      type: 'input',
      data: { label: <Text fontSize="lg" fontWeight="bold">{starship.name}</Text> },
      position: { x: 250, y: 0 },
      style: { backgroundColor: '#f0f0f0', border: '1px solid #222', padding: 10 },
    };

    const episodeNodes: Node[] = starship.films.map((filmId: string, index: number) => {
      const episode = episodes.find((ep: Episode) => ep.id === filmId.toString());
      if (!episode) return null;

      return {
        id: `episode-${episode.id}`,
        data: { label: <a href={`/episodes/${episode.id}`} style={{ textDecoration: 'none', color: '#333' }}>{episode.title}</a> },
        position: { x: 250, y: 100 + index * 100 },
        style: { backgroundColor: '#e3f2fd', border: '1px solid #90caf9', padding: 10 },
      };
    }).filter(Boolean) as Node[];

    const episodeEdges: Edge[] = starship.films.map((filmId: string) => ({
      id: `edge-${starship.id}-episode-${filmId}`,
      source: starship.id,
      target: `episode-${filmId}`,
      style: { stroke: '#90caf9' }
    }));

    setNodes([starshipNode, ...episodeNodes]);
    setEdges([...episodeEdges]);
  }, [episodes, setNodes, setEdges]);

  useEffect(() => {
    if (id && starships.length > 0) {
      const starship = starships.find((ss: Starship) => ss.id === id as string);
      console.log('Starship:', starship);  // Debugging line
      console.log('Episodes:', episodes);  // Debugging line

      if (starship) {
        generateGraph(starship);
        setLoading(false);
      }
    }
  }, [id, starships, episodes, generateGraph]);

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

export default StarshipGraph;
