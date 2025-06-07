import CodeSnippet from "../../components/codeSnippet.jsx";

export const description = {
    title: "Dijkstra's Algorithm",
    type: "GraphFrame",
    complexity: {
        time: "O((V + E) log V)",
        space: "O(V)",
    },
    dataTypes: ["Graphs"],
    definition:(<>
        Dijkstra's Algorithm is a graph search algorithm that solves the single-source shortest path problem for a graph with non-negative edge weights, producing a shortest-path tree. It finds the minimum distance from a starting node to all other nodes in the graph.
    </>),
    constraints:(
        <ul className="list-disc list-inside">
            <li>Requires <strong>non-negative edge weights</strong> (fails with negative weights)</li>
            <li>Optimal for graphs with reasonable edge density</li>
            <li>Not suitable for graphs with negative cycles (use Bellman-Ford instead)</li>
            <li>Performance degrades for very large sparse graphs</li>
        </ul>
    ),
    arguments:(
        <ul className="list-disc list-inside">
            <li>Graph representation - <CodeSnippet code="graph"/></li>
            <li>Starting node - <CodeSnippet code="source"/></li>
            <li>Distance array - <CodeSnippet code="dist[]"/></li>
            <li>Priority queue/min-heap - <CodeSnippet code="priorityQueue"/></li>
            <li>Visited nodes set - <CodeSnippet code="visited"/></li>
        </ul>
    ),
    explanation:(
        <ul className="list-disc list-inside">
            <li>Initialize all distances as INFINITY except the source node (distance 0)</li>
            <li>While there are unvisited nodes:</li>
            <ul className="ml-12 list-[circle] list-inside">
                <li>Select the unvisited node with the smallest known distance</li>
                <li>For each neighbor of the current node:</li>
                <ul className="ml-12 list-[square] list-inside">
                    <li>Calculate tentative distance through current node</li>
                    <li>Update neighbor's distance if tentative distance is smaller</li>
                </ul>
                <li>Mark current node as visited</li>
            </ul>
            <li>After processing all nodes, <CodeSnippet code="dist[]"/> contains shortest distances from source</li>
        </ul>
    ),
    returns:(<>
            Returns a <strong>distance array</strong> where each index represents the shortest distance from the source node<br/>
            Can optionally return a <strong>predecessor array</strong> to reconstruct paths<br/>
            Returns <CodeSnippet code="null"/> if negative weights are detected
    </>),
    languages: [
        {
            language: "C++",
            machineLanguage: "cpp",
            iterative: `#include <iostream>
#include <vector>
#include <queue>
#include <limits>

const int INF = std::numeric_limits<int>::max();

void dijkstra(const std::vector<std::vector<std::pair<int, int>>>& graph, int source, std::vector<int>& distance) {
    int n = (int)graph.size();
    distance.assign(n, INF);
    distance[source] = 0;

    using pii = std::pair<int, int>; // (distance, vertex)
    std::priority_queue<pii, std::vector<pii>, std::greater<>> pq;
    pq.push({0, source});

    while (!pq.empty()) {
        int dist = pq.top().first;
        int u = pq.top().second;
        pq.pop();

        if (dist > distance[u]) continue;

        for (auto [v, weight] : graph[u]) {
            if (distance[u] + weight < distance[v]) {
                distance[v] = distance[u] + weight;
                pq.push({distance[v], v});
            }
        }
    }
}
`,
            recursive: `#include <iostream>
#include <vector>
#include <queue>
#include <limits>
#include <set>

const int INF = std::numeric_limits<int>::max();

void dijkstra(
    const std::vector<std::vector<std::pair<int, int>>>& graph,
    std::vector<int>& distance,
    std::priority_queue<std::pair<int, int>, std::vector<std::pair<int, int>>, std::greater<>> &pq
) {
    if (pq.empty()) return;

    auto [dist, u] = pq.top();
    pq.pop();

    if (dist > distance[u]) {
        dijkstra(graph, distance, pq);
        return;
    }

    for (auto [v, weight] : graph[u]) {
        if (distance[u] + weight < distance[v]) {
            distance[v] = distance[u] + weight;
            pq.push({distance[v], v});
        }
    }

    dijkstra(graph, distance, pq);
}

void dijkstra(const std::vector<std::vector<std::pair<int, int>>>& graph, int source, std::vector<int>& distance) {
    int n = (int)graph.size();
    distance.assign(n, INF);
    distance[source] = 0;

    std::priority_queue<std::pair<int, int>, std::vector<std::pair<int, int>>, std::greater<>> pq;
    pq.push({0, source});

    dijkstra(graph, distance, pq);
}
`
        },
        {
            language: "Python",
            machineLanguage: "python",
            iterative: `import heapq

def dijkstra(graph, source):
    n = len(graph)
    dist = [float('inf')] * n
    dist[source] = 0
    pq = [(0, source)]  # (distance, vertex)

    while pq:
        d, u = heapq.heappop(pq)

        if d > dist[u]:
            continue

        for v, weight in graph[u]:
            if dist[u] + weight < dist[v]:
                dist[v] = dist[u] + weight
                heapq.heappush(pq, (dist[v], v))

    return dist
`,
            recursive: `import heapq

def dijkstra(graph, source):
    n = len(graph)
    dist = [float('inf')] * n
    dist[source] = 0
    pq = [(0, source)]  # (distance, vertex)

    def helper():
        if not pq:
            return

        d, u = heapq.heappop(pq)

        if d > dist[u]:
            return helper()

        for v, weight in graph[u]:
            if dist[u] + weight < dist[v]:
                dist[v] = dist[u] + weight
                heapq.heappush(pq, (dist[v], v))

        helper()

    helper()
    return dist`
        }
    ]
}

export default description;