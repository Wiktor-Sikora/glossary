import {Article, ArticleHeader, CodeBlockSection} from "../../baseArticle.jsx";
import description from "../../../assets/texts/insertionSort.jsx";
import {ArrayFrameSorting} from "../../../components/arrayFrameSorting.jsx";

export function meta() {
  return [
    { title: "Algorithm Glossary | Insertion Sort" },
    { name: "description", content: "A collection of various algorithms | Insertion Sort article" },
  ];
}

async function algorithm(arrayElements, setElements, delay, shouldRunRef, setShouldRunState, setComparisons, setReorders) {
    setComparisons(0);
    setReorders(0);
    setShouldRunState(true);
    shouldRunRef.current = true;

    const localArray = [...arrayElements]

    for (let i = 1; i < localArray.length && shouldRunRef.current; i++) {
        setComparisons(n => n + 1);

        let key = localArray[i].value;
        let j = i - 1;

        while (j >= 0 && localArray[j].value > key && shouldRunRef.current) {
            localArray[j + 1] = {
                ...localArray[j + 1],
                value: localArray[j].value
            };
            j--;

            if (shouldRunRef.current) {
                await new Promise((r) => setTimeout(r, delay))
            } else {
                return
            }

            setElements(() => [...localArray]);
            setComparisons(n => n + 1);
            setReorders(n => n + 1);
        }


        localArray[j + 1] = {
            ...localArray[j + 1],
            value: key
        };
        setElements(() => [...localArray]);
        setReorders(n => n + 1);
    }

    setShouldRunState(false);
    shouldRunRef.current = false;
}

function Visualization({ algorithm, isReordable = true }) {
    return(<div className="flex flex-col gap-y-3">
        <h3 className="text-3xl font-bold text-rosepink my-auto">Visualization</h3>
        <ArrayFrameSorting algorithm={algorithm} isReordable={isReordable}/>
    </div>);
}

export default function InsertionSort() {
    return (<section className="w-[80%] mx-auto flex flex-col gap-y-10 md:scale-90 text-lg">
        <ArticleHeader title={description.title} timeComplexity={description.complexity.time} spaceComplexity={description.complexity.space} dataType={description.dataTypes} />
        <Visualization algorithm={algorithm}/>
        <Article definition={description.definition} constraints={description.constraints} algorithmArguments={description.arguments} explanation={description.explanation} returns={description.returns} />
        <CodeBlockSection languages={description.languages} />
    </section>);
}
