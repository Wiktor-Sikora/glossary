import { useState } from 'react';
import BaseArticle from "../../baseArticle.jsx";
import description from "../../../assets/texts/mergeSort.jsx";

export function meta() {
  return [
    { title: "Algorithm Glossary | Merge Sort" },
    { name: "description", content: "A collection of various algorithms | Merge Sort article" },
  ];
}

export default function MergeSort() {
    return (<BaseArticle description={description} />);
}
