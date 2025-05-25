import { useState } from 'react';

import imgSearch from '../assets/home/search-img.png'
import gifSearch from '../assets/home/search.gif'

export function meta() {
    return [
        { title: "Algorithm Glossary | Binary Search" },
        { name: "description", content: "A collection of various algorithms | Binary Search article" },
    ];
}

function CodeSnippet({ code }) {
    return(<code className="bg-gray-800 text-gray-100 border-gray-600 font-mono px-2 py-1 rounded-lg border-[1px]">{code}</code>)
}

function Article() {
    return(
        <article className="w-[80%] mt-[5%] mx-auto flex flex-col gap-y-10 md:scale-90 text-lg">
            <div className="flex flex-row justify-between w-full">
                <h1 className="text-5xl font-bold text-[#e88da3] my-auto">Binary Search</h1>
                <div className="flex flex-col flex-col ">
                    <p>Time complexity: <span className="text-[#e88da3] my-auto">O(n)</span></p>
                    <p>Space complexity: <span className="text-[#e88da3] my-auto">O(n)</span></p>
                    <p>Data type: <span className="text-[#e88da3] my-auto">Array</span></p>
                </div>
            </div>
            <div className="flex flex-col gap-y-3">
                <h3 className="text-3xl font-bold text-[#e88da3] my-auto">Definition</h3>
                <p>Binary search is a search algorithm that finds the position of a target value within a sorted array. Binary search compares the target value to the middle element of the array. If they are not equal, the half in which the target cannot lie is eliminated and the search continues on the remaining half until it is successful. If the search ends with the remaining half being empty, the target is not in the array.</p>
            </div>
            <div className="flex flex-col gap-y-3 ">
                <h3 className="text-3xl font-bold text-[#e88da3] my-auto">Constraints</h3>
                <ul className="list-disc list-inside">
                    <li>Data in an array must be sorted</li>
                </ul>
            </div>
            <div className="flex flex-col gap-y-3 ">
                <h3 className="text-3xl font-bold text-[#e88da3] my-auto">Step-by-step explanation:</h3>
                <ul className="list-disc list-inside">
                    <li>Divide search space into two halves by selecting middle index as <CodeSnippet code="mid"/></li>
                </ul>
            </div>
        </article>
    );
}

export default function BaseArticle() {
    return (<div>
        <Article />
    </div>) ;
}
