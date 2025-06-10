import description from "../../../assets/texts/quickSort.jsx";
import {Article, ArticleHeader, CodeBlockSection} from "../../baseArticle.jsx";
import {ArrayFrameSorting} from "../../../components/arrayFrameSorting.jsx";

export function meta() {
  return [
    { title: "Algorithm Glossary | Quick Sort" },
    { name: "description", content: "A collection of various algorithms | Quick Sort article" },
  ];
}

async function algorithm(arrayElements, setElements, delay, shouldRunRef, setShouldRunState, setComparisons, setReorders) {
    async function delayStep() {
        return new Promise((resolve) => {
            if (shouldRunRef.current) {
                setTimeout(resolve, delay);
            } else {
                resolve();
            }
        });
    }

    async function partition(array, low, high) {
        const mid = Math.floor((low + high) / 2);
        const pivot = array[mid].value;

        [array[mid], array[high]] = [array[high], array[mid]];
        setReorders((n) => n + 1);
        setElements([...array]);
        await delayStep();

        let i = low - 1;
        for (let j = low; j <= high - 1; j++) {
            setComparisons((n) => n + 1);
            if (array[j].value < pivot) {
                i++;
                [array[i], array[j]] = [array[j], array[i]];
                setReorders((n) => n + 1);
                setElements([...array]);
                await delayStep();
            }
        }

        [array[i + 1], array[high]] = [array[high], array[i + 1]];
        setReorders((n) => n + 1);
        setElements([...array]);
        await delayStep();

        return i + 1;
    }

    async function quickSort(array, low, high) {
        if (!shouldRunRef.current) return;
        if (low >= high) return;

        const pi = await partition(array, low, high);

        await quickSort(array, low, pi - 1);
        await quickSort(array, pi + 1, high);
    }

    // Initialize
    setComparisons(0);
    setReorders(0);
    setShouldRunState(true);
    shouldRunRef.current = true;

    const localArray = [...arrayElements];
    await quickSort(localArray, 0, localArray.length - 1);

    setShouldRunState(false);
    shouldRunRef.current = false;
}

function Visualization({ algorithm, isReordable = true }) {
    return(<div className="flex flex-col gap-y-3">
        <h3 className="text-3xl font-bold text-rosepink my-auto">Visualization</h3>
        <ArrayFrameSorting algorithm={algorithm} isReordable={isReordable}/>
    </div>);
}

export default function QuickSort() {
    return (<section className="w-[80%] mx-auto flex flex-col gap-y-10 md:scale-90 text-lg">
        <ArticleHeader title={description.title} timeComplexity={description.complexity.time} spaceComplexity={description.complexity.space} dataType={description.dataTypes} />
        <Visualization algorithm={algorithm}/>
        <Article definition={description.definition} constraints={description.constraints} algorithmArguments={description.arguments} explanation={description.explanation} returns={description.returns} />
        <CodeBlockSection languages={description.languages} />
    </section>);
}
