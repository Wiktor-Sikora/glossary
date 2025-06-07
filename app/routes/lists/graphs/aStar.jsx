import { useState } from 'react';
import BaseArticle from "../../baseArticle.jsx";
import description from "../../../assets/texts/aStar.jsx";

export function meta() {
  return [
    { title: "Algorithm Glossary | AStar" },
    { name: "description", content: "A collection of various algorithms | AStar article" },
  ];
}

export default function AStar() {
    return (<BaseArticle description={description} />);
}