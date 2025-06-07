import { useState } from 'react';
import BaseArticle from "../../baseArticle.jsx";
import description from "../../../assets/texts/jumpSearch.jsx";

export function meta() {
  return [
    { title: "Algorithm Glossary | Jump Search" },
    { name: "description", content: "A collection of various algorithms | Jump Search article" },
  ];
}

export default function JumpSearch() {
    return (<BaseArticle description={description} />);
}