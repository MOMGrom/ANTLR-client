import React, { useEffect, useRef } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

const Graph = (props) => {
  const fgRef = useRef();

  let GraphData = {
    nodes: [],
    links: [],
  };

  props.Graph.Nodes.forEach((node, index) => {
    GraphData.nodes.push({id: node.Id, title: node.Id, fx: 0, fy: 100 * index});
  });

  props.Graph.Edges.forEach((edge, index) => {
    GraphData.links.push({source: edge.sourceId, target: edge.targetId});
  });

  useEffect(() => {
    const fg = fgRef.current;

    // data.nodes.forEach((node, i) => {
    //   node.fx = 0; 
    //   node.fy = i * 100; 
    // });

    fg.d3Force('link').distance(20); 
    fg.d3Force('charge').strength(-200); 
  }, []);

  return (
    <div>
    <ForceGraph2D
      ref={fgRef}
      graphData={GraphData}
      linkDirectionalArrowLength={10}
      linkDirectionalArrowRelPos={0.76}
      linkCurvature={link => {
        const sourceIndex = parseInt(link.source.id);
        const targetIndex = parseInt(link.target.id);
        return Math.abs(sourceIndex - targetIndex) === 1 ? 0 : 0.5;
      }}
      linkColor={() => 'white'}
      linkDirectionalArrowColor={() => 'white'}
      nodeCanvasObject={(node, ctx, globalScale) => {
        const label = node.title;
        const fontSize = 16 / globalScale;

        ctx.beginPath();
        ctx.arc(node.x, node.y, 35 / globalScale, 0, 2 * Math.PI, false);
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
      enableNodeDrag={true} 
      enableZoomPanInteraction={true}
    />
    </div>
  );
};

export default Graph;
