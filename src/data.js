import React, { useEffect, useState } from 'react'; 
import ReactFlow, { ReactFlowProvider, MiniMap, Controls, Background } from 'reactflow'; 
import 'reactflow/dist/style.css'; 
import dagre from 'dagre'; 
 
const data = { 
  nodes: [ 
    { id: '0', title: 'ВХОД' },  
    { id: '1', title: '1' }, 
    { id: '2', title: '2' }, 
    { id: '3', title: '3' }, 
    { id: '4', title: '4' }, 
    { id: '5', title: '5' }, 
    { id: '6', title: '6' }, 
    { id: '7', title: '7' }, 
    { id: '8', title: '8' }, 
    { id: '9', title: '9' }, 
    { id: '10', title: '10' }, 
    { id: '11', title: '11' }, 
    { id: '12', title: '12' }, 
    { id: '13', title: '13' }, 
    { id: '14', title: '14' }, 
    { id: '15', title: '15' }, 
    { id: '16', title: '16' }, 
    { id: '17', title: '17' }, 
    { id: '18', title: '18' }, 
    { id: '19', title: '19' }, 
    { id: '20', title: '20' }, 
    { id: '21', title: '21' }, 
  ], 
  links: [ 
    { source: '0', target: '1' }, 
    { source: '1', target: '2' }, 
    { source: '2', target: '3' }, 
    { source: '2', target: '4' }, 
    { source: '2', target: '5' }, 
    { source: '4', target: '5' }, 
    { source: '5', target: '6' }, 
    { source: '6', target: '7' }, 
    { source: '6', target: '8' }, 
    { source: '6', target: '9' }, 
    { source: '8', target: '9' }, 
    { source: '9', target: '10' }, 
    { source: '10', target: '11' }, 
    { source: '10', target: '15' }, 
    { source: '11', target: '12' }, 
    { source: '11', target: '13' }, 
    { source: '11', target: '14' }, 
    { source: '13', target: '14' }, 
    { source: '14', target: '16' }, 
    { source: '16', target: '17' }, 
    { source: '17', target: '18' }, 
    { source: '17', target: '19' }, 
    { source: '18', target: '20' }, 
    { source: '20', target: '21' }, 
  ], 
}; 
 
const dagreGraph = new dagre.graphlib.Graph(); 
dagreGraph.setDefaultEdgeLabel(() => ({})); 
const nodeWidth = 172; 
const nodeHeight = 36; 
 
const createNodeElements = (nodes) => { 
  return nodes.map((node) => ({ 
    id: node.id, 
    data: { label: node.title }, 
    position: { x: 0, y: 0 }, 
    style: { 
      background: '#fff', 
      color: '#333', 
      border: '2px solid #007BFF', 
      borderRadius: '8px', 
      fontSize: '14px', 
      fontWeight: 'bold', 
      padding: '10px', 
      boxShadow: '0 3px 6px rgba(0,0,0,0.1)', 
      transition: 'transform 0.3s ease', 
    }, 
  })); 
}; 
 
const createEdgeElements = (links) => { 
  return links.map((link) => ({ 
    id: ${link.source}-${link.target}, 
    source: link.source, 
    target: link.target, 
    markerEnd: { type: 'arrowclosed' }, 
    style: { 
      stroke: '#007BFF', 
      strokeWidth: '2px', 
      transition: 'stroke 0.3s ease', 
    }, 
  })); 
}; 
 
const layoutNodes = (nodes, edges) => { 
  dagreGraph.setGraph({ rankdir: 'TB' }); 
 
  nodes.forEach((node) => { 
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight }); 
  }); 
 
  edges.forEach((edge) => { 
    dagreGraph.setEdge(edge.source, edge.target); 
  }); 
 
  dagre.layout(dagreGraph); 
 
  return nodes.map((node) => { 
    const nodeWithPosition = dagreGraph.node(node.id); 
    node.position = { 
      x: nodeWithPosition.x - nodeWidth / 2, 
      y: nodeWithPosition.y - nodeHeight / 2, 
    }; 
    return node; 
  }); 
}; 
 
const Graph = () => { 
  const [elements, setElements] = useState({ nodes: [], edges: [] }); 
 
  useEffect(() => { 
    const nodes = createNodeElements(data.nodes); 
    const edges = createEdgeElements(data.links); 
    const layoutedNodes = layoutNodes(nodes, edges); 
    setElements({ nodes: layoutedNodes, edges }); 
  }, []); 
 
  return ( 
    <div style={{ height: '100vh', width: '100%' }}> 
      <ReactFlowProvider> 
        <ReactFlow 
          nodes={elements.nodes} 
          edges={elements.edges} 
          fitView 
          attributionPosition="bottom-left" 
          animated={true} 
        > 
          <MiniMap nodeColor={(node) => '#007BFF'} /> 
          <Controls /> 
          <Background color="#aaa" gap={16} />
</ReactFlow> 
      </ReactFlowProvider> 
    </div> 
  ); 
}; 
 
export default Graph;
