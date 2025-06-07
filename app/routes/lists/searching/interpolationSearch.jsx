import { useState } from 'react';
import BaseArticle from "../../baseArticle.jsx";
import description from "../../../assets/texts/interpolationSearch.jsx";

export function meta() {
  return [
    { title: "Algorithm Glossary | Interpolation Search" },
    { name: "description", content: "A collection of various algorithms | Interpolation Search article" },
  ];
}

export default function InterpolationSearch() {
    return (<BaseArticle description={description} />);
}