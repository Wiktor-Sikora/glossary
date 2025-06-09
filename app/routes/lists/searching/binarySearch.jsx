import {useState, useRef} from 'react';
import {Article, ArticleHeader, CodeBlockSection} from "../../baseArticle.jsx";
import description from "../../../assets/texts/binarySearch.jsx";
import {Element, SquareButton, RangeInput} from "../../../components/arrayFrameSorting.jsx";
import {generateRandomArray, changeStateArea} from "../../../datatypes/array.js";
import {useImmer} from "use-immer";
import { IconContext } from "react-icons";
import {CgDice5} from "react-icons/cg";
import { TbArrowsShuffle } from "react-icons/tb";

export function meta() {
  return [
    { title: "Algorithm Glossary | Binary Search" },
    { name: "description", content: "A collection of various algorithms | Binary Search article" },
  ];
}

function ArrayFrame({ arrayLen = 50, maxValue = 50, minValue = 0 }) {
    const [arrayLength, setArrayLength] = useState(arrayLen)
    const [elements, setElements] = useImmer(generateRandomArray(arrayLength, maxValue, minValue, true));
    const [comparisons, setComparisons] = useState(0)
    const [delay, setDelay] = useState(250)
    const shouldRun = useRef(false)
    const elementToBeSearchedValue = useRef(null)
    const elementToBeSearchedIndex = useRef(null)
    const [elementFoundIndex, setElementFoundIndex] = useState(null)

    function handleArrayLengthChange(length) {
        setArrayLength(length)

        handleRandomize(length)
    }

    function handleRandomize(length) {
        shouldRun.current = false
        setElementFoundIndex(null)
        elementToBeSearchedValue.current = null
        elementToBeSearchedIndex.current = null
        setComparisons(0)

        setElements(generateRandomArray(length, maxValue, minValue, true))
    }

    async function runAlgorithm() {
        setComparisons(0)
        shouldRun.current = true
        setElementFoundIndex(null)

        let low = 0
        let high = elements.length - 1
        let mid

        while (high >= low && shouldRun.current) {
            mid = Math.floor((low + high) / 2)
            setElements(draft => {draft[mid].state = 3})

            if (shouldRun.current) {
                await new Promise((r) => setTimeout(r, delay))
            } else {
                return
            }

            if (elements[mid].value === elementToBeSearchedValue.current) {
                if (mid !== 0) {setElements(draft => {changeStateArea(draft, 0, mid - 1, 0)})}
                if (mid !== elements.length - 1) {setElements((draft) => {changeStateArea(draft, mid + 1, elements.length - 1, 0)})}
                shouldRun.current = false
                setElementFoundIndex(mid)
                return
            }
            setComparisons(comparisons => comparisons + 1)

            if (shouldRun.current) {
                await new Promise((r) => setTimeout(r, delay))
            } else {
                return
            }

            if (elements[mid].value > elementToBeSearchedValue.current) {
                high = mid - 1
                setElements(draft => {changeStateArea(draft, high + 1, arrayLength - 1, 0)})
            } else {
                low = mid + 1
                setElements(draft => {changeStateArea(draft, 0, low - 1, 0)})
            }
            setComparisons(comparisons => comparisons + 2)
        }

        shouldRun.current = false
    }

    function onElementClick(index, value) {
        shouldRun.current = false

        setElements(draft => {
            changeStateArea(draft, 0, arrayLength - 1, 1)

            draft[index].state = 2
        })

        elementToBeSearchedIndex.current = index
        elementToBeSearchedValue.current = value

        return runAlgorithm()
    }

    return (<div className="flex flex-row gap-3 h-72">
        <div className={'flex flex-col gap-1 w-full border-blue-magenta border-2 rounded-xl p-3'}>
            <div className={'flex flex-row w-full gap-3'}>
                <p>Comparisons: {comparisons}</p>
                <p>Delay: {delay}ms</p>
                <p>Items: {arrayLength}</p>
                {elementToBeSearchedValue.current ? <p>Value to Search: {elementToBeSearchedValue.current}</p> : null}
                {elementFoundIndex ? <p>Found at index {elementFoundIndex}</p> : null }
            </div>
            <div className={`flex flex-row items-end w-full h-full`}>
                {elements.map((element, index) => (
                    <Element key={element.id} onElementClick={() => onElementClick(index, element.value)} value={element.value} maxValue={maxValue} state={element.state} />
                ))}
            </div>
        </div>
        <div className="grid grid-cols-2 gap-3 border-blue-magenta place-items-center border-2 rounded-xl p-3">
            <SquareButton onButtonClick={() => handleRandomize(arrayLength)} alt={"Randomize Array"}>
                <IconContext.Provider value={{size: "3rem"}}><CgDice5 /></IconContext.Provider>
            </SquareButton>
            <SquareButton alt={"Shuffle Array"}>
                <IconContext.Provider value={{size: "3rem"}}><TbArrowsShuffle /></IconContext.Provider>
            </SquareButton>
            <RangeInput description={"Delay:"} initialValue={delay} minValue={1} maxValue={1000} onChange={(e) => setDelay(Number(e.target.value))} />
            <RangeInput description={"Items:"} initialValue={arrayLength} minValue={10} maxValue={500} onChange={(e) => {handleArrayLengthChange(Number(e.target.value))}} />
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
