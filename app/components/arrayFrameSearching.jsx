import {useState, useMemo, useRef, useEffect} from 'react';
import {CgDice5} from "react-icons/cg";
import {useImmer} from "use-immer";
import {changeStateArea, generateRandomArray} from "../datatypes/array.js";
import {IconContext} from "react-icons";
import {TbArrowsShuffle} from "react-icons/tb";
import {SquareButton, RangeInput} from "./input.jsx";

export function Element({ id, onElementClick, value, maxValue, state= 1}) {
    const height = useMemo( () =>(value / maxValue) * 100, [value, maxValue])
    const bgColor = useMemo(() => {
        if (state === 0) {
            return "bg-blue-magenta"
        } else if (state === 1) {
            return "bg-white"
        } else if (state === 2) {
            return "bg-rosepink"
        } else if (state === 3) {
            return "bg-white outline-4 outline-rosepink outline-dotted -outline-offset-4"
        }

    }, [state])

    return (<button onClick={onElementClick}
                    className={`w-full ${ bgColor } ${onElementClick !== undefined && state !== 2 ? 'hover:bg-dark-rosepink' : ''}`}
                    style={{height: height+'%'}} key={id} ></button>)
}

export function ArrayFrameSearching({ algorithm, arrayLen = 50, maxValue = 50, minValue = 0}) {
    const [arrayLength, setArrayLength] = useState(arrayLen)
    const [elements, setElements] = useImmer([]);
    const [comparisons, setComparisons] = useState(0)
    const [delay, setDelay] = useState(250)
    const shouldRunRef = useRef(false)

    const elementToBeSearchedValue = useRef(null)
    const elementToBeSearchedIndex = useRef(null)
    const [elementFoundIndex, setElementFoundIndex] = useState(null)

    useEffect(() => {
        setElements(generateRandomArray(arrayLength, maxValue, minValue, true));
    }, []);

    function handleArrayLengthChange(length) {
        setArrayLength(length)

        handleRandomize(length)
    }

    function handleRandomize(length) {
        shouldRunRef.current = false
        setComparisons(0)

        setElements(() => generateRandomArray(length, maxValue, minValue, true))
    }

    function onElementClick(index, value) {
        shouldRunRef.current = false

        setElements(draft => {
            changeStateArea(draft, 0, arrayLength - 1, 1)

            draft[index].state = 2
        })

        elementToBeSearchedIndex.current = index
        elementToBeSearchedValue.current = value
        setElementFoundIndex(null)

        algorithm(elements, setElements, elementToBeSearchedValue, delay, shouldRunRef, setComparisons, setElementFoundIndex)
    }

    return (<div className="flex flex-col md:flex-row gap-3 md:h-72">
        <div className={'flex flex-col h-72 md:h-auto gap-1 w-full border-blue-magenta border-2 rounded-xl p-3'}>
            <div className={'flex flex-row flex-wrap w-full gap-3 text-sm md:text-2xl'}>
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
                <IconContext.Provider value={{size: "3rem" }}><CgDice5 /></IconContext.Provider>
            </SquareButton>
            <SquareButton alt={"Shuffle Array"}>
                <IconContext.Provider value={{size: "3rem" }}><TbArrowsShuffle /></IconContext.Provider>
            </SquareButton>
            <RangeInput description={"Delay:"} initialValue={delay} minValue={1} maxValue={1000} onChange={(e) => setDelay(Number(e.target.value))} />
            <RangeInput description={"Items:"} initialValue={arrayLength} minValue={10} maxValue={500} onChange={(e) => {handleArrayLengthChange(Number(e.target.value))}} />
        </div>
    </div>)
}