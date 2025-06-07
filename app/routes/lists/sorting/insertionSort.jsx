import { useState } from 'react';
import BaseArticle from "../../baseArticle.jsx";
import description from "../../../assets/texts/insertionSort.jsx";

export function meta() {
  return [
    { title: "Algorithm Glossary | Insertion Sort" },
    { name: "description", content: "A collection of various algorithms | Insertion Sort article" },
  ];
}

export default function InsertionSort() {
    return (<BaseArticle description={description} />);
}