function isPrefix(shorter, longer) {
  if (shorter.length > longer.length) return false;
  for (let i = 0; i < shorter.length; i++) {
    if (shorter[i] !== longer[i]) return false;
  }
  return true;
}


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
      adjacencyList[source].push({
        target,
        edgeId: id,
        weight: data?.weight ?? 1
      });
    });
  
  
    const distances = {};
    const priorityQueue = new PriorityQueue((a, b) => a.distance - b.distance);
  
  
    Object.keys(adjacencyList).forEach(nodeId => {
      distances[nodeId] = nodeId === startNodeId ? 0 : Infinity;
    });
  
    edges.forEach(({ target }) => {
      if (!(target in distances)) distances[target] = Infinity;
    });
  
    const cameFrom = {};
    Object.keys(distances).forEach(nodeId => {
      cameFrom[nodeId] = [];
    });
  
    priorityQueue.enqueue({ nodeId: startNodeId, distance: 0, edgeId: null });
  
    while (!priorityQueue.isEmpty()) {
      const { nodeId, distance, edgeId } = priorityQueue.dequeue();
      if (distance > distances[nodeId]) continue;
    
      // visualization callback
      await onVisit(nodeId, { distance, edgeId });
    
      for (const { target, edgeId: eId, weight } of adjacencyList[nodeId] || []) {
        const newDistance = distance + weight;
      
        if (newDistance < distances[target]) {
          // better distance → reset predecessors
          distances[target] = newDistance;
          cameFrom[target] = [{ prevNode: nodeId, viaEdge: eId }];
          priorityQueue.enqueue({ nodeId: target, distance: newDistance, edgeId: eId });
        
        } else if (newDistance === distances[target]) {
          // equal distance → add another predecessor
          cameFrom[target].push({ prevNode: nodeId, viaEdge: eId });
        }
      }
    }
  
    function buildPaths(node) {
      if (node === startNodeId) {
        return [[ startNodeId ]];
      }
      const paths = [];
      for (const { prevNode } of cameFrom[node]) {
        const subPaths = buildPaths(prevNode);
        for (const sp of subPaths) {
          paths.push([ ...sp, node ]);
        }
      }
      return paths;
    }
  
    const allPaths = {};
    Object.keys(distances).forEach(nodeId => {
      if (distances[nodeId] < Infinity) {
        allPaths[nodeId] = buildPaths(nodeId);
      } else {
        allPaths[nodeId] = [];
      }
    });
  
    return allPaths;
  },
  
  
  
 // A*
'a-star': async (startNodeId, endNodeId, edges, nodes, onVisit) => {
  console.log('Start A*:', startNodeId, '->', endNodeId);

  const adjacencyList = {};
  edges.forEach(({ id, source, target, data }) => {
    const weight = data?.weight ?? 1;
    console.log(`Edge ${id} from ${source} to ${target} has weight: ${weight}`);
    if (!adjacencyList[source]) adjacencyList[source] = [];
    adjacencyList[source].push({ target, edgeId: id, weight });
  });

  // Simple heuristic - returns 0, which turns A* into Dijkstra (guarantees finding the optimal path)
  const heuristic = () => 0;

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

  const openSet = new PriorityQueue((x, y) => x.fScore - y.fScore);
  const gScore = { [startNodeId]: 0 };
  const fScore = { [startNodeId]: heuristic(startNodeId) };
  const cameFrom = {};
  const closedSet = new Set();

  // Helper function to play a track
  const reconstruct = node => {
    const path = [node];
    while (cameFrom[node]) {
      node = cameFrom[node];
      path.unshift(node);
    }
    return path;
  };

  openSet.enqueue({ nodeId: startNodeId, fScore: fScore[startNodeId] });

  const visitedPaths = [];
  const pathKey = path => JSON.stringify(path);
  const seenPaths = new Set();

  const statusPriority = { ok: 0, discarded: 1, final: 2 };

  function addOrUpdateVisitedPath(path, status) {
    const key = pathKey(path);
    if (!seenPaths.has(key)) {
      visitedPaths.push({ path, status });
      seenPaths.add(key);
    } else {
      for (let vp of visitedPaths) {
        if (pathKey(vp.path) === key && statusPriority[status] > statusPriority[vp.status]) {
          vp.status = status;
          break;
        }
      }
    }
  }

  while (!openSet.isEmpty()) {
    const { nodeId: current } = openSet.dequeue();
    console.log('Processing node:', current, 'gScore:', gScore[current]);

    if (current === endNodeId) {
    console.log('FOUND END NODE:', current);
    const finalPath = reconstruct(current);
    
    // First we process all tracks except the final one
    const nonFinalPaths = visitedPaths.filter(p => p.path.join('->') !== finalPath.join('->'));
    
    // Mark non-optimal paths as discarded
    nonFinalPaths.forEach(p => {
      if (p.status === 'ok' && !isPrefix(p.path, finalPath)) {
        p.status = 'discarded';
      }
    });

    // Add final path at the end
    const result = [...nonFinalPaths, { path: finalPath, status: 'final' }];
    
    for (const nodeId of finalPath) {
      await onVisit(nodeId, { isActive: true });
    }

    console.log('visitedPaths zwrócone z a-star:');
    result.forEach(p => {
      console.log(`Status: ${p.status}, Path: ${p.path.join('->')}`);
    });

    return result;
  }

    if (closedSet.has(current)) continue;
    closedSet.add(current);

    const basePath = reconstruct(current);

    for (const { target, edgeId, weight } of adjacencyList[current] || []) {
      if (closedSet.has(target)) continue;

      const tentativeG = gScore[current] + weight;
      console.log(`Checking ${current}->${target}, weight: ${weight}, tentativeG: ${tentativeG}, current gScore: ${gScore[target] ?? 'Infinity'}`);

      if (tentativeG < (gScore[target] ?? Infinity)) {
        cameFrom[target] = current;
        gScore[target] = tentativeG;
        fScore[target] = tentativeG + heuristic(target);
        openSet.enqueue({ nodeId: target, fScore: fScore[target] });

        const newPath = basePath.concat(target);
        addOrUpdateVisitedPath(newPath, 'ok');

        await onVisit(target, {
          gScore: gScore[target],
          fScore: fScore[target],
          edgeId,
          isActive: true
        });
      } else {
        const rejectedPath = basePath.concat(target);
        addOrUpdateVisitedPath(rejectedPath, 'discarded');
        await onVisit(target, { edgeId, isActive: false, isDiscarded: true });
      }
    }
  }

  console.log('No path found');
  return visitedPaths;
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