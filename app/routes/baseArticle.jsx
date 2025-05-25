import { CodeBlock } from 'react-code-block';
import { useState } from 'react';

export function meta() {
    return [
        { title: "Algorithm Glossary | Binary Search" },
        { name: "description", content: "A collection of various algorithms | Binary Search article" },
    ];
}

function ArticleHeader() {
    return(<div className="flex flex-row justify-between w-full">
        <h1 className="text-5xl font-bold text-rosepink my-auto">Binary Search</h1>
        <div className="flex flex-col ">
            <p>Time complexity: <span className="text-rosepink my-auto">O(n)</span></p>
            <p>Space complexity: <span className="text-rosepink my-auto">O(n)</span></p>
            <p>Data type: <span className="text-rosepink my-auto">Array</span></p>
        </div>
    </div>)
}

function Visualization({ code }) {
    return(<div className="flex flex-col gap-y-3">
        <h3 className="text-3xl font-bold text-rosepink my-auto">Visualization</h3>
        <img src={code} alt="Visualization"/>
    </div>);
}

function CodeSnippet({ code }) {
    return(<code className="bg-gray-800 text-gray-100 border-gray-600 font-mono px-2 py-0.5 rounded-lg border-[1px]">{code}</code>)
}

function Article() {
    return(
        <article className="flex flex-col gap-y-10 text-lg">
            <div className="flex flex-col gap-y-3">
                <h3 className="text-3xl font-bold text-rosepink my-auto">Definition</h3>
                <p>Binary search is a search algorithm that finds the position of a target value within a sorted array. Binary search compares the target value to the middle element of the array. If they are not equal, the half in which the target cannot lie is eliminated and the search continues on the remaining half until it is successful. If the search ends with the remaining half being empty, the target is not in the array.</p>
            </div>
            <div className="flex flex-col gap-y-3">
                <h3 className="text-3xl font-bold text-rosepink my-auto">Constraints</h3>
                <ul className="list-disc list-inside">
                    <li>Data in an array must be sorted</li>
                </ul>
            </div>
            <div className="flex flex-col gap-y-3">
                <h3 className="text-3xl font-bold text-rosepink my-auto">Step-by-step explanation</h3>
                <h4 className="text-xl text-rosepink">Arguments:</h4>
                <ul className="list-disc list-inside">
                    <li>target value - <CodeSnippet code="key"/></li>
                    <li>Sorted array - <CodeSnippet code="array"/></li>
                </ul>
                <h4 className="text-xl text-rosepink">Explanation:</h4>
                <ul className="list-disc list-inside">
                    <li>Divide search space into two halves, by selecting middle index as <CodeSnippet code="mid"/></li>
                    <li>Compare <CodeSnippet code="array[mid]"/> with <CodeSnippet code="key"/></li>
                    <li>If <CodeSnippet code="array[mid]"/> is equal to <CodeSnippet code="key"/> return it's index</li>
                    <li>If <CodeSnippet code="array[mid]"/> isn't equal to <CodeSnippet code="key"/>, choose next half to be searched</li>
                    <ul className="ml-12 list-[circle] list-inside">
                        <li>If <CodeSnippet code="array[mid]"/> is bigger than <CodeSnippet code="key"/>, left side of an <CodeSnippet code="array"/> should be searched</li>
                        <li>If <CodeSnippet code="array[mid]"/> is smaller than <CodeSnippet code="key"/>, right side of an <CodeSnippet code="array"/> should be searched</li>
                    </ul>
                    <li>Repeat until index of <CodeSnippet code="key"/> is found or search space is empty</li>
                </ul>
                <h4 className="text-xl text-rosepink">Returns:</h4>
                <p>Index of <CodeSnippet code="key"/> or <CodeSnippet code="-1"/> if not found</p>
            </div>

        </article>
    );
}

function CodeBlockSection({ codeSnipets }) {
    return(<div className="flex flex-col gap-y-3">
        <div className="flex flex-col gap-y-3">
            <h3 className="text-3xl font-bold text-rosepink my-auto">Example</h3>
            <CodeBlock code={codeSnipets.python} language={"python"}>
                <div className="relative">
                    <CodeBlock.Code className="bg-gray-900 !p-6 rounded-xl shadow-lg">
                        <div className="table-row">
                            <CodeBlock.LineNumber className="table-cell pr-4 text-sm text-gray-500 text-right select-none" />
                            <CodeBlock.LineContent className="table-cell">
                                <CodeBlock.Token />
                            </CodeBlock.LineContent>
                        </div>
                    </CodeBlock.Code>

                    <button
                        className="bg-white text-rosepink rounded-full px-3.5 py-1.5 absolute bottom-2 right-2 text-sm font-semibold hover:scale-110 ease-in-out duration-200"
                        onClick={() => {navigator.clipboard.writeText(codeSnipets.python)}}
                    >Copy code</button>
                </div>
            </CodeBlock>
        </div>
    </div>)
}

export default function BaseArticle() {
    return (<section className="w-[80%] mx-auto flex flex-col gap-y-10 md:scale-90 text-lg">
        <ArticleHeader />
        <Visualization code={"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Binary_search_example.svg/1200px-Binary_search_example.svg.png"}/>
        <Article />
        <CodeBlockSection codeSnipets={{"python": "def binarySearch(arr, low, high, x):\n" +
                "\n" +
                "    while low <= high:\n" +
                "\n" +
                "        mid = low + (high - low) // 2\n" +
                "\n" +
                "        # Check if x is present at mid\n" +
                "        if arr[mid] == x:\n" +
                "            return mid\n" +
                "\n" +
                "        # If x is greater, ignore left half\n" +
                "        elif arr[mid] < x:\n" +
                "            low = mid + 1\n" +
                "\n" +
                "        # If x is smaller, ignore right half\n" +
                "        else:\n" +
                "            high = mid - 1\n" +
                "\n" +
                "    # If we reach here, then the element\n" +
                "    # was not present\n" +
                "    return -1"}}/>
    </section>) ;
}
