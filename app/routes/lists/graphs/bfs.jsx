import { useState } from 'react';
import BaseArticle from "../../baseArticle.jsx";
import description from "../../../assets/texts/bfs.jsx";

export function meta() {
  return [
    { title: "Algorithm Glossary | BFS" },
    { name: "description", content: "A collection of various algorithms | BFS article" },
  ];
}

export default function BFS() {
    return (<BaseArticle description={description} />);
}