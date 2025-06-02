import { useState } from 'react';
import { CodeBlock } from 'react-code-block';
import { themes } from 'prism-react-renderer';
import { Link } from "react-router";

import ArrayFrame from '../components/arrayFrame.jsx';
import GraphFrame from '../components/graphFrame.jsx';

export function meta() {
    return [
        { title: "Algorithm Glossary | Binary Search" },
        { name: "description", content: "A collection of various algorithms | Binary Search article" },
    ];
}

export function Return(){
    return(
        <div className="relative">
            <Link to="/" className="fixed top-10 left-15 border-2 border-blue-magenta px-2 text-2xl pb-1 rounded-xl font-semibold">{`<`}</Link>
        </div>
    )
}

export function ArticleHeader({ title, timeComplexity, spaceComplexity, dataType }) {
    return (<div className="flex flex-row justify-between w-full">
        <h1 className="text-5xl font-bold text-rosepink my-auto">{ title }</h1>
        <div className="flex flex-col ">
            <p>Time complexity: <span className="text-rosepink my-auto">{ timeComplexity }</span></p>
            <p>Space complexity: <span className="text-rosepink my-auto">{ spaceComplexity }</span></p>
            <p>Data type: <span className="text-rosepink my-auto">{ dataType }</span></p>
        </div>
    </div>)
}

export function Visualization({ type, algorithm }){
    return(<div className="flex flex-col gap-y-3">
        <h3 className="text-3xl font-bold text-rosepink my-auto">Visualization</h3>
        <div className={`flex flex-row ${type==="ArrayFrame" ? "h-72" : "h-102"} border-blue-magenta border-2 rounded-xl !p-6 shadow-lg`}>
            {type === "ArrayFrame" ? <ArrayFrame /> : <GraphFrame algorithm={algorithm}/>}
        </div>
    </div>);
}

export function Article({ definition, constraints, algorithmArguments, explanation, returns }) {
    return(
        <article className="flex flex-col gap-y-10 text-lg">
            <div className="flex flex-col gap-y-3">
                <h3 className="text-3xl font-bold text-rosepink my-auto">Definition</h3>
                <p>{definition}</p>
            </div>
            <div className="flex flex-col gap-y-3">
                <h3 className="text-3xl font-bold text-rosepink my-auto">Constraints</h3>
                {constraints}
            </div>
            <div className="flex flex-col gap-y-3">
                <h3 className="text-3xl font-bold text-rosepink my-auto">Step-by-step explanation</h3>
                <h4 className="text-xl text-rosepink">Arguments:</h4>
                {algorithmArguments}
                <h4 className="text-xl text-rosepink">Explanation:</h4>
                {explanation}
                <h4 className="text-xl text-rosepink">Returns:</h4>
                <p>{returns}</p>
            </div>
        </article>
    );
}

export function CodeBlockSection({ languages }) {
    const [selectedLanguage, setSelectedLanguage] = useState(0);
    const [isRecursion, setIsRecursion] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleClickCopy = () => {
        navigator.clipboard.writeText(isRecursion ? languages[selectedLanguage].recursive : languages[selectedLanguage].iterative || "");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return(<div className="flex flex-col gap-y-3">
        <div className="flex flex-col gap-y-3">
            <h3 className="text-3xl font-bold text-rosepink my-auto">Example</h3>
            <div className="flex flex-row gap-x-3">
                {languages.map(( language, index ) => (
                    <button
                        key={index}
                        onClick={() => setSelectedLanguage(index)}
                        className={`px-4 py-1.5 rounded-3xl font-semibold text-center
                                ${selectedLanguage === index ? "bg-rosepink text-white" : "cursor-pointer border-3 border-blue-magenta text-white opacity-80"}`}
                    >
                        {language.language}
                    </button>
                ))}
            </div>
             <CodeBlock
                 code={isRecursion ? languages[selectedLanguage].recursive : languages[selectedLanguage].iterative || "--No code found--"}
                 language={languages[selectedLanguage].machineLanguage}
                 theme={themes.dracula}
             >

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

export default function BaseArticle({ description }) {
    return (
    <>
    <Return />
    <section className="w-[80%] mx-auto flex flex-col gap-y-10 md:scale-90 text-lg">
        <ArticleHeader title={description.title} timeComplexity={description.complexity.time} spaceComplexity={description.complexity.space} dataType={description.dataTypes} />
        <Visualization type={description.type} algorithm={description.title} />
        <Article definition={description.definition} constraints={description.constraints} algorithmArguments={description.arguments} explanation={description.explanation} returns={description.returns}/>
        <CodeBlockSection languages={description.languages} />
    </section>
    </>);
}
