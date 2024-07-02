import React, { useEffect, useRef } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

// Данные графа
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


const Graph = () => {
  const fgRef = useRef();

  useEffect(() => {
    const fg = fgRef.current;

   
    data.nodes.forEach((node, i) => {
      node.fx = 0; 
      node.fy = i * 30; 
    });

    fg.d3Force('link').distance(20); 
    fg.d3Force('charge').strength(-200); 
  }, []);

  return (
    <ForceGraph2D
      ref={fgRef}
      graphData={data}
      linkDirectionalArrowLength={10}
      linkDirectionalArrowRelPos={2}
      linkCurvature={link => {
        const sourceIndex = parseInt(link.source.id);
        const targetIndex = parseInt(link.target.id);
        return Math.abs(sourceIndex - targetIndex) === 1 ? 0 : 0.5;
      }}
      linkColor={() => 'white'}
      linkDirectionalArrowColor={() => 'white'}
      nodeCanvasObject={(node, ctx, globalScale) => {
        const label = node.title;
        const fontSize = 8 / globalScale;

        ctx.beginPath();
        ctx.arc(node.x, node.y, 15 / globalScale, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'lightblue';
        ctx.fill();

        ctx.font = `${fontSize}px Sans-Serif`;
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, node.x, node.y);
      }}
      nodePointerAreaPaint={(node, color, ctx, globalScale) => {
        const fontSize = 64 / globalScale;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 15 / globalScale, 0, 2 * Math.PI, false);
        ctx.fillStyle = color;
        ctx.fill();

        ctx.font = `${fontSize}px Sans-Serif`;
        ctx.fillStyle = 'transparent'; 
        ctx.fillText(node.title, node.x, node.y);
      }}
    />
  );
};

export default Graph;
