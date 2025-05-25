import { useState } from 'react';

import imgSearch from '../assets/home/search-img.png'
import gifSearch from '../assets/home/search.gif'

export function meta() {
  return [
    { title: "Algorithm Glossary | Binary Search" },
    { name: "description", content: "A collection of various algorithms | Binary Search article" },
  ];
}

function Tile({ img, gif, imgAlt, title, purpose, complexity}) {
  const [isHovered, setIsHovered] = useState(false);

  return(
    <div className="flex flex-col gap-3 rounded-2xl p-5 w-80 border-4 border-[#33334d] 
    hover:scale-110 ease-in-out duration-200 hover:p-3"
     onMouseEnter={() => setIsHovered(true)}
     onMouseLeave={() => setIsHovered(false)}
    >
      <img className="scale-90" src={isHovered ? gif ?? img : img} alt={imgAlt}/>
      <div className="flex flex-row justify-between w-full">
          <div className="flex flex-col self-start">
              <p className="text-xl text-[#e88da3] font-mono font-bold">{title}</p>
              <p className="text-md text-[#e88da3] font-mono font-bold">{purpose}</p>
          </div>
          <div className="flex flex-col self-end">
              <p className="text-xl text-[#e88da3] font-mono font-bold">{title}</p>
          </div>
      </div>
    </div>
  );
}

function Tiles() {
  return(
    <div className="w-[80%] mt-[5%] ml-auto mr-auto grid grid-cols-4 gap-y-10
    md:grid-cols-3 md:scale-90
    sm:grid-cols-1">
      <Tile title="Sort" purpose="Sorting" img={imgSort} gif={gifSort} imgAlt="Sort"/>
      <Tile title="Option 2" img={imgSearch} gif={gifSearch} imgAlt="Search"/>
      <Tile title="Option 3" img={imgGraph} gif={gifGraph} imgAlt="Graph"/>
      <Tile title="Option 4"/>
      <Tile title="Option 5"/>
      <Tile title="Option 6"/>
      <Tile title="Option 7"/>
      <Tile title="Option 8"/>
    </div>
  );
}


export default function Home() {
  return <Tiles />;
}
