import React, { useMemo } from 'react';
import ReactFlow, { Controls, Background, MiniMap, Handle } from 'reactflow';
import 'reactflow/dist/style.css';
import dagre from 'dagre';

// Функция для автоматического размещения узлов с помощью dagre
const getLayoutedElements = (nodes, edges) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: 'TB', ranksep: 100, nodesep: 50 });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: 172, height: 36 });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = 'top';
    node.sourcePosition = 'bottom';
    node.position = {
      x: nodeWithPosition.x - 86,
      y: nodeWithPosition.y - 18,
    };
  });

  return { nodes, edges };
};

const nodeStyles = {
  background: '#0066ff',
  color: '#FFF',
  border: '1px solid #4A5568',
  padding: 10,
  borderRadius: 5,
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
};

const edgeStyles = {
  stroke: '#FFF',
  strokeWidth: 2,
};

const NewGraph = (props) => {
  const nodes = props.Graph.Nodes.map((node) => ({
    id: node.Id.toString(),
    data: { label: node.Code },
    position: { x: 0, y: 0 },
    style: nodeStyles,
  }));

  const edges = props.Graph.Edges.map((edge) => ({
    id: `${edge.sourceId}-${edge.targetId}`,
    source: edge.sourceId.toString(),
    target: edge.targetId.toString(),
    animated: true,
    markerEnd: { type: 'arrowclosed', color: '#FFF' },
    style: edgeStyles,
  }));

  const { nodes: layoutedNodes, edges: layoutedEdges } = useMemo(
    () => getLayoutedElements(nodes, edges),
    [nodes, edges]
  );

  return (
    <div style={{ width: '100%', height: '100vh', backgroundColor: '#282c34' }}>
      <ReactFlow
        nodes={layoutedNodes}
        edges={layoutedEdges}
        fitView
        nodesConnectable={false}
        nodesDraggable={true}
      >
        <Controls style={{ color: '#FFF' }} />
        
      </ReactFlow>
    </div>
  );
};

export default NewGraph;
