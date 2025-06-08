const algorithms = {

    //DFS
    dfs: async (startNodeId, edges, onVisit) => {
        const adjacencyList = {};
        edges.forEach(({ id, source, target }) => {
          if (!adjacencyList[source]) adjacencyList[source] = [];
          adjacencyList[source].push({ target, edgeId: id });
        });

        const visited = new Set();

        const dfsVisit = async (nodeId, incomingEdgeId = null) => {
          if (visited.has(nodeId)) return;
          visited.add(nodeId);
          await onVisit(nodeId, { edgeId: incomingEdgeId });

          for (const { target, edgeId } of adjacencyList[nodeId] || []) {
            if (!visited.has(target)) {
              await dfsVisit(target, edgeId);
            }
          }
        };

        await dfsVisit(startNodeId);
    },

    // BFS
    bfs: async (startNodeId, edges, onVisit) => {
      const adjacencyList = {};
      edges.forEach(({ id, source, target }) => {
        if (!adjacencyList[source]) adjacencyList[source] = [];
        adjacencyList[source].push({ target, edgeId: id });
      });

    const visited = new Set();
    const queue = [{ nodeId: startNodeId, edgeId: null }];
    visited.add(startNodeId);

    while (queue.length > 0) {
      const { nodeId, edgeId } = queue.shift();
      await onVisit(nodeId, { edgeId });

    for (const { target, edgeId } of adjacencyList[nodeId] || []) {
      if (!visited.has(target)) {
        visited.add(target);
        queue.push({ nodeId: target, edgeId });
        }
        }
      }
    },

  // Dijkstra
dijkstra: async (startNodeId, edges, onVisit) => {
  const adjacencyList = {};
  edges.forEach(({ id, source, target, data }) => {
    if (!adjacencyList[source]) adjacencyList[source] = [];
    adjacencyList[source].push({ target, edgeId: id, weight: data?.weight ?? 1 });
  });

  const distances = {};
  const priorityQueue = new PriorityQueue((a, b) => a.distance - b.distance);

  Object.keys(adjacencyList).forEach(nodeId => {
    distances[nodeId] = nodeId === startNodeId ? 0 : Infinity;
  });

  // Dodaj też węzły, które nie mają krawędzi wychodzących
  edges.forEach(({ source, target }) => {
    if (!(target in distances)) distances[target] = Infinity;
  });

  priorityQueue.enqueue({ nodeId: startNodeId, distance: 0, edgeId: null });

  while (!priorityQueue.isEmpty()) {
    const { nodeId, distance, edgeId } = priorityQueue.dequeue();
    if (distance > distances[nodeId]) continue;

    await onVisit(nodeId, { distance, edgeId });

    for (const { target, edgeId, weight } of adjacencyList[nodeId] || []) {
      const newDistance = distance + weight;
      if (newDistance < distances[target]) {
        distances[target] = newDistance;
        priorityQueue.enqueue({ nodeId: target, distance: newDistance, edgeId });
      }
    }
  }
},


  // A*
'a-star': async (startNodeId, endNodeId, edges, nodes, onVisit) => {
  const calculateMaxDistance = () => {
    let maxDist = 0;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].position.x - nodes[j].position.x;
        const dy = nodes[i].position.y - nodes[j].position.y;
        const dist = Math.hypot(dx, dy);
        if (dist > maxDist) maxDist = dist;
      }
    }
    return maxDist;
  };

  const maxDistance = calculateMaxDistance();

  const maxWeight = edges.reduce((maxW, e) => {
    const w = e.data?.weight ?? 1;
    return w > maxW ? w : maxW;
  }, 1);

  const heuristic = (nodeId) => {
    const node1 = nodes.find(n => n.id === nodeId);
    const node2 = nodes.find(n => n.id === endNodeId);
    if (!node1 || !node2) return Infinity;

    const dist = Math.hypot(node1.position.x - node2.position.x, node1.position.y - node2.position.y);
    return (dist / maxDistance) * maxWeight;
  };

  const buildAdjacencyList = () => {
    const list = {};
    edges.forEach(({ id, source, target, data }) => {
      const weight = data?.weight ?? 1;

      if (!list[source]) list[source] = [];
      list[source].push({ target, edgeId: id, weight });

      if (!list[target]) list[target] = [];
      list[target].push({ target: source, edgeId: id, weight });
    });
    return list;
  };

  const adjacencyList = buildAdjacencyList();

  const openSet = new PriorityQueue((a, b) => a.fScore - b.fScore);
  const gScores = {};
  const closedSet = new Set();

  gScores[startNodeId] = 0;
  const startFScore = heuristic(startNodeId);

  openSet.enqueue({
    nodeId: startNodeId,
    gScore: 0,
    fScore: startFScore,
    edgeId: null
  });

  while (!openSet.isEmpty()) {
    const { nodeId, gScore, edgeId } = openSet.dequeue();

    if (closedSet.has(nodeId)) continue;

    closedSet.add(nodeId);

    await onVisit(nodeId, { 
      gScore, 
      fScore: gScore + heuristic(nodeId),
      edgeId 
    });

    if (nodeId === endNodeId) break;

    const neighbors = adjacencyList[nodeId] || [];
    for (const { target, edgeId: eId, weight } of neighbors) {
      if (closedSet.has(target)) continue;

      const tentativeGScore = gScores[nodeId] + weight;
      const currentGScore = gScores[target] ?? Infinity;

      if (tentativeGScore < currentGScore) {
        gScores[target] = tentativeGScore;
        const fScore = tentativeGScore + heuristic(target);

        openSet.enqueue({
          nodeId: target,
          gScore: tentativeGScore,
          fScore,
          edgeId: eId
        });
      }
    }
  }
}
};

class PriorityQueue {
  constructor(compare) {
    this.elements = [];
    this.compare = compare;
  }

  enqueue(element) {
    this.elements.push(element);
    this.elements.sort(this.compare);
  }

  dequeue() {
    return this.elements.shift();
  }

  isEmpty() {
    return this.elements.length === 0;
  }
}

export default algorithms;