import { useState } from 'react';

function randomArray(arrayLen = 50, maxValue = 50, minValue = 1) {
    let array = []
    for (let i = 0; i < arrayLen; i++) {
        array.push({
            id: i,
            value: Math.floor(Math.random() * (maxValue - minValue) + minValue),
            state: 1
        })
    }

    return array;
}

function Element({ id, onElementClick, value, maxValue, state= 1}) {
    let bgColor = "bg-white"
    if (state === 0) {
        bgColor = "bg-white"
    } else if (state === 2) {
        bgColor = "bg-rosepink"
    }

    return (<button onClick={onElementClick} className={`w-full ${ bgColor } ${onElementClick !== undefined ? 'hover:bg-dark-rosepink' : ''}`} style={{height: value / maxValue * 100 + '%'}} key={id} ></button>)
}

export default function ArrayFrame({ algorithm='', arrayLen = 50, maxValue = 50, minValue = 0 }) {
    const [elements, setElements] = useState(randomArray(arrayLen, maxValue, minValue).sort((a, b) => a.value - b.value));

    return (<div className="flex flex-row items-end gap-1 w-full">
        {elements.map(element => (
            <Element key={element.id} value={element.value} maxValue={maxValue} state={element.state} />
        ))}
    </div>)
}