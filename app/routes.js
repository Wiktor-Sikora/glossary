import { index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.jsx"),
    route("binary-search", "routes/lists/searching/binarySearch.jsx"),
    route("quick-sort", "routes/lists/sorting/quickSort.jsx"),
    route("dfs", "routes/lists/graphs/dfs.jsx"),
];
