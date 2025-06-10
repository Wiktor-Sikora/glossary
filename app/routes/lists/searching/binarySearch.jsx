import {Article, ArticleHeader, CodeBlockSection} from "../../baseArticle.jsx";
import {ArrayFrameSearching} from "../../../components/arrayFrameSearching.jsx";
import description from "../../../assets/texts/binarySearch.jsx";
import {changeStateArea} from "../../../datatypes/array.js";

export function meta() {
    return [
        { title: "Algorithm Glossary | Binary Search" },
        { name: "description", content: "A collection of various algorithms | Binary Search article" },
    ];
}
async function algorithm(arrayElements, setElements, elementToBeSearchedValue, delay, shouldRunRef, setShouldRunState, setComparisons, setElementFoundIndex) {
    setComparisons(0)
    shouldRunRef.current = true
    setElementFoundIndex(null)

    let low = 0
    let high = arrayElements.length - 1
    let mid

    while (high >= low && shouldRunRef.current) {
        mid = Math.floor((low + high) / 2)
        setElements(draft => {draft[mid].state = 3})

        if (shouldRunRef.current) {
            await new Promise((r) => setTimeout(r, delay))
        } else {
            return
        }

        if (arrayElements[mid].value === elementToBeSearchedValue.current) {
            if (mid !== 0) {setElements(draft => {changeStateArea(draft, 0, mid - 1, 0)})}
            if (mid !== arrayElements.length - 1) {setElements((draft) => {changeStateArea(draft, mid + 1, arrayElements.length - 1, 0)})}
            shouldRunRef.current = false
            setElementFoundIndex(mid)
            return
        }
        setComparisons(comparisons => comparisons + 1)

        if (shouldRunRef.current) {
            await new Promise((r) => setTimeout(r, delay))
        } else {
            return
        }

        if (arrayElements[mid].value > elementToBeSearchedValue.current) {
            high = mid - 1
            setElements(draft => {changeStateArea(draft, high + 1, arrayElements.length - 1, 0)})
        } else {
            low = mid + 1
            setElements(draft => {changeStateArea(draft, 0, low - 1, 0)})
        }
        setComparisons(comparisons => comparisons + 2)
    }

    shouldRunRef.current = false
}

function Visualization({ algorithm, isReordable = false}) {
    return(<div className="flex flex-col gap-y-3">
        <h3 className="text-3xl font-bold text-rosepink my-auto">Visualization</h3>
        <ArrayFrameSearching algorithm={algorithm} isReordable={isReordable}/>
    </div>);
}

export default function BinarySearch() {
    return (<section className="w-[80%] mx-auto flex flex-col gap-y-10 md:scale-90 text-lg">
        <ArticleHeader title={description.title} timeComplexity={description.complexity.time} spaceComplexity={description.complexity.space} dataType={description.dataTypes} />
        <Visualization algorithm={algorithm}/>
        <Article definition={description.definition} constraints={description.constraints} algorithmArguments={description.arguments} explanation={description.explanation} returns={description.returns} />
        <CodeBlockSection languages={description.languages} />
    </section>);
}
