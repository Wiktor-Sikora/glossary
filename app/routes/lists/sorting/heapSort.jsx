import { useState } from 'react';
import BaseArticle from "../../baseArticle.jsx";
import description from "../../../assets/texts/heapSort.jsx";

export function meta() {
  return [
    { title: "Algorithm Glossary | Heap Sort" },
    { name: "description", content: "A collection of various algorithms | Heap Sort article" },
  ];
}

export default function HeapSort() {
    return (<BaseArticle description={description} />);
}