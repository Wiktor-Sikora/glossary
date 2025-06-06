import CodeSnippet from "../../components/codeSnippet.jsx";

export const description = {
    title: "BFS",
    type: "GraphFrame",
    complexity: {
        time: "O(V+E)",
        space: "O(V)",
    },
    dataTypes: ["Graphs, Trees"],
    definition:(<>
        Breadth-First Search (BFS) is an algorithm for traversing or searching tree or graph data structures. It starts at the root node (or any arbitrary node in case of a graph) and explores all neighbor nodes at the present depth prior to moving on to nodes at the next depth level.
    </>),
    constraints:(
        <ul className="list-disc list-inside">
            <li>Graph can be directed or undirected</li>
            <li>Works well for unweighted graphs or finding shortest paths in unweighted graphs</li>
            <li>For disconnected graphs, needs to be run on each component</li>
        </ul>
    ),
    arguments:(
        <ul className="list-disc list-inside">
            <li>Graph representation - <CodeSnippet code="graph"/></li>
            <li>Starting node - <CodeSnippet code="start"/></li>
            <li>Visited array (optional) - <CodeSnippet code="visited"/></li>
        </ul>
    ),
    explanation:(
        <ul className="list-disc list-inside">
            <li>Create a queue and enqueue the starting node</li>
            <li>Mark the starting node as visited</li>
            <li>While the queue is not empty:</li>
            <ul className="ml-12 list-[circle] list-inside">
                <li>Dequeue a node from the front</li>
                <li>Process the node (print, store, etc.)</li>
                <li>Enqueue all adjacent nodes that haven't been visited and mark them as visited</li>
            </ul>
            <li>The algorithm explores all nodes at the current depth before moving to the next level</li>
        </ul>
    ),
    returns:(<>
        Depends on implementation - can return traversal order, shortest path distances, or other graph properties
    </>),
    languages: [
        {
            language: "C++",
            machineLanguage: "cpp",
            iterative: `#include <iostream>
#include <vector>
#include <queue>

void bfs(int start, const std::vector<std::vector<int>>& adj, std::vector<bool>& visited) {
    std::queue<int> q;
    q.push(start);
    visited[start] = true;

    while (!q.empty()) {
        int u = q.front();
        q.pop();
        std::cout << u << " ";

        for (int v : adj[u]) {
            if (!visited[v]) {
                visited[v] = true;
                q.push(v);
            }
        }
    }
}`,
            recursive: `#include <iostream>
#include <vector>
#include <queue>

void bfs(std::queue<int>& q, const std::vector<std::vector<int>>& adj, std::vector<bool>& visited) {
    if (q.empty()) return;

    int u = q.front();
    q.pop();
    std::cout << u << " ";

    for (int v : adj[u]) {
        if (!visited[v]) {
            visited[v] = true;
            q.push(v);
        }
    }

    bfs(q, adj, visited);
}`
        },
        {
            language: "Python",
            machineLanguage: "python",
            iterative: `from collections import deque

def bfs(start, adj, visited):
    queue = deque()
    queue.append(start)
    visited[start] = True

    while queue:
        u = queue.popleft()
        print(u, end=' ')

        for v in adj[u]:
            if not visited[v]:
                visited[v] = True
                queue.append(v)`,
            recursive: `from collections import deque

def bfs(queue, adj, visited):
    if not queue:
        return

    u = queue.popleft()
    print(u, end=' ')

    for v in adj[u]:
        if not visited[v]:
            visited[v] = True
            queue.append(v)

    bfs(queue, adj, visited)
`
        }
    ]
}

export default description;