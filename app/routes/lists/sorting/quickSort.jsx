import { useState } from 'react';
import BaseArticle from "../../baseArticle.jsx";
import description from "../../../assets/texts/quickSort.jsx";

export function meta() {
  return [
    { title: "Algorithm Glossary | Quick Sort" },
    { name: "description", content: "A collection of various algorithms | Quick Sort article" },
  ];
}

export default function QuickSort() {
    return (<BaseArticle description={description} />);
}
