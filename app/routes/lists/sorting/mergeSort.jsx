import {Article, ArticleHeader, CodeBlockSection} from "../../baseArticle.jsx";
import {ArrayFrameSorting} from "../../../components/arrayFrameSorting.jsx";
import description from "../../../assets/texts/mergeSort.jsx";

export function meta() {
    return [
        { title: "Algorithm Glossary | Merge Sort" },
        { name: "description", content: "A collection of various algorithms | Merge Sort article" },
    ];
}

async function algorithm(arrayElements, setElements, delay, shouldRunRef, setShouldRunState, setComparisons, setReorders)  {
    async function merge(arr, left, mid, right) {
        const n1 = mid - left + 1;
        const n2 = right - mid;

        // Create temp arrays
        const L = new Array(n1);
        const R = new Array(n2);

        // Copy data to temp arrays L[] and R[]
        for (let i = 0; i < n1; i++)
            L[i] = arr[left + i];
        for (let j = 0; j < n2; j++)
            R[j] = arr[mid + 1 + j];

        let i = 0, j = 0;
        let k = left;

        // Merge the temp arrays back into arr[left..right]
        while (i < n1 && j < n2) {
            if (L[i].value <= R[j].value) {
                arr[k] = L[i];
                i++;
            } else {
                arr[k] = R[j];
                j++;
            }
            k++;

            if (shouldRunRef.current) {
                await new Promise((r) => setTimeout(r, delay))
            } else {
                return
            }
            setElements(() => [...arr]);
        }

        while (i < n1) {
            arr[k] = L[i];
            i++;
            k++;

            if (shouldRunRef.current) {
                await new Promise((r) => setTimeout(r, delay))
            } else {
                return
            }

            setElements(() => [...arr]);
        }

        if (shouldRunRef.current) {
            await new Promise((r) => setTimeout(r, delay))
        } else {
            return
        }

        while (j < n2) {
            arr[k] = R[j];
            j++;
            k++;

            if (shouldRunRef.current) {
                await new Promise((r) => setTimeout(r, delay))
            } else {
                return
            }
            setElements(() => [...arr]);
        }


    }

    async function mergeSort(arr, left, right) {
        if (left >= right)
            return;

        const mid = Math.floor(left + (right - left) / 2);
        await mergeSort(arr, left, mid);
        await mergeSort(arr, mid + 1, right);
        await merge(arr, left, mid, right);
    }

    setComparisons(0)
    setReorders(0)
    setShouldRunState(true)
    shouldRunRef.current = true

    let localArray = [...arrayElements];

    await mergeSort(localArray, 0, localArray.length - 1);

    setShouldRunState(false)
    shouldRunRef.current = false
}

function Visualization({ algorithm, isReordable = true }) {
    return(<div className="flex flex-col gap-y-3">
        <h3 className="text-3xl font-bold text-rosepink my-auto">Visualization</h3>
        <ArrayFrameSorting algorithm={algorithm} isReordable={isReordable}/>
    </div>);
}

export default function MergeSort() {
    return (<section className="w-[80%] mx-auto flex flex-col gap-y-10 md:scale-90 text-lg">
        <ArticleHeader title={description.title} timeComplexity={description.complexity.time} spaceComplexity={description.complexity.space} dataType={description.dataTypes} />
        <Visualization algorithm={algorithm}/>
        <Article definition={description.definition} constraints={description.constraints} algorithmArguments={description.arguments} explanation={description.explanation} returns={description.returns} />
        <CodeBlockSection languages={description.languages} />
    </section>);
}
