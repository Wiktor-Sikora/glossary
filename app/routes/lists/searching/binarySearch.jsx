import { useState, useRef, useMemo } from 'react';
import {Article, ArticleHeader, CodeBlockSection} from "../../baseArticle.jsx";
import description from "../../../assets/texts/binarySearch.jsx";
import {Element, SquareButton} from "../../../components/arrayFrame.jsx";
import svgRandomize from "../../../assets/svg/dice.svg";
import ExtendedArray from "../../../datatypes/array.js";

export function meta() {
  return [
    { title: "Algorithm Glossary | Binary Search" },
    { name: "description", content: "A collection of various algorithms | Binary Search article" },
  ];
}

function ArrayFrame({ algorithm='', arrayLen = 50, maxValue = 50, minValue = 0 }) {
    const [elements, setElements] = useState(new ExtendedArray(arrayLen, maxValue, minValue, true));

    function handleRandomize() {
        console.log('Randomize');
    }

    return (<div className="flex flex-row gap-3 h-72">
        <div className="flex flex-row items-end gap-1 w-full border-blue-magenta border-2 rounded-xl p-3">
            {elements.array.map(element => (
                <Element value={element.value} maxValue={maxValue} state={element.state} />
            ))}
        </div>
        <div className="flex flex-col gap-3 border-blue-magenta border-2 rounded-xl p-3" >
            <SquareButton imgSrc={svgRandomize} onButtonClick={handleRandomize} alt={"Randomize Array"}/>
        </div>
    </div>)
}

function Visualization() {
    return(<div className="flex flex-col gap-y-3">
        <h3 className="text-3xl font-bold text-rosepink my-auto">Visualization</h3>
        <ArrayFrame />
    </div>);
}

export default function BinarySearch() {
    return (<section className="w-[80%] mx-auto flex flex-col gap-y-10 md:scale-90 text-lg">
        <ArticleHeader title={description.title} timeComplexity={description.complexity.time} spaceComplexity={description.complexity.space} dataType={description.dataTypes} />
        <Visualization />
        <Article definition={description.definition} constraints={description.constraints} algorithmArguments={description.arguments} explanation={description.explanation} returns={description.returns} />
        <CodeBlockSection languages={description.languages} />
    </section>);
}
