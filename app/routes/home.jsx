import { useState } from 'react';
import { Link } from "react-router";

import imgSort from '../assets/home/sort-img.png'
import gifSort from '../assets/home/sort.gif'
import imgSearch from '../assets/home/search-img.png'
import gifSearch from '../assets/home/search.gif'
import imgGraph from '../assets/home/graph-img.png'
import gifGraph from '../assets/home/graph.gif'

export function meta() {
  return [
    { title: "Algorithm Glossary" },
    { name: "description", content: "A collection of various algorithms" },
  ];
}

function Header(){
  return(
    <h1 className="font-miriam text-rosepink text-center pt-5
    lg:text-9xl
    md:text-8xl
    max-md:text-6xl
    max-sm:text-6xl">
    Algorithms</h1>
  )
}

function Tile({ path, img, gif, imgAlt, title, purpose, complexity}) {
  const [isHovered, setIsHovered] = useState(false);

  return(
    <Link to={path} prefetch="intent"
          className="cursor-pointer flex flex-col rounded-2xl p-5 w-80 border-4 border-blue-magenta
    hover:scale-110 ease-in-out duration-200 hover:p-3
    xl:w-80
    max-xl:w-80
    lg:w-60
    md:w-50
    max-md:w-60"
     onMouseEnter={() => setIsHovered(true)}
     onMouseLeave={() => setIsHovered(false)}
    >
      <img className="mb-2 scale-90" src={isHovered ? gif ?? img : img} alt={imgAlt}/>
      <p className="text-xl text-rosepink font-mono font-bold
      max-sm:text-lg">{title}</p>
      <div className="flex flex-row justify-between w-full">
          <div className="flex flex-col self-start">
              <p className="text-lg text-left text-dark-rosepink font-mono font-bold
              max-sm:text-sm">{purpose}</p>
          </div>
          <div className="flex flex-col self-end">
              <p className="text-xl text-right text-dark-rosepink font-mono font-bold
              max-sm:text-lg">{complexity}</p>
          </div>
      </div>
    </Link>
  );
}

function Tiles() {
  return(
    <div className="w-[80%] mt-5 mx-auto grid gap-y-10
    2xl:grid-cols-4
    md:grid-cols-3
    max-md:grid-cols-2
    max-sm:grid-cols-1 max-sm:w-fit">
      <Tile path="bubble-sort" title="Bubble sort" purpose="Sorting" complexity="O(n²)" img={imgSort} gif={gifSort} imgAlt="Sort"/>
      <Tile path="heap-sort" title="Heap sort" purpose="Sorting" complexity="O(nlog n)" img={imgSort} gif={gifSort} imgAlt="Sort"/>
      <Tile path="insertion-sort" title="Insertion sort" purpose="Sorting" complexity="O(n²)" img={imgSort} gif={gifSort} imgAlt="Sort"/>
      <Tile path="merge-sort" title="Merge sort" purpose="Sorting" complexity="O(nlog n)" img={imgSort} gif={gifSort} imgAlt="Sort"/>
      <Tile path="quick-sort" title="Quick sort" purpose="Sorting" complexity="O(nlog n)" img={imgSort} gif={gifSort} imgAlt="Sort"/>
      <Tile path="binary-search" title="Binary search" purpose="Searching" complexity="O(log n)" img={imgSearch} gif={gifSearch} imgAlt="Search"/>
      <Tile path="interpolation-search" title="Interpolation search" purpose="Searching" complexity="O(loglog n)" img={imgSearch} gif={gifSearch} imgAlt="Search"/>
      <Tile path="jump-search" title="Jump search" purpose="Searching" complexity="O(loglog n)" img={imgSearch} gif={gifSearch} imgAlt="Search"/>
      <Tile path="a-star" title="A*" purpose="Path finding" complexity="O(V+E)" img={imgGraph} gif={gifGraph} imgAlt="Graph"/>
      <Tile path="bfs" title="BFS" purpose="Path finding" complexity="O(V+E)" img={imgGraph} gif={gifGraph} imgAlt="Graph"/>
      <Tile path="dijkstra" title="Dijkstra" purpose="Path finding" complexity="O((V+E)logV)" img={imgGraph} gif={gifGraph} imgAlt="Graph"/>
      <Tile path="dfs" title="DFS" purpose="Path finding" complexity="O(V+E)" img={imgGraph} gif={gifGraph} imgAlt="Graph"/>
    </div>
  );
}


export default function Home() {
  return(
  <>
    <Header />
    <Tiles />
  </>
  );
}
