import CodeSnippet from "../../components/codeSnippet.jsx";

export const description = {
    title: "DFS",
    type: "GraphFrame",
    complexity: {
        time: "O(V+E)",
        space: "O(V)",
    },
    dataTypes: ["Graphs, Trees"],
    definition:(<>
        Depth-First Search (DFS) is an algorithm for traversing or searching tree or graph data structures. The algorithm starts at the root node (or any arbitrary node in case of a graph) and explores as far as possible along each branch before backtracking.
    </>),
    constraints:(
        <ul className="list-disc list-inside">
            <li>Graph can be directed or undirected</li>
            <li>May need cycle detection for certain applications</li>
            <li>For disconnected graphs, needs to be run on each component</li>
        </ul>
    ),
    arguments:(
        <ul className="list-disc list-inside">
            <li>Graph representation - <CodeSnippet code="graph"/></li>
            <li>Starting node - <CodeSnippet code="start"/></li>
            <li>Visited set (optional) - <CodeSnippet code="visited"/></li>
        </ul>
    ),
    explanation:(
        <ul className="list-disc list-inside">
             <li>Mark the current node as visited</li>
            <li>Process the current node (print, store, etc.)</li>
            <li>For each adjacent node of the current node:</li>
            <ul className="ml-12 list-[circle] list-inside">
                <li>If the node hasn't been visited, recursively perform DFS on it</li>
            </ul>
            <li>The algorithm explores as deep as possible before backtracking</li>
        </ul>
    ),
    returns:(<>
         Depends on implementation - can return traversal order, connected components, or other graph properties
    </>),
    languages: [
        {
            language: "C++",
            machineLanguage: "cpp",
            iterative: `#include <iostream>
#include <vector>
#include <stack>

void dfs(int start, const std::vector<std::vector<int>>& adj, std::vector<bool>& visited) {
    std::stack<int> s;
    s.push(start);

    while (!s.empty()) {
        int u = s.top();
        s.pop();

        if (!visited[u]) {
            visited[u] = true;
            std::cout << u << " ";

            // Dodajemy sąsiadów w odwrotnej kolejności, aby zachować zgodność z DFS rekurencyjnym
            for (auto it = adj[u].rbegin(); it != adj[u].rend(); ++it) {
                if (!visited[*it]) {
                    s.push(*it);
                }
            }
        }
    }
}
`,
            recursive: `#include <iostream>
#include <vector>

void dfs(int u, const std::vector<std::vector<int>>& adj, std::vector<bool>& visited) {
    visited[u] = true;
    std::cout << u << " ";

    for (int v : adj[u]) {
        if (!visited[v]) {
            dfs(v, adj, visited);
        }
    }
}`
        },
        {
            language: "Python",
            machineLanguage: "python",
            iterative: `def dfs(start, adj, visited):
    stack = [start]

    while stack:
        u = stack.pop()
        if not visited[u]:
            visited[u] = True
            print(u, end=' ')

            # Dodajemy sąsiadów w odwrotnej kolejności, żeby uzyskać ten sam porządek co w rekurencyjnym DFS
            for v in reversed(adj[u]):
                if not visited[v]:
                    stack.append(v)
`,
            recursive: `def dfs(u, adj, visited):
    visited[u] = True
    print(u, end=' ')
    
    for v in adj[u]:
        if not visited[v]:
            dfs(v, adj, visited)`
        }
    ]
}

export default description;