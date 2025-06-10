import {Article, ArticleHeader, CodeBlockSection} from "../../baseArticle.jsx";
import {ArrayFrameSorting} from "../../../components/arrayFrameSorting.jsx";
import description from "../../../assets/texts/heapSort.jsx";

export function meta() {
    return [
        { title: "Algorithm Glossary | Heap Sort" },
        { name: "description", content: "A collection of various algorithms | Heap Sort article" },
    ];
}

async function algorithm(arrayElements, setElements, delay, shouldRunRef, setShouldRunState, setComparisons, setReorders)  {
    function heapify(array, index, length = array.length) {
        let largest = index
        let left = index * 2 + 1
        let right = index * 2 + 2

        if (left < length && array[left].value > array[largest].value) {
            largest = left;
        }
        if (right < length && array[right].value > array[largest].value) {
            largest = right;
        }


        if (largest !== index) {
            [array[index], array[largest]] = [array[largest], array[index]];

            setReorders(n => n + 1)
            setElements(() => [...array])

            heapify(array, largest, length);
        }

        setComparisons(n => n + 3)
    }

    setComparisons(0)
    setReorders(0)
    setShouldRunState(true)
    shouldRunRef.current = true

    let localArray = [...arrayElements];

    for (let i = Math.floor(localArray.length / 2) - 1; i >= 0; i--) {
        setComparisons(n => n + 1)

        if (shouldRunRef.current) {
            await new Promise((r) => setTimeout(r, delay))
        } else {
            return
        }

        await heapify(localArray, i);
        setElements(() => [...localArray])
    }

    for (let i = localArray.length - 1; i > 0; i--) {
        setComparisons(n => n + 1);

        [localArray[0], localArray[i]] = [localArray[i], localArray[0]]

        if (shouldRunRef.current) {
            await new Promise((r) => setTimeout(r, delay))
        } else {
            return
        }

        setElements(() => [...localArray])
        setReorders(n => n + 1)

        await heapify(localArray, 0, i)
    }

    setShouldRunState(false)
    shouldRunRef.current = false
}

function Visualization({ algorithm, isReordable = true }) {
    return(<div className="flex flex-col gap-y-3">
        <h3 className="text-3xl font-bold text-rosepink my-auto">Visualization</h3>
        <ArrayFrameSorting algorithm={algorithm} isReordable={isReordable}/>
    </div>);
}

export default function HeapSort() {
    return (<section className="w-[80%] mx-auto flex flex-col gap-y-10 md:scale-90 text-lg">
        <ArticleHeader title={description.title} timeComplexity={description.complexity.time} spaceComplexity={description.complexity.space} dataType={description.dataTypes} />
        <Visualization algorithm={algorithm}/>
        <Article definition={description.definition} constraints={description.constraints} algorithmArguments={description.arguments} explanation={description.explanation} returns={description.returns} />
        <CodeBlockSection languages={description.languages} />
    </section>);
}
