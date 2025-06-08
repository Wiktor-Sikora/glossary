import { useCallback, useState, useRef, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  Handle,
  Position,
  useEdgesState,
  useNodesState,
} from 'reactflow';

import algorithms from '../assets/visualizations/graphs/graphAlgorithms';

import FloatingEdge from './FloatingEdge';
import FloatingConnectionLine from './FloatingConnectionLine';

const edgeTypes = { floating: FloatingEdge };


import 'reactflow/dist/style.css';

function CircleNodes({ data }) {

    const bg = data.visited ? 'bg-rosepink' : data.start ? 'bg-rosepink' : data.end ? 'bg-dark-rosepink' : 'bg-navy-blue-magenta';

    return (
    <div className={`${bg} border-2 border-white rounded-full px-3 py-1.5 shadow-md text-sm text-center`}>
            {data.label}

        <Handle 
        id="right"
        type="source" 
        position={Position.Top}
        isConnectable={false}
        style={{ 
          background: 'none',
          border: 0,
          left: 0,
        }}
      />
      <Handle 
        id="left"
        type="target" 
        position={Position.Bottom}
        isConnectable={false}
        style={{
          background: 'none',
          border: 0, 
          left: '-10%',
        }}
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
    data: { label: 'A', start: false, end: false },
    position: { x: -60, y: -80 },
  },
  {
    id: '2',
    type: 'circle',
    data: { label: 'B', start: false, end: false },
    position: { x: -80, y: 100 },
  },
  {
    id: '3',
    type: 'circle',
    data: { label: 'C', start: false, end: false },
    position: { x: 20, y: 200 },
  },
  {
    id: '4',
    type: 'circle',
    data: { label: 'D', start: false, end: false },
    position: { x: 120, y: 130 },
  },
  {
    id: '5',
    type: 'circle',
    data: { label: 'E', start: false, end: false },
    position: { x: 40, y: 10 },
  },
  {
    id: '6',
    type: 'circle',
    data: { label: 'F', start: false, end: false },
    position: { x: 155, y: -55 },
  },
  {
    id: '7',
    type: 'circle',
    data: { label: 'G', start: false, end: false },
    position: { x: 250, y: 40 },
  },
  {
    id: '8',
    type: 'circle',
    data: { label: 'H', start: false, end: false },
    position: { x: 230, y: 200 },
  },
];

let counter = 9;

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', data: { weight: 1 }},
  { id: 'e2-3', source: '2', target: '3', data: { weight: 1 }},
  { id: 'e2-5', source: '2', target: '5', data: { weight: 1 }},
  { id: 'e3-4', source: '3', target: '4', data: { weight: 1 }},
  { id: 'e3-8', source: '3', target: '8', data: { weight: 1 }},
  { id: 'e4-5', source: '4', target: '5', data: { weight: 1 }},
  { id: 'e4-6', source: '4', target: '6', data: { weight: 1 }},
  { id: 'e4-8', source: '4', target: '8', data: { weight: 1 }},
  { id: 'e5-6', source: '5', target: '6', data: { weight: 1 }},
  { id: 'e6-7', source: '6', target: '7', data: { weight: 1 }},
  { id: 'e7-8', source: '7', target: '8', data: { weight: 1 }},
];

export default function GraphFrame({ algorithm, onControlsReady }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const firstNodeRef = useRef(null);
  const [startNodeId, setStartNodeId] = useState(null);
  const [endNodeId, setEndNodeId] = useState(null); 
  const isCancelled = useRef(false);

  const algorithmMap = { "BFS": "bfs", "DFS": "dfs", "Dijkstra's Algorithm": "dijkstra", "A* Algorithm": "a-star" };

  const addNode = () => {
    const newId = String(counter++);
    const newLabel = String.fromCharCode(64 + Number(newId));
    const newNode = {
      id: newId,
      type: 'circle',
      data: { label: newLabel, start: false, end: false, weight: 1 },
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
    counter--
  };

 const onEdgeClick = (event, edge) => {
  event.preventDefault();

  setEdges((eds) => {
    if (event.shiftKey) {

      return eds.map((e) =>
        e.id === edge.id
          ? {
              ...e,
              data: {
                ...e.data,
                weight: (e.data?.weight ?? 1) + 1,
              },
            }
          : e
      );
    } else if (event.ctrlKey || event.metaKey) {

      return eds.map((e) =>
        e.id === edge.id
          ? {
              ...e,
              data: {
                ...e.data,
                weight: Math.max((e.data?.weight ?? 1) - 1, 1),
              },
            }
          : e
      );
    } else {

      return eds.filter((e) => e.id !== edge.id);
    }
  });
};

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            sourceHandle: 'right',
            targetHandle: 'left', 
            data: { weight: 1 },
            style: { stroke: '#fff', strokeWidth: 2 },
          },
          eds
        )
      ),
    []
  );

  const onNodeClick = (event, node) => {
    event.preventDefault();
    // Ctrl+click → endNode
    if (algorithmMap[algorithm] === 'a-star' && event.ctrlKey) {  
      const newEndId = node.id;                                       
      setEndNodeId(newEndId);

      setNodes((nds) =>
        nds.map(n => ({
          ...n,
          data: { ...n.data, end: n.id === newEndId }
        }))
      );
      return;
    }

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
            },
          ]);
        }
        firstNodeRef.current = null;
      }
    }
  };

