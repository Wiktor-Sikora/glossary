import { useState } from 'react';
import BaseArticle from "../../baseArticle.jsx";
import description from "../../../assets/texts/binarySearch.jsx";

export function meta() {
  return [
    { title: "Algorithm Glossary | Binary Search" },
    { name: "description", content: "A collection of various algorithms | Binary Search article" },
  ];
}

export default function BinarySearch() {
    return (<BaseArticle description={description} />);
}
