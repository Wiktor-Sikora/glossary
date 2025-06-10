import {Article, ArticleHeader, CodeBlockSection, Return} from "../../baseArticle.jsx";
import {ArrayFrameSorting} from "../../../components/arrayFrameSorting.jsx";
import description from "../../../assets/texts/bubbleSort.jsx";
// import {playDynamicTone} from "../../../utils/sound.js"

export function meta() {
    return [
        { title: "Algorithm Glossary | Bubble sort" },
        { name: "description", content: "A collection of various algorithms | Bubble sort article" },
    ];
}

async function algorithm(arrayElements, setElements, delay, shouldRunRef, setShouldRunState, setComparisons, setReorders) {
    setComparisons(0)
    setReorders(0)
    setShouldRunState(true)
    shouldRunRef.current = true

    let localArray = [...arrayElements];

    for (let i = 0; i < localArray.length - 1 && shouldRunRef.current; i++) {
        setComparisons(n => n + 1)
        let swapped = false;

        for (let j = 0; j < localArray.length - i - 1 && shouldRunRef.current; j++) {
            setComparisons(n => n + 1)

            if (localArray[j].value > localArray[j + 1].value) {

                [localArray[j], localArray[j + 1]] = [localArray[j + 1], localArray[j]];

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

function Visualization({ algorithm, isReordable = true }) {
    return(<div className="flex flex-col gap-y-3">
        <h3 className="text-3xl font-bold text-rosepink my-auto">Visualization</h3>
        <ArrayFrameSorting algorithm={algorithm} isReordable={isReordable}/>
    </div>);
}

export default function BubbleSort() {
    return (<><Return />
    <section className="w-[80%] mx-auto flex flex-col gap-y-10 md:scale-90 text-lg">
        <ArticleHeader title={description.title} timeComplexity={description.complexity.time} spaceComplexity={description.complexity.space} dataType={description.dataTypes} />
        <Visualization algorithm={algorithm}/>
        <Article definition={description.definition} constraints={description.constraints} algorithmArguments={description.arguments} explanation={description.explanation} returns={description.returns} />
        <CodeBlockSection languages={description.languages} />
    </section></>);
}
