import {useState, useRef, useEffect} from 'react';
import {Article, ArticleHeader, CodeBlockSection} from "../../baseArticle.jsx";
import description from "../../../assets/texts/binarySearch.jsx";
import {Element, SquareButton} from "../../../components/arrayFrame.jsx";
import svgRandomize from "../../../assets/svg/dice.svg";
import {generateRandomArray, reorder, changeStateArea} from "../../../datatypes/array.js";
import {useImmer} from "use-immer";

export function meta() {
  return [
    { title: "Algorithm Glossary | Binary Search" },
    { name: "description", content: "A collection of various algorithms | Binary Search article" },
  ];
}

function ArrayFrame({ algorithm='', arrayLen = 50, maxValue = 50, minValue = 0 }) {
    const [elements, setElements] = useImmer(generateRandomArray(arrayLen, maxValue, minValue, true));
    let elementToBeSearchedValue = useRef(null)
    let elementToBeSearchedIndex = useRef(null)

    function handleRandomize() {
        setElements(generateRandomArray(arrayLen, maxValue, minValue, true));
        elementToBeSearchedValue.current = null
        elementToBeSearchedIndex.current = null
    }

    async function runAlgorithm() {
        let low = 0
        let high = elements.length - 1
        let mid

        while (high >= low) {
            mid = low + Math.floor((high - low) / 2)

            if (elements[mid].value === elementToBeSearchedValue.current) {
                changeStateArea(elements, mid, 2, 0)
                return
            }

            if (elements[mid].value > elementToBeSearchedValue.current) {
                high = mid - 1
                setElements(draft => {changeStateArea(draft, mid, arrayLen - 1, 0)})
            } else {
                low = mid + 1
                setElements(draft => {changeStateArea(draft, 0, mid, 0)})
            }

            await new Promise(r => setTimeout(r, 500));
        }
    }

    function onElementClick(index, value) {
        const prevIndex = elementToBeSearchedIndex.current;

        setElements(draft => {
            if (prevIndex != null) {
                draft[prevIndex].state = 1
            }

            draft[index].state = 2
            elementToBeSearchedValue.current = value
            elementToBeSearchedIndex.current = index
        })

        runAlgorithm()
    }

    return (<div className="flex flex-row gap-3 h-72">
        <div className="flex flex-row items-end gap-1 w-full border-blue-magenta border-2 rounded-xl p-3">
            {elements.map((element, index) => (
                <Element key={index} onElementClick={() => onElementClick(index, element.value)} value={element.value} maxValue={maxValue} state={element.state} />
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
