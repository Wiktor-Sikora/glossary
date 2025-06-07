import { index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.jsx"),
    route("binary-search", "routes/lists/searching/binarySearch.jsx"),
    route("jump-search", "routes/lists/searching/jumpSearch.jsx"),
    route("interpolation-search", "routes/lists/searching/interpolationSearch.jsx"),
    route("quick-sort", "routes/lists/sorting/quickSort.jsx"),
    route("merge-sort", "routes/lists/sorting/mergeSort.jsx"),
    route("heap-sort", "routes/lists/sorting/heapSort.jsx"),
    route("bubble-sort", "routes/lists/sorting/bubbleSort.jsx"),
    route("insertion-sort", "routes/lists/sorting/insertionSort.jsx"),
    route("dfs", "routes/lists/graphs/dfs.jsx"),
    route("bfs", "routes/lists/graphs/bfs.jsx"),
    route("dijkstra", "routes/lists/graphs/dijkstra.jsx"),
    route("a-star", "routes/lists/graphs/aStar.jsx"),
];
