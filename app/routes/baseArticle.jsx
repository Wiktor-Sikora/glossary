import { useState } from 'react';
import { CodeBlock } from 'react-code-block';
import { themes } from 'prism-react-renderer';
import { Link } from "react-router";
import GraphFrame from '../components/graphFrame.jsx';
import { IoArrowBack } from "react-icons/io5";
import {IconContext} from "react-icons";

import { CiPlay1 } from "react-icons/ci";
import { RiResetLeftFill } from "react-icons/ri";
import { IoIosAddCircleOutline} from "react-icons/io";
import { IoRemoveCircleOutline } from "react-icons/io5";

export function meta() {
    return [
        { title: "Algorithm Glossary | Article" },
        { name: "description", content: "A collection of various algorithms | Article" },
    ];
}

export function Return() {
    const [wasClicked, setWasClicked] = useState(false);

    return(
        <button className="relative" onClick={() => setWasClicked(true)}>
            <Link to="/" className={`fixed top-10 border-2 border-blue-magenta p-2 text-2xl rounded-full font-semibold hover:scale-110 ${wasClicked ? '-left-3 duration-50' : 'left-15 duration-100'}
            max-sm:hidden`}

            >
                <IconContext.Provider value={{className: "stroke-1 my-auto" }}>
                    <IoArrowBack  />
                </IconContext.Provider>
            </Link>
        </button>
    )
}

export function ArticleHeader({ title, timeComplexity, spaceComplexity, dataType }) {
    return (<div className="flex flex-row justify-between w-full
                            max-sm:flex-col">
        <h1 className="text-5xl font-bold text-rosepink my-auto">{ title }</h1>
        <div className="flex flex-col
                        max-sm:mt-5">
            <p>Time complexity: <span className="text-rosepink my-auto">{ timeComplexity }</span></p>
            <p>Space complexity: <span className="text-rosepink my-auto">{ spaceComplexity }</span></p>
            <p>Data type: <span className="text-rosepink my-auto">{ dataType }</span></p>
        </div>
    </div>)
}

export function Visualization({ type, algorithm, }){
    const [graphControls, setGraphControls] = useState(null);
    const [pathsOutput, setPathsOutput] = useState("");

    return(<div className="flex flex-col gap-y-3">
        <h3 className="text-3xl font-bold text-rosepink my-auto">Visualization</h3>
        <div className={`flex flex-row gap-3 ${type==="ArrayFrame" ? "h-72" : "h-102"}
                        max-sm:flex-col`}>
            <div className="relative flex flex-col gap-1 w-full border-blue-magenta border-2 rounded-xl p-3">
                {type === "ArrayFrame" ? <ArrayComponent /> :
                <>
                    <GraphFrame algorithm={algorithm} onControlsReady={setGraphControls} setPathsOutput={setPathsOutput}/>
                     <div className="absolute bottom-3 left-3 text-xs text-gray-300">
                       Click any two vertices to connect them<br/>
                       Shift+click on the node to set it as "start"
                       {algorithm === "A* Algorithm" && (
                          <>
                            <br/>Ctrl+click on the node to set it as "end"
                          </>
                        )}
                       {(algorithm === "A* Algorithm" || algorithm === "Dijkstra's Algorithm") && (
                          <>
                            <br/>Shift+click on arrow to increase weight
                            <br/>Ctrl+click on arrow to decrease weight
                          </>
                        )}
                     </div>
                </> 
                }
            </div>
            <div className="flex flex-col gap-3 border-blue-magenta border-2 rounded-xl p-3
                        max-sm:flex-row">
                {graphControls && (
                    <>
                      <button
                        onClick={graphControls.runAlgorithm}
                        className="text-rosepink hover:scale-110 duration-200"
                      >
                        <CiPlay1 className="m-auto stroke-1 size-14"/>
                      </button>
                      <button
                        onClick={graphControls.resetGraph}
                        className="text-rosepink hover:scale-110 duration-200"
                      >
                        <RiResetLeftFill className="m-auto size-13"/>
                      </button>
                      <button
                        onClick={graphControls.addNode}
                        className="text-rosepink hover:scale-110 duration-200"
                      >
                        <IoIosAddCircleOutline className="m-auto size-14"/>
                      </button>
                      <button
                        onClick={graphControls.removeLastNode}
                        className="text-rosepink hover:scale-110 duration-200"
                      >
                        <IoRemoveCircleOutline className="m-auto size-14"/>
                      </button>
                    </>
                  )}
            </div>
        </div>
         {pathsOutput && (
        <div className="whitespace-pre-wrap border-2 border-rosepink text-white rounded-xl p-3 bg-dark-blue-magenta">
          <h4 className="text-lg font-semibold mb-2 text-rosepink">Path results:</h4>
          <div>{pathsOutput}</div>
        </div>
      )}
    </div>);
}

export function Article({ definition, constraints, algorithmArguments, explanation, returns }) {
    return(
        <article className="flex flex-col gap-y-10 text-lg">
            <div className="flex flex-col gap-y-3
                        max-sm:mt-25">
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
                    <CodeBlock.Code className="bg-navy-blue-magenta border-2 border-blue-magenta !p-6 rounded-xl shadow-lg sm:text-wrap
                    max-sm:overflow-x-hidden max-sm:!pt-10">
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
