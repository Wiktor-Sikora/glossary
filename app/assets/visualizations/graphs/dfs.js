export async function runDFS(startNodeId, edges, onVisit) {
  const adjacencyList = {};

  edges.forEach(({ id, source, target }) => {
    if (!adjacencyList[source]) adjacencyList[source] = [];
    adjacencyList[source].push({ target, edgeId: id });
  });

  const visited = new Set();

  async function dfs(nodeId, incomingEdgeId = null) {
    if (visited.has(nodeId)) return;
    visited.add(nodeId);

    await onVisit(nodeId, incomingEdgeId);

    const neighbors = adjacencyList[nodeId] || [];
    for (const { target, edgeId } of neighbors) {
      if (!visited.has(target)) {
        await dfs(target, edgeId);
      }
    }
  }

  await dfs(startNodeId);
}
