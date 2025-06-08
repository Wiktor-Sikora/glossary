import {useState, useRef, useEffect} from 'react';
import {Article, ArticleHeader, CodeBlockSection} from "../../baseArticle.jsx";
import description from "../../../assets/texts/bubbleSort.jsx";
import {Element, SquareButton, RangeInput} from "../../../components/arrayComponents.jsx";
import {generateRandomArray, reorder} from "../../../datatypes/array.js";
import {useImmer} from "use-immer";
import {IconContext} from "react-icons";
import {CgDice5} from "react-icons/cg";
import {TbArrowsShuffle} from "react-icons/tb";
import {CiPlay1, CiStop1} from "react-icons/ci";
import {playDynamicTone} from "../../../utils/sound.js"

export function meta() {
    return [
        { title: "Algorithm Glossary | Binary Search" },
        { name: "description", content: "A collection of various algorithms | Binary Search article" },
    ];
}



function ArrayFrame({ arrayLen = 50, maxValue = 50, minValue = 0 }) {
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
            runAlgorithm()
        }
    }

    async function runAlgorithm() {
        setComparisons(0)
        setReorders(0)
        setShouldRunState(true)
        shouldRunRef.current = true

        let localArray = [...elements];

        for (let i = 0; i < localArray.length - 1 && shouldRunRef.current; i++) {
            setComparisons(n => n + 1)
            let swapped = false;

            for (let j = 0; j < localArray.length - i - 1 && shouldRunRef.current; j++) {
                setComparisons(n => n + 1)

                if (localArray[j].value > localArray[j + 1].value) {

                    [localArray[j], localArray[j + 1]] = [localArray[j + 1], localArray[j]];
                    playDynamicTone(localArray[j].value, maxValue, 0.5, 0.5)

                    swapped = true;
                    setElements(() => [...localArray]);
                    setReorders(n => n + 1)

                    if (shouldRunRef.current) {
                        await new Promise((r) => setTimeout(r, delay))
                    } else {
                        return
                    }
                }
            }

            setComparisons(n => n + 1)
            if (!swapped) {
                break;
            }
        }

        setShouldRunState(false)
        shouldRunRef.current = false
    }

    return (<div className="flex flex-row gap-3 h-72">
        <div className={'flex flex-col gap-1 w-full border-blue-magenta border-2 rounded-xl p-3'}>
            <div className={'flex flex-row w-full gap-3'}>
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
            <SquareButton onButtonClick={() => handleRandomize(arrayLength)} alt={"Randomize Array"}>
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

function Visualization() {
    return(<div className="flex flex-col gap-y-3">
        <h3 className="text-3xl font-bold text-rosepink my-auto">Visualization</h3>
        <ArrayFrame />
    </div>);
}

export default function BubbleSort() {
    return (<section className="w-[80%] mx-auto flex flex-col gap-y-10 md:scale-90 text-lg">
        <ArticleHeader title={description.title} timeComplexity={description.complexity.time} spaceComplexity={description.complexity.space} dataType={description.dataTypes} />
        <Visualization />
        <Article definition={description.definition} constraints={description.constraints} algorithmArguments={description.arguments} explanation={description.explanation} returns={description.returns} />
        <CodeBlockSection languages={description.languages} />
    </section>);
}
