import CodeSnippet from "../../components/codeSnippet.jsx";

export const description = {
    title: "A* Algorithm",
    type: "GraphFrame",
    complexity: {
        time: <>O(b)<sup>d</sup></>,
        space: <>O(b)<sup>d</sup></>,
    },
    dataTypes: ["Graphs"],
    definition:(<>
        A* is an informed search algorithm that finds the shortest path between two nodes in a graph. It uses a heuristic function to estimate the cost from the current node to the goal, prioritizing nodes that appear to be on the shortest path.
    </>),
    constraints:(
        <ul className="list-disc list-inside">
            <li>Requires an admissible heuristic (never overestimates the true cost)</li>
            <li>Graph edges must have non-negative weights</li>
            <li>Optimal for grids and graphs with consistent heuristics</li>
        </ul>
    ),
    arguments:(
        <ul className="list-disc list-inside">
            <li>Graph representation - <CodeSnippet code="graph"/></li>
            <li>Start node - <CodeSnippet code="start"/></li>
            <li>Goal node - <CodeSnippet code="goal"/></li>
            <li>Heuristic function - <CodeSnippet code="h(n)"/></li>
        </ul>
    ),
    explanation:(
        <ul className="list-disc list-inside">
            <li>Initialize open set with start node (f(n) = g(n) + h(n))</li>
            <li>Initialize closed set (empty)</li>
            <li>While open set is not empty:</li>
            <ul className="ml-12 list-[circle] list-inside">
                <li>Select node with lowest f(n) from open set</li>
                <li>If current node is goal, return path</li>
                <li>Generate current node's neighbors</li>
                <li>For each neighbor:</li>
                <ul className="ml-12 list-[square] list-inside">
                    <li>Calculate tentative g score</li>
                    <li>If better path found, update neighbor's values</li>
                    <li>Add to open set if not already there</li>
                </ul>
                <li>Move current node to closed set</li>
            </ul>
        </ul>
    ),
    returns:(<>
        The shortest path from start to goal (if one exists), or indication that no path exists
    </>),
    languages: [
        {
            language: "C++",
            machineLanguage: "cpp",
            iterative: `#include <iostream>
#include <vector>
#include <queue>
#include <unordered_set>
#include <limits>

struct Node {
    int vertex;
    int f_cost;

    bool operator>(const Node& other) const {
        return f_cost > other.f_cost;
    }
};

std::vector<int> aStar(
    const std::vector<std::vector<std::pair<int, int>>>& graph,
    const std::vector<int>& heuristic,
    int start,
    int goal
) {
    int n = graph.size();
    std::vector<int> g_cost(n, std::numeric_limits<int>::max());
    std::vector<int> came_from(n, -1);

    g_cost[start] = 0;

    std::priority_queue<Node, std::vector<Node>, std::greater<>> open_set;
    open_set.push({start, heuristic[start]});

    while (!open_set.empty()) {
        int current = open_set.top().vertex;
        open_set.pop();

        if (current == goal)
            break;

        for (auto [neighbor, weight] : graph[current]) {
            int tentative_g = g_cost[current] + weight;

            if (tentative_g < g_cost[neighbor]) {
                came_from[neighbor] = current;
                g_cost[neighbor] = tentative_g;
                int f = tentative_g + heuristic[neighbor];
                open_set.push({neighbor, f});
            }
        }
    }

    // Return reconstructed path
    std::vector<int> path;
    for (int v = goal; v != -1; v = came_from[v])
        path.push_back(v);
    std::reverse(path.begin(), path.end());
    return path;
}
`,
            recursive: `#include <iostream>
#include <vector>
#include <queue>
#include <limits>
#include <algorithm>

struct Node {
    int vertex;
    int f_cost;

    bool operator>(const Node& other) const {
        return f_cost > other.f_cost;
    }
};

void aStarHelper(
    const std::vector<std::vector<std::pair<int, int>>>& graph,
    const std::vector<int>& heuristic,
    std::priority_queue<Node, std::vector<Node>, std::greater<>>& open_set,
    std::vector<int>& g_cost,
    std::vector<int>& came_from,
    int goal
) {
    if (open_set.empty()) return;

    int current = open_set.top().vertex;
    open_set.pop();

    if (current == goal) return;

    for (auto [neighbor, weight] : graph[current]) {
        int tentative_g = g_cost[current] + weight;
        if (tentative_g < g_cost[neighbor]) {
            g_cost[neighbor] = tentative_g;
            came_from[neighbor] = current;
            int f = tentative_g + heuristic[neighbor];
            open_set.push({neighbor, f});
        }
    }

    aStarHelper(graph, heuristic, open_set, g_cost, came_from, goal);
}

std::vector<int> aStar(
    const std::vector<std::vector<std::pair<int, int>>>& graph,
    const std::vector<int>& heuristic,
    int start,
    int goal
) {
    int n = graph.size();
    std::vector<int> g_cost(n, std::numeric_limits<int>::max());
    std::vector<int> came_from(n, -1);
    g_cost[start] = 0;

    std::priority_queue<Node, std::vector<Node>, std::greater<>> open_set;
    open_set.push({start, heuristic[start]});

    aStarHelper(graph, heuristic, open_set, g_cost, came_from, goal);

    // Reconstruct path
    std::vector<int> path;
    for (int v = goal; v != -1; v = came_from[v])
        path.push_back(v);
    std::reverse(path.begin(), path.end());
    return path;
}
`
        },
        {
            language: "Python",
            machineLanguage: "python",
            iterative: `import heapq

def a_star(graph, heuristic, start, goal):
    n = len(graph)
    g_cost = [float('inf')] * n
    g_cost[start] = 0
    came_from = [-1] * n

    open_set = [(heuristic[start], start)]  # (f = g + h, vertex)

    while open_set:
        _, current = heapq.heappop(open_set)

        if current == goal:
            break

        for neighbor, weight in graph[current]:
            tentative_g = g_cost[current] + weight
            if tentative_g < g_cost[neighbor]:
                came_from[neighbor] = current
                g_cost[neighbor] = tentative_g
                f = tentative_g + heuristic[neighbor]
                heapq.heappush(open_set, (f, neighbor))

    # Reconstruct path
    path = []
    v = goal
    while v != -1:
        path.append(v)
        v = came_from[v]
    return path[::-1]
`,
            recursive: `import heapq

def a_star_helper(graph, heuristic, open_set, g_cost, came_from, goal):
    if not open_set:
        return

    _, current = heapq.heappop(open_set)

    if current == goal:
        return

    for neighbor, weight in graph[current]:
        tentative_g = g_cost[current] + weight
        if tentative_g < g_cost[neighbor]:
            g_cost[neighbor] = tentative_g
            came_from[neighbor] = current
            f = tentative_g + heuristic[neighbor]
            heapq.heappush(open_set, (f, neighbor))

    a_star_helper(graph, heuristic, open_set, g_cost, came_from, goal)

def a_star(graph, heuristic, start, goal):
    n = len(graph)
    g_cost = [float('inf')] * n
    g_cost[start] = 0
    came_from = [-1] * n
    open_set = [(heuristic[start], start)]

    a_star_helper(graph, heuristic, open_set, g_cost, came_from, goal)

    # Reconstruct path
    path = []
    v = goal
    while v != -1:
        path.append(v)
        v = came_from[v]
    return path[::-1]
`
        }
    ]
}

export default description;