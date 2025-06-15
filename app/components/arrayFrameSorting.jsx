import {useState, useRef, useEffect} from 'react';
import {CgDice5} from "react-icons/cg";
import {useImmer} from "use-immer";
import {generateRandomArray, reorder} from "../datatypes/array.js";
import {IconContext} from "react-icons";
import {CiPlay1, CiStop1} from "react-icons/ci";
import {TbArrowsShuffle} from "react-icons/tb";
import {SquareButton, RangeInput} from "./input.jsx";
import {Element} from "arrayComponents.jsx";

export function ArrayFrameSorting({ algorithm, arrayLen = 50, maxValue = 50, minValue = 0, isReordable = true }) {
    const [arrayLength, setArrayLength] = useState(arrayLen)
    const [elements, setElements] = useImmer([]);
    const [comparisons, setComparisons] = useState(0)
    const [reorders, setReorders] = useState(0)
    const [delay, setDelay] = useState(1)
    const [shouldRunState, setShouldRunState] = useState(false)
    const shouldRunRef = useRef(false)

    useEffect(() => {
        setElements(generateRandomArray(arrayLength, maxValue, minValue));
    }, []);

    function handleArrayLengthChange(length) {
        setArrayLength(length)

        handleRandomize(length)
    }

    function handleReorder() {
        setShouldRunState(false)
        shouldRunRef.current = false

        setComparisons(0)
        setReorders(0)

        setElements(draft => {reorder(draft)})
    }

    function handleRandomize(length) {
        setShouldRunState(false)
        shouldRunRef.current = false
        setComparisons(0)
        setReorders(0)

        setElements(generateRandomArray(length, maxValue, minValue))
    }

    function handlePlay() {
        if (shouldRunRef.current) {
            setShouldRunState(false)
            shouldRunRef.current = false
        } else {
            algorithm(elements, setElements, delay, shouldRunRef, setShouldRunState, setComparisons, setReorders)
        }
    }

    return (<div className="flex flex-col md:flex-row gap-3 md:h-72">
        <div className={'flex flex-col h-72 md:h-auto gap-1 w-full border-blue-magenta border-2 rounded-xl p-3'}>
            <div className={'flex flex-row flex-wrap w-full gap-3 text-sm md:text-2xl'}>
                <p>Comparisons: {comparisons}</p>
                <p>Reorders: {reorders}</p>
                <p>Delay: {delay}ms</p>
                <p>Items: {arrayLength}</p>
            </div>
            <div className={`flex flex-row items-end w-full h-full`}>
                {elements.map((element) => (
                    <Element key={element.id} value={element.value} maxValue={maxValue} state={element.state} />
                ))}
            </div>
        </div>
        <div className="grid grid-cols-3 gap-3 border-blue-magenta place-items-center border-2 rounded-xl p-3">
            <SquareButton onButtonClick={() => {handlePlay()}} alt={shouldRunState ? "Stop simulation" : "Start simulation"}>
                {shouldRunState ?
                    <IconContext.Provider value={{size: "3rem", className: "stroke-1" }}><CiStop1 /></IconContext.Provider> :
                    <IconContext.Provider value={{size: "3rem", className: "stroke-1" }}><CiPlay1 /></IconContext.Provider>
                }
            </SquareButton>
            <SquareButton onButtonClick={isReordable ? () => handleRandomize(arrayLength) : null} alt={"Randomize Array"}>
                <IconContext.Provider value={{size: "3rem" }}><CgDice5 /></IconContext.Provider>
            </SquareButton>
            <SquareButton onButtonClick={() => handleReorder()} alt={"Shuffle Array"}>
                <IconContext.Provider value={{size: "3rem" }}><TbArrowsShuffle /></IconContext.Provider>
            </SquareButton>
            <RangeInput description={"Delay:"} initialValue={delay} minValue={1} maxValue={1000} onChange={(e) => setDelay(Number(e.target.value))} />
            <RangeInput description={"Items:"} initialValue={arrayLength} minValue={10} maxValue={500} onChange={(e) => {handleArrayLengthChange(Number(e.target.value))}} />
        </div>
    </div>)
}