const runAlgorithm = async () => {

console.log('>>> runAlgorithm', {
  start: startNodeId,
  end: endNodeId,
  edges: edges.map(e => e.data?.weight)
});


  if (!startNodeId) {
    alert('Shift+click to set start node');
    return;
  }
  if (algorithmMap[algorithm] === 'a-star' && !endNodeId) {
    alert('Ctrl+click to set end node for A*');
    return;
  }

  isCancelled.current = false;

  // Resetowanie stanu wizualizacji
  setNodes((nds) =>
    nds.map((node) => ({
      ...node,
      data: {
        ...node.data,
        visited: false,
        distance: ['dijkstra', 'a-star'].includes(algorithm) ? Infinity : undefined,
        fScore: algorithm === 'a-star' ? Infinity : undefined,
        gScore: algorithm === 'a-star' ? Infinity : undefined
      }
    }))
  );

  setEdges((eds) =>
    eds.map((edge) => ({
      ...edge,
      style: { stroke: '#eee', strokeWidth: 2 },
    }))
  );

  const key = algorithmMap[algorithm];
  const algorithmFn = algorithms[key];


  if (!algorithmFn) {
    alert(`Algorithm "${algorithm}" is not implemented.`);
    return;
  }

  // Uniwersalny callback dla wszystkich algorytmów
  const handleVisit = async (nodeId, meta = {}) => {
    if (isCancelled.current) return;

    // Aktualizacja węzła
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id !== nodeId) return node;
        
        const updated = { 
          ...node, 
          data: { 
            ...node.data, 
            visited: true,
            ...(meta.distance !== undefined && { distance: meta.distance }),
            ...(meta.gScore !== undefined && { gScore: meta.gScore }),
            ...(meta.fScore !== undefined && { fScore: meta.fScore }),
            label: algorithm === 'dijkstra' ? `${nodeId} (${meta.distance})` :
                  algorithm === 'a-star' ? `${nodeId} (${meta.fScore})` : node.data.label
          }
        };
        return updated;
      })
    );

    // Podświetlenie krawędzi
    if (meta.edgeId) {
      setEdges((eds) =>
        eds.map((edge) =>
          edge.id === meta.edgeId
            ? { 
                ...edge, 
                style: { stroke: '#e88da3', strokeWidth: 3 },
                ...(algorithm === 'dijkstra' || algorithm === 'a-star') && { 
                  label: `${edge.data.weight}` 
                }
              }
            : edge
        )
      );
    }

    await new Promise((r) => setTimeout(r, 500));
  };

  // Wywołanie odpowiedniego algorytmu
  if (key === 'a-star') {
    await algorithmFn(startNodeId, endNodeId, edges, nodes, handleVisit);
  } else {
    await algorithmFn(startNodeId, edges, handleVisit);
  }
};

  const resetGraph = () => {
    isCancelled.current = true;
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        data: { ...node.data, visited: false, start: false, end: false },
      }))
    );
    setEdges((eds) =>
      eds.map((edge) => ({
        ...edge,
        style: { stroke: '#fff', strokeWidth: 2 },
        
      }))
    );
    setStartNodeId(null);
    setEndNodeId(null);
  };

  useEffect(() => {
  if (onControlsReady) {
      onControlsReady({
        runAlgorithm,
        resetGraph,
        addNode,
        removeLastNode
      });
    }
  }, [edges, nodes, startNodeId, endNodeId]);

  return (
    <div className="w-full h-102 rounded-lg">
      <ReactFlow
        style={{ width: '100%', height: '600px' }}
        nodes={nodes}
        edges={edges}
        edgeTypes={edgeTypes}
        connectionLineComponent={FloatingConnectionLine}
        onEdgeClick={onEdgeClick}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        connectionMode="loose"
        connectionRadius={50}
        fitView
        defaultEdgeOptions={{
          style: { stroke: '#fff', strokeWidth: 2 },
          type: 'floating',
        }}
        onNodeClick={onNodeClick}
      />
    </div>
  );
}