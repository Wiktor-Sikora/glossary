import React, { useCallback, useState, useRef } from 'react';
import ReactFlow, {
  addEdge,
  Handle,
  Position,
  useEdgesState,
  useNodesState,
  MarkerType
} from 'reactflow';

import { runDFS } from '../assets/visualizations/graphs/dfs';
import { runBFS } from '../assets/visualizations/graphs/bfs';

import 'reactflow/dist/style.css';

function CircleNodes({ data }) {

    const bg = data.visited ? 'bg-rosepink' : data.start ? 'bg-dark-rosepink' : 'bg-navy-blue-magenta';

    return (
    <div className={`${bg} border-2 border-white rounded-full px-3 py-1.5 shadow-md text-sm text-center`}>
            {data.label}

        <Handle
        type="target"
        position={Position.Top}
        style={{left:'50%', background: 'none', border:'0'}}
        />

        <Handle
        type="source"
        position={Position.Bottom}
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
    data: { label: 'A', start: false },
    position: { x: -60, y: -80 },
  },
  {
    id: '2',
    type: 'circle',
    data: { label: 'B', start: false },
    position: { x: -80, y: 100 },
  },
  {
    id: '3',
    type: 'circle',
    data: { label: 'C', start: false },
    position: { x: 20, y: 200 },
  },
  {
    id: '4',
    type: 'circle',
    data: { label: 'D', start: false },
    position: { x: 120, y: 130 },
  },
  {
    id: '5',
    type: 'circle',
    data: { label: 'E', start: false },
    position: { x: 40, y: 10 },
  },
  {
    id: '6',
    type: 'circle',
    data: { label: 'F', start: false },
    position: { x: 155, y: -55 },
  },
  {
    id: '7',
    type: 'circle',
    data: { label: 'G', start: false },
    position: { x: 250, y: 40 },
  },
  {
    id: '8',
    type: 'circle',
    data: { label: 'H', start: false },
    position: { x: 230, y: 200 },
  },
];

let counter = 9;

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2',},
  { id: 'e2-3', source: '2', target: '3',},
  { id: 'e2-5', source: '2', target: '5',},
  { id: 'e3-4', source: '3', target: '4',},
  { id: 'e3-8', source: '3', target: '8',},
  { id: 'e4-5', source: '4', target: '5',},
  { id: 'e4-6', source: '4', target: '6',},
  { id: 'e4-8', source: '4', target: '8',},
  { id: 'e5-6', source: '5', target: '6',},
  { id: 'e6-7', source: '6', target: '7',},
  { id: 'e7-8', source: '7', target: '8',},
];

export default function GraphFrame({ algorithm }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const firstNodeRef = useRef(null);
  const [startNodeId, setStartNodeId] = useState(null);
  const isCancelled = useRef(false);

  const algorithms = { DFS: runDFS, BFS: runBFS };

  const addNode = () => {
    const newId = String(counter++);
    const newLabel = String.fromCharCode(64 + Number(newId));
    const newNode = {
      id: newId,
      type: 'circle',
      data: { label: newLabel, start: false },
      position: {
        x: Math.random() * 400 - 100,
        y: Math.random() * 400 - 100,
      },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const removeLastNode = () => {
    if (nodes.length === 0) return;
    const lastId = nodes[nodes.length - 1].id;
    setNodes((nds) => nds.slice(0, -1));
    setEdges((eds) => eds.filter((e) => e.source !== lastId && e.target !== lastId));
  };

  const onEdgeClick = (event, edge) => {
  event.preventDefault();
  setEdges((eds) => eds.filter((e) => e.id !== edge.id));
  };

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            style: { stroke: '#fff', strokeWidth: 2 },
            markerEnd: { type: MarkerType.ArrowClosed },
          },
          eds
        )
      ),
    []
  );

  const onNodeClick = (event, node) => {
    event.preventDefault();

    if (event.shiftKey) {
      // Shift+click to set this node as start
      const newStartId = node.id;
      setStartNodeId(newStartId);

      setNodes((nds) =>
        nds.map((n) => ({
          ...n,
          data: { ...n.data, start: n.id === newStartId },
        }))
      );
    } else {

      if (!firstNodeRef.current) {
        firstNodeRef.current = node;
      } else {
        const source = firstNodeRef.current.id;
        const target = node.id;
        if (source !== target) {
          const edgeId = `e${source}-${target}`;
          setEdges((eds) => [
            ...eds,
            {
              id: edgeId,
              source,
              target,
              style: { stroke: '#fff', strokeWidth: 2 },
              markerEnd: { type: MarkerType.ArrowClosed },
            },
          ]);
        }
        firstNodeRef.current = null;
      }
    }
  };

  const runAlgorithm = async () => {
    if (!startNodeId) {
      alert('Najpierw shift+kliknij węzeł, aby ustawić go jako startowy.');
      return;
    }
    isCancelled.current = false;

    // Reset flag visited
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        data: { ...node.data, visited: false },
      }))
    );

    setEdges((eds) =>
      eds.map((edge) => ({
        ...edge,
        style: { stroke: '#eee', strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed },
      }))
    );

    const algorithmFn = algorithms[algorithm];
    if (!algorithmFn) {
      alert(`Algorytm "${algorithm}" nie jest zaimplementowany.`);
      return;
    }

    await algorithmFn(startNodeId, edges, async (visitedNodeId, visitedEdgeId) => {
      if (isCancelled.current) return;

      // Highlighting node
      setNodes((nds) =>
        nds.map((node) =>
          node.id === visitedNodeId
            ? { ...node, data: { ...node.data, visited: true } }
            : node
        )
      );
      // Highlighting edge
      if (visitedEdgeId) {
        setEdges((eds) =>
          eds.map((edge) =>
            edge.id === visitedEdgeId
              ? { ...edge, style: { stroke: '#e88da3', strokeWidth: 3 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#e88da3' } }
              : edge
          )
        );
      }
      await new Promise((r) => setTimeout(r, 500));
    });
  };

  const resetGraph = () => {
    isCancelled.current = true;
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        data: { ...node.data, visited: false, start: false },
      }))
    );
    setEdges((eds) =>
      eds.map((edge) => ({
        ...edge,
        style: { stroke: '#fff', strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed },
      }))
    );
    setStartNodeId(null);
  };

  return (
    <div className="w-full rounded-lg relative ">
      <ReactFlow
        style={{ width: '100%', height: '600px' }}
        nodes={nodes}
        edges={edges}
        onEdgeClick={onEdgeClick}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        defaultEdgeOptions={{
          style: { stroke: '#fff', strokeWidth: 2 },
          type: 'straight',
          markerEnd: { type: MarkerType.ArrowClosed },
        }}
        onNodeClick={onNodeClick}
      />

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
      <button
        onClick={addNode}
        className="cursor-pointer absolute top-28 right-2 px-3 py-2 bg-blue-magenta text-rosepink rounded-xl hover:opacity-80"
      >
        Add node
      </button>
      <button
        onClick={removeLastNode}
        className="cursor-pointer absolute top-41 right-2 px-3 py-2 bg-blue-magenta text-rosepink rounded-xl hover:opacity-80"
      >
        Delete latest node
      </button>

      <div className="absolute bottom-2 left-2 text-xs text-gray-300">
        Click any two vertices to connect them<br/>
        Shift+click on the node to set it as "start" 
      </div>
    </div>
  );
}