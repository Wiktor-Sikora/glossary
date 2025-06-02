import React, { useCallback, useState } from 'react';
import ReactFlow, {
  addEdge,
  Handle,
  Position,
  useEdgesState,
  useNodesState
} from 'reactflow';

import { runDFS } from '../assets/visualizations/graphs/dfs';
import { runBFS } from '../assets/visualizations/graphs/bfs';

import 'reactflow/dist/style.css';

function CircleNodes({ data }) {

    const bg = data.visited ? 'bg-rosepink' : 'bg-navy-blue-magenta';

    return (
    <div className={`${bg} border-2 border-white rounded-full px-3 py-1.5 shadow-md text-sm text-center`}>
            {data.label}

        <Handle
        type="target"
        position={Position.Left}
        style={{left:'50%', background: 'none', border:'0'}}
        />

        <Handle
        type="source"
        position={Position.Right}
        style={{left:'50%', background: 'none', border:'0'}}
        />
    </div>
    );
}

const nodeTypes = {
  circle: CircleNodes,
};

const initialNodes = [
  {
    id: '1',
    type: 'circle',
    data: { label: 'A' },
    position: { x: -60, y: -80 },
  },
  {
    id: '2',
    type: 'circle',
    data: { label: 'B' },
    position: { x: -80, y: 100 },
  },
  {
    id: '3',
    type: 'circle',
    data: { label: 'C' },
    position: { x: 20, y: 200 },
  },
  {
    id: '4',
    type: 'circle',
    data: { label: 'D' },
    position: { x: 120, y: 130 },
  },
  {
    id: '5',
    type: 'circle',
    data: { label: 'E' },
    position: { x: 40, y: 10 },
  },
  {
    id: '6',
    type: 'circle',
    data: { label: 'F' },
    position: { x: 155, y: -55 },
  },
  {
    id: '7',
    type: 'circle',
    data: { label: 'G' },
    position: { x: 250, y: 40 },
  },
  {
    id: '8',
    type: 'circle',
    data: { label: 'H' },
    position: { x: 230, y: 200 },
  },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', type: 'straight'},
  { id: 'e2-3', source: '2', target: '3', type: 'straight' },
  { id: 'e2-5', source: '2', target: '5', type: 'straight' },
  { id: 'e3-4', source: '3', target: '4', type: 'straight' },
  { id: 'e3-8', source: '3', target: '8', type: 'straight' },
  { id: 'e4-5', source: '4', target: '5', type: 'straight' },
  { id: 'e4-6', source: '4', target: '6', type: 'straight' },
  { id: 'e4-8', source: '4', target: '8', type: 'straight' },
  { id: 'e5-6', source: '5', target: '6', type: 'straight' },
  { id: 'e6-7', source: '6', target: '7', type: 'straight' },
  { id: 'e7-8', source: '7', target: '8', type: 'straight' },
];

export default function GraphFrame({ algorithm }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

const isCancelled = React.useRef(false);

const algorithms = {
    DFS: runDFS,
    BFS: runBFS,
};

const runAlgorithm = async () => {
  isCancelled.current = false;

  setNodes(nds =>
    nds.map(node => ({
      ...node,
      data: { ...node.data, visited: false }
    }))
  );
  setEdges(eds =>
    eds.map(edge => ({
      ...edge,
      style: { stroke: '#eee', strokeWidth: 1 }
    }))
  );

  const algorithmFn = algorithms[algorithm];
  if (!algorithmFn) {
    alert(`Algorithm "${algorithm}" is not implemented.`);
    return;
  }

  await algorithmFn('1', edges, async (visitedNodeId, visitedEdgeId) => {
    if (isCancelled.current) return;

    setNodes(nds =>
      nds.map(node =>
        node.id === visitedNodeId
          ? { ...node, data: { ...node.data, visited: true } }
          : node
      )
    );

    if (visitedEdgeId) {
      setEdges(eds =>
        eds.map(edge =>
          edge.id === visitedEdgeId
            ? { ...edge, style: { stroke: '#e88da3', strokeWidth: 3 } }
            : edge
        )
      );
    }

    await new Promise(r => setTimeout(r, 500));
  });
};


const resetGraph = () => {
  isCancelled.current = true; 

  setNodes(nds =>
    nds.map(node => ({
      ...node,
      data: { ...node.data, visited: false }
    }))
  );

  setEdges(eds =>
    eds.map(edge => ({
      ...edge,
      style: { stroke: '#fff' }
    }))
  );
};


return (
   <div className="w-full rounded-lg relative">
        <ReactFlow className="cursor-default"
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            nodesDraggable={false}
            panOnDrag={false}              
            zoomOnScroll={false}           
            zoomOnPinch={false}           
            zoomOnDoubleClick={false}     
            panOnScroll={false}
        >   
        </ReactFlow>
        <button
          onClick={runAlgorithm}
          className="cursor-pointer absolute top-2 right-2 px-3 py-2 bg-rosepink text-white rounded-xl hover:bg-dark-rosepink"
        >
            Run {algorithm}
        </button>
        <button
          onClick={resetGraph}
          className="cursor-pointer absolute top-15 right-2 px-3 py-2 bg-blue-magenta text-rosepink rounded-xl hover:opacity-80"
        >
            Reset
        </button>
    </div>
  );
}
