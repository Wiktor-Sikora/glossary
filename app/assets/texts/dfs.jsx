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
            iterative: `void DFS(vector<vector<int>>& graph, int start) {
    vector<bool> visited(graph.size(), false);
    stack<int> s;
    s.push(start);
    
    while (!s.empty()) {
        int node = s.top();
        s.pop();
        
        if (!visited[node]) {
            visited[node] = true;
            // Process node here
            
            for (int neighbor : graph[node]) {
                if (!visited[neighbor]) {
                    s.push(neighbor);
                }
            }
        }
    }
}`,
            recursive: `void DFS(vector<vector<int>>& graph, int node, vector<bool>& visited) {
    visited[node] = true;
    // Process node here
    
    for (int neighbor : graph[node]) {
        if (!visited[neighbor]) {
            DFSRecursive(graph, neighbor, visited);
        }
    }
}`
        },
        {
            language: "Python",
            machineLanguage: "python",
            iterative: `def dfs(graph, start):
    visited = [False] * len(graph)
    stack = [start]
    
    while stack:
        node = stack.pop()
        if not visited[node]:
            visited[node] = True
            # Process node here
            
            for neighbor in graph[node]:
                if not visited[neighbor]:
                    stack.append(neighbor)`,
            recursive: `def dfs(graph, node, visited):
    visited[node] = True
    # Process node here
    
    for neighbor in graph[node]:
        if not visited[neighbor]:
            dfs_recursive(graph, neighbor, visited)`
        }
    ]
}

export default description;