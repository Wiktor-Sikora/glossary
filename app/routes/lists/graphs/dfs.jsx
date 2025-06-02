import { useState } from 'react';
import BaseArticle from "../../baseArticle.jsx";
import description from "../../../assets/texts/dfs.jsx";

export function meta() {
  return [
    { title: "Algorithm Glossary | DFS" },
    { name: "description", content: "A collection of various algorithms | DFS article" },
  ];
}

export default function DFS() {
    return (<BaseArticle description={description} />);
}