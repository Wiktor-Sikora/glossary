import { useState } from 'react';
import BaseArticle from "../../baseArticle.jsx";
import description from "../../../assets/texts/dijkstra.jsx";

export function meta() {
  return [
    { title: "Algorithm Glossary | Dijkstra" },
    { name: "description", content: "A collection of various algorithms | Dijkstra article" },
  ];
}

export default function Dijkstra() {
    return (<BaseArticle description={description} />);
}