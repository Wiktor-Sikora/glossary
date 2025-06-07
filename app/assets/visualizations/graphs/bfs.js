export async function runBFS(startNodeId, edges, visitCallback) {
  const adjacencyList = {};
  edges.forEach(({ id, source, target }) => {

    if (!adjacencyList[source]) adjacencyList[source] = [];
    if (!adjacencyList[target]) adjacencyList[target] = [];
    adjacencyList[source].push({ node: target, edgeId: id });
    adjacencyList[target].push({ node: source, edgeId: id });
  });

  const visited = new Set();
  const queue = [startNodeId];
  visited.add(startNodeId);

  await visitCallback(startNodeId, null);

  while (queue.length > 0) {
    const current = queue.shift();

    for (const { node: neighbor, edgeId } of adjacencyList[current] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);


        await visitCallback(neighbor, edgeId);
      }
    }
  }
}