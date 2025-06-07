import { useState } from 'react';
import BaseArticle from "../../baseArticle.jsx";
import description from "../../../assets/texts/bubbleSort.jsx";

export function meta() {
  return [
    { title: "Algorithm Glossary | Bubble Sort" },
    { name: "description", content: "A collection of various algorithms | Bubble Sort article" },
  ];
}

export default function BubbleSort() {
    return (<BaseArticle description={description} />);
}