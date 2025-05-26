import { CodeBlock } from 'react-code-block';
import { useState } from 'react';
import { snippets } from "./codeSnippets";
import {descriptions} from "./algorithms.jsx"

export function meta() {
    return [
        { title: "Algorithm Glossary | Binary Search" },
        { name: "description", content: "A collection of various algorithms | Binary Search article" },
    ];
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

function Article({ algorithmKey }) {
    const data = descriptions[algorithmKey];
    return(
        <article className="flex flex-col gap-y-10 text-lg">
            <div className="flex flex-row justify-between w-full">
                <h1 className="text-5xl font-bold text-rosepink my-auto">{data.title}</h1>
                <div className="flex flex-col ">
                    <p>Time complexity: <span className="text-rosepink my-auto">{data.complexity.time}</span></p>
                    <p>Space complexity: <span className="text-rosepink my-auto">{data.complexity.space}</span></p>
                    <p>Data type: <span className="text-rosepink my-auto">{data.complexity.type}</span></p>
                </div>
            </div>
            <div className="flex flex-col gap-y-3">
                <h3 className="text-3xl font-bold text-rosepink my-auto">Definition</h3>
                <p>{data.definition}</p>
            </div>
            <div className="flex flex-col gap-y-3">
                <h3 className="text-3xl font-bold text-rosepink my-auto">Constraints</h3>
                {data.constraints}
            </div>
            <div className="flex flex-col gap-y-3">
                <h3 className="text-3xl font-bold text-rosepink my-auto">Step-by-step explanation</h3>
                <h4 className="text-xl text-rosepink">Arguments:</h4>
                    {data.arguments}
                <h4 className="text-xl text-rosepink">Explanation:</h4>
                {data.explanation}
                <h4 className="text-xl text-rosepink">Returns:</h4>
                <p>{data.returns}</p>
            </div>
        </article>
    );
}

function CodeBlockSection({ selectedLang, setSelectedLang, isRecursion, setIsRecursion, codeSnipets }) {
    const [copied, setCopied] = useState(false);

    const selectedKey = isRecursion ? `${selectedLang}Rec` : selectedLang;

    const handleClickCopy = () => {
        navigator.clipboard.writeText(codeSnipets[selectedKey] || "");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return(<div className="flex flex-col gap-y-3">
        <div className="flex flex-col gap-y-3">
            <h3 className="text-3xl font-bold text-rosepink my-auto">Example</h3>
            <div className="flex flex-row gap-x-3">
                {["python", "cpp"].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLang(lang)}
                    className={`px-4 py-1.5 rounded-3xl font-semibold 
                                ${selectedLang === lang ? "bg-rosepink text-white" : "cursor-pointer border-3 border-blue-magenta text-white opacity-80"}`}
                  >
                    {lang}
                  </button>
                ))}
            </div>
             <CodeBlock code={codeSnipets[selectedKey] || "--No code found--"} language={selectedLang}>

                <div className="relative">
                    <CodeBlock.Code className="bg-navy-blue-magenta border-2 border-blue-magenta !p-6 rounded-xl shadow-lg">
                        <div className="table-row">
                            <CodeBlock.LineNumber className="table-cell pr-4 text-sm text-gray-500 text-right select-none" />
                            <CodeBlock.LineContent className="table-cell">
                                <CodeBlock.Token />
                            </CodeBlock.LineContent>
                        </div>
                    </CodeBlock.Code>

                    <div className='flex flex-row absolute top-2 right-3 border border-blue-magenta'>
                        <button
                            className={`px-2 py-1 text-base font-semibold 
                                ${!isRecursion ? "bg-blue-magenta text-white" : "bg-navy-blue-magenta text-white opacity-70"}`}
                            onClick={() => setIsRecursion(false)}
                        >
                            Iteration
                        </button>
                        <button
                            className={`px-2 py-1 text-base font-semibold 
                                ${isRecursion ? "bg-blue-magenta text-white" : "bg-navy text-white opacity-70"}`}
                            onClick={() => setIsRecursion(true)}
                        >
                            Recursion
                        </button>
                    </div>

                    <button
                        className="cursor-pointer bg-blue-magenta text-rosepink rounded-full px-3.5 py-1.5 absolute bottom-2 right-3 text-sm font-semibold hover:text-base hover:pt-1 hover:scale-105 ease-in-out duration-100"
                        onClick={handleClickCopy}
                    >{copied ? "Copied!" : "Copy code"}</button>
                </div>
            </CodeBlock>
        </div>
    </div>)
}

export default function BaseArticle() {
    const [selectedLang, setSelectedLang] = useState("python");
    const [isRecursion, setIsRecursion] = useState(false);
    return (<section className="w-[80%] mt-[5%] mx-auto flex flex-col gap-y-10 md:scale-90 text-lg">
        <Visualization code={"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Binary_search_example.svg/1200px-Binary_search_example.svg.png"}/>
        <Article algorithmKey="binarySearch"/>
        <CodeBlockSection
        selectedLang={selectedLang}
        setSelectedLang={setSelectedLang}
        isRecursion={isRecursion}
        setIsRecursion={setIsRecursion}
        codeSnipets={snippets.binarySearch}
        />
    </section>);
}